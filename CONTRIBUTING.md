# Contributing

The root package contains the TypeScript adapters and published styles. `example/` is a private Expo SDK 57 workspace consumer. Install dependencies once from the repository root with pnpm 10.32.1.

```sh
pnpm install
pnpm run build
pnpm run typecheck
pnpm run typecheck:fixtures
pnpm run lint
pnpm test
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
```

The platform consumer fixtures validate root and subpath exports, shared props, platform escape hatches, refs, compound parts, and rejected prop overrides. Mapping tests run under Node and do not render components. Expo exports can check JavaScript module resolution for web, iOS, and Android without starting a server or building native code.

Keep adapter-owned behavior explicit and type-safe. Preserve the upstream contexts used by compound components, and keep platform-specific imports in the matching platform implementation. Update the API documentation and `CHANGELOG.md` when public behavior changes. Do not claim runtime, accessibility, or native compilation results unless those checks were run.

See [development setup](docs/development/setup.md), [testing](docs/development/testing.md), and the [example guide](example/README.md) for the supported workflow.
