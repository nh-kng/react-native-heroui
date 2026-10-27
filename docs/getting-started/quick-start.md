# Quick start

Import the stylesheet that matches the platform's CSS pipeline, then compose the adapter components. The stylesheet imports the owned semantic component styles and shared brand tokens.

For Uniwind and Tailwind CSS 4 on native, configure Metro to process the app CSS entry with Uniwind, then import the package stylesheet from that entry point. Install Uniwind, Tailwind CSS 4, `tailwind-merge`, `tailwind-variants`, and the package peers first:

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

module.exports = withUniwindConfig(getDefaultConfig(__dirname), {
  cssEntryFile: './global.native.css',
  dtsFile: './uniwind-types.d.ts',
});
```

Create `global.native.css`:

```css
@import '@nh-kng/react-native-heroui/styles/native.css';

@source './App.tsx';
```

Expo Metro web uses PostCSS to expand Tailwind and the shared component stylesheet. Add `@tailwindcss/postcss` and `postcss` to the app's development dependencies and configure PostCSS at the Expo project root:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

The repository example includes this setup in `example/postcss.config.mjs`. The native CSS entry is processed by the Uniwind Metro plugin configured in `metro.config.js`.

Create a `global.web.css` stylesheet, import it from the web entry point (the example uses `styles.web.ts`, selected by `import './styles'`), and configure PostCSS at the Expo project root as shown above:

```css
@import '@nh-kng/react-native-heroui/styles/web.css';

@source './App.tsx';
```

The web app needs `@tailwindcss/postcss` and `postcss` as development dependencies. For a native app root, put `GestureHandlerRootView` outside `SafeAreaProvider`, then render `HeroUIProvider` inside both. These are upstream React Native infrastructure roots; a web app can render `HeroUIProvider` directly.

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

## Related documentation

- [Components](../api/components.md)
- [Platform support](../guides/platform-support.md)
- [Example app](../../example/README.md)
