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

Native delegates to the owned HeroUI implementation, including its width-adjusted scale and touch-origin ripple. Web uses a fixed `0.985` scale and feedback inspired by [HeroUI Pro Pressable Feedback](https://heroui.pro/docs/react/components/pressable-feedback). Mount `Highlight` for a full-surface `currentColor` overlay: hover-capable pointers use 0.08 opacity and press uses 0.12, taking precedence over hover. Mount `Ripple` for its own hover overlay and a circular press surface expanding from the pointer position to the farthest corner; keyboard and virtual activation start at the center. Web Animations API independently expands each ripple over a size-aware 250–550ms duration and fades it in over 90ms. Expansion continues through release without restarting; a fully expanded ripple stays visible while held. Quick taps wait only until 120ms from press start before a 220ms exit fade; longer presses fade immediately on release. Rapid taps overlap with independent lifecycles, and pointer exit or cancellation uses a shorter 100ms fade. Completion removes the surface; disablement, unmounting, or a reduced-motion preference change clears animations and pending interaction timers. Browsers without the Web Animations API retain full-size opacity feedback with a timed exit. Feedback stays above the root background and behind content, so opaque child backgrounds can cover it. Use contrasting foreground and surface colors. Scale remains press-only. Disabling a part suppresses its hover and press effects; root `animation="disable-all"` suppresses all feedback. Browser reduced-motion preferences suppress scaling, ripple expansion, and fades while retaining immediate hover/press feedback; reduced-motion ripples are removed immediately on release or cancellation. Native animation preferences come from the existing provider and Reanimated implementation; the adapter adds no native hover behavior. These behaviors have non-rendering logic, type, and stylesheet coverage; runtime interaction, rendering, and accessibility have not been verified.

Web feedback exposes the following CSS variables on the root or respective part through styles applied with `className`. Timing overrides must use nonnegative literal `ms` or `s` values; unsupported JavaScript timing values fall back to their defaults. No additional React props are required.

| CSS variable | Default | Purpose |
| --- | --- | --- |
| `--pressable-feedback-highlight-color` | `currentColor` | Highlight overlay color |
| `--pressable-feedback-highlight-opacity` | `0.08` | Highlight hover opacity |
| `--pressable-feedback-highlight-pressed-opacity` | `0.12` | Highlight pressed opacity |
| `--pressable-feedback-ripple-color` | `currentColor` | Ripple hover and press color |
| `--pressable-feedback-ripple-hover-opacity` | `0.08` | Ripple hover opacity |
| `--pressable-feedback-ripple-pressed-opacity` | `0.12` | Ripple press opacity |
| `--pressable-feedback-ripple-duration` | Size-aware | Explicit expansion duration override; takes precedence over calculated timing |
| `--pressable-feedback-ripple-base-duration` | `350ms` | Expansion duration at a 100px radius, scaled by the square root of radius / 100 |
| `--pressable-feedback-ripple-min-duration` | `250ms` | Lower bound for calculated expansion duration |
| `--pressable-feedback-ripple-max-duration` | `550ms` | Upper bound for calculated expansion duration |
| `--pressable-feedback-ripple-easing` | `cubic-bezier(0.2, 0, 0, 1)` | Expansion easing |
| `--pressable-feedback-ripple-enter-duration` | `90ms` | Opacity fade-in duration |
| `--pressable-feedback-ripple-minimum-press-duration` | `120ms` | Minimum time from press start before release fade starts |
| `--pressable-feedback-ripple-release-duration` | `220ms` | Release fade duration |
| `--pressable-feedback-ripple-cancel-duration` | `100ms` | Cancellation fade duration |

Roots and parts forward their platform refs: the web root is an `HTMLButtonElement`, web parts are `HTMLSpanElement`s, and native refs come from the owned native components. `onPress` receives `PressableFeedbackPressEvent`, the platform event union. Typed `nativeProps` and `webProps` hold platform-specific options such as accessibility labels, long-press handlers, and DOM attributes. Adapter-owned props and refs are excluded. Native `asChild` and granular animation configuration objects are outside this shared API; animation controls use the shared boolean and disabled values.

```tsx
import { PressableFeedback, Typography } from '@nh-kng/react-native-heroui';

<PressableFeedback className="rounded-xl bg-surface px-4 py-3" onPress={openProject}>
  <PressableFeedback.Highlight />
  <Typography.Paragraph>Open project</Typography.Paragraph>
</PressableFeedback>;
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

## Shared display components

All the families below are exported from the root and their kebab-case subpaths. Rendered roots alias themselves as `.Root`. New component contracts use the same `children`, `className`, `nativeProps`, and `webProps` conventions as the existing adapters; leaf components omit children where they do not render content. Shared state props cannot be overridden through platform options.

| Component | Shared options | Compound parts |
| --- | --- | --- |
| `Surface` | `variant`: default, secondary, tertiary, transparent | Root |
| `Separator` | `orientation`: horizontal or vertical | Root |
| `Spinner` | `size`: sm, md, lg; `color`: accent, success, warning, danger; `isLoading` | Root |
| `LoadingText` | `text`; `variant`: shimmer, pulse, none; `size`: sm, md, lg | Root |
| `Skeleton` | `isLoading`, default true; children appear when false | Root |
| `Avatar` | `size`: sm, md, lg; `color`: default, accent, success, warning, danger | Root, Image, Fallback |
| `Alert` | `status`: default, accent, success, warning, danger | Root, Indicator, Content, Title, Description |
| `CloseButton` | `isDisabled`, `onPress` | Root |

Avatar defaults to medium/accent; Image requires a `src` URI and `alt` text, mapped to native `source` and `accessibilityLabel`. Use Fallback for initials or an image failure. Spinner's accent maps to the native upstream default color. Spinner defaults to medium/accent and returns no content when `isLoading={false}`. Skeleton has no native ref because the pinned native implementation does not forward one. Platform animation and additional upstream visual options remain in the typed platform props.

## `LoadingText`

`LoadingText` is a package-authored loading status for short single-line labels, inspired by Skeleton's shimmer and pulse. It is exported from the root and `/loading-text`; `LoadingText.Root` aliases the component. The text stays visible over a transparent background, with no rectangular placeholder.

| Prop | Values | Default |
| --- | --- | --- |
| `text` | String | `"Thinking"` |
| `variant` | `shimmer`, `pulse`, `none` | `shimmer` |
| `size` | `sm`, `md`, `lg` | `sm` |
| `className` | Text typography classes | — |
| `webProps` | Typed span attributes, excluding owned props and refs | — |
| `nativeProps` | Typed View props, excluding owned props and refs | — |

Sizes use regular-weight 14/20px, 16/24px, and 18/28px typography respectively. `className` customizes text typography, including font family and size; semantic animation colors are owned by the component. Use `nativeProps.style` for native root layout. `LoadingTextRef` is an `HTMLSpanElement` on web and a React Native `View` on native. No common imperative handle is introduced.

Shimmer uses muted text with a broad foreground highlight, repeating every two seconds with linear timing in the reading direction. Web clips a CSS gradient to text, falling back to static muted text when text clipping is unavailable. Native uses normal text with a static glyph mask and a moving SVG highlight, preserving provider text configuration and font scaling. Pulse gently fades the whole foreground label over a two-second cycle. `none` renders static muted text. System reduced motion disables both effects; native also follows the existing provider and inherited animation-disable settings. Web reacts to preference changes through its media query. Native uses the initial system preference through the existing Reanimated provider, matching Skeleton; changing that preference requires restarting the app to update Reanimated's cached value. The provider's native configuration is ignored on web, as with other platform options.

The native implementation requires the `@react-native-masked-view/masked-view` peer; the example pins `0.3.2`. Follow [installation](../getting-started/installation.md) and rebuild a native host when adding a native dependency. The text mask stays static while the gradient contents move, so Android uses the library's default hardware rendering mode. Expo documents MaskedView Android support as experimental; see the [Expo MaskedView reference](https://docs.expo.dev/versions/v57.0.0/sdk/masked-view/).

Only string labels are supported. Line breaks become spaces and long labels truncate to one line. Empty text stays empty and does not animate. Rich children and multiline content are outside this API. Render or unmount the component with your application's loading state; `variant="none"` changes the effect without hiding the label.

Web defaults to `role="status"` with polite, atomic live-region semantics. Native exposes one accessible text label on its root with a polite live region where supported; visual text and mask copies are hidden from accessibility. Platform options can customize the accessible name. Native live-region announcements depend on the platform and assistive technology. Animation rendering, native compilation, and screen-reader behavior have not been runtime-verified.

```tsx
import { LoadingText } from '@nh-kng/react-native-heroui';

<LoadingText text="Thinking" variant="shimmer" size="sm" />;
<LoadingText text="Generating response" variant="pulse" />;
<LoadingText text="Waiting for input" variant="none" />;
```

## Selection controls

Checkbox and Switch expose `isSelected`, `defaultSelected`, `onSelectedChange(boolean)`, and `isDisabled`. Checkbox also supports `isInvalid`. Both support uncontrolled defaults through adapter state; a supplied `isSelected` controls the value. Checkbox exposes Indicator and Switch exposes Thumb; the web adapters supply the additional upstream clickable content/control wrappers. Give standalone controls accessible names through their platform options.

RadioGroup exposes string `value`, `defaultValue`, `onValueChange(string)`, `isDisabled`, and `isInvalid`. Its Item requires a string `value` and accepts `isDisabled`. String item children use the native upstream label/indicator composition; web supplies its upstream Radio content/control/indicator structure. Native layout and browser field-only options remain platform-specific.

```tsx
<Checkbox isSelected={enabled} onSelectedChange={setEnabled} webProps={{ 'aria-label': 'Updates' }} nativeProps={{ accessibilityLabel: 'Updates' }}>
  <Checkbox.Indicator />
</Checkbox>
<Switch defaultSelected webProps={{ 'aria-label': 'Notifications' }} nativeProps={{ accessibilityLabel: 'Notifications' }}>
  <Switch.Thumb />
</Switch>
```

## Additional fields

TextArea and InputGroup.Input share string `value`, `defaultValue`, `onChangeText`, `placeholder`, `isDisabled`, and `isInvalid`. Browser change events map to strings, while native retains its text-input callback. On web, a supplied leaf defaultValue initializes adapter state and is forwarded as a value without a DOM defaultValue; omitting both value props preserves the surrounding TextField context. Compose them inside TextField with Label, Description, and FieldError to retain field associations and validation. Native `editable` and `readOnly` and browser `disabled` cannot override the shared disabled state.

InputGroup exposes Root, Input, Prefix, and Suffix. Root accepts `isDisabled`; invalid state belongs to the surrounding TextField and Input. Prefix/Suffix accept content, such as currency symbols. The web implementation preserves both its internal focus ref and the forwarded root ref.

SearchField owns string `value`, `defaultValue`, and `onChangeText` plus `isDisabled` and `isInvalid`. Its Group, SearchIcon, Input, and ClearButton retain the upstream field context. Put the placeholder on SearchField.Input. Input cannot replace the root value/change handler, and ClearButton keeps its upstream clear action.

InputOTP requires `maxLength` and supports string `value`, `defaultValue`, `onChangeText`, `onComplete`, `pattern`, `isDisabled`, and `isInvalid`. Its web adapter consumes defaultValue in its own state so the hidden input receives a controlled value without a DOM defaultValue. It exposes Group, Slot, and Separator. Each Slot requires a zero-based index; render one slot per position. The adapter retains the actual native OTP handle and browser input ref instead of exposing a fabricated shared handle.

```tsx
<InputOTP maxLength={4} value={code} onChangeText={setCode}>
  <InputOTP.Group>
    {[0, 1, 2, 3].map((index) => (
      <InputOTP.Slot key={index} index={index} />
    ))}
  </InputOTP.Group>
</InputOTP>
```

## Collections and sliders

| Component | State contract | Compound composition |
| --- | --- | --- |
| `Accordion` | `expandedKeys`/`defaultExpandedKeys`: ReadonlySet of strings; `onExpandedChange(Set<string>)`; `selectionMode`: single (default) or multiple; `isDisabled` | Item with string `value` and optional `isDisabled`, Trigger, Indicator, Content |
| `Tabs` | string `value`/`defaultValue`, `onValueChange(string)` | List, Tab with string `value` and optional `isDisabled`, Indicator, Panel with matching string `value` |
| `TagGroup` | `selectionMode`: none, single, multiple; string `selectedKeys`/`defaultSelectedKeys`, `onSelectionChange`, `disabledKeys`, `onRemove` | List, Item with string `id` and required `textValue`, Label, RemoveButton |
| `Slider` | numeric or numeric-array `value`/`defaultValue`; `onChange`/`onChangeEnd`; `minValue`, `maxValue`, `step`, `orientation`, `isDisabled` | Output, Track, Fill, Thumb with zero-based `index` |

In single mode Accordion uses the first key when supplied multiple expanded keys on either platform. Accordion maps Content to the web Panel/Body structure and inserts the web heading around Trigger. Tabs maps native Trigger/Content to Tab/Panel. Give Tabs a `value` or `defaultValue` to choose the initial tab. A List-level Indicator marker configures the web indicators inside each tab and the native list indicator; List supplies default indicators if omitted. Root selection and part values stay associated through upstream contexts.

TagGroup normalizes the separate web Tag family into Item. Use stable string identities; removal callbacks receive sets of strings and the application removes those entries from its state. Web remove buttons are compact and transparent at rest, with matching vertical and trailing spacing and hover feedback tinted by the tag's foreground color. Slider defaults to 0–100, step 1, horizontal; render one Thumb per value in a range. Shared Output children are React nodes; format state in your own text components when needed. Platform formatting and render callbacks remain platform options where exposed.

## Popover and Select

Popover exposes `isOpen`, `defaultOpen`, and `onOpenChange`. Trigger requires a single pressable React element, such as Button. Content supplies the native Portal/Overlay and the web Dialog wrapper; Arrow is available inside Content. The native root forwards its view ref; the web root coordinates context and has no ref. Use Trigger or Content refs on web. Native presentation options must agree between Root and Content; default presentation is `popover`.

Select exposes required `items: readonly { value: string; label: string; isDisabled?: boolean }[]`, string `value`/`defaultValue`, `onValueChange(string | undefined)`, `isDisabled`, and `isOpen`/`defaultOpen`/`onOpenChange`. Values must identify items in that list. Omit `value` for uncontrolled usage; explicitly passing `value={undefined}` represents a controlled empty selection. An owned native controllable-state adaptation preserves that distinction. Shared Select supports single selection; multiple selection is excluded from its platform escape hatches.

Select exposes Trigger, Value, Content, and Item. Value accepts a placeholder (default `Select an option`); Item requires `value` and `label` and accepts `isDisabled`. Content supplies the web ListBox and native Portal/Overlay. Native selection objects are resolved through `items`; web disabled keys come from the same list. Native invalid-field presentation is not a shared root prop because the pinned native Select has no invalid-state API; browser-only validation remains in webProps. Native presentation overrides belong in matching root/content nativeProps.

## ScrollShadow

ScrollShadow exposes `orientation` (vertical by default), `size` (40), and `isEnabled` (true). It requires one React element child. Native expects a scrollable child such as ScrollView and supplies a gradient through the existing SVG peer; `nativeProps.LinearGradientComponent` can override it. On web the ScrollShadow root is the scroll container, so its child must allow content to grow instead of creating a separate scrolling viewport. Constrain root height or width through className. These differences are illustrated in the [gallery example](../../example/gallery/examples/scroll-shadow.tsx).

## Toast notifications

HeroUIProvider owns one toast host per platform. Use the shared hook for notifications:

```tsx
const toast = useToast();
const id = toast.show({
  title: 'Saved',
  description: 'Your draft is ready.',
  variant: 'success',
  duration: 4000,
});
toast.dismiss(id);
toast.dismissAll();
```

`show` returns a string ID. Variant values are default, accent, success, warning, and danger. Duration is in milliseconds, defaults to 4000, and zero keeps a notification open until dismissal. Native maps that zero to its upstream persistent duration. Web creates a queue for each provider instead of using the upstream singleton; unmounting the host releases queue timers and subscriptions. Native reuses the existing provider's host. The hook throws outside an enabled HeroUIProvider; a disabled native toast configuration retains its existing behavior.

Toast also exposes Root, Title, Description, Action, and Close for platform custom renderers. These parts retain upstream lifecycle contexts and actual refs. Root requires the lifecycle object supplied through `nativeProps` or `webProps` by the respective platform toast renderer; it is not an independently mounted notification. Use `useToast().show` for shared application code. Web maps Action/Close to ActionButton/CloseButton. Queue mechanics, stack geometry, swipe behavior, and animation timing remain platform-specific.

The [Expo gallery](../../example/gallery/navigation.tsx) includes each public UI family. Static checks cover types, exports, mappings, provenance, and stylesheet selectors; the new components have not undergone runtime interaction or accessibility verification.

## Related documentation

- [Web input defaults and mouse events](../guides/platform-support.md#web-input-defaults-and-mouse-events)
- [Type conventions](types.md)
- [Quick start](../getting-started/quick-start.md)
- [Platform support](../guides/platform-support.md)
