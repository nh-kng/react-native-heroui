import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { readMap, root } from '../scripts/upstream-baselines.mjs';
import { assertOwnedResolution, verifyFile, verifyUpstream } from '../scripts/verify-upstream.mjs';

test('baseline inventory, provenance, Git pins, and local imports are complete', () => {
  const result = verifyUpstream();
  assert.ok(result.files > 1000);
  assert.ok(result.components > 100);
  assert.ok(result.imports > 1000);
});

test('a changed source copy cannot pass either upstream identity or checksum checks', () => {
  const file = readMap().repositories[0].files[0];
  const original = readFileSync(path.join(root, file.local));
  assert.throws(() => verifyFile(file, Buffer.concat([original, Buffer.from('\n')]), file.upstreamBlob), /Modified upstream source/);
  assert.throws(() => verifyFile({ ...file, sha256: 'invalid' }, original, file.upstreamBlob), /Checksum mismatch/);
});

test('omitted source files and component provenance are rejected', () => {
  const missingFile = readMap();
  missingFile.repositories[0].files.pop();
  assert.throws(() => verifyUpstream(missingFile), /Incomplete upstream inventory/);
  const missingComponent = readMap();
  missingComponent.repositories[0].components.pop();
  assert.throws(() => verifyUpstream(missingComponent), /Missing component provenance/);
});

test('unresolved and installed upstream component imports are rejected', () => {
  assert.throws(() => assertOwnedResolution('@heroui/styles', 'button.tsx', undefined), /Unresolved baseline import/);
  assert.throws(() => assertOwnedResolution('@heroui/styles', 'button.tsx', { resolvedFileName: path.join(root, 'node_modules/@heroui/styles/index.d.ts') }), /escaped to installed package/);
});

test('the published package only includes adapter build directories', () => {
  const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.ok(!pkg.files.includes('build'));
  assert.ok(pkg.files.includes('build/web'));
  assert.ok(pkg.files.includes('build/native'));
  assert.ok(!Object.keys(pkg.exports).some((key) => key.includes('baseline')));
});
