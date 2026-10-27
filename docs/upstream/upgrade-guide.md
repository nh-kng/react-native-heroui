# Controlled upstream synchronization

## Stage 1 baseline

The Git submodule pointers, file map, and unchanged owned copies define the baseline. Keep submodule contents read-only. An import should never run upstream lifecycle scripts or build tools inside the submodules.

`verify:upstream` checks exact versions, commits, indexed Git submodule pointers, remote URLs, clean submodule working trees, component records, source selection coverage, exclusions, file checksums, and local resolution of runtime imports. It detects extra files in the owned baseline as well as missing records. It intentionally enforces the unchanged Stage 1 baseline.

## Later synchronization

1. Fetch upstream history and review the diff from each component's last incorporated commit to the proposed revision. Preserve the existing baseline revision in its history.
2. Use the central file map to identify affected components, support files, types, tests, and styles. Review dependency and license changes together with implementation changes.
3. Apply selected changes to locally owned implementations. Never reset or replace locally modified components wholesale. Record renamed APIs, behavior and styling deviations, rejected changes, and known unapplied changes.
4. Update the incorporated and reviewed revisions separately; a review alone does not mean a change was incorporated. Record upstream commits in provenance and the upgrade commit body.
5. Update the manifest schema and verifier deliberately when Stage 2 introduces intentional deviations. The Stage 1 importer and checksum policy must not silently overwrite or accept those changes.
6. Run permitted static and non-rendering checks, record remaining runtime verification limits, and update the changelog for relevant public behavior changes. Use a dedicated commit such as `chore(upstream): sync HeroUI button fixes`.

Stage 2 must explicitly choose canonical component APIs and styling before switching public exports. Until then, separate source snapshots preserve the current adapter contracts and original upstream APIs independently.
