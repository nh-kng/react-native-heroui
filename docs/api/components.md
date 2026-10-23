# Components

> Status: Stable
> Last reviewed: 2026-10-23

## `HeroUIView`

Renders the current native HeroUI sample view through Expo Modules API.

### Import

```tsx
import { HeroUIView } from '@nh-kng/react-native-heroui';
```

### Signature

```ts
function HeroUIView(props: HeroUIViewProps): React.JSX.Element;
```

### Props

| Prop    | Type                   | Required | Default | Behavior                      |
| ------- | ---------------------- | -------- | ------- | ----------------------------- |
| `style` | `StyleProp<ViewStyle>` | No       | None    | Forwarded to the native view. |

The component has no callbacks, controlled state, accessibility-specific props, or configuration options. Add standard view behavior at the consuming screen boundary while the native API remains a minimal sample.

### Usage

```tsx
<HeroUIView style={{ height: 200, width: '100%' }} />
```

### Platform compatibility

The component uses the iOS, tvOS, or Android native view registered under `HeroUI`. Rendering on web throws an error because `HeroUIView.web.tsx` is an explicit unavailable stub. A development build is required; Expo Go does not contain the module.

### Limitations

The view currently displays a static platform-native label and background. The native runtime has not been verified by this repository-only check suite. See [platform support](../guides/platform-support.md).
