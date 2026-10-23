# Contributing

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

Contributions should preserve the package's Expo Modules API boundary and keep public behavior, platform support, and documentation in sync. The repository uses pnpm 10.32.1 through the `packageManager` field in the root manifest.

## Requirements

Use a React Native compatible Node.js release: React Native 0.86.3 accepts Node.js 20.19.4 or newer in the Node 20 line, Node 22.13.0 or newer, Node 24.3.0 or newer, or a later supported release. Install pnpm 10.32.1, or use a Corepack setup that honors the repository pin.

## Development workflow

From the repository root:

```sh
pnpm install
pnpm check
pnpm pack --dry-run
```

The example app can be type checked and inspected with:

```sh
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
```

Native development requires an iOS or Android toolchain and a development build. See [development setup](docs/development/setup.md), [testing](docs/development/testing.md), and [the example guide](example/README.md).

## Documentation and changes

Update the living documentation and `CHANGELOG.md` when a change affects installation, public API, platform compatibility, or architecture. Keep one authoritative document for each concept and use relative Markdown links. Use `docs/changes/active/` for a substantial proposal and archive it under `docs/changes/archive/` after implementation when its historical context is useful. Record a significant architectural choice as an ADR under `docs/architecture/decisions/`.

## Pull requests

Describe the user-visible behavior, affected platforms, and verification commands. Keep changes focused, preserve unrelated worktree changes, and do not claim native runtime support until it has been tested on the relevant platform.
