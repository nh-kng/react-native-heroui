# Architecture

The package is a JavaScript adapter layer between a shared component API and two public upstream implementations. Conditional package exports select HeroUI Native on iOS and Android and HeroUI React in browser builds.

```mermaid
flowchart LR
  App[Host application] --> Export[Package conditional exports]
  Export --> Native[Native adapters]
  Export --> Web[Web adapters]
  Native --> HN[heroui-native public subpaths]
  Web --> HR[@heroui/react public subpaths]
  App --> NativeCSS[styles/native.css]
  App --> WebCSS[styles/web.css]
  NativeCSS --> Tokens[Shared brand tokens]
  WebCSS --> Tokens
```

## Source and output

- `src/components/` contains one adapter folder per public component, with `.native.tsx` and `.web.tsx` implementations and platform declaration entries.
- `src/index.native.ts` and `src/index.web.ts` define root exports. `package.json` exposes matching root and component subpaths through `react-native`, `browser`, and TypeScript conditions.
- `tsconfig.native.json` and `tsconfig.web.json` compile directly with TypeScript into `build/native` and `build/web`; generated files are not source controlled.
- `styles/native.css` imports Tailwind CSS, Uniwind, HeroUI Native styles, and the shared package brand tokens. `styles/web.css` imports HeroUI React styles and the same brand tokens; Expo Metro web compiles that entry with Tailwind's PostCSS plugin.
- `example/` exercises the published package surface as a workspace consumer. Its Metro Uniwind setup is limited to app-specific stylesheet processing.
- `upstream/` contains pinned official Git submodules; `baselines/` contains unchanged owned copies with independent builds and provenance. These repository-only sources prepare for Stage 2 and do not participate in current public exports. See [owned upstream baselines](../upstream/README.md) and [ADR 0003](decisions/0003-owned-source-baselines.md).

## Adapter boundaries

Direct props represent shared behavior. Platform-specific upstream props are passed via `nativeProps` or `webProps`; adapter-owned props and refs are excluded so the options cannot replace mapped behavior. Web and native declarations are independently generated from their platform entry points.

Compound card and field components render through their upstream roots and parts, preserving upstream context and validation associations. The adapter only maps deliberate API differences, such as `Card.Body` to HeroUI React `Card.Content`, `keyboardType` to web `inputMode`, and semantic Typography types to the corresponding upstream names.

The package contains no Expo native module, native source, autolinking registration, or private imports from upstream repositories.

## Related documentation

- [Architecture decisions](decisions/README.md)
- [API overview](../api/README.md)
- [Styles and setup](../getting-started/quick-start.md)
- [Development setup](../development/setup.md)
