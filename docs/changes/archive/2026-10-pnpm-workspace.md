# pnpm workspace migration

> Status: Implemented
> Last reviewed: 2026-10-23

## Summary and motivation

Move the library and its Expo example from npm installation state to one reproducible pnpm workspace, while documenting the public API and the native platform boundary.

## Scope and non-goals

The change covers package-manager metadata, dependency linking, lockfile generation, contributor documentation, and API/platform documentation. It does not change source behavior in `src/`, `ios/`, `android/`, or `example/App.tsx`.

## Affected platforms and public APIs

The workspace affects development and package installation for iOS, tvOS, Android, and web bundler resolution. The public component and native module exports remain unchanged.

## Design

- Pin pnpm 10.32.1 in `package.json`.
- Declare `example/` in `pnpm-workspace.yaml`.
- Link the example package with `workspace:*`.
- Keep pnpm's isolated linker explicit in `.npmrc`.
- Replace npm commands in package scripts and documentation with pnpm commands.
- Add living documentation and one ADR for the package-manager and native-boundary decisions.

## Compatibility and migration impact

Contributors should run `pnpm install` from the repository root. The npm lockfile is removed and `pnpm-lock.yaml` is authoritative. Published package consumers can use pnpm independently of the repository workspace; they still need an Expo native development build.

## Implementation tasks

- [x] Add exact pnpm package-manager and workspace metadata.
- [x] Replace the local `file:..` example dependency with `workspace:*`.
- [x] Generate one lockfile and verify frozen installation.
- [x] Document requirements, installation, API, platforms, architecture, development, and release.
- [x] Add a changelog entry.

## Acceptance criteria

- `pnpm install` completes for both workspace packages.
- `CI=1 pnpm check` passes with only existing lint warnings.
- The example TypeScript and Expo config checks pass.
- Package dry-run output includes the required native and JavaScript files.
- Documentation links and commands refer to the pnpm workspace.

## Verification and test plan

The acceptance checks pass in the current environment. Native simulator and device builds remain outside this initialization task and are documented as unverified.
