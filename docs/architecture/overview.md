# Architecture

The package owns the HeroUI implementations that back its public components. Conditional exports choose `.web.tsx` or `.native.tsx` facades over local primitives; runtime imports never resolve to the HeroUI component packages.

```mermaid
flowchart LR
  App[Host application] --> Exports[Conditional package exports]
  Exports --> Contracts[Shared TypeScript contracts]
  Exports --> Web[Owned web implementations]
  Exports --> Native[Owned native implementations]
  Web --> Aria[React Aria]
  Native --> RN[React Native and animation peers]
  App --> Styles[Shared Uniwind CSS entry]
  Styles --> Shared[Shared semantic tokens and component CSS]
```

## Source and output

- `src/components/` owns public contracts in `*.types.ts`, platform facades, compound parts, and provenance. Button and Chip share variant selection in `*.styles.ts`.
- `src/primitives/web/` and `src/primitives/native/` own copied behavioral implementations and their transitive support modules. Relative imports resolve within the package; broad helper imports are narrowed where safe to avoid pulling unused optional integrations into the graph.
- `src/styles/web/` adapts browser slot shapes to the shared semantic classes. `styles/shared/` is the sole semantic token and component CSS authority, derived from the Native baseline. The package uses HeroUI's default semantic palette; apps can override tokens in their global stylesheet.
- `styles/index.css` is the shared Uniwind entry for every platform. It imports the shared styles and tokens once, gates native hairlines with the `native` media condition, and gates browser selectors with Uniwind's web supports condition.
- `styles/native.css` includes Tailwind, Uniwind, shared styles, and native hairline utilities. `styles/web.css` includes Tailwind, shared styles, and browser focus, disabled, required-marker, direction, and layout selectors in `web-only.css`.
- Both TypeScript builds include local declarations for the opposite platform's extension props. Refs stay platform-specific. Generated output under `build/` is never edited by hand.
- `upstream/` remains pinned and read-only. `baselines/` remains an unchanged Stage 1 reference with independent builds. Neither is used as a runtime package dependency.

## Contracts and behavior

Shared direct props live in a single module for each public component. Platform options omit shared props and refs. Field roots and parts retain their locally copied React Aria and Native contexts; native animation, press feedback, text settings, portals, and provider behavior remain in the owned implementation graph.

The package adds no native module, autolinking, Swift, or Kotlin. Static checks establish source resolution and typing; they do not establish rendering, accessibility, native compilation, or functional parity. See the [migration record](../changes/archive/stage-2-public-surface.md) for scope, deviations, and remaining verification.

## Related documentation

- [Architecture decisions](decisions/README.md)
- [Components](../api/components.md)
- [Source ownership and upgrades](../upstream/upgrade-guide.md)
