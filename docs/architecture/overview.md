# Architecture overview

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

The package keeps a small JavaScript API over one Expo Modules API native module. The example app is a workspace consumer and exercises package resolution, Expo configuration, and future native builds.

```mermaid
flowchart LR
  App[Example or host Expo app] --> Entry[src/index.ts]
  Entry --> View[HeroUIView.tsx]
  Entry --> Module[HeroUIModule.ts]
  View --> NativeView[Expo requireNativeView('HeroUI')]
  Module --> NativeModule[Expo requireNativeModule('HeroUI')]
  NativeView --> Registry[expo-module.config.json]
  NativeModule --> Registry
  Registry --> Apple[iOS / tvOS Swift module]
  Registry --> Android[Android Kotlin module]
```

## Boundaries

- `src/` contains the public TypeScript entry point, component wrapper, platform resolution files, and exported types.
- `ios/` and `android/` contain the native module and view implementations. Both register the module name `HeroUI` and the native view class.
- `expo-module.config.json` maps Expo autolinking to the Apple and Android module classes.
- `example/` is a private Expo SDK 57 workspace package that links the root package with `workspace:*`.
- `internal/module_scripts/` builds declarations and JavaScript, runs Jest, and opens native projects for development.

Dependency direction flows from the host app to the package entry point, then through Expo's module registry to platform code. Native implementations do not import the example app or its JavaScript files.

## Current limitations

The view is a generated static sample. There is no state, event bridge, styling system, hook, or utility API beyond the standard `style` prop. Web files preserve bundler resolution but explicitly reject rendering.

## Related documentation

- [Native bridge](native-bridge.md)
- [Public API](../api/README.md)
- [Architecture decisions](decisions/README.md)
