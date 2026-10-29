# Markdown source ownership

Phase 1 adds six independently pinned Git submodules without changing the original HeroUI Stage 1/Stage 2 records. [The baseline manifest](markdown-source-map.json) records selected files, exact commits/blobs, SHA-256 hashes, copied license notices, manifest dependency ranges, peer declarations, and every excluded Git-tree entry. [The owned manifest](markdown-owned-source-map.json) records converted/derived files, explicit locally authored integrations, and baseline files retained only for reference. See the [public API and feature matrix](../api/markdown.md).

## Pins and boundaries

| Repository | Release | Source boundary |
| --- | --- | --- |
| remarkjs/react-markdown | 10.1.0 | Entry, `lib/`, manifest and licenses |
| iamacup/react-native-markdown-display | 7.0.2 | Complete `src/`, declarations, manifest and licenses |
| remarkjs/remark-gfm | 4.0.1 | Entry, `lib/`, manifest and licenses |
| remarkjs/remark-math | 6.0.0 | `packages/remark-math` entry/runtime and manifests/licenses; sibling math engines excluded |
| rehypejs/rehype-raw | 7.0.0 | Entry, `lib/`, manifest and licenses |
| rehypejs/rehype-sanitize | 6.0.0 | Entry, `lib/`, manifest and licenses |

The native 7.0.2 release tag points to a repository whose manifest reports 7.0.1. The manifest records this discrepancy rather than relabeling source bytes. The application lockfile reference resolves native renderer 7.0.2 and web renderer 10.1.0, remark-gfm 4.0.1, remark-math 6.0.0, rehype-raw 7.0.0, markdown-it 10.0.0, KaTeX 0.16.47, Mermaid 11.17.2, and transitive fit-image 1.5.5. Application files are research references only; no application helpers are copied in Phase 1.

## Owned transformations and dependencies

The web implementation retains react-markdown's parse → remark/GFM/math → hast → JSX pipeline and URL-attribute processing. The public surface intentionally narrows upstream options to synchronous string input, fixed plugins, root customization and typed renderer hooks. Async components, deprecated props, arbitrary plugin/element maps, and configurable unsafe URL transforms are not exposed. JavaScript/JSDoc plugin contracts are converted to strict TypeScript; root results are checked without unsafe casts. Raw parsing and sanitization use owned plugin entry logic with their declared AST engines.

The native implementation retains token flattening, cleanup, text grouping, list-paragraph omission, stack-based AST conversion, the original style inventory and the text/block rule inventory. The renderer traversal is rewritten with strict contracts, inherited text styles, structural keys, numeric ordered starts, shared URL handling, and typed hooks. Text grouping balances its final group and preserves inline nesting around block images; inline ancestors containing blocks become view containers so images cannot be nested inside native Text. Unknown rules remain omitted. Source parse failures propagate instead of being silently swallowed.

Native uses markdown-it 14.3.3, outside the upstream renderer's declared `^10.0.0` range. The patch avoids the affected versions listed in [GHSA-gfr2-rv44-r23c](https://github.com/advisories/GHSA-gfr2-rv44-r23c). Compatibility evidence is the strict build and parser/rule tests, not the legacy permissive React/React Native peer ranges. Tokens are typed through the supported parser's return type, avoiding the old `markdown-it/lib/token` import. No `prop-types`, fit-image, or css-to-react-native runtime dependency is retained: TypeScript replaces runtime prop declarations, a local React Native Image helper replaces fit-image, and inline HTML/CSS conversion is not supported. Legacy helper files remain immutable reference material with explicit owned exclusions.

Root dependencies declare unified, remark parsing/rehype support, hast/JSX utilities, URL-attribute and visit utilities, GFM/math parsing utilities, raw parsing, sanitization and markdown-it. Their locked transitive dependencies remain packages rather than recursively vendored source. The baseline manifest preserves upstream dependency inventories separately from the owned package's actual manifest and lockfile. Renderer packages and copied plugin packages are never runtime dependencies. KaTeX and Mermaid remain uninstalled; their future integration is separate from parsing.

Both platform TypeScript builds cover the owned conversions. Existing HeroUI baseline TypeScript/build configs keep their original boundaries; Markdown's immutable JavaScript/JSDoc and legacy declarations are verified as source bytes, not retroactively converted or claimed to pass this package's strict TypeScript settings.

## Reproducible import and upgrade

1. Initialize submodules with `git submodule update --init --recursive`. Their gitlinks and manifests must agree exactly, and their working trees must be clean.
2. Run `node scripts/import-upstream.mjs` to reproduce both source inventories. Existing files/manifests must be byte-identical; the importer refuses overwrites. Do not run a formatter over baselines or submodules.
3. For an upgrade, review the release/commit, license, complete runtime dependency closure, parser behavior and exclusions. Update the Markdown repository registry and gitlink together. Review each changed baseline and regenerate the manifest as an explicit upgrade; the normal importer must continue refusing changed existing bytes.
4. Port reviewed changes into owned TypeScript separately. Update per-file origins/transformations and explicit reference-only exclusions, including any local helpers. Do not fabricate HeroUI origins or blindly replace owned modifications.
5. Run `pnpm run verify:upstream`, `pnpm run verify:owned`, platform typechecks, baseline checks/builds, lint, package build, fixture checks and non-rendering tests. Inspect the packed artifact and runtime module graphs.

The published package includes both platform builds, public documentation, source maps and license notices under `docs/upstream/licenses/`; it excludes the `upstream/` and `baselines/` trees. Source provenance is additive and upgrade review is independent of presentation work in Phase 2.

## Phase 2 presentation

The owned renderers compose narrow package Typography, Button, and Separator contracts and explicit Markdown slots. The shared Markdown stylesheet is locally authored and registered in the additive owned manifest; browser-only extensions stay in the established web stylesheet. Native styling no longer retains the baseline fixed palette. Local copy-service, delimiter, task-list, image, and measured-table integrations do not import application contexts, theme hooks, or toast services. The reference application supplied behavior for delimiter and table design; its files are not copied. `micromark-util-types` 2.0.3 is explicitly declared for strict extension typing. Engine integration remains optional through typed hooks. Reviewed source pins and immutable baselines are unchanged.
