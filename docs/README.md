# Documentation

This index covers package setup, the owned public components, styling, platform behavior, and repository checks.

## Getting started

- [Requirements](getting-started/requirements.md) — peer dependency and example baselines.
- [Installation](getting-started/installation.md) — package peers and workspace setup.
- [Quick start](getting-started/quick-start.md) — stylesheet entry points and a first component tree.

## API and platform behavior

- [API overview](api/README.md) — root and component subpath exports.
- [Components](api/components.md) — props, compound parts, field composition, and refs.
- [Types](api/types.md) — shared props and platform escape hatches.
- [Platform support](guides/platform-support.md) — renderers, styles, and verification limits.

## Architecture and development

- [Architecture](architecture/overview.md) — adapter boundaries, package exports, and CSS flow.
- [Architecture decisions](architecture/decisions/README.md) — the original Expo module and workspace decision and the source ownership and shared styling decisions.
- [Stage 2 migration](changes/archive/stage-2-public-surface.md) — owned public surface, canonical contracts, styling changes, and verification limits.
- [Upstream baselines](upstream/README.md) — owned source imports, pinned revisions, licenses, inventory, builds, and controlled synchronization.
- [Development setup](development/setup.md) — workspace commands and repository layout.
- [Testing](development/testing.md) — static checks and prohibited runtime checks.
- [Compatibility](development/compatibility.md) — declared peers and the example's pinned versions.
- [Release](development/release.md) — package-content review and release preparation.
