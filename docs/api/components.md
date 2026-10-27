# Components

Shared contracts wrap locally owned implementations. The original field contexts, React Aria behavior, and native interaction support remain in those implementations.

## `HeroUIProvider`

`HeroUIProvider` accepts `children`, `colorScheme`, and native upstream provider options through `nativeProps`. `colorScheme` accepts `system`, `light`, or `dark` and defaults to `system`. On native it renders the HeroUI Native provider and coordinates Uniwind's theme. On web it coordinates Uniwind and the document root theme class. Cleanup restores the previous adaptive or explicit theme selection and prior light/dark root classes.

## `Button`

`Button` accepts shared `variant`, `size`, `isDisabled`, `isLoading`, `isIconOnly`, `fullWidth`, `className`, `children`, and `onPress` props. `onPress` receives the host event union. `isLoading` blocks activation and marks the button busy; the adapter does not add a spinner. Variants and sizes are limited to values supported by both pinned source baselines.

`isPending` remains a deprecated compatibility alias; either loading prop enables loading. Sizes are `sm`, `md`, and `lg`. Variants are `primary`, `secondary`, `tertiary`, `ghost`, `danger`, `outline`, and `danger-soft`; the last two preserve existing functionality.

Use `Button.Label` for native text content; on web it renders an inline span in normal flow and inherits the shared root size and color so its text contributes to button sizing and alignment without adding a block wrapper. `Button.Background` is available for a decorative background layer and is positioned behind the button contents on both platforms. `Button.Root` aliases the root component. Roots and parts accept typed platform options and forward their upstream refs.

```tsx
<Button isLoading onPress={save}>
  <Button.Label>Save</Button.Label>
</Button>
```

## `Card`

`Card` exposes `Root`, `Header`, `Body`, `Footer`, `Title`, and `Description` parts. `Card.Body` maps to HeroUI React's `Card.Content` on web and `Card.Body` on native. Other parts preserve the corresponding upstream compound structure and refs.

## `Chip`

`Chip` exposes `Root` and `Label`, with automatic label wrapping for string children. Both platforms default to `size="md"`, `variant="primary"`, and `color="accent"`. Sizes are `sm`, `md`, and `lg`; variants are `primary`, `secondary`, `tertiary`, and `soft`; colors are `accent`, `default`, `success`, `warning`, and `danger`. Native press, animation, and background options stay in `nativeProps`; the browser root is a noninteractive span. Refs target the platform's own root or label.

```tsx
<Chip color="success" variant="soft"><Chip.Label>Ready</Chip.Label></Chip>
```

## `Typography`

`Typography` exposes `Root`, `Heading`, `Paragraph`, and `Code`. `Typography.Heading` uses `type="h1"` through `"h6"`; these map to HeroUI React heading levels and HeroUI Native heading types. `Typography.Paragraph` accepts `body`, `body-sm`, and `body-xs`, which map to the upstream web sizes and native types. `Typography.Code` delegates to the upstream code component.

## Fields and validation

Use `TextField` as the compound root with `Label`, `Input`, `Description`, and `FieldError`. The wrappers preserve each upstream field context so labels and descriptions remain associated with the input and the error component follows upstream validation visibility rules.

`Input` has shared `value`, `defaultValue`, `onChangeText`, `isDisabled`, `isInvalid`, `placeholder`, `secureTextEntry`, and `keyboardType` props. `keyboardType` maps to the web `inputMode`; `secureTextEntry` maps to password input type. Setting `isInvalid={false}` explicitly clears invalid state instead of inheriting it from the field context. The root and platform declarations expose the actual upstream input ref.

For an uncontrolled web field, pass its initial value through `TextField.webProps={{ defaultValue: 'Initial value' }}` because HeroUI React's `TextField` root owns web field state. Native text input values continue to go on `Input`.

## Related documentation

- [Type conventions](types.md)
- [Quick start](../getting-started/quick-start.md)
- [Platform support](../guides/platform-support.md)
