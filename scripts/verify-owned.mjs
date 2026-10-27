import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { readMap, root, walk } from './upstream-baselines.mjs';
import path from 'node:path';

export function verifyOwned() {
  const map = JSON.parse(
    readFileSync(path.join(root, 'docs/upstream/owned-source-map.json'), 'utf8')
  );
  const baseline = readMap();
  assert.equal(map.stage, 2);
  for (const repo of map.repositories) {
    const original = baseline.repositories.find(({ id }) => id === repo.id);
    assert.equal(repo.baselineCommit, original.commit);
    assert.equal(repo.lastIncorporatedCommit, original.commit);
    assert.equal(repo.lastReviewedCommit, original.commit);
  }
  const mapped = new Set();
  for (const file of map.files) {
    assert.ok(!mapped.has(file.local), `Duplicate owned mapping: ${file.local}`);
    mapped.add(file.local);
    assert.ok(existsSync(path.join(root, file.local)), `Missing owned file: ${file.local}`);
    assert.ok(
      baseline.repositories.some((repo) => repo.files.some(({ local }) => local === file.baseline)),
      `Untraceable origin: ${file.baseline}`
    );
  }
  for (const file of [...walk('src/primitives'), ...walk('src/styles'), ...walk('styles/shared')])
    assert.ok(mapped.has(file), `Unmapped owned file: ${file}`);
  for (const file of walk('src').filter((file) => /\.tsx?$/.test(file))) {
    const source = readFileSync(path.join(root, file), 'utf8');
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    function visit(node) {
      if (ts.isStringLiteralLike(node) && /^(?:@heroui\/|heroui-native(?:\/|$))/.test(node.text)) {
        assert.fail(`External HeroUI reference in owned source: ${file}: ${node.text}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
    for (const { fileName: specifier } of ts.preProcessFile(source).importedFiles) {
      if (!specifier.startsWith('.')) continue;
      const target = path.resolve(root, path.dirname(file), specifier);
      assert.ok(
        [target.replace(/\.js$/, '.ts'), target.replace(/\.js$/, '.tsx')].some(existsSync),
        `Unresolved owned import: ${file}: ${specifier}`
      );
    }
  }
  const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  for (const name of ['@heroui/react', 'heroui-native', '@heroui/styles']) {
    assert.ok(
      !pkg.dependencies?.[name] && !pkg.peerDependencies?.[name],
      `Upstream runtime dependency: ${name}`
    );
  }
  for (const component of map.components) {
    assert.ok(existsSync(path.join(root, 'src/components', component.name, 'UPSTREAM.md')));
    assert.ok(
      existsSync(path.join(root, 'src/components', component.name, `${component.name}.types.ts`))
    );
    assert.ok(
      pkg.exports[
        component.name === 'hero-ui-provider' ? './hero-ui-provider' : `./${component.name}`
      ]
    );
    for (const file of component.publicPaths) assert.ok(existsSync(path.join(root, file)));
  }
  for (const file of walk('styles').filter((file) => file.endsWith('.css'))) {
    const source = readFileSync(path.join(root, file), 'utf8');
    assert.ok(
      !/@import\s+['"](?:@heroui|heroui-native)/.test(source),
      `External HeroUI stylesheet: ${file}`
    );
  }
  return { files: mapped.size, components: map.components.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  console.log('Verified owned implementation:', verifyOwned());
