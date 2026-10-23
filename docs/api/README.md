# API reference

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

The public API is intentionally small while the native module is being initialized.

## Exports

| Export              | Import                        | Purpose                                                                        |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| `HeroUIView`        | `@nh-kng/react-native-heroui` | Native view component.                                                         |
| `HeroUIViewProps`   | `@nh-kng/react-native-heroui` | Props accepted by the view.                                                    |
| `OnTapEventPayload` | `@nh-kng/react-native-heroui` | Empty payload type reserved for a future tap event; no event is emitted today. |
| default export      | `@nh-kng/react-native-heroui` | Native module handle with no public methods or properties today.               |

- [Components](components.md)
- [Types](types.md)

There are no public hooks or utility functions in this release.

## Platform compatibility

`HeroUIView` is usable only on native platforms with a development build. The module default export also resolves through a web adapter for bundling, but the view itself is unavailable on web.
