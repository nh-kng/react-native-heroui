import { verifyMarkdown } from './markdown-upstream.mjs';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { git, hashes, provenance, readMap, repositories, root, selected, upstreamTree, walk } from './upstream-baselines.mjs';

export function verifyFile(record, contents, upstreamBlob) {
  const digest = hashes(contents);
  assert.equal(record.upstreamBlob, upstreamBlob, `Wrong upstream blob: ${record.local}`);
  assert.equal(digest.blob, upstreamBlob, `Modified upstream source: ${record.local}`);
  assert.equal(digest.sha256, record.sha256, `Checksum mismatch: ${record.local}`);
}

export function baselineConfig(platform) {
  const file = path.join(root, `tsconfig.baselines.${platform}.json`);
  const config = ts.readConfigFile(file, ts.sys.readFile);
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  assert.equal(parsed.errors.length, 0, `Invalid config: ${file}`);
  return parsed;
}

export function assertOwnedResolution(specifier, file, resolved) {
  assert.ok(resolved, `Unresolved baseline import ${specifier} in ${file}`);
  assert.ok(resolved.resolvedFileName.startsWith(path.join(root, 'baselines/')), `Baseline import escaped to installed package: ${specifier} in ${file}`);
}

export function verifyResolution() {
  let imports = 0;
  for (const platform of ['web', 'native']) {
    const config = baselineConfig(platform);
    for (const file of config.fileNames) {
      const source = readFileSync(file, 'utf8');
      for (const { fileName: specifier } of ts.preProcessFile(source).importedFiles) {
        if (!specifier.startsWith('.') && !specifier.startsWith('@/') && !/^(?:@heroui\/|heroui-native(?:\/|$))/.test(specifier)) continue;
        const resolved = ts.resolveModuleName(specifier, file, config.options, ts.sys).resolvedModule;
        assertOwnedResolution(specifier, file, resolved);
        imports++;
      }
    }
  }
  return imports;
}

export function verifyUpstream(map = readMap()) {
  assert.equal(map.schemaVersion, 1);
  assert.equal(map.stage, 1);
  assert.deepEqual(map.repositories.map(({ id }) => id), repositories.map(({ id }) => id));
  const expectedLocalFiles = [];
  for (const repo of repositories) {
    const record = map.repositories.find(({ id }) => id === repo.id);
    for (const key of ['repository', 'version', 'commit', 'license']) assert.equal(record[key], repo[key], `${repo.id}: ${key}`);
    assert.equal(record.lastReviewedCommit, repo.commit);
    assert.equal(record.lastIncorporatedCommit, repo.commit);
    assert.deepEqual(record.localDeviations, []);
    assert.equal(git(`upstream/${repo.id}`, 'rev-parse', 'HEAD'), repo.commit, `Wrong submodule HEAD: ${repo.id}`);
    assert.equal(git('', 'ls-files', '--stage', `upstream/${repo.id}`).split(/\s+/).slice(0, 2).join(' '), `160000 ${repo.commit}`, `Wrong indexed submodule pin: ${repo.id}`);
    assert.equal(git('', 'config', '-f', '.gitmodules', `submodule.upstream/${repo.id}.url`), repo.repository);
    assert.equal(git(`upstream/${repo.id}`, 'status', '--porcelain'), '', `Dirty submodule: ${repo.id}`);
    const tree = upstreamTree(repo);
    const expectedFiles = tree.filter(({ origin }) => selected(repo, origin));
    assert.deepEqual(record.files.map(({ origin }) => origin), expectedFiles.map(({ origin }) => origin), `Incomplete upstream inventory: ${repo.id}`);
    for (const [index, file] of record.files.entries()) {
      assert.equal(file.local, `baselines/${repo.id}/${file.origin}`);
      verifyFile(file, readFileSync(path.join(root, file.local)), expectedFiles[index].blob);
      expectedLocalFiles.push(file.local);
    }
    const expectedComponents = repo.componentRoots.flatMap((directory) => [...new Set(expectedFiles.filter(({ origin }) => origin.startsWith(`${directory}/`) && origin.slice(directory.length + 1).includes('/')).map(({ origin }) => `${directory}/${origin.slice(directory.length + 1).split('/')[0]}`))].sort());
    assert.deepEqual(record.components.map(({ origin }) => origin), expectedComponents, `Missing component provenance: ${repo.id}`);
    for (const component of record.components) {
      assert.equal(component.local, `baselines/${repo.id}/${component.origin}`);
      assert.equal(component.provenance, `${component.local}/UPSTREAM.md`);
      assert.equal(component.status, 'copied');
      for (const key of ['apiTransformations', 'behaviorDeviations', 'stylingDeviations', 'knownUnappliedChanges']) assert.deepEqual(component[key], []);
      assert.equal(readFileSync(path.join(root, component.provenance), 'utf8'), provenance(repo, component.origin));
      expectedLocalFiles.push(component.provenance);
    }
    const excluded = tree.filter(({ origin }) => !selected(repo, origin));
    const exclusionRoots = [...new Set(excluded.map(({ origin }) => origin.split('/')[0]))].sort();
    assert.deepEqual(record.exclusions.map(({ path: directory }) => directory), exclusionRoots, `Missing exclusions: ${repo.id}`);
    for (const exclusion of record.exclusions) {
      assert.equal(exclusion.fileCount, excluded.filter(({ origin }) => origin === exclusion.path || origin.startsWith(`${exclusion.path}/`)).length);
      assert.ok(exclusion.reason);
    }
  }
  const markdownFiles = verifyMarkdown();
  expectedLocalFiles.push(...markdownFiles);
  assert.deepEqual(walk('baselines'), expectedLocalFiles.sort(), 'Unmapped baseline files');
  const imports = verifyResolution();
  return { files: map.repositories.reduce((sum, repo) => sum + repo.files.length, 0) + markdownFiles.length, components: map.repositories.reduce((sum, repo) => sum + repo.components.length, 0), imports };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log('Verified upstream baseline:', verifyUpstream());
}
