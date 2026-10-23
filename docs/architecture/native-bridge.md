# Native bridge

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

Expo Modules API provides the registration and JavaScript-to-native boundary. The JavaScript side requests the module and view by the shared name `HeroUI`; Expo autolinking selects the platform implementation.

## Registration

`expo-module.config.json` registers:

- Apple module class `HeroUIModule`, implemented in Swift and exposing `HeroUIView`.
- Android module class `com.nhkng.reactnativeheroui.HeroUIModule`, implemented in Kotlin and exposing `HeroUIView`.

Both native definitions call `Name("HeroUI")`, matching `requireNativeModule('HeroUI')` and `requireNativeView('HeroUI')` in `src/`.

## Data and errors

The current view forwards the React Native `style` prop through Expo's native view machinery. No custom events or native methods cross the bridge. Requiring the native module or view on a host that does not contain the compiled module fails through Expo's standard resolution behavior; the web view adapter throws an explicit unavailable-on-web error.

## Platform differences

The Swift view uses `ExpoView` with a `UILabel`. The Kotlin view uses `ExpoView` with a centered `TextView` inside a `LinearLayout`. Their visible sample content is intentionally equivalent, while layout and rendering remain platform-native.

## Related documentation

- [Architecture overview](overview.md)
- [Platform support](../guides/platform-support.md)
- [Component API](../api/components.md)
