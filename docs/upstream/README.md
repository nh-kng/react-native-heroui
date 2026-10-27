# Owned upstream baselines

Stage 1 preserves both complete component libraries as locally owned source under `baselines/`, alongside pinned, read-only Git submodules under `upstream/`. Stage 2 public exports now use local implementations under `src/primitives/`, shared contracts under `src/components/`, and shared semantic styles. HeroUI component packages are development baselines rather than runtime peers. The immutable Stage 1 copies remain separate from public source edits.

## Initialize and verify

```sh
git submodule update --init --recursive
pnpm install --frozen-lockfile
pnpm run verify:upstream
pnpm run typecheck:baselines
pnpm run build
pnpm run build:baselines
pnpm test
```

Run the adapter build before the baseline build: `build` cleans the entire generated `build/` directory. `pnpm run check` runs provenance, adapter and baseline typechecks, lint, the adapter build, consumer fixtures, the baseline build, and non-rendering tests in that order. Baseline sources, submodules, and generated baseline artifacts are excluded from the published package.

The initial import is reproducible with `node scripts/import-upstream.mjs` after initializing the pinned submodules. It only creates missing files or accepts byte-identical files; it refuses to overwrite differing copies or provenance. It is an initial-import tool, not an upgrade command.

## Records

- [Owned implementation map](owned-source-map.json) — current copied source destinations and public API, behavior, and styling transformations.
- [Stage 2 migration](../changes/archive/stage-2-public-surface.md) — migrated public components and remaining baseline-only inventory.
- [React baseline](react.md) — revision, source layout, dependencies, and stylesheet resolution.
- [Native baseline](native.md) — revision, support code, optional dependencies, and build limits.
- [Source inventory](source-map.md) — component coverage, support files, exclusions, and machine-readable provenance.
- [Upgrade guide](upgrade-guide.md) — controlled review and synchronization procedure.
- [Validation](validation.md) — recorded static checks and verification boundaries.
- [ADR 0003](../architecture/decisions/0003-owned-source-baselines.md) — the ownership transition and deferred public cutover.
