# @nh-kng/react-native-heroui

An Expo Modules API package for native UI primitives in React Native. The current release contains the generated `HeroUIView` sample and the native module wiring needed to grow the component set.

Install it in an Expo app with pnpm:

```sh
pnpm add @nh-kng/react-native-heroui
pnpm exec expo run:ios       # or: pnpm exec expo run:android
```

Native modules require a development build. The component can then be used from TypeScript:

```tsx
import { HeroUIView } from '@nh-kng/react-native-heroui';

export function Screen() {
  return <HeroUIView style={{ height: 200 }} />;
}
```

The repository uses pnpm 10.32.1 and a two-package workspace containing the library and `example/`. Start with `pnpm install` at the repository root, then use the example scripts from `example/` or the filtered commands documented in [the local example guide](example/README.md).

The package targets Expo SDK 57, React Native 0.86, and React 19. The native implementations are configured for iOS, tvOS, and Android. Web resolution exists for bundler compatibility, but `HeroUIView` throws when rendered on web because there is no web implementation yet.

Read the [documentation index](docs/README.md) for requirements, API reference, platform details, development checks, and release guidance. The package's public export surface is described in the [API reference](docs/api/README.md).
