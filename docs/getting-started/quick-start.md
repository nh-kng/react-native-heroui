# Quick start

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

After installation and a native development build, render the package's current native view sample.

## Usage

```tsx
import { HeroUIView } from '@nh-kng/react-native-heroui';

export function ExampleScreen() {
  return <HeroUIView style={{ height: 200, width: '100%' }} />;
}
```

The native view displays a centered `HeroUI - native view` label with a platform-defined background. The `style` prop is forwarded to the native view and accepts React Native `ViewStyle` values.

## Platform compatibility

This example requires iOS, tvOS, or Android native code. It cannot render on web, and it cannot run in Expo Go because Expo Go does not bundle this custom native module. The current sample is a wiring check rather than a finished HeroUI component library.

## Related documentation

- [Component API](../api/components.md)
- [Platform support](../guides/platform-support.md)
