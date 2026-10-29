# @nh-kng/react-native-heroui

Source-owned React components based on pinned HeroUI React and Native implementations. The package includes all 31 shared HeroUI component families, PressableFeedback, LoadingText, SegmentedControl, a theme and toast provider, shared contracts, and one semantic styling system for web, iOS, and Android. See the [component API](docs/api/components.md) for the complete surface.

## Install

Install the package and its peer dependencies for the platforms you target. Web implementations use React DOM and React Aria. Native implementations use React Native, Uniwind, and native gesture and animation peers. HeroUI component packages are no longer runtime dependencies.

```sh
pnpm add @nh-kng/react-native-heroui
```

Import the platform stylesheet through the corresponding CSS entry point. See [installation](docs/getting-started/installation.md) and [quick start](docs/getting-started/quick-start.md) for the complete peer dependency and Expo setup.

## Example

```tsx
import {
  Button,
  HeroUIProvider,
  Input,
  TextField,
  Typography,
} from '@nh-kng/react-native-heroui';

export function Screen() {
  return (
    <HeroUIProvider colorScheme="system">
      <TextField>
        <Typography.Heading type="h2">Welcome</Typography.Heading>
        <Input placeholder="Your name" />
      </TextField>
      <Button onPress={(event) => console.log(event)}>
        <Button.Label>Continue</Button.Label>
      </Button>
    </HeroUIProvider>
  );
}
```

`Button`, `Card`, `Chip`, `PressableFeedback`, and `Typography` expose compound parts. `Input`, `TextField`, `Label`, `Description`, and `FieldError` retain the locally owned field context so labels, descriptions, validation, and error visibility remain associated. Component roots and parts accept typed `nativeProps` and `webProps` escape hatches; adapter-owned props cannot be replaced through those options.

## Development

The repository is a pnpm workspace with the library at the root and an Expo SDK 57 consumer under `example/`.

```sh
pnpm install
pnpm run build
pnpm run typecheck
pnpm run lint
pnpm test
```

See the [documentation index](docs/README.md) for the API, styling, platform behavior, and verification scope.
