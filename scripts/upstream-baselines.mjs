import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const mapPath = 'docs/upstream/source-map.json';
export const repositories = [
  {
    id: 'heroui-react', repository: 'https://github.com/heroui-inc/heroui.git', version: '3.2.6',
    commit: 'e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e', license: 'MIT',
    roots: ['packages/react/', 'packages/styles/', 'packages/testing/', 'packages/standard/'],
    files: ['LICENSE', 'package.json', 'pnpm-workspace.yaml'],
    componentRoots: ['packages/react/src/components', 'packages/styles/src/components'],
  },
  {
    id: 'heroui-native', repository: 'https://github.com/heroui-inc/heroui-native.git', version: '1.0.11',
    commit: '1980fbbbd6e8112cf9363614abec683379e89da3', license: 'Apache-2.0',
    roots: ['src/', 'scripts/'],
    files: ['LICENSE', 'package.json', 'babel.config.js', 'tsconfig.json', 'tsconfig.build.json', 'tsconfig.typecheck.json', 'uniwind-env.d.ts'],
    componentRoots: ['src/components'],
  },
];

export function git(directory, ...args) {
  return execFileSync('git', ['-C', path.join(root, directory), ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }).trim();
}

export function upstreamTree(repo) {
  return git(`upstream/${repo.id}`, 'ls-tree', '-r', '--full-tree', repo.commit).split('\n').map((line) => {
    const [metadata, origin] = line.split('\t');
    const [mode, type, blob] = metadata.split(' ');
    return { origin, mode, type, blob };
  });
}

export function selected(repo, origin) {
  return repo.files.includes(origin) || repo.roots.some((prefix) => origin.startsWith(prefix)) || /(^|\/)(LICENSE[^/]*|NOTICE[^/]*)$/.test(origin);
}

export function hashes(buffer) {
  return {
    sha256: createHash('sha256').update(buffer).digest('hex'),
    blob: createHash('sha1').update(`blob ${buffer.length}\0`).update(buffer).digest('hex'),
  };
}

export function walk(directory) {
  return readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const file = `${directory}/${entry.name}`;
    return entry.isDirectory() ? walk(file) : [file];
  }).sort();
}

export function provenance(repo, origin) {
  return `# ${origin.split('/').at(-1)} — upstream provenance\n\nRepository: ${repo.repository}\n\nVersion: ${repo.version}; baseline, last reviewed, and last incorporated commit: ${repo.commit}.\n\nOriginal directory: \`${origin}/\`; owned directory: \`baselines/${repo.id}/${origin}/\`.\n\nAll upstream files in this directory were copied unchanged. Required support files and styles are indexed in [the central source map](${path.posix.relative(`baselines/${repo.id}/${origin}`, 'docs/upstream/source-map.json')}).\n\nLocal API transformations, behavior changes, styling deviations, incorporated follow-up changes, and known unapplied changes: none.\n\nLicense: ${repo.license}; see the copied repository LICENSE. Rendering tests are retained as reference and are not executed by repository checks.\n\nUpgrade policy: review upstream changes since the last incorporated revision and update the file map and this record together; do not overwrite owned implementations blindly.\n`;
}

export function readMap() {
  return JSON.parse(readFileSync(path.join(root, mapPath), 'utf8'));
}
