# Testing and verification

The repository uses static checks, type-level consumer fixtures, and pure mapping tests. Do not use a check that starts a server or exercises browser or native rendering as part of routine verification.

## Package checks

```sh
pnpm run build
pnpm run typecheck
pnpm run typecheck:fixtures
pnpm run lint
pnpm test
```

The fixtures use separate `react-native` and `browser` export conditions. They check shared props, root and subpath exports, platform-specific options, compound parts, ref targets, and rejected adapter-owned overrides. The Node tests cover keyboard type and Typography mappings without rendering React components.

## Example and package checks

```sh
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
pnpm pack --dry-run
```

Expo's `expo export --platform web|ios|android` can verify JavaScript bundling and module resolution. Those exports do not start a server, open a browser, compile native code, or verify component rendering. Package dry-run output should contain only the generated platform builds, styles, and package metadata allowed by the `files` field.

## Runtime verification boundary

This repository task does not run web browsers or tests, simulators, emulators, physical devices, or native builds. Component visual output, accessibility behavior, field interaction, system-theme lifecycle, and native compilation remain unverified by these checks.
