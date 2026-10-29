# Markdown component: two-phase implementation plan

Status: proposed; planning only. Prepared on 2026-10-29. No submodules, dependencies, source, styles, exports, or application consumers are changed by this document.

## Goal and architectural decision

Add a source-owned `Markdown` component to `@nh-kng/react-native-heroui`, with platform-resolved web and native renderers and useful HeroUI defaults supplied by the package. A consumer should render `<Markdown>{source}</Markdown>` after the normal package stylesheet setup, without maintaining a theme-aware wrapper, replacing every Markdown tag, or supplying a large native style map.

Follow the existing [owned-source architecture](../architecture/overview.md): pinned repositories in `upstream/`, immutable reference copies in `baselines/`, editable implementations in `src/primitives/`, public contracts and platform facades in `src/components/`, and package-owned CSS in `styles/`. The facades provide the shared API; the owned renderers provide element composition and default styling. Do not implement this as a wrapper around installed renderer packages with an overriding `components`, `rules`, or `style` object.

“Defaults inside the component” does not mean preventing intentional consumer customization. Theme tokens and explicit component options remain configurable; no outer chat bubble or application provider should be necessary to establish Markdown typography, spacing, or surfaces. Avoid broad descendant CSS and `!important` rules that unexpectedly restyle embedded HeroUI components.

## Verified starting point

- The package currently owns its HeroUI implementations and exposes platform-specific public facades, including `Typography`, `Button`, `Surface`, `LinkButton`, and `Separator`. HeroUI packages are development baselines, not runtime component dependencies.
- `Typography` supplies heading, paragraph, and inline-code parts. Its existing contract and the native text nesting rules must guide Markdown composition; a Markdown renderer cannot indiscriminately replace every inline node with a block component.
- The normal stylesheet entries are `styles/index.css`, `styles/native.css`, and `styles/web.css`. Shared semantic styles live in `styles/shared/`; browser extensions live in `styles/web-only.css`.
- The current project has no Markdown renderer or parser dependencies in its root manifest. Adding source does not eliminate its transitive parser and AST dependencies.
- Existing ownership checks assume two HeroUI upstream repositories and require every owned primitive and shared stylesheet to have provenance. Markdown needs an explicit extension of those checks rather than untracked copied files or fabricated HeroUI origins.

The supplied application is a behavioral reference, not the package source template:

| Reference | Observed behavior | Package consequence |
| --- | --- | --- |
| `ai-voice-clone/ui/components/molecules/Markdown/Markdown.web.tsx` | `react-markdown`, GFM, math, custom delimiters, raw HTML, themed tag mappings, copy controls, Mermaid and Math renderers | Keep the parser pipeline and feature inventory; move defaults into owned renderer code and remove application theme/toast dependencies. |
| `ai-voice-clone/ui/components/molecules/Markdown/Markdown.tsx` | `react-native-markdown-display`, custom markdown-it math, rendering rules, image sizing, measured tables, copy controls | Preserve native text/layout constraints and audit reusable helpers individually. |
| `ai-voice-clone/ui/types/markdown.types.ts` | String children, role, link callback, raw HTML option | Start with string children and typed callbacks; keep chat roles outside the core visual contract. |
| Native streaming helpers | Structural React keys preserve Mermaid mounts while parser keys separately invalidate measurement state | Preserve this distinction and verify duplicate blocks, edits, and insertion behavior. |
| Web raw HTML setup | `allowRawHtml` defaults to true and conditionally enables `rehype-raw`; inspected configuration has no sanitizer | Propose raw HTML off by default in the shared package; document the deliberate migration difference. |

Absolute application paths above describe the local research source. Published documentation and source must not import from that application or depend on its path aliases, message types, theme hooks, toast service, or composer.

## Phase 1 — pin upstream repositories and copy source into the current structure

### 1.1 Establish the source and dependency inventory

Record the application's installed versions and lockfile resolutions before choosing import revisions. Select a reviewed release and exact commit for each repository; do not assume repository HEAD is the application's version or assert compatibility from a permissive peer range. Record license files, source roots, direct dependencies, supported package APIs, and exclusions. Version and compatibility decisions are deliverables of this phase, not facts established by this plan.

