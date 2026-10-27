# Stage 1 validation

Recorded on 2026-10-27 with Node 22.23.2 and pnpm 10.32.1. The pinned source baseline contains 1,263 unchanged upstream files: 737 React/styles/tooling files and 526 Native files. There are 213 per-component provenance records, including React style-variant directories, and 2,351 verified local runtime imports. The owned copies include 135 React test/harness/fixture files and four Native test files as reference material.

## Completed checks

- `pnpm run check` — provenance verification, strict adapter and baseline typechecks, lint, adapter build, platform consumer fixtures, owned baseline JavaScript and declaration builds, both Tailwind stylesheet smoke compilations, and seven non-rendering Node tests.
- `pnpm --filter heroui-example exec tsc --noEmit` — current Expo example typing.
- `pnpm --filter heroui-example exec expo config --json` — static Expo SDK 57 configuration for iOS, Android, and web.
- `pnpm pack --dry-run --json` — package allowlist inspection; no `baselines/`, `upstream/`, or `build/baselines/` runtime artifacts included. Public export conditions remain unchanged.
- Noninteractive ESM imports of the emitted owned React root and style variants — Button, Card, TextField, and button variants resolve without rendering.

The source verifier compares the complete selected file inventory with the pinned Git trees, checks Git blob identities and SHA-256 checksums, rejects missing or extra owned files and component records, validates retained license files and submodule pins, and checks TypeScript resolution of relative and upstream-owned runtime imports. Negative tests cover source modification, checksum corruption, missing source inventory, missing component provenance, unresolved imports, and resolution to installed HeroUI implementations.

## Build adjustments and limitations

No copied implementation, style, or test file was modified. Local configuration adds strict build entry points, Node declarations, and direct development dependencies required by the complete trees. Web checking preserves upstream JSX semantics; generated JSX is subsequently transformed to JavaScript. Generated module specifiers and the generated React CSS entry resolve to the owned styles implementation. Third-party runtime dependencies remain external.

Owned baseline files disable Git text normalization to preserve upstream bytes, including existing CRLF endings. The full staged whitespace check reports inherited whitespace in copied upstream files; those bytes are intentionally preserved and checksum-verified. The whitespace check for repository-owned changes outside `baselines/` passes.

There are no unresolved baseline TypeScript or stylesheet compilation blockers in this environment. pnpm reports the existing React DOM declaration peer mismatch (`@types/react-dom` 19.3.0 expects React declarations ^19.3.0 while this workspace pins ~19.2.3), and an ignored optional `@parcel/watcher` build script introduced by the Tailwind CLI. Neither prevented the recorded static builds; dependency upgrades and native watcher builds are not part of this import.

Upstream rendering suites were preserved but not run. Browser tests, preview servers, browser automation, screenshots, device/simulator/emulator runs, native compilation, native bundling, visual parity, interaction behavior, accessibility, and animation correctness remain unverified. Passing TypeScript and CSS checks establishes a source/build baseline rather than functional parity. The published adapters and example remain on their existing upstream dependencies until Stage 2.
