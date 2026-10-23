# Troubleshooting

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

Use these checks when installation, workspace resolution, or native linking fails.

## Reinstall dependencies

Run from the repository root and keep the lockfile authoritative:

```sh
pnpm install --frozen-lockfile
```

If the lockfile is intentionally changed, run `pnpm install`, review the resulting `pnpm-lock.yaml`, and run the full checks before committing it.

## Module not found in the example

Confirm the workspace link and package metadata:

```sh
pnpm --filter heroui-example list @nh-kng/react-native-heroui
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
```

The example is configured with `experiments.autolinkingModuleResolution` and watches the repository root from `example/metro.config.js`. Keep those settings when changing the workspace layout.

## Native module unavailable

Rebuild the development client after adding or changing a native module:

```sh
pnpm --filter heroui-example exec expo run:ios
# or
pnpm --filter heroui-example exec expo run:android
```

Restarting Metro alone does not compile new Swift, Kotlin, or Expo module registration changes.

## Web error

`HeroUIView` intentionally throws on web. Use a native development build for the current sample or provide a platform-specific web component before adding web support.

## Related documentation

- [Installation](../getting-started/installation.md)
- [Testing](../development/testing.md)
