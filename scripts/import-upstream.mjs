import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { git, hashes, mapPath, provenance, repositories, root, selected, upstreamTree } from './upstream-baselines.mjs';

function writeNew(file, contents) {
  const destination = path.join(root, file);
  if (existsSync(destination)) {
    if (!readFileSync(destination).equals(Buffer.from(contents))) throw new Error(`Refusing to overwrite ${file}; review changes manually.`);
    return;
  }
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, contents);
}

const map = { schemaVersion: 1, stage: 1, repositories: [] };
for (const repo of repositories) {
  if (git(`upstream/${repo.id}`, 'rev-parse', 'HEAD') !== repo.commit) throw new Error(`Wrong revision: ${repo.id}`);
  const tree = upstreamTree(repo);
  const files = [];
  for (const entry of tree.filter(({ origin }) => selected(repo, origin))) {
    if (entry.type !== 'blob' || !['100644', '100755'].includes(entry.mode)) throw new Error(`Unsupported upstream entry: ${entry.origin}`);
    const contents = readFileSync(path.join(root, 'upstream', repo.id, entry.origin));
    const digest = hashes(contents);
    if (digest.blob !== entry.blob) throw new Error(`Dirty upstream file: ${entry.origin}`);
    const local = `baselines/${repo.id}/${entry.origin}`;
    writeNew(local, contents);
    files.push({ origin: entry.origin, local, upstreamBlob: entry.blob, sha256: digest.sha256 });
  }
  const components = repo.componentRoots.flatMap((directory) => {
    const names = [...new Set(files.filter(({ origin }) => origin.startsWith(`${directory}/`) && origin.slice(directory.length + 1).includes('/')).map(({ origin }) => origin.slice(directory.length + 1).split('/')[0]))].sort();
    return names.map((name) => {
      const origin = `${directory}/${name}`;
      const record = `baselines/${repo.id}/${origin}/UPSTREAM.md`;
      writeNew(record, provenance(repo, origin));
      return { name, origin, local: `baselines/${repo.id}/${origin}`, provenance: record, status: 'copied', apiTransformations: [], behaviorDeviations: [], stylingDeviations: [], knownUnappliedChanges: [] };
    });
  });
  const excluded = tree.filter(({ origin }) => !selected(repo, origin));
  const excludedRoots = [...new Set(excluded.map(({ origin }) => origin.split('/')[0]))].sort();
  map.repositories.push({ ...repo, lastReviewedCommit: repo.commit, lastIncorporatedCommit: repo.commit, localDeviations: [], files, components, exclusions: excludedRoots.map((name) => ({ path: name, fileCount: excluded.filter(({ origin }) => origin === name || origin.startsWith(`${name}/`)).length, reason: 'Upstream application, documentation, release tooling, or repository configuration; not part of the owned runtime baseline.' })) });
}
writeNew(mapPath, `${JSON.stringify(map, null, 2)}\n`);
console.log(`Imported ${map.repositories.reduce((sum, repo) => sum + repo.files.length, 0)} unchanged files; ${map.repositories.reduce((sum, repo) => sum + repo.components.length, 0)} component records.`);
