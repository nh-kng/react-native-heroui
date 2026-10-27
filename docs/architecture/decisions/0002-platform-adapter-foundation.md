# ADR 0002: Platform adapter foundation

> Status: Accepted
> Last reviewed: 2026-10-27
> Partially supersedes: [ADR 0001 — Expo Modules API and pnpm workspace](0001-expo-modules-and-pnpm-workspace.md)

## Context

HeroUI React targets the DOM, while HeroUI Native provides React Native components. A single implementation cannot render across both platforms without changing upstream behavior, styles, field contexts, and platform-specific event targets.

[ADR 0001](0001-expo-modules-and-pnpm-workspace.md) established an Expo Modules API boundary and a pnpm workspace. Adapting the public upstream component APIs does not require this package to own a native module. The original native scaffold and registration configuration therefore no longer serve the package's purpose, while the workspace remains useful for developing the adapters with the Expo example.

## Decision

Keep `@nh-kng/react-native-heroui` as a JavaScript and TypeScript adapter package with explicit `.web` and `.native` implementations. Resolve web imports to the public `@heroui/react` API and native imports to the public `heroui-native` API through package export conditions. Keep the shared props and component names in adapter entry points, isolate upstream-specific options in typed escape hatches, and publish separate CSS entry points with shared brand tokens.

Publish platform-specific TypeScript declarations for root and component subpath exports. Exclude adapter-owned props and refs from `webProps` and `nativeProps`, and preserve upstream compound contexts and field associations.

Remove this package's Expo module registration, iOS and Android source, and native build helpers. Retain the pnpm 10.32.1 workspace, single root lockfile, isolated linker, and `workspace:*` example dependency from ADR 0001. The example uses Expo's default Metro configuration with Uniwind stylesheet processing instead of the previous explicit watch folder and autolinking configuration.

## Consequences

Consumers install the upstream packages and styling runtimes for the platforms they use. The package owns no native module or upstream checkout. TypeScript builds and static platform exports verify the package surface, while browser behavior, native compilation, and device accessibility need separate runtime verification.

The former `HeroUIModule` and `HeroUIView` exports are removed. Consumers use the component adapters and platform stylesheet entry points instead. Refs retain their upstream platform types rather than exposing a fabricated common native and DOM interface.

## Alternatives considered

- Retaining the Expo native module scaffold would add native registration and maintenance without providing functionality needed by the adapters.
- Using one renderer for both platforms would bypass the distinct upstream component implementations and their platform behavior.
- Replacing the pnpm workspace is unnecessary because the existing workspace continues to link the example to the package with one installation and lockfile.
