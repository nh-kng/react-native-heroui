# Changelog

## Unreleased

- Expanded the Expo gallery with a complete HeroUI React preview inventory, adapted public-adapter examples, visible upstream API limitations, source links, platform notes, and static coverage checks. Added agent rules requiring future component examples to follow their HeroUI documentation pages.
- Refined web TagGroup remove buttons with a compact circular shape, matching vertical and trailing spacing, and subtle hover feedback that follows the selected tag's foreground color.
- Restored web CloseButton defaults, SearchField and InputGroup adornment layout, TextArea field styling, toast foreground colors, and theme-aware scrollbars. Fixed duplicate TagGroup remove buttons and ordinary typography inheriting field description slots.
- Fixed conflicting value/defaultValue DOM props in web TextArea, InputGroup.Input, and InputOTP, retaining leaf defaults and inherited TextField state.
- Paired primary mouse event isolation on web Button and PressableFeedback in Pointer Events browsers to prevent unmatched mouseup events reaching React Native Web; consumer callbacks and the legacy mouse fallback remain available.
- Updated the example's TypeScript development dependency to Expo SDK 57's recommended `~6.0.3`.

- Added the remaining 22 shared component families on web and native: Accordion, Alert, Avatar, Checkbox, CloseButton, InputGroup, InputOTP, Popover, RadioGroup, ScrollShadow, SearchField, Select, Separator, Skeleton, Slider, Spinner, Surface, Switch, Tabs, TagGroup, TextArea, and Toast. Each has conditional root/subpath exports, shared contracts, typed platform options, and a gallery showcase.
- Added provider-scoped `useToast()` with string IDs, show/dismiss/dismissAll operations, and millisecond durations including zero for persistent notifications. Web owns an isolated queue per provider; native reuses its existing host.
- Normalized compound parts, controlled/default selection, string collection identities, field changes, and browser slot styles while retaining pinned source ownership. Added the existing Radix Avatar version as a declared peer for the web implementation. No dependency versions were upgraded.

- Fixed `PressableFeedback.Highlight` flashing on web hover exit by matching ghost Button's transparent-to-default background transition for hover and press.

- Added web hover feedback to `PressableFeedback.Highlight` using the ghost Button hover color, with hover-capable pointer and disabled guards; Scale and Ripple remain press-only.

- Added public cross-platform `PressableFeedback` with Root, Scale, Highlight, and Ripple parts, typed platform props and refs, disabled and animation controls, and a component subpath. Gallery navigation now uses it directly and includes feedback examples. Web uses React Aria button semantics and a centered ripple; native retains HeroUI's touch-origin ripple.

- Restored HeroUI's default accent palette across all stylesheet entries and restored web Button hover/press feedback with disabled-state guards and reduced-motion support.

- Reorganized the Expo example into a responsive gallery for all nine public UI components, with a persistent sidebar, a narrow-screen navigation drawer, live previews, and shared theme controls.
- Fixed brand token declarations so Uniwind extracts the same light and dark accent colors on native and web.
- Added a shared `styles/index.css` Uniwind entry and migrated the Expo example to one global stylesheet for native and web, retaining the existing theme toggle, semantic tokens, and platform stylesheet exports.

- Excluded `editable` and `readOnly` from `Input.nativeProps` so native escape hatches cannot override the shared disabled state.
- Replaced installed HeroUI runtime components and stylesheet imports with owned web/native implementations and one Native-derived semantic token and component CSS system; browser focus and selector behavior remains platform-specific.
- Extracted shared component contracts, added canonical `Button.isLoading` with a deprecated `isPending` alias and consistent native disabled/busy accessibility state, and added `Chip` with shared defaults, colors, sizes, and compound labels.
- Removed HeroUI component peer dependencies, retained framework and optional native integration peers, and added owned-source provenance and verification. The existing public surface plus Chip is migrated; remaining baseline-only component groups are not exported.

- Added pinned HeroUI React 3.2.6 and HeroUI Native 1.0.11 submodules and unchanged owned source baselines with complete file provenance, licenses, component inventory, independent static builds, and stylesheet compilation checks. The unchanged baseline remains the Stage 1 reference.

## 0.1.0 — Initial implementation

- Kept web `Button.Label` text in normal flow so HeroUI buttons size and align around their labels.
- Routed the uncontrolled web gallery field's initial value through `TextField.webProps` to match HeroUI React's field state ownership.
- Initialized the `@nh-kng/react-native-heroui` package as a pnpm workspace library with platform-resolved TypeScript exports.
- Added adapters for HeroUI React on web and HeroUI Native on iOS and Android, including Button, Card, Typography, field components, and HeroUIProvider.
- Added separate native and web CSS entry points with shared brand tokens and an Expo SDK 57 gallery example.
