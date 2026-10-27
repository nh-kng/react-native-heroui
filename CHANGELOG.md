# Changelog

## Unreleased

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
