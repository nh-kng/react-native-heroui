# ADR 0004: Owned public components and shared styling

> Status: Accepted
> Last reviewed: 2026-10-27
> Supersedes the runtime ownership and styling decisions in ADR 0002 and the deferred cutover in ADR 0003

## Decision

Implement the current public surface and Chip over locally copied behavioral sources under `src/primitives/`. Preserve the immutable Stage 1 snapshot and submodule pins. Publish only platform builds, styles, public documentation, and licenses. HeroUI component packages remain development baselines and are removed from consumer peer dependencies.

Use one `*.types.ts` contract per public component, `onPress`, `isDisabled`, `isLoading`, common size/variant unions, and the existing compound names. Keep `isPending` as a deprecated compatibility alias. Retain `outline` and `danger-soft` Button variants. Keep actual platform ref targets and typed platform options; preserve field contexts, React Aria behavior, and native gestures and animations.

Use the Native baseline's semantic tokens and CSS component definitions as the authoritative styling vocabulary for both platforms. Button and Chip share variant selection functions. Web slot adapters select those semantic classes; web-only CSS supplies browser layout, required markers, focus indicators, and direction selectors. Native retains platform state utilities, hairlines, font selection, and animation styles. Remove the copied helper's mutation of global Tailwind Variants configuration; configure its own functions locally.

## Consequences

The web appearance adopts Native-derived sizes, radii, colors, typography, and surfaces. This is an intentional visual change requiring later runtime review. The current public surface plus Chip is unified; baseline-only components stay unexported until their contracts and platform behavior can be reconciled individually. This follows the plan's instruction to refactor one component at a time without forcing platform-exclusive features into a common contract.

Copied support code retains upstream implementation patterns and existing permissive internal types; newly authored contracts introduce no `any` or unsafe casts. The lint configuration exempts copied primitives from three React Compiler migration rules and automatic type-import conversion, while retaining the rest of lint and strict TypeScript checks. This avoids silently rewriting upstream memoization, effect, and ref behavior during the ownership cutover.

The [owned source map](../../upstream/owned-source-map.json) and per-component records describe local transformations. Runtime rendering, accessibility, interactions, native compilation, and visual equivalence remain unverified under the repository verification boundary.
