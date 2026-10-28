# Platform support

The package ships JavaScript adapters and CSS for web, iOS, and Android. It does not register a native module and does not contain Swift or Kotlin code.

| Platform | Implementation | Package styling | Static verification |
| --- | --- | --- | --- |
| Web | Owned React Aria components | Uniwind, Tailwind CSS 4, and `styles/index.css` | Web TypeScript fixture and Expo JavaScript export. |
| iOS | Owned React Native components | Uniwind, Tailwind CSS 4, and `styles/index.css` | Native TypeScript fixture and Expo JavaScript export. |
| Android | Owned React Native components | Uniwind, Tailwind CSS 4, and `styles/index.css` | Native TypeScript fixture and Expo JavaScript export. |

Expo SDK 57 and React Native 0.86.3 are the example's pinned baseline. The package does not require a custom development client or package-specific autolinking. Native exports only verify JavaScript bundling; they do not compile Swift/Kotlin, build the host app, or verify rendering and accessibility. Web exports do not verify browser rendering or interaction.

The web provider coordinates the DOM theme classes with Uniwind and follows the system color-scheme media query when `colorScheme="system"`. Native theme selection is delegated to Uniwind. Field association, visibility, disabled state, and validation behavior remain implemented by the locally owned component contexts.

## Known web warning

Pressing `Button` or `PressableFeedback` in a React Native Web app can log `Cannot record touch end without a touch start`, followed by `Touch End` with `identifier: 0` and `Touch Bank: []`. You can ignore this specific warning when press behavior works normally; no application workaround is required for the warning alone.

With the example's React Native Web 0.21.4 and React Aria 3.52.1 dependencies, React Aria stops `mousedown` propagation while `mouseup` can still reach React Native Web's document listener. React Native Web represents mouse input as touch identifier `0`, so it reports a release without a recorded start. This explanation is based on the installed source; browser interaction has not been verified. The warning alone does not establish that a press failed; investigate separately if activation or feedback does not work.

React Aria's documented [`continuePropagation()` method](https://react-aria.adobe.com/usePress#methods) does not resolve this mouse-event mismatch in browsers with Pointer Events because the separate `mousedown` handler still stops propagation. The package retains the existing event behavior and does not suppress console warnings.

## Related documentation

- [Requirements](../getting-started/requirements.md)
- [Architecture](../architecture/overview.md)
- [Testing](../development/testing.md)
