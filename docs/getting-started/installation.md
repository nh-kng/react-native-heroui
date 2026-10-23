# Installation

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

Install the published package into an Expo application with pnpm, then rebuild the native development client so Expo can compile and autolink the module.

## Published package

From the consuming Expo app:

```sh
pnpm add @nh-kng/react-native-heroui
pnpm exec expo run:ios
# or
pnpm exec expo run:android
```

`expo run:*` generates or updates native projects, installs native dependencies, and builds a development client. Use `pnpm exec expo start --dev-client` after the first build. Expo Go does not contain this custom native module.

## Local workspace

From the repository root:

```sh
pnpm install
pnpm --filter heroui-example exec expo run:ios
# or
pnpm --filter heroui-example exec expo run:android
```

The example declares `@nh-kng/react-native-heroui` as `workspace:*`, so the package resolves to the repository root without a second install or a copied package. The workspace uses pnpm's isolated linker; Expo SDK 57's autolinking module resolution and the example Metro watch folder are set up for this layout.

## Related documentation

- [Requirements](requirements.md)
- [Quick start](quick-start.md)
- [Troubleshooting](../guides/troubleshooting.md)
