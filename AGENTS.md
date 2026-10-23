# Repository instructions

These instructions apply across the repository; follow any more specific `AGENTS.md` files in nested directories.

## Project layout

- The repository root is the publishable Expo module; `src/` contains its TypeScript API and platform resolution.
- `ios/` and `android/` contain the native module and view implementations, while `expo-module.config.json` connects them to Expo autolinking.
- `example/` is a private Expo app and pnpm workspace consumer; `internal/module_scripts/` contains package build and native development helpers.
- pnpm 10.32.1 manages the root package and `example/`; install dependencies once from the repository root.

## Implementation

- Keep changes focused on the request, preserve unrelated user modifications, and follow existing naming, formatting, import, and export conventions.
- Trace the affected public exports, TypeScript wrappers, native registrations, and platform implementations before changing behavior.
- Keep shared contracts, design tokens, and behavior platform-neutral where practical; isolate platform-specific rendering, native code, gestures, animations, and dependencies.
- Preserve consistent component names, props, defaults, variants, and interaction semantics across platforms; support accessibility, responsive layouts, theming, and reduced motion where applicable, and document platform differences or unsupported behavior.
- Keep modules focused, APIs explicit and backward-compatible where practical, and TypeScript strict; document justified breaking changes, and avoid `any`, unsafe casts, duplicated logic, and hidden side effects.
- Prefer existing utilities, platform primitives, and dependencies; evaluate compatibility, maintenance, bundle impact, and licensing before adding dependencies or adapting external code, and preserve applicable notices and attribution.
- Treat external UI libraries as references; prefer small adaptations and avoid coupling shared APIs to undocumented third-party behavior.
- Do not hand-edit generated files unless repository tooling explicitly requires it; add comments only to explain non-obvious behavior or important decisions.

## Verification

- Run checks that cover the changed code; `pnpm check` builds the library, lints `src/`, and runs Jest with the repository's no-tests allowance.
- For example-app changes, use the relevant checks documented in `docs/development/testing.md`, including the example TypeScript and Expo config checks where applicable.
- For native or native-facing changes, build and exercise the example on the affected platform; JavaScript checks alone do not verify native compilation or rendering.
- Add or update meaningful tests for behavior and edge cases; do not fix unrelated issues solely to make a check pass.
- Report checks accurately, including failures and untested platforms; never claim a check passed unless it was run successfully.

## Documentation

- Treat `docs/references/` as request-specific instructions and assets; exclude its contents from routine discovery, reading, citation, and linking, and do not treat them as authoritative project documentation unless the user explicitly asks you to use specific material there.
- When the user asks you to use material from `docs/references/`, treat it as task context and verify claims about architecture or implemented behavior against the project source of truth.
- Keep `docs/README.md` as the documentation index and maintain one authoritative document per concept with relative Markdown links.
- Document public APIs, examples, platform differences, and compatibility only when verified; distinguish implemented, planned, and experimental functionality.
- Use lowercase kebab-case filenames under `docs/`, record significant architectural decisions in `docs/architecture/decisions/`, and keep substantial proposals under `docs/changes/` using its active/archive organization.
- Update relevant documentation and `CHANGELOG.md` when public behavior changes; avoid duplicate documentation and unnecessary placeholders.
- Keep Markdown prose paragraphs and list items on one source line; preserve meaningful structure, metadata, tables, code fences, and intentional hard breaks, and do not reflow unrelated content.
