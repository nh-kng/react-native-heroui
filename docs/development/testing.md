# Testing

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

The repository currently has no unit test files. The checks below verify TypeScript build output, linting, the Jest no-test path, example package resolution, and Expo configuration.

## Checks

Run the library checks from the repository root:

```sh
CI=1 pnpm check
```

This runs the TypeScript build, ESLint over `src/`, and Jest with `--passWithNoTests`. The current source has two known empty-object type warnings in the native module wrappers; they do not fail the lint command.

Run example checks:

```sh
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
```

Inspect the package contents before release:

```sh
pnpm pack --dry-run
```

## Native verification

JavaScript checks do not prove native compilation or rendering. A contributor changing Swift, Kotlin, Expo registration, or native-facing props should also build the example with `pnpm --filter heroui-example exec expo run:ios` or `expo run:android` on the relevant platform. tvOS requires a corresponding Apple target and has not been exercised by the current check suite.

## Related documentation

- [Compatibility](compatibility.md)
- [Platform support](../guides/platform-support.md)
