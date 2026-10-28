# Types

The package exports conventional component prop interfaces such as `PressableFeedbackProps`, `ButtonProps`, `CardProps`, `InputProps`, `TextFieldProps`, `TypographyProps`, and the compound-part interfaces such as `CardBodyProps` and `TypographyHeadingProps`. Each platform declaration exports the same shared direct props and the matching component ref type.

Each component has one shared `*.types.ts` module used by both platform builds; only implementation refs differ. The fixtures assert equality of all public root prop contracts across emitted declarations.

## Shared props

Shared props describe the behavior users can rely on across platforms. Examples include `ButtonProps.isLoading`, `InputProps.onChangeText`, `InputProps.keyboardType`, `TextFieldProps.isInvalid`, and `TypographyHeadingProps.type`. Variant and size values are the supported intersection of the pinned web and native source APIs.

`ButtonPressEvent` is a union of the supported upstream web and native press event types. It preserves the actual host event shape; code that needs a platform-specific event field should narrow the type or use platform-specific files.

## Platform options

Use `nativeProps` for native-only upstream props and `webProps` for web-only upstream props. Each option uses locally owned public component types and omits props owned or mapped by the adapter, including refs. This keeps platform escape hatches from replacing shared behavior.

Component refs use the actual upstream target for that platform. For example, native `InputComponentRef` is the upstream text-input ref and the web ref targets the upstream HTML input. There is no fabricated common imperative handle.

## Related documentation

- [Component API](components.md)
- [API overview](README.md)
- [Compatibility](../development/compatibility.md)
