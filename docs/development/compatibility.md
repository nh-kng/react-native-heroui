# Compatibility

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

This document records the package's configured compatibility baseline and what the repository checks actually verify.

## Configured baseline

The package declares peer compatibility with Expo `>=57.0.0`, React `>=19.2.3`, and React Native `>=0.86.0`. Development and example dependencies are pinned to Expo 57.0.31, React 19.2.3, and React Native 0.86.3. The native Apple deployment targets are iOS 16.4 and tvOS 16.4.

## Verified in this repository

The current environment verifies:

- pnpm 10.32.1 installs the two-package workspace from one lockfile.
- `CI=1 pnpm check` completes; ESLint reports two existing warnings for empty object types.
- The example TypeScript project resolves the workspace package with `tsc --noEmit`.
- Expo SDK 57 config resolves with `expo config --json` and reports iOS and Android platforms.
- `pnpm pack --dry-run` includes the native, source, build, and package-level documentation files.

These checks do not verify a simulator, device, tvOS target, native rendering, accessibility, performance, or a web implementation. Treat those as separate runtime acceptance work.

## Related documentation

- [Requirements](../getting-started/requirements.md)
- [Platform support](../guides/platform-support.md)
- [Testing](testing.md)
