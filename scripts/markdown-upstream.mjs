import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { git, hashes, root, selected as selectedOriginal, upstreamTree } from './upstream-baselines.mjs';

const selected = (repo, origin) => selectedOriginal(repo, origin) || /(^|\/)license(?:\.(?:md|txt))?$/i.test(origin);

export const markdownMapPath = 'docs/upstream/markdown-source-map.json';
export const markdownRepositories = [
  ['react-markdown', 'remarkjs/react-markdown', '10.1.0', '44d2e4a44b37461ab7778d6870c1a9eb36393ad2', ['lib/'], ['index.js']],
  ['react-native-markdown-display', 'iamacup/react-native-markdown-display', '7.0.2', '192b0ebf8e2538dfe9da0bc8b47e411116ed60e5', ['src/'], []],
  ['remark-gfm', 'remarkjs/remark-gfm', '4.0.1', '109972e8a773bf5dac1d6d2da0776557f36971aa', ['lib/'], ['index.js']],
  ['remark-math', 'remarkjs/remark-math', '6.0.0', 'd5d0660b150810a535bbb07eac6cc96a4510aa24', ['packages/remark-math/lib/'], ['packages/remark-math/index.js', 'packages/remark-math/package.json']],
  ['rehype-raw', 'rehypejs/rehype-raw', '7.0.0', 'b34629920abbb5484409778412cdad3f94ff9b1f', ['lib/'], ['index.js']],
  ['rehype-sanitize', 'rehypejs/rehype-sanitize', '6.0.0', '566a856d8b626c3d016f610048bdaf327464e467', ['lib/'], ['index.js']],
].map(([id, repository, version, commit, roots, files]) => ({ id, repository: `https://github.com/${repository}.git`, version, commit, roots, files: [...files, 'package.json'], license: 'MIT' }));

export function readMarkdownMap() {
  return JSON.parse(readFileSync(path.join(root, markdownMapPath), 'utf8'));
}

export function writeMarkdownReference(file, contents) {
  const destination = path.join(root, file);
  if (existsSync(destination)) {
    assert.ok(readFileSync(destination).equals(Buffer.from(contents)), `Refusing to overwrite ${file}; review changes manually.`);
    return;
  }
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, contents);
}

export function importMarkdown() {
  const map = { schemaVersion: 1, stage: 1, repositories: [] };
  for (const repo of markdownRepositories) {
    assert.equal(git(`upstream/${repo.id}`, 'rev-parse', 'HEAD'), repo.commit);
    assert.equal(git(`upstream/${repo.id}`, 'status', '--porcelain'), '');
    const tree = upstreamTree(repo);
    const files = tree.filter(({ origin }) => selected(repo, origin)).map((entry) => {
      assert.equal(entry.type, 'blob');
      const contents = readFileSync(path.join(root, 'upstream', repo.id, entry.origin));
      const digest = hashes(contents);
      assert.equal(digest.blob, entry.blob);
      const local = `baselines/${repo.id}/${entry.origin}`;
      writeMarkdownReference(local, contents);
      return { origin: entry.origin, local, upstreamBlob: entry.blob, sha256: digest.sha256 };
    });
    const license = files.find(({ origin }) => /^(license|LICENSE)(\.md|\.txt)?$/.test(origin));
    assert.ok(license, `Missing license: ${repo.id}`);
    const notice = `docs/upstream/licenses/${repo.id}.txt`;
    writeMarkdownReference(notice, readFileSync(path.join(root, license.local)));
    const manifestPath = repo.id === 'remark-math' ? 'packages/remark-math/package.json' : 'package.json';
    const manifest = JSON.parse(readFileSync(path.join(root, 'upstream', repo.id, manifestPath), 'utf8'));
    const exclusions = tree.filter(({ origin }) => !selected(repo, origin)).map(({ origin, blob }) => ({ origin, upstreamBlob: blob, reason: 'Outside selected runtime, declaration, manifest and license boundaries.' }));
    map.repositories.push({ ...repo, files, notice, manifestVersion: manifest.version, dependencies: manifest.dependencies ?? {}, peerDependencies: manifest.peerDependencies ?? {}, lastReviewedCommit: repo.commit, lastIncorporatedCommit: repo.commit, exclusions });
  }
  writeMarkdownReference(markdownMapPath, `${JSON.stringify(map, null, 2)}\n`);
  return map;
}

export function verifyMarkdown(map = readMarkdownMap()) {
  assert.equal(map.schemaVersion, 1);
  assert.equal(map.stage, 1);
  assert.deepEqual(map.repositories.map(({ id }) => id), markdownRepositories.map(({ id }) => id));
  const inventory = [];
  for (const repo of markdownRepositories) {
    const record = map.repositories.find(({ id }) => id === repo.id);
    for (const key of ['repository', 'version', 'commit', 'license']) assert.equal(record[key], repo[key]);
    assert.equal(record.lastReviewedCommit, repo.commit);
    assert.equal(record.lastIncorporatedCommit, repo.commit);
    assert.equal(git(`upstream/${repo.id}`, 'rev-parse', 'HEAD'), repo.commit);
    assert.equal(git('', 'ls-files', '--stage', `upstream/${repo.id}`).split(/\s+/).slice(0, 2).join(' '), `160000 ${repo.commit}`);
    assert.equal(git('', 'config', '-f', '.gitmodules', `submodule.upstream/${repo.id}.url`), repo.repository);
    assert.equal(git(`upstream/${repo.id}`, 'status', '--porcelain'), '');
    const tree = upstreamTree(repo);
    const expected = tree.filter(({ origin }) => selected(repo, origin));
    assert.deepEqual(record.files.map(({ origin }) => origin), expected.map(({ origin }) => origin), `Incomplete Markdown inventory: ${repo.id}`);
    for (const [index, file] of record.files.entries()) {
      assert.equal(file.local, `baselines/${repo.id}/${file.origin}`);
      const digest = hashes(readFileSync(path.join(root, file.local)));
      assert.equal(file.upstreamBlob, expected[index].blob);
      assert.equal(digest.blob, file.upstreamBlob, `Modified Markdown baseline: ${file.local}`);
      assert.equal(digest.sha256, file.sha256, `Checksum mismatch: ${file.local}`);
      inventory.push(file.local);
    }
    assert.deepEqual(record.exclusions.map(({ origin, upstreamBlob }) => ({ origin, blob: upstreamBlob })), tree.filter(({ origin }) => !selected(repo, origin)).map(({ origin, blob }) => ({ origin, blob })));
    assert.ok(record.exclusions.every(({ reason }) => reason));
    const manifestPath = repo.id === 'remark-math' ? 'packages/remark-math/package.json' : 'package.json';
    const manifest = JSON.parse(readFileSync(path.join(root, 'baselines', repo.id, manifestPath), 'utf8'));
    assert.equal(record.manifestVersion, manifest.version);
    assert.deepEqual(record.dependencies, manifest.dependencies ?? {});
    assert.deepEqual(record.peerDependencies, manifest.peerDependencies ?? {});
    assert.equal(record.notice, `docs/upstream/licenses/${repo.id}.txt`);
    const license = record.files.find(({ origin }) => /^(license|LICENSE)(\.md|\.txt)?$/.test(origin));
    assert.ok(readFileSync(path.join(root, record.notice)).equals(readFileSync(path.join(root, license.local))));
  }
  return inventory;
}
