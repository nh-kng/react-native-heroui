# Requirements

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

These are the requirements for developing the package and running its native example. The package uses Expo SDK 57 and React Native 0.86.3 in this repository.

## Requirements

| Area | Requirement | Notes |
| --- | --- | --- |
| Node.js | Node 20.19.4+ in the Node 20 line, Node 22.13.0+, Node 24.3.0+, or a later supported release | React Native 0.86.3 declares these engine ranges. |
| Package manager | pnpm 10.32.1 | Pinned by `package.json`; the workspace has one lockfile. |
| Expo | SDK 57 (`expo` 57.0.31 in this repository) | The published package peer range starts at SDK 57. |
| React Native | 0.86.3 in this repository; peer range starts at 0.86 | The native sample uses Expo Modules API integration. |
| React | 19.2.3 in this repository; peer range starts at 19.2.3 | The package has no runtime React dependency of its own. |
| Native build | iOS or Android development toolchain | A native development build is required after installing the module. |

The iOS podspec sets iOS and tvOS deployment targets to 16.4 and Swift to 5.9. Android uses the Expo module Gradle plugin; the host Expo and React Native project supplies the Android SDK settings. No permissions are required by the current sample.

## Platform compatibility

The module is registered for Apple and Android autolinking. iOS, tvOS, and Android source files are present, but native rendering has not been runtime-verified as part of the current repository checks. Web files let the package resolve in a web bundle; `HeroUIView` intentionally throws on web because no usable web implementation exists. See [platform support](../guides/platform-support.md) for the verification boundary.

## Related documentation

- [Installation](installation.md)
- [Quick start](quick-start.md)
- [Compatibility](../development/compatibility.md)
