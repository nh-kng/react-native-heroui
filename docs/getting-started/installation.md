# Installation

Install the declared required peers, even when you ship only one platform. HeroUI component packages are not required. Platform exports keep the runtime implementation separate, while the public types include both owned platform option sets. The package does not bundle React, React Native, or styling runtimes.

Add the package, shared/web peers:

```sh
pnpm add @nh-kng/react-native-heroui@0.1.0 @internationalized/date@3.12.4 @react-aria/ssr@3.10.1 @react-aria/utils@3.34.1 react-aria@3.52.1 react-aria-components@1.21.1 tailwind-merge@3.6.0 tailwind-variants@3.3.1 tailwindcss@4.3.3 uniwind@1.13.0
```

In an Expo app, use `expo install` to select SDK-compatible React, React DOM, and native peers:

```sh
pnpm exec expo install react react-dom react-native react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg react-native-worklets @react-native-masked-view/masked-view
```

LoadingText uses the required MaskedView peer on native; the SDK 57 example pins `0.3.2`. After adding a native dependency, rebuild an existing native host so its binary includes the package. The adapter itself adds no native module code.

Uniwind's Metro integration compiles the shared global CSS for native and web. No separate Tailwind PostCSS plugin is required for this setup; see [quick start](quick-start.md).

The package peer list and SDK 57 example versions are summarized in [requirements](requirements.md).

The repository example is configured for Expo SDK 57. From the repository root, install once, build the package, then typecheck and inspect the Expo app configuration:

```sh
pnpm install
pnpm run build
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
```

The example uses the root package through `workspace:*`; do not install again from `example/`.

The package contains only JavaScript and TypeScript adapters. Native apps use the host React Native build as usual and do not need a package-specific native module or development client. See [quick start](quick-start.md) for the required styling and root-provider setup.

## Related documentation

- [Requirements](requirements.md)
- [Quick start](quick-start.md)
- [Example app](../../example/README.md)
