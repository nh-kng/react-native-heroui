# Markdown upstream provenance

Markdown is a package-owned component with platform facades over converted react-markdown and react-native-markdown-display sources. GFM, math, raw parsing and sanitizer plugin entries are independently sourced. Exact pins, immutable file hashes, licenses, dependencies and exclusions are in [the Markdown baseline manifest](../../../docs/upstream/markdown-source-map.json); per-file transformations and authored integrations are in [the owned manifest](../../../docs/upstream/markdown-owned-source-map.json).

API transformations: required string children, typed synchronous code/math/Mermaid hooks, root-only platform props, shared link cancellation, optional streaming metadata, and no refs or arbitrary plugin/rule/renderer maps. Async upstream rendering APIs are intentionally not exposed.

Behavior deviations: safe shared URL policy, raw HTML literal by default with fixed sanitized web opt-in, native markdown-it 14.3.3, local React Native Image support, deterministic structural keys separate from revisions, explicit completion detection, balanced native inline groups and block-image nesting, and preserved ordered starts. Raw HTML/CSS conversion, legacy fit-image/PropTypes services and random global keys are removed. Known native task-list, footnote and richer application/math gaps are documented in [the public feature matrix](../../../docs/api/markdown.md).

Styling deviations: HeroUI composition, semantic tokens, appearance variants and slot customization are deferred to Phase 2. Web uses semantic browser elements; native retains typed upstream basic defaults. No app theme, role, toast or composer dependencies remain.

Upgrade policy and static verification limits: follow [Markdown source ownership](../../../docs/upstream/markdown.md). Baselines remain byte-identical; review upstream changes separately from local renderer modifications. Licenses are retained under [docs/upstream/licenses](../../../docs/upstream/licenses/). Runtime rendering and accessibility are not verified by Phase 1 checks.
