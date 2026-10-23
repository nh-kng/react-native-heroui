# Platform support

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

The package has one TypeScript surface and native platform adapters registered through Expo Modules. This document separates configured targets from behavior verified by automated repository checks.

## Platform matrix

| Platform | Configured | Current implementation | Verification in this change |
| --- | --- | --- | --- |
| iOS | Yes | Swift `ExpoView` registered as `HeroUI` | Source and package checks only; no simulator build run. |
| tvOS | Yes in the podspec | Shares the Apple module registration | Deployment target is configured; no tvOS runtime test run. |
| Android | Yes | Kotlin `ExpoView` registered as `HeroUI` | Source and package checks only; no emulator build run. |
| Web | Bundler resolution only | `HeroUIView` throws an unavailable-on-web error | TypeScript resolution and Expo config checks pass; no usable web rendering. |

The package's `expo-module.config.json` registers `HeroUIModule` for Apple and Android. Installing the package therefore requires a custom development build on native platforms; Expo Go does not include this module.

## Native behavior

The current sample creates a static native view. iOS uses a light blue `UILabel` container; Android uses a matching `LinearLayout` and `TextView`. There are no exposed native events, configuration options, permissions, or accessibility props beyond the standard React Native view style boundary.

## Limitations

The repository checks do not replace a native simulator or device run. Before claiming a platform is production-ready, build the example on that platform and verify autolinking, rendering, layout, and accessibility behavior.

## Related documentation

- [Requirements](../getting-started/requirements.md)
- [Native bridge](../architecture/native-bridge.md)
- [Compatibility](../development/compatibility.md)
