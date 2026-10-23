# Types

> Status: Stable
> Last reviewed: 2026-10-23

## `HeroUIViewProps`

The props accepted by `HeroUIView`:

```ts
type HeroUIViewProps = {
  style?: StyleProp<ViewStyle>;
};
```

`StyleProp` and `ViewStyle` come from `react-native`. The optional `style` is forwarded to the native view.

## `OnTapEventPayload`

```ts
type OnTapEventPayload = Record<string, never>;
```

This empty payload type is exported for API continuity, but no tap event or callback is currently declared by the JavaScript or native module.

## Related documentation

- [Components](components.md)
- [Platform support](../guides/platform-support.md)
