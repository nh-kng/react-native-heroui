# Platform support

The package ships JavaScript adapters and CSS for web, iOS, and Android. It does not register a native module and does not contain Swift or Kotlin code.

| Platform | Implementation | Package styling | Static verification |
| --- | --- | --- | --- |
| Web | Owned React Aria components | Uniwind, Tailwind CSS 4, and `styles/index.css` | Web TypeScript fixture and Expo JavaScript export. |
| iOS | Owned React Native components | Uniwind, Tailwind CSS 4, and `styles/index.css` | Native TypeScript fixture and Expo JavaScript export. |
| Android | Owned React Native components | Uniwind, Tailwind CSS 4, and `styles/index.css` | Native TypeScript fixture and Expo JavaScript export. |

Expo SDK 57 and React Native 0.86.3 are the example's pinned baseline. The package does not require a custom development client or package-specific autolinking. Native exports only verify JavaScript bundling; they do not compile Swift/Kotlin, build the host app, or verify rendering and accessibility. Web exports do not verify browser rendering or interaction.

The web provider coordinates the DOM theme classes with Uniwind and follows the system color-scheme media query when `colorScheme="system"`. Native theme selection is delegated to Uniwind. Field association, visibility, disabled state, and validation behavior remain implemented by the locally owned component contexts.

Both web-capable stylesheet entries load the complete owned HeroUI React 3.2.6 CSS through `styles/web-only.css`, including the default browser theme, component state styles, transitions, and `tw-animate-css`. Web components emit the original React slot classes; Native component CSS is gated out of the browser. Browser controls follow the root light/dark color scheme. ScrollShadow uses a thin themed scrollbar; apply `className="heroui-scrollbar"` to other web scroll containers, as the gallery does for its React Native Web ScrollViews. Native scrollbar behavior is unchanged.

Web styling retains upstream accordion height transitions, tab selection movement, switch thumb transitions, popover/select entry and exit, toast stacking, checkbox drawing, and distinct skeleton shimmer/pulse animations. Both stylesheet entries include their required easing tokens, utilities, and keyframes without an extra consumer import. Upstream reduced-motion variants support system preferences and `data-reduce-motion`. Static compilation and source parity checks cover these rules; browser animation timing and appearance remain unverified.

Web TagGroup recognizes the public RemoveButton compound part, including inside fragments, and retains the automatic remove button when none is supplied. Ordinary Typography clears the inherited React Aria text context so incidental text inside a field does not inherit its description/error association; use Description and FieldError for associated field messages, or set an explicit `webProps.slot` when needed.

## Shared component coverage

The public surface covers the 31 families listed in the [component API](../api/components.md), plus PressableFeedback and HeroUIProvider. Implementations are copied from the pinned React 3.2.6 and Native 1.0.11 baselines; installed HeroUI packages remain development dependencies. Same-name coverage describes API availability, not identical rendering, accessibility, or animation geometry.

The expanded surface is checked through package builds, native/web TypeScript consumers, example checks under both export conditions, stylesheet compilation, non-rendering unit tests, and Expo config inspection. Focused Chromium checks in light and dark themes cover CloseButton, SearchField, InputGroup, TextArea, TagGroup, and Toast, including field adornment geometry, search clearing, tag removal, and theme colors. Other browser engines, full accessibility audits, native rendering, and native compilation remain unverified.

Web Avatar uses the declared `@radix-ui/react-avatar` peer. Native ScrollShadow uses the existing react-native-svg peer for its default gradient. Bottom-sheet presentation remains a native-only option requiring the existing optional `@gorhom/bottom-sheet` peer; Popover and Select default to popovers. Native optional screens and blur behavior remains upstream-owned.

HeroUIProvider now supplies the shared toast manager. Setting `nativeProps.config.toast` to false or `"disabled"` disables the native host; `useToast` requires an enabled provider. Web queues are scoped to their provider and cleaned up when it unmounts.

## Web input defaults and mouse events

TextArea and InputGroup.Input consume a shared defaultValue in adapter state when supplied, forwarding a controlled value without a DOM defaultValue. When neither value nor defaultValue is supplied, they retain their surrounding TextField's value context. InputOTP also consumes defaultValue before passing a controlled value to input-otp, whose hidden DOM input is internally controlled. This prevents the value/defaultValue conflicts reported from the example's disabled fields.

React Aria stops primary mousedown propagation in browsers with Pointer Events while React Native Web observes mouse events at the document. Button and PressableFeedback isolate both primary mousedown and mouseup at their DOM roots in those browsers so the React Native Web responder does not receive an unmatched mouseup. Custom webProps mouse callbacks still run; pointer, press, keyboard, and nonprimary mouse handling remain delegated to their existing implementations. Browsers without Pointer Events retain document mouse handling because React Aria uses that path for its fallback press lifecycle. The adapter does not suppress console output or patch global listeners. These mappings have non-rendering coverage; browser interaction remains unverified.

## Related documentation

- [Requirements](../getting-started/requirements.md)
- [Architecture](../architecture/overview.md)
- [Testing](../development/testing.md)
