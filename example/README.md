# Example app

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

This private Expo SDK 57 app demonstrates the package's current `HeroUIView` native sample. It is a workspace member and consumes the root package through `workspace:*`.

## Requirements

Use the repository's pinned pnpm version and a supported Node.js release. A native iOS or Android toolchain is required for a development build; Expo Go does not contain this custom module.

## Install and run

From the repository root:

```sh
pnpm install
pnpm --filter heroui-example start:dev-client
```

Build the native client when needed:

```sh
pnpm --filter heroui-example ios
# or
pnpm --filter heroui-example android
```

The equivalent direct commands from this directory are `pnpm start`, `pnpm start:dev-client`, `pnpm ios`, and `pnpm android`.

## Verification

```sh
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
```

The app's Metro config watches the repository root, and `app.json` enables Expo's autolinking module resolution for the workspace layout. The current `App.tsx` is the sample consumer; native runtime rendering still needs to be checked on the target simulator or device.

## Related documentation

- [Installation](../docs/getting-started/installation.md)
- [Quick start](../docs/getting-started/quick-start.md)
- [Platform support](../docs/guides/platform-support.md)
