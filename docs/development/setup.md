# Development setup

The repository root is the publishable package and `example/` is a private Expo SDK 57 workspace consumer. pnpm 10.32.1 manages both packages with one lockfile.

Install once from the repository root:

```sh
pnpm install
```

## Commands

```sh
pnpm run build
pnpm run typecheck
pnpm run typecheck:fixtures
pnpm run lint
pnpm test
pnpm run watch
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
```

`build` cleans generated output and compiles separate web and native declarations and JavaScript. `typecheck:fixtures` checks standalone consumers against those package exports. `watch` runs the two TypeScript compilers in watch mode.

The Expo example scripts are `start`, `web`, `ios`, and `android`. The iOS and Android scripts start Expo for that platform; they do not run a native build.

## Layout

- `src/` — platform adapters, component subpaths, and deliberate prop mappings.
- `styles/` — publishable platform CSS and shared brand tokens.
- `tests/` — platform consumer fixtures and non-rendering mapping tests.
- `example/` — Expo consumer, gallery, and platform stylesheet bootstraps.
- `upstream/` and `baselines/` — pinned upstream submodules and independently built owned source copies; see [upstream setup](../upstream/README.md).
- `docs/` — API, setup, platform, architecture, and verification documentation.

## Related documentation

- [Testing](testing.md)
- [Architecture](../architecture/overview.md)
- [Example app](../../example/README.md)
