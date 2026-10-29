# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Added GitHub-style Markdown callouts on web and native, with shared marker detection, custom titles, nested content, Lucide icons, theme-aware Alert presentation, and reusable Callout exports.
- Added LoadingText with shared text, variant, and size props, directional glyph shimmer, pulse and static modes, reduced-motion support, root/subpath exports, typed platform props and refs, documentation, and package-authored gallery examples. Native requires the new `@react-native-masked-view/masked-view` peer (`^0.3.2`); the example pins `0.3.2`.
- Added source-owned Markdown for web and native with typed renderers, math, streaming, safe links, optional sanitized web HTML, theming, code copying, improved native rendering, gallery examples, and migration guidance. Native footnotes and bare-URL autolinking remain unsupported.
- Expanded the Expo gallery with a complete HeroUI React preview inventory, adapted public-adapter examples, visible upstream API limitations, source links, platform notes, and static coverage checks. Added agent rules requiring future component examples to follow their HeroUI documentation pages.
- Added the remaining 22 shared component families on web and native: Accordion, Alert, Avatar, Checkbox, CloseButton, InputGroup, InputOTP, Popover, RadioGroup, ScrollShadow, SearchField, Select, Separator, Skeleton, Slider, Spinner, Surface, Switch, Tabs, TagGroup, TextArea, and Toast. Each has conditional root/subpath exports, shared contracts, typed platform options, and a gallery showcase.
- Added provider-scoped `useToast()` with string IDs, show/dismiss/dismissAll operations, and millisecond durations including zero for persistent notifications. Web owns an isolated queue per provider; native reuses its existing host.
- Added web hover feedback to `PressableFeedback.Highlight` using the ghost Button hover color, with hover-capable pointer and disabled guards; Scale and Ripple remain press-only.
- Added public cross-platform `PressableFeedback` with Root, Scale, Highlight, and Ripple parts, typed platform props and refs, disabled and animation controls, and a component subpath. Gallery navigation now uses it directly and includes feedback examples. Web uses React Aria button semantics and a centered ripple; native retains HeroUI's touch-origin ripple.
- Added a shared `styles/index.css` Uniwind entry and migrated the Expo example to one global stylesheet for native and web, retaining the existing theme toggle, semantic tokens, and platform stylesheet exports.
- Added pinned HeroUI React 3.2.6 and HeroUI Native 1.0.11 submodules and unchanged owned source baselines with complete file provenance, licenses, component inventory, independent static builds, and stylesheet compilation checks. The unchanged baseline remains the Stage 1 reference.

### Changed

- Aligned Markdown blockquote and table corners with the large radius used by code blocks on web and native.
- Enlarged Markdown list bullets and refined read-only task markers with HeroUI field surfaces, rounded corners, and accent checkmarks on web and native.
- Refined web TagGroup remove buttons with a compact circular shape, matching vertical and trailing spacing, and subtle hover feedback that follows the selected tag's foreground color.
- Updated the example's TypeScript development dependency to Expo SDK 57's recommended `~6.0.3`.
- Normalized compound parts, controlled/default selection, string collection identities, field changes, and browser slot styles while retaining pinned source ownership. Added the existing Radix Avatar version as a declared peer for the web implementation. No dependency versions were upgraded.
- Reorganized the Expo example into a responsive gallery for all nine public UI components, with a persistent sidebar, a narrow-screen navigation drawer, live previews, and shared theme controls.
- Replaced installed HeroUI runtime components and stylesheet imports with owned web/native implementations and one Native-derived semantic token and component CSS system; browser focus and selector behavior remains platform-specific.
- Extracted shared component contracts, added canonical `Button.isLoading` and consistent native disabled/busy accessibility state, and added `Chip` with shared defaults, colors, sizes, and compound labels.

### Deprecated

- Deprecated `Button.isPending` in favor of the canonical `Button.isLoading` prop; the alias remains supported.

### Removed

- Removed HeroUI component peer dependencies, retained framework and optional native integration peers, and added owned-source provenance and verification. The existing public surface plus Chip is migrated; remaining baseline-only component groups are not exported.

### Fixed

- Fixed web PressableFeedback overlay positioning and clipping previously gated behind native stylesheet imports. Added distinct configurable hover and pressed overlays, independent Ripple hover feedback, and a pointer-origin ripple with size-aware expansion, independent opacity animations, overlapping rapid taps, minimum press visibility, graceful release and cancellation fades, and reduced-motion support. Native behavior and the compound React API are unchanged.
- Fixed web accent toast icons retaining the default foreground by matching the title's accent color, filling an omission in the pinned React styles.
- Restored the complete pinned HeroUI React CSS and original web slot classes across components, including default browser tokens, animation utilities/keyframes, state styles, accordion expansion, tabs, switches, overlays, toast stacking, and skeleton shimmer. Both web-capable stylesheet entries include these styles; Native component rules are gated out of the browser. `tw-animate-css` is now a shipped dependency.
- Restored web Checkbox background scaling and checkmark drawing transitions, HeroUI React control sizing, secondary styling, and control focus rings, with disabled hover guards and reduced-motion support.
- Restored web CloseButton defaults, SearchField and InputGroup adornment layout, TextArea field styling, toast foreground colors, and theme-aware scrollbars. Fixed duplicate TagGroup remove buttons and ordinary typography inheriting field description slots.
- Fixed conflicting value/defaultValue DOM props in web TextArea, InputGroup.Input, and InputOTP, retaining leaf defaults and inherited TextField state.
- Paired primary mouse event isolation on web Button and PressableFeedback in Pointer Events browsers to prevent unmatched mouseup events reaching React Native Web; consumer callbacks and the legacy mouse fallback remain available.
- Fixed `PressableFeedback.Highlight` flashing on web hover exit by matching ghost Button's transparent-to-default background transition for hover and press.
- Restored HeroUI's default accent palette across all stylesheet entries and restored web Button hover/press feedback with disabled-state guards and reduced-motion support.
- Fixed brand token declarations so Uniwind extracts the same light and dark accent colors on native and web.
- Excluded `editable` and `readOnly` from `Input.nativeProps` so native escape hatches cannot override the shared disabled state.

### Security

## [0.1.0] — Initial implementation

### Added

- Initialized the `@nh-kng/react-native-heroui` package as a pnpm workspace library with platform-resolved TypeScript exports.
- Added adapters for HeroUI React on web and HeroUI Native on iOS and Android, including Button, Card, Typography, field components, and HeroUIProvider.
- Added separate native and web CSS entry points with shared brand tokens and an Expo SDK 57 gallery example.

### Fixed

- Kept web `Button.Label` text in normal flow so HeroUI buttons size and align around their labels.
- Routed the uncontrolled web gallery field's initial value through `TextField.webProps` to match HeroUI React's field state ownership.

[Unreleased]: https://github.com/nh-kng/react-native-heroui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/nh-kng/react-native-heroui/releases/tag/v0.1.0
