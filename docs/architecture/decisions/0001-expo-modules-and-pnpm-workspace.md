# ADR 0001: Expo Modules API and pnpm workspace

> Status: Partially superseded by [ADR 0002](0002-platform-adapter-foundation.md); pnpm workspace decision retained
> Last reviewed: 2026-10-23

This record preserves the original Expo native module decision. [ADR 0002 — Platform adapter foundation](0002-platform-adapter-foundation.md) replaces the Expo Modules API boundary and its native registration setup with JavaScript and TypeScript adapters. The pnpm workspace, single lockfile, isolated linker, and `workspace:*` example dependency remain in use; the historical Expo autolinking and explicit Metro watch-folder configuration described below no longer apply.

## Context

The package is an Expo native module with iOS, tvOS, and Android source plus a private Expo example. The repository previously used separate npm installation state for the root and example. Native module projects also need one stable JavaScript-to-native registration boundary.

## Decision

Keep Expo Modules API as the native boundary and model the root package plus `example/` as one pnpm workspace. Pin pnpm 10.32.1 in `package.json`, keep one root `pnpm-lock.yaml`, and link the example to the package with `workspace:*`. Use pnpm's isolated node linker and keep Expo's `autolinkingModuleResolution` plus the example Metro watch folder enabled.

## Consequences

- A clean checkout has one dependency install and one lockfile for both packages.
- The example consumes the current source package through a workspace link, which makes local API and native registration changes immediately testable.
- The isolated linker avoids flattening dependencies globally; Expo config and TypeScript checks validate the repository layout.
- Native runtime behavior still requires an iOS, tvOS, or Android development build and is not established by JavaScript-only checks.

## Alternatives considered

- Keeping npm lockfiles would preserve two installation paths and make the requested pnpm migration incomplete.
- A `file:..` dependency would copy or link the package outside pnpm's workspace protocol and would not make the local package relationship explicit in the lockfile.
- A hoisted linker was not selected because the isolated workspace passed the example's Expo config and TypeScript resolution checks; add hoisting only if a native runtime reproduces a concrete resolution problem.
