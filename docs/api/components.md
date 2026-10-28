# Components

Shared contracts wrap locally owned implementations. The original field contexts, React Aria behavior, and native interaction support remain in those implementations.

## `HeroUIProvider`

`HeroUIProvider` accepts `children`, `colorScheme`, and native upstream provider options through `nativeProps`. `colorScheme` accepts `system`, `light`, or `dark` and defaults to `system`. On native it renders the HeroUI Native provider and coordinates Uniwind's theme. On web it coordinates Uniwind and the document root theme class. Cleanup restores the previous adaptive or explicit theme selection and prior light/dark root classes.

## `Button`

`Button` accepts shared `variant`, `size`, `isDisabled`, `isLoading`, `isIconOnly`, `fullWidth`, `className`, `children`, and `onPress` props. `onPress` receives the host event union. `isLoading` blocks activation and marks the button busy; the adapter does not add a spinner. Variants and sizes are limited to values supported by both pinned source baselines.

On web, enabled buttons use variant-specific hover and pressed colors with size-specific press scaling. Reduced-motion preferences disable transitions and press scaling. These browser rules complement the shared styles; native feedback stays in the native implementation.

`isPending` remains a deprecated compatibility alias; either loading prop enables loading. Sizes are `sm`, `md`, and `lg`. Variants are `primary`, `secondary`, `tertiary`, `ghost`, `danger`, `outline`, and `danger-soft`; the last two preserve existing functionality.

Use `Button.Label` for native text content; on web it renders an inline span in normal flow and inherits the shared root size and color so its text contributes to button sizing and alignment without adding a block wrapper. `Button.Background` is available for a decorative background layer and is positioned behind the button contents on both platforms. `Button.Root` aliases the root component. Roots and parts accept typed platform options and forward their upstream refs.

```tsx
<Button isLoading onPress={save}>
  <Button.Label>Save</Button.Label>
</Button>
```

## `PressableFeedback`

`PressableFeedback` provides an unstyled pressable root with built-in scale feedback and optional `Scale`, `Highlight`, and `Ripple` parts. `Root` aliases the component. Shared props are `children`, `className`, `isDisabled`, `onPress`, and `animation`. The root defaults to button semantics on native and renders a React Aria HTML button with `type="button"` on web, including keyboard activation and focus-visible styles. Use text or noninteractive content inside it; do not nest buttons, links, or form controls. Native text belongs in a text component such as `Typography.Paragraph`.

Leave `animation` undefined or `true` for the built-in scale, set it to `false` or `"disabled"` to disable only the root scale, or use `"disable-all"` to disable root and compound feedback together. `Scale`, `Highlight`, and `Ripple` accept `animation={false}` or `animation="disabled"` to disable their own effect. Use `animation={false}` on the root when scaling only a child with `Scale`. Highlight and Ripple are decorative overlays without children; place them before the visible content. The root clips overlays to its shape. No padding, surface, or border radius is supplied by the adapter; apply these through `className`.

Native delegates to the owned HeroUI implementation, including its width-adjusted scale and touch-origin ripple. Web uses a fixed `0.985` scale, a ghost Button color highlight, and a centered radial ripple; the geometry and timing are not identical to native. Enabled roots with a `Highlight` part transition its background between transparent and `--color-default` on press and, for hover-capable pointers, hover. The 100ms ease-out background transition matches ghost Button for both entry and exit, with constant overlay opacity so leaving hover cannot expose a foreground-colored flash. The root's underlying custom background is preserved. Hover activates only Highlight; Scale and Ripple remain press-only. Disabling Highlight or using root `animation="disable-all"` suppresses its hover and press feedback. Browser reduced-motion preferences suppress scaling, ripple expansion, and transitions while retaining immediate highlight feedback. Native animation preferences come from the existing provider and Reanimated implementation; the adapter adds no native hover behavior. These behaviors have static type and stylesheet coverage; runtime interaction, rendering, and accessibility have not been verified.

Roots and parts forward their platform refs: the web root is an `HTMLButtonElement`, web parts are `HTMLSpanElement`s, and native refs come from the owned native components. `onPress` receives `PressableFeedbackPressEvent`, the platform event union. Typed `nativeProps` and `webProps` hold platform-specific options such as accessibility labels, long-press handlers, and DOM attributes. Adapter-owned props and refs are excluded. Native `asChild` and granular animation configuration objects are outside this shared API; animation controls use the shared boolean and disabled values.

```tsx
import { PressableFeedback, Typography } from '@nh-kng/react-native-heroui';

<PressableFeedback className="rounded-xl bg-surface px-4 py-3" onPress={openProject}>
  <PressableFeedback.Highlight />
  <Typography.Paragraph>Open project</Typography.Paragraph>
</PressableFeedback>
```

## `Card`

`Card` exposes `Root`, `Header`, `Body`, `Footer`, `Title`, and `Description` parts. `Card.Body` maps to HeroUI React's `Card.Content` on web and `Card.Body` on native. Other parts preserve the corresponding upstream compound structure and refs.

## `Chip`

`Chip` exposes `Root` and `Label`, with automatic label wrapping for string children. Both platforms default to `size="md"`, `variant="primary"`, and `color="accent"`. Sizes are `sm`, `md`, and `lg`; variants are `primary`, `secondary`, `tertiary`, and `soft`; colors are `accent`, `default`, `success`, `warning`, and `danger`. Native press, animation, and background options stay in `nativeProps`; the browser root is a noninteractive span. Refs target the platform's own root or label.

```tsx
<Chip color="success" variant="soft">
  <Chip.Label>Ready</Chip.Label>
</Chip>
```

## `Typography`

`Typography` exposes `Root`, `Heading`, `Paragraph`, and `Code`. `Typography.Heading` uses `type="h1"` through `"h6"`; these map to HeroUI React heading levels and HeroUI Native heading types. `Typography.Paragraph` accepts `body`, `body-sm`, and `body-xs`, which map to the upstream web sizes and native types. `Typography.Code` delegates to the upstream code component.

## Fields and validation

Use `TextField` as the compound root with `Label`, `Input`, `Description`, and `FieldError`. The wrappers preserve each upstream field context so labels and descriptions remain associated with the input and the error component follows upstream validation visibility rules.

`Input` has shared `value`, `defaultValue`, `onChangeText`, `isDisabled`, `isInvalid`, `placeholder`, `secureTextEntry`, and `keyboardType` props. `keyboardType` maps to the web `inputMode`; `secureTextEntry` maps to password input type. Use `isDisabled` to control editability; `nativeProps` excludes React Native's `editable` and `readOnly` aliases so they cannot override the shared disabled state. Setting `isInvalid={false}` explicitly clears invalid state instead of inheriting it from the field context. The root and platform declarations expose the actual upstream input ref.

For an uncontrolled web field, pass its initial value through `TextField.webProps={{ defaultValue: 'Initial value' }}` because HeroUI React's `TextField` root owns web field state. Native text input values continue to go on `Input`.

## Related documentation

- [Known web press warning](../guides/platform-support.md#known-web-warning)
- [Type conventions](types.md)
- [Quick start](../getting-started/quick-start.md)
- [Platform support](../guides/platform-support.md)
