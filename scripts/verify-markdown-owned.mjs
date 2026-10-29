import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { readMarkdownMap } from './markdown-upstream.mjs';
import { root, walk } from './upstream-baselines.mjs';

export function readMarkdownOwnedMap() {
  return JSON.parse(readFileSync(path.join(root, 'docs/upstream/markdown-owned-source-map.json'), 'utf8'));
}

export function verifyMarkdownOwned(map = readMarkdownOwnedMap()) {
  assert.equal(map.schemaVersion, 1);
  assert.equal(map.stage, 2);
  const baseline = readMarkdownMap();
  assert.deepEqual(map.repositories, baseline.repositories.map(({ id, commit }) => ({ id, baselineCommit: commit, lastReviewedCommit: commit, lastIncorporatedCommit: commit })));
  const origins = new Set(baseline.repositories.flatMap(({ files }) => files.map(({ local }) => local)));
  const mapped = new Set();
  for (const file of map.files) {
    assert.ok(!mapped.has(file.local), `Duplicate Markdown owned mapping: ${file.local}`);
    assert.ok(existsSync(path.join(root, file.local)), `Missing Markdown owned file: ${file.local}`);
    assert.ok(/^src\/(?:components\/markdown|primitives\/(?:web|native)\/components\/markdown)\//.test(file.local));
    assert.ok(['copied', 'converted', 'derived', 'authored'].includes(file.kind));
    assert.ok(file.transformations.length && file.transformations.every((value) => typeof value === 'string' && value.length));
    assert.equal(file.kind === 'authored', file.sources.length === 0, `Invalid origin kind: ${file.local}`);
    for (const source of file.sources) assert.ok(origins.has(source), `Untraceable Markdown origin: ${source}`);
    if (file.kind === 'copied') {
      assert.equal(file.sources.length, 1);
      assert.ok(readFileSync(path.join(root, file.local)).equals(readFileSync(path.join(root, file.sources[0]))), `Modified copied Markdown source: ${file.local}`);
    }
    mapped.add(file.local);
  }
  for (const directory of ['src/components/markdown', 'src/primitives/web/components/markdown', 'src/primitives/native/components/markdown']) {
    for (const file of walk(directory).filter((file) => /\.tsx?$/.test(file))) assert.ok(mapped.has(file), `Unmapped Markdown owned file: ${file}`);
  }
  for (const source of origins) {
    const exclusion = map.exclusions.find((entry) => entry.source === source);
    assert.ok(map.files.some(({ sources }) => sources.includes(source)) || exclusion?.reason, `Unaccounted Markdown baseline: ${source}`);
  }
  assert.equal(new Set(map.exclusions.map(({ source }) => source)).size, map.exclusions.length);
  for (const { source, reason } of map.exclusions) assert.ok(origins.has(source) && reason);
  assert.deepEqual(map.components.map(({ name }) => name), ['markdown']);
  return { mapped, components: map.components };
}
