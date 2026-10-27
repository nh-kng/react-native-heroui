# Stage 2: Owned public surface

## Scope

Stage 1 checkpoint `31dfac3` preserves both complete libraries. This change migrates Button, Card, Typography, Input, TextField, Label, Description, FieldError, and HeroUIProvider to owned source and adds Chip. Every published root and component subpath resolves to local implementations. Remaining P2–P5 component groups in the reference roadmap remain baseline-only and are not claimed as unified public components. No upstream-exclusive functionality is removed from the immutable baseline.

## Public contracts

Each published component has one shared TypeScript contract used by both platform implementations. Button uses `isLoading`, `isDisabled`, `onPress`, `sm | md | lg`, and the existing seven variants. The five proposed core variants are retained alongside `outline` and `danger-soft`. `isPending` remains a deprecated alias; loading disables the action and sets busy state without inserting a spinner. Card keeps `Body` as the shared name. Chip adds `Root` and `Label`, identical defaults (`md`, `primary`, `accent`), four variants, and five colors. Platform options and refs retain platform semantics.

## Styling and implementation

Public facades use copied implementations under `src/primitives/`. Relative imports, narrowed helper barrels, and local web style modules replace package forwarding. React Aria and native context associations remain intact. The Native provider retains text configuration, animations, portals, and toast support. Optional integration loaders keep the baseline's behavior.

`styles/shared/` provides one semantic token vocabulary and one set of component CSS definitions. Both entries apply the same brand override. Browser styling selects the shared classes; browser focus, field state selectors, required markers, logical text alignment, inline layout, and monospace fallback remain in `web-only.css`. Native keeps hairline functions, platform outline/elevation utilities, fonts, and animated properties. Web adopts the Native-derived component metrics and colors. Web Button backgrounds now use the shared size-specific absolute-fill class selection.

The original copied web CSS remains in `baselines/` as a reference and is not imported into the published styles. No copied source was deleted from Stage 1. New implementation copies are traceable through the [owned source map](../../upstream/owned-source-map.json); the original checksum map and verifier remain unchanged.

## Validation and limits

Verification covers strict platform compilation, declaration parity for all public root prop contracts, accepted and rejected consumer prop mappings, pure loading and style variant tests, owned-source import and provenance coverage, unchanged baseline integrity/builds, example TypeScript and Expo configuration, Tailwind stylesheet compilation, and noninteractive Expo JavaScript exports for web, iOS, and Android. Package inspection confirms that platform builds, owned declarations, local styles, and license notices are included while baselines and submodules are excluded.

These are static and non-rendering checks. A bare Node import of the root web entry still requires the React Native web alias used by host bundlers because Uniwind imports React Native; Expo web bundling supplies that alias. No browser tests, preview server, screenshots, accessibility session, simulator, emulator, device test, or native compilation has been run. No visual or functional parity is claimed. See [testing](../../development/testing.md) for commands and boundaries.

## Upgrade implications

Keep the baseline import workflow separate from public source synchronization. Compare each upstream diff from its last incorporated revision, map affected support and component files, reconcile contracts and shared styles, and update provenance, checks, and the changelog. Both repositories' last reviewed and incorporated commits remain at the Stage 1 pins; no later upstream changes were reviewed or incorporated.
