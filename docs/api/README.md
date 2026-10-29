# API overview

The package supports both a root import and component-specific subpaths. Each path uses conditional exports so Metro resolves the native adapter on iOS and Android and the browser adapter on web.

| Export | Root import | Component subpath |
| --- | --- | --- |
| `Button` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/button` |
| `PressableFeedback` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/pressable-feedback` |
| `Chip` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/chip` |
| `Card` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/card` |
| `Markdown` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/markdown` |
| `Typography` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/typography` |
| `Input` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/input` |
| `TextField` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/text-field` |
| `Label` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/label` |
| `Description` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/description` |
| `FieldError` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/field-error` |
| `HeroUIProvider` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/hero-ui-provider` |
| `Accordion` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/accordion` |
| `Alert` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/alert` |
| `Avatar` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/avatar` |
| `Checkbox` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/checkbox` |
| `CloseButton` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/close-button` |
| `InputGroup` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/input-group` |
| `InputOTP` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/input-otp` |
| `Popover` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/popover` |
| `RadioGroup` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/radio-group` |
| `ScrollShadow` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/scroll-shadow` |
| `SearchField` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/search-field` |
| `Select` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/select` |
| `Separator` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/separator` |
| `LoadingText` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/loading-text` |
| `Skeleton` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/skeleton` |
| `Slider` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/slider` |
| `Spinner` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/spinner` |
| `Surface` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/surface` |
| `Switch` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/switch` |
| `SegmentedControl` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/segmented-control` |
| `Tabs` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/tabs` |
| `TagGroup` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/tag-group` |
| `TextArea` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/text-area` |
| `Toast` | `@nh-kng/react-native-heroui` | `@nh-kng/react-native-heroui/toast` |

The shared Uniwind style entry is `@nh-kng/react-native-heroui/styles/index.css`; see [quick start](../getting-started/quick-start.md). The existing platform entries remain available as `@nh-kng/react-native-heroui/styles/native.css` and `@nh-kng/react-native-heroui/styles/web.css`.

`useToast` is exported from the root and `/toast`.

Every rendered component root and compound part exposes platform-specific `nativeProps` and `webProps` options typed from the corresponding locally owned component. These options are ignored on the inactive platform. Adapter-owned values such as `isLoading`, `isPending`, `isInvalid`, mapped input props, children, class names, and refs cannot be overridden through an escape hatch.

- [Component API](components.md)
- [Markdown](markdown.md) — themed typography, rich content, slots, copying, and extension hooks.
- [Type conventions](types.md)
- [Platform support](../guides/platform-support.md)

See [SegmentedControl](segmented-control.md) for its single-selection API, compound parts, and automatic indicator.
