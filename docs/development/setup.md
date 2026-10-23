# Development setup

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

The repository contains the publishable library at the root and a private Expo SDK 57 app under `example/`. pnpm manages both packages from the root.

## Requirements

Install a supported Node.js version and pnpm 10.32.1. The exact pnpm version is declared in the root `package.json` so Corepack or CI can reproduce the package manager selection.

## Install

```sh
pnpm install
```

The workspace uses pnpm's isolated linker, and the example's `workspace:*` dependency resolves to the root package. Do not run a second install from `example/`.

## Useful commands

```sh
pnpm check
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
pnpm pack --dry-run
```

For native work, run the example's development build commands from the root with a filter or change to `example/` and use its scripts. See [testing](testing.md) for the verification boundary.

## Repository layout

- `src/` — public TypeScript and platform resolution.
- `ios/` and `android/` — Expo Modules API implementations.
- `example/` — private Expo consumer.
- `internal/module_scripts/` — build, test, clean, and native project helpers.
- `docs/` — user and contributor documentation.
