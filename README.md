# @nh-kng/react-native-heroui

An Expo Modules API starter for native UI components in React Native. The package currently exports
the generated `HeroUIView` sample so the native module wiring is ready for future UI primitives.

## Requirements

- Expo SDK 57 or newer
- React Native 0.86 or newer
- A development build, because `HeroUIView` is implemented in Swift and Kotlin

The module supports iOS, tvOS, and Android through Expo autolinking. It does not support web yet.

## Install

After the package is published, install it in an Expo app with:

```sh
npx expo install @nh-kng/react-native-heroui
```

Create or rebuild a development client after installing a native module:

```sh
npx expo run:ios
# or
npx expo run:android
```

Use the component in JavaScript or TypeScript:

```tsx
import { HeroUIView } from '@nh-kng/react-native-heroui';

export function Screen() {
  return <HeroUIView style={{ height: 200 }} />;
}
```

## Local example

Install the package and example dependencies from the repository root:

```sh
npm install
cd example
npm install
npx expo run:ios
```

Use `npm run android` for Android, or `npm run start:dev-client` after a development build.

## Development

The root package builds TypeScript declarations and JavaScript into `build/`:

```sh
npm run check
npm pack --dry-run
```

The iOS implementation is in `ios/`, the Android implementation is in
`android/src/main/java/com/nhkng/reactnativeheroui/`, and the typed JavaScript entry point is in
`src/`. `expo-module.config.json` registers the native module for Expo autolinking.

The package is configured for public scoped publishing, but publishing is intentionally a separate
release step.
