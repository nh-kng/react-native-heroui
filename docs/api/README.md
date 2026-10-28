# API overview

The package supports both a root import and component-specific subpaths. Each path uses conditional exports so Metro resolves the native adapter on iOS and Android and the browser adapter on web.

| Export | Root import | Component subpath |
| --- | --- | --- |
| `Button` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/button` |
| `PressableFeedback` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/pressable-feedback` |
| `Chip` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/chip` |
| `Card` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/card` |
| `Typography` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/typography` |
| `Input` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/input` |
| `TextField` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/text-field` |
| `Label` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/label` |
| `Description` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/description` |
| `FieldError` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/field-error` |
| `HeroUIProvider` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/hero-ui-provider` |

The shared Uniwind style entry is `@nh-kng/react-native-heroui/styles/index.css`; see [quick start](../getting-started/quick-start.md). The existing platform entries remain available as `@nh-kng/react-native-heroui/styles/native.css` and `@nh-kng/react-native-heroui/styles/web.css`.

Every component root and compound part exposes platform-specific `nativeProps` and `webProps` options typed from the corresponding locally owned component. These options are ignored on the inactive platform. Adapter-owned values such as `isLoading`, `isPending`, `isInvalid`, mapped input props, children, class names, and refs cannot be overridden through an escape hatch.

- [Component API](components.md)
- [Type conventions](types.md)
- [Platform support](../guides/platform-support.md)
