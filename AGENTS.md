# Repository instructions

These instructions apply across the repository; follow any more specific `AGENTS.md` files in nested directories.

## Project layout

- The repository root is the publishable TypeScript package; `src/` contains platform-resolved adapters and their type mappings.
- `styles/` contains the published native and web stylesheets and shared brand tokens.
- `example/` is a private Expo SDK 57 workspace consumer with the component gallery.
- `tests/fixtures/` contains separate native and web TypeScript consumers; `tests/` contains non-rendering unit tests.
- `docs/` contains public API and contributor documentation. Keep `docs/references/` untouched unless a task explicitly requests its use.
- pnpm 10.32.1 manages the root package and `example/` with one lockfile.

## Implementation

- Keep changes focused, preserve unrelated user modifications, and follow the existing naming, formatting, import, and export conventions.
- Trace public package exports, platform adapters, styles, and consumers before changing behavior.
- Adapt the supported public APIs of `@heroui/react` and `heroui-native`; do not import private source or depend on undocumented internals.
- Keep shared direct props consistent across platforms. Put upstream-specific options in typed `webProps` or `nativeProps`, and omit adapter-owned props and refs from those escape hatches.
- Preserve upstream compound contexts and associations for fields, labels, descriptions, and validation messages.
- Keep TypeScript strict. Avoid `any`, unsafe casts, fabricated common ref APIs, and hidden side effects.
- Do not add native module code, autolinking, podspecs, or native build helpers; this package is a JavaScript adapter library.
- Do not hand-edit generated build output. Explain non-obvious decisions in documentation rather than adding unnecessary source comments.

## Verification

- Prefer static checks: `pnpm run build`, `pnpm run typecheck`, `pnpm run typecheck:fixtures`, `pnpm run lint`, `pnpm test`, example TypeScript checks, Expo config checks, package inspection, and noninteractive JavaScript exports.
- Do not build or run tests on simulators, emulators, or physical devices unless the user explicitly requests it.
- Do not run web tests, start a web preview/test server, or perform browser automation, screenshots, or interaction testing unless the user explicitly requests it.
- These restrictions override broader verification guidance in other documentation. Report skipped runtime, accessibility, and native compilation checks accurately.
- Add meaningful tests for prop mappings and public typing; do not add renderer tests that are prohibited by this repository's verification boundary.

## Documentation

- Keep `docs/README.md` as the documentation index and maintain one authoritative document per concept with relative Markdown links.
- Document public APIs, examples, platform differences, and compatibility only when verified; distinguish static configuration from runtime verification.
- Use lowercase kebab-case filenames under `docs/` and preserve meaningful Markdown structure.
- Update relevant documentation and `CHANGELOG.md` when public behavior changes. Keep prose paragraphs and list items on one source line.