The inspected application manifest and lockfile provide an initial baseline: `react-markdown` 10.1.0, `react-native-markdown-display` 7.0.2, `remark-gfm` 4.0.1, `remark-math` 6.0.0, `rehype-raw` 7.0.0, and `markdown-it` 10.0.0. Its richer rendering stack includes KaTeX 0.16.47 and Mermaid 11.17.2. Recheck these resolutions when implementation starts, then map selected releases to repository commits; they are reference versions, not a compatibility claim for this package. The application's fit-image import relies on a transitive installation and must become an explicit dependency or be replaced.

Use these repository destinations and source boundaries:

| Repository | Planned submodule | Copy scope |
| --- | --- | --- |
| [remarkjs/react-markdown](https://github.com/remarkjs/react-markdown) | `upstream/react-markdown` | Entry and `lib/` implementation, including the upstream option types and URL processing behavior. |
| [iamacup/react-native-markdown-display](https://github.com/iamacup/react-native-markdown-display) | `upstream/react-native-markdown-display` | `src/` renderer, parser, AST conversion, rules, styles, declarations, and all imported support modules. |
| [remarkjs/remark-gfm](https://github.com/remarkjs/remark-gfm) | `upstream/remark-gfm` | Plugin entry and `lib/`; keep its underlying parsing utilities as declared dependencies. |
| [remarkjs/remark-math](https://github.com/remarkjs/remark-math) | `upstream/remark-math` | Only `packages/remark-math` runtime source and relevant declarations; the repository contains other packages. |
| [rehypejs/rehype-raw](https://github.com/rehypejs/rehype-raw) | `upstream/rehype-raw` | Plugin entry and runtime helpers for explicit web raw HTML support. |
| [rehypejs/rehype-sanitize](https://github.com/rehypejs/rehype-sanitize) | `upstream/rehype-sanitize` | Sanitizer plugin source to accompany raw HTML support; retain its schema/parser dependencies. |

Clone these as real Git submodules and commit their gitlink pins when phase 1 is implemented. Keep submodules unmodified. Copy selected sources into a separate baseline tree for each repository with retained license notices and byte-identical hashes. Do not recursively vendor unified, micromark, markdown-it, or every transitive dependency; use audited, declared package dependencies for those engines. Mermaid and math rendering engines are separate from the Markdown renderer import and must be inventoried separately.

The inspected native upstream manifest references `markdown-it`, `css-to-react-native`, `prop-types`, and `react-native-fit-image`; its code is JavaScript with separate declarations. Audit those dependencies against this repository's React 19 / React Native 0.86 example and strict TypeScript build. Do not copy legacy compatibility assumptions or simply suppress type errors. See the [upstream manifest](https://github.com/iamacup/react-native-markdown-display/blob/master/package.json).

### 1.2 Add reproducible provenance without rewriting existing history

1. Extend the import/provenance model to register Markdown repositories, exact revisions, selected files, source hashes, licenses, and exclusions. Preserve existing HeroUI pins, baseline bytes, and recorded Stage 1/Stage 2 history.
2. Keep a Markdown-specific manifest under `docs/upstream/`, referenced by the existing upstream index, or introduce a versioned additive schema that preserves the old records. Do not append foreign repository IDs to a schema whose verifier still assumes the original two repositories.
3. Update `scripts/import-upstream.mjs`, `scripts/upstream-baselines.mjs`, and the verification entry points as required by the chosen additive format. The baseline file inventory must cover the union of the original and Markdown records; imports must continue refusing to overwrite changed baseline files.
4. Extend owned-source verification to accept genuine Markdown baseline origins and track copied files, locally authored integration helpers, TypeScript conversions, and later styling deviations distinctly. Maintain coverage for every file under `src/primitives/` and every new shared stylesheet; do not relax checks globally to accommodate Markdown.
5. Add license notices under `docs/upstream/licenses/`, component provenance in `src/components/markdown/UPSTREAM.md`, and a clear upgrade procedure separating reviewed upstream changes from owned renderer modifications.

### 1.3 Create the owned implementation and public scaffolding

Proposed destinations, following the existing facade/primitive split:

```text
baselines/<markdown-repository>/<selected-original-paths>
src/primitives/web/components/markdown/
  index.ts
  markdown.tsx
  markdown.types.ts
  plugins/                       # Owned GFM, math, raw and sanitizer entry logic
src/primitives/native/components/markdown/
  index.ts
  markdown.tsx
  markdown.types.ts
  lib/                           # Parser, AST, rules, styles and utilities
src/components/markdown/
  index.web.ts
  index.native.ts
  markdown.web.tsx
  markdown.native.tsx
  markdown.types.ts
  UPSTREAM.md
```

Keep original file layout in each immutable baseline. In editable source, preserve module boundaries where possible, convert copied JavaScript/JSDoc contracts into strict TypeScript, use local `.js` import specifiers, and document every meaningful rewrite. Retain attribution for plugin files even when their destination is nested under the renderer. Carry over required async/synchronous behavior deliberately; do not silently expose async plugin behavior through a synchronous component.

Add `Markdown` and its public types to both root indices and add `./markdown` conditional exports matching the existing component subpaths. Ensure both builds include their implementation graphs and opposite-platform type declarations without importing the opposite platform's runtime. Keep generated `build/` output untouched and exclude reference submodules/baselines from published artifacts.

### 1.4 Establish the shared contract and platform boundary

The following is a proposed contract to finalize during phase 1:

| Area | Proposed behavior |
| --- | --- |
| Input | Required Markdown string through `children`; no chat message model or composer dependency. |
| Appearance | Normal package theme by default; optional shared size/tone and typed slot customization. Exact variants must map honestly on both platforms. |
| Root customization | `className` for the container, platform root attributes/styles through typed escape hatches; do not treat root styling as a complete typography API. |
| Links | Shared interception callback; define false as cancelling default navigation, retain safe URL handling, and document platform navigation behavior. |
| Code | Typed code-block renderer context with source, language, completion state, and stable identity; package default presentation added in phase 2. |
| Math and diagrams | Typed inline/display-math and Mermaid renderer hooks, with readable source fallbacks when no engine is configured. Identify this as an explicit difference from the application until optional engines are integrated. |
| Streaming | String updates work without a separate parser instance per render; an optional streaming flag can defer expensive rendering of incomplete blocks. |
| Escape hatches | `webProps` and `nativeProps` expose supported platform-only options while omitting children, refs, owned renderers, and other shared controls. Advanced plugin options must not silently replace mandatory URL or sanitization handling. |
| Refs | Either omit refs initially or expose correctly typed platform container refs; never fabricate a shared DOM/native ref API. |

Do not ship the app's `role` strings as implicit palette selectors. A migration can map message roles to explicit package tones or theme tokens at the call site without recreating a styling wrapper. Caller-supplied custom renderers are deliberate replacement points, and must be documented as responsible for their own presentation.

The current app honors the link callback's boolean only on native; web ignores its return and retains normal navigation. Make cancellation consistent in the new shared contract and document this migration correction explicitly.

Build the initial feature inventory for headings, emphasis, strike-through, nested lists, ordered starts, task lists, links, images, tables, quotes, separators, inline/fenced code, math, Mermaid, and partial streaming input. Web GFM support does not prove native GFM parity: record parser support and needed native plugins for each feature, including footnotes and task lists. Parsing math is also distinct from displaying math; `remark-math` alone is not a typesetter. See [GFM](https://github.com/remarkjs/remark-gfm) and [math](https://github.com/remarkjs/remark-math) upstream documentation.

Adopt raw HTML off by default at the source-owned pipeline boundary. For opt-in web support, run raw parsing before an explicit sanitizer schema, restrict URLs, and document native limitations. Test schema allowances needed for math classes and generated IDs without admitting arbitrary attributes. `rehype-raw` parses HTML; sanitization is supplied separately by [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize). Keep this foundational behavior in phase 1 rather than carrying the application's unsafe default into the new component.

### 1.5 Phase 1 verification and exit criteria

- Provenance checks cover exact submodule pins, immutable source copies, licenses, edited-source origins, exclusions, and a clean submodule working tree.
- Build, lint, both platform typechecks, and consumer fixtures accept the new root/subpath exports. Invalid shared props and adapter-owned properties in escape hatches fail public typing checks.
- Non-rendering parser tests cover representative block/inline structures, URL policy, raw HTML defaults and sanitizer ordering, native rules, duplicate blocks, and deterministic key generation. Preserve upstream semantics before styling changes.
- Dependency/import inspection confirms that neither installed Markdown renderer package supplies the implementation and that web-only parser/DOM code does not enter native runtime modules. Document transitive dependencies and package-content changes.
- The feature matrix explicitly identifies implementations, fallback behavior, optional engines, and unresolved platform gaps. Phase 1 is source integration and structural compatibility, not finished HeroUI presentation or verified runtime parity.

## Phase 2 — apply HeroUI composition and default styling inside the owned renderers

### 2.1 Implement the default element mapping

Change the owned renderer implementations and default native rendering rules themselves. Keep platform facades thin. Use public package component contracts through narrow internal modules where appropriate; avoid imports through the package root that introduce cycles. Do not depend on private upstream HeroUI APIs.

| Markdown element | Default rendering and styling work |
| --- | --- |
| Headings | Use `Typography.Heading` with matching levels, semantic web headings, native header roles, and explicit block spacing. |
| Paragraphs and inline emphasis | Use paragraph/body typography and inline-safe spans or nested native text; inherit theme foreground, font scaling, and line height. |
| Inline code | Reuse `Typography.Code` only where its structure is inline-safe; otherwise share its semantic tokens and code typography without changing parsing or text flow. |
| Fenced code | Package-owned code surface, monospace text, horizontal overflow, optional language caption, and a HeroUI copy button. Preserve source whitespace and copy exact code. |
| Links | Preserve semantic anchors on web and accessible inline native links. Use existing link tokens; `LinkButton` is appropriate only where its interactive structure fits, not as a universal inline-text replacement. |
| Quotes | Semantic blockquote on web; native block container with token-based border, inset, and readable foreground. |
| Lists and task items | Semantic web lists; native list rows with separate markers and text containers. Preserve nesting, ordered starts, tight/loose spacing, and read-only task state. |
| Tables | Semantic table/header/cell elements on web; native layout with explicit header distinction, overflow, and width handling based on the app reference where reusable. Do not assume a shared HeroUI Table API exists. |
| Images | Accessible alt text, bounded width, intrinsic sizing where available, and loading/error behavior. Audit or replace legacy fit-image behavior through a documented local implementation. |
| Separators | Reuse the package Separator where its public contract fits; retain semantic structure. |
| Math and Mermaid | Apply surrounding typography/surface tokens and pass documented theme information to configured renderers; keep source fallbacks legible. |

### 2.2 Put styling in the package's normal theme flow

1. Add Markdown component rules in `styles/shared/components/markdown.css` and register them in the shared component index. Use existing semantic foreground, muted, surface, border, accent, radius, and typography tokens; confirm their actual names before introducing aliases.
2. Add browser-only selectors in the established web extension path and ensure both `styles/index.css` and `styles/web.css` load them. Ensure native rules load through the native entry and the shared entry's native condition. Track new owned CSS in provenance.
3. Assign explicit classes to owned Markdown elements/slots. Scope any structural selectors to those slots, avoiding global `p`, `a`, `pre`, or `.prose` rules and typography resets that reach custom embedded components.
   The app currently injects a `.md-content` stylesheet and a DOM style element; replace that mechanism with the package stylesheet entries and do not add renderer-driven global style injection.
4. Resolve native colors and metrics using the existing Uniwind/theme conventions, not a second hardcoded palette or an app-specific light/dark hook. Keep structural native layout styles separate from semantic presentation and avoid inline color/font values that block token customization.
5. Establish documented precedence: package defaults, explicit shared variants/slot options, then deliberate per-instance platform overrides. Merge classes with the package convention and native style arrays predictably; root overrides do not recursively redefine all child slots.
6. Check code/quote/table spacing at block boundaries, nested list indentation, long URLs, image width, font scaling, right-to-left layout, selection, and overflow. Static contracts can cover mappings but do not establish runtime layout quality.

### 2.3 Preserve application features without importing application services

- Build code copying around a typed callback/service boundary with browser clipboard handling where supported. Do not import the application's toast store; expose success/error callbacks and use an accessible copy control. Native copying can use an explicitly documented host callback rather than silently requiring a new native module.
- Extract reusable math delimiter/tokenization logic from the application only after tracing its helpers and dependency contracts. Keep inline/display distinctions, literal currency text, escaped delimiters, fenced-code exclusion, and incomplete expressions consistent across platforms.
- Trace the application's Math and Mermaid component graphs before transferring any helpers. Keep heavy engines optional and platform-resolved. Do not add WebViews, native modules, or an undocumented browser engine to the core package to imply feature parity.
- Support migration of the existing Math/Mermaid renderers through typed hooks. If built-in engines are selected during implementation, add their dependencies, source provenance where copied, theme adapters, and explicit platform support to this same phase. Otherwise document that the package styles their containers and delegates actual diagram/typesetting output.
- Preserve native streaming identity separately from measurement invalidation. Use structural paths plus an explicit duplicate strategy rather than random parser IDs or content-only keys; test changes before/inside/after repeated fences and edits to completed blocks. Avoid promising unchanged mounts for arbitrary insertions unless the algorithm supports that case.
- Reuse measured-table logic only after removing app contexts and checking that width caches invalidate on content, font, and container changes. Keep incomplete tables/code/math readable during streaming; memoization must not freeze growing text.
- Document the application migration: replace the shared renderer import, remove per-role theme/style maps, adapt link interception, wire optional renderers/copy behavior, and explicitly enable sanitized raw HTML only where needed. The composer continues producing plain Markdown strings.

### 2.4 Public documentation, examples, and compatibility

Add one authoritative `docs/api/markdown.md` and link it from the API/docs indices. Cover imports, normal stylesheet setup, customization precedence, platform differences, callbacks, extension hooks, raw HTML, copying, streaming limits, and optional engines. Update `CHANGELOG.md` when the component becomes public.

Add Markdown to the gallery as a package-owned component with its own feature inventory. Read `example/AGENTS.md` before implementation. Do not invent HeroUI React preview coverage or add Markdown to the upstream catalog unless a verified upstream component page and previews exist. Show defaults with no style wrapper, light/dark token configuration, intentional slot customization, rich blocks, and optional renderer/fallback cases.

Create a migration checklist for the supplied application, but do not modify that separate repository as part of the package implementation unless requested. Record static compatibility separately from runtime verification.

### 2.5 Phase 2 verification and exit criteria

Run the applicable existing static checks after implementation:

```sh
pnpm run verify:upstream
pnpm run verify:owned
pnpm run typecheck
pnpm run lint
pnpm run build
pnpm run typecheck:fixtures
pnpm test
pnpm exec tsc -p example/tsconfig.json --noEmit
```

Use the repository's documented separate web/native example checks and non-rendering gallery coverage test as well when changing the gallery; the single example command above does not replace both platform checks. Extend baseline typechecking/build configuration if the new baseline inventory requires it, without changing frozen originals. Inspect the packed artifact for conditional exports, declarations, styles, notices, required dependencies, and excluded submodule/baseline trees.

Add meaningful non-rendering tests for element/prop mappings, slot precedence, native rule behavior, link cancellation, copying callbacks, optional renderer fallbacks, sanitizer policy, streaming keys, and stylesheet entry contracts. Use both platform fixture consumers to demonstrate defaults and intentional customization. Do not add source-text tests that merely restate the implementation.

Completion means public root and subpath imports compile on both platforms, the default presentation is owned and configured inside the package, no app theme/toast/message dependencies remain, provenance is reproducible, and every reference feature has an implemented path or an explicit limitation. Static checks do not establish rendered accessibility, clipboard availability, diagram fidelity, native compilation, or streaming frame performance. Browser tests, preview servers, browser automation, simulators, emulators, and physical-device checks remain skipped unless separately requested under repository instructions.

## Delivery boundary

Deliver two implementation changesets: phase 1 for pinned source acquisition, immutable references, owned TypeScript integration, foundational parser behavior, and public scaffolding; phase 2 for HeroUI element composition, token-based defaults, rich-content integration, migration guidance, and final public documentation. This planning change only creates this document and its documentation-index link.
