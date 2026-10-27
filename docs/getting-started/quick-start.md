# Quick start

Use one global stylesheet for web, iOS, and Android. The package entry imports Tailwind CSS 4, Uniwind, shared semantic component styles, and brand tokens, with platform conditions for native hairlines and browser selectors. Install the peers described in [installation](installation.md) first.

Configure Metro to process the shared app CSS entry with Uniwind on every platform:

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

module.exports = withUniwindConfig(getDefaultConfig(__dirname), {
  cssEntryFile: './global.css',
  dtsFile: './uniwind-types.d.ts',
});
```

Create `global.css`:

```css
@import '@nh-kng/react-native-heroui/styles/index.css';

@source './App.tsx';
```

Import `./global.css` once from `App.tsx` (or the root layout when using Expo Router). The import and Metro's `cssEntryFile` must identify the same file. Uniwind compiles Tailwind for native and web; this setup does not require a separate Tailwind PostCSS configuration. Add source directives for class-bearing files outside the app's scan root.

The existing `styles/native.css` and `styles/web.css` package exports remain available for separate platform pipelines. The legacy web entry still requires Tailwind processing in its host pipeline.

For a native app root, put `GestureHandlerRootView` outside `SafeAreaProvider`, then render `HeroUIProvider` inside both. A web app can render `HeroUIProvider` directly.

Use the same component tree on all platforms:

```tsx
import {
  Button,
  Description,
  FieldError,
  HeroUIProvider,
  Input,
  Label,
  TextField,
  Typography,
} from '@nh-kng/react-native-heroui';

export function AccountForm() {
  return (
    <HeroUIProvider colorScheme="system">
      <Typography.Heading type="h1">Account</Typography.Heading>
      <TextField isRequired>
        <Label>Email</Label>
        <Input keyboardType="email-address" placeholder="you@example.com" />
        <Description>Use your work address.</Description>
        <FieldError>Enter a valid email address.</FieldError>
      </TextField>
      <Button onPress={(event) => console.log(event)}>
        <Button.Label>Continue</Button.Label>
      </Button>
    </HeroUIProvider>
  );
}
```

For native, the outer roots can be set up like this:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function AppRoot() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AccountForm />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

`HeroUIProvider` defaults to `system`. It asks Uniwind to select the native theme and coordinates the web `light` or `dark` root class with system color-scheme changes. It restores the theme selection and theme classes it found before mounting when it unmounts.

## Shared token customization

Add overrides after the package import in the same `global.css`. Put theme variables inside `@layer theme` and `:root` so Uniwind extracts them for native as well as web, and use the same variable names in both theme variants:

```css
@layer theme {
  :root {
    @variant light {
      --accent: oklch(0.59 0.2 279);
      --accent-foreground: oklch(0.99 0.01 280);
      --focus: var(--accent);
    }
    @variant dark {
      --accent: oklch(0.72 0.16 279);
      --accent-foreground: oklch(0.18 0.03 280);
      --focus: var(--accent);
    }
  }
}
```

These values match the package defaults. Change them to customize the shared brand; utilities such as `bg-accent` and component styles resolve the same semantic tokens. Control the selection through `HeroUIProvider`'s `colorScheme` prop on every platform. Static CSS and JavaScript exports verify compilation, not interactive theme switching.

## Related documentation

- [Components](../api/components.md)
- [Platform support](../guides/platform-support.md)
- [Example app](../../example/README.md)
