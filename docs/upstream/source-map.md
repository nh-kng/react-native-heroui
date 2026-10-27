# Source inventory

The [machine-readable source map](source-map.json) is authoritative for every unchanged Stage 1 baseline file. The [owned implementation map](owned-source-map.json) separately tracks Stage 2 destinations and transformations. Its repository records provide the baseline commit, version, license, last reviewed and incorporated revisions, selection rules, explicit exclusions, component records, and local deviations. Each file records its original and owned paths, upstream Git blob identity, and SHA-256 checksum. Component records additionally list provenance paths, API transformations, behavior and styling deviations, and known unapplied changes; these change lists are empty in Stage 1.

## Component coverage

Names remain platform-specific. A row is an inventory entry, not a claim of equivalent APIs or rendering. Shared icons and other standalone support files are covered by the file map rather than directory-level component records. Each copied component directory contains its own `UPSTREAM.md`.

| Original name | React implementation | React style variants | Native implementation |
| --- | --- | --- | --- |
| accordion | Copied | Copied | Copied |
| alert | Copied | Copied | Copied |
| alert-dialog | Copied | Copied | — |
| autocomplete | Copied | Copied | — |
| avatar | Copied | Copied | Copied |
| avatar-group | Copied | Copied | — |
| badge | Copied | Copied | — |
| bottom-sheet | — | — | Copied |
| breadcrumbs | Copied | Copied | — |
| button | Copied | Copied | Copied |
| button-group | Copied | Copied | — |
| calendar | Copied | Copied | — |
| calendar-year-picker | Copied | Copied | — |
| card | Copied | Copied | Copied |
| checkbox | Copied | Copied | Copied |
| checkbox-group | Copied | Copied | — |
| chip | Copied | Copied | Copied |
| close-button | Copied | Copied | Copied |
| color-area | Copied | Copied | — |
| color-field | Copied | Copied | — |
| color-input-group | Copied | Copied | — |
| color-picker | Copied | Copied | — |
| color-slider | Copied | Copied | — |
| color-swatch | Copied | Copied | — |
| color-swatch-picker | Copied | Copied | — |
| combo-box | Copied | Copied | — |
| control-field | — | — | Copied |
| date-field | Copied | Copied | — |
| date-input-group | Copied | Copied | — |
| date-picker | Copied | Copied | — |
| date-range-picker | Copied | Copied | — |
| description | Copied | Copied | Copied |
| dialog | — | — | Copied |
| disclosure | Copied | Copied | — |
| disclosure-group | Copied | Copied | — |
| drawer | Copied | Copied | — |
| dropdown | Copied | Copied | — |
| empty-state | Copied | Copied | — |
| error-message | Copied | Copied | — |
| field-error | Copied | Copied | Copied |
| fieldset | Copied | Copied | — |
| form | Copied | — | — |
| glass-view | — | — | Copied |
| header | Copied | Copied | — |
| input | Copied | Copied | Copied |
| input-group | Copied | Copied | Copied |
| input-otp | Copied | Copied | Copied |
| kbd | Copied | Copied | — |
| label | Copied | Copied | Copied |
| link | Copied | Copied | — |
| link-button | — | — | Copied |
| list-box | Copied | Copied | — |
| list-box-item | Copied | Copied | — |
| list-box-section | Copied | Copied | — |
| list-group | — | — | Copied |
| menu | Copied | Copied | Copied |
| menu-item | Copied | Copied | — |
| menu-section | Copied | Copied | — |
| meter | Copied | Copied | — |
| modal | Copied | Copied | — |
| number-field | Copied | Copied | — |
| pagination | Copied | Copied | — |
| popover | Copied | Copied | Copied |
| pressable-feedback | — | — | Copied |
| progress-bar | Copied | Copied | — |
| progress-circle | Copied | Copied | — |
| rac | Copied | — | — |
| radio | Copied | Copied | Copied |
| radio-group | Copied | Copied | Copied |
| range-calendar | Copied | Copied | — |
| scroll-shadow | Copied | Copied | Copied |
| search-field | Copied | Copied | Copied |
| select | Copied | Copied | Copied |
| separator | Copied | Copied | Copied |
| skeleton | Copied | Copied | Copied |
| skeleton-group | — | — | Copied |
| slider | Copied | Copied | Copied |
| spinner | Copied | Copied | Copied |
| sub-menu | — | — | Copied |
| surface | Copied | Copied | Copied |
| switch | Copied | Copied | Copied |
| switch-group | Copied | Copied | — |
| table | Copied | Copied | — |
| tabs | Copied | Copied | Copied |
| tag | Copied | Copied | — |
| tag-group | Copied | Copied | Copied |
| text | — | — | Copied |
| text-area | — | — | Copied |
| text-field | — | — | Copied |
| textarea | Copied | Copied | — |
| textfield | Copied | Copied | — |
| theme-background | — | — | Copied |
| time-field | Copied | Copied | — |
| toast | Copied | Copied | Copied |
| toggle-button | Copied | Copied | — |
| toggle-button-group | Copied | Copied | — |
| toolbar | Copied | Copied | — |
| tooltip | Copied | Copied | — |
| typography | Copied | Copied | — |

## Supporting source and tests

React hooks, utilities, entry points, all style layers and variants, original build configuration, testing helpers, and standard configuration are included. Native primitives, helpers, providers, optional integrations, Uniwind declarations, root configuration, and supporting scripts are included. All files within selected trees are preserved, including tests, fixtures, stories, and component Markdown; stories and rendering tests are excluded from the local runtime build and are not executed.

### heroui-react

Copied 737 upstream files with 170 component provenance records. All support files inherit repository revision and license metadata from their source-map record.

Excluded upstream roots are listed below; the file map records the number of excluded tracked files under each root. These exclusions cover upstream apps, documentation, release infrastructure, and repository configuration rather than runtime implementations.

- `.claude` — 7 tracked files.
- `.editorconfig` — 1 tracked files.
- `.github` — 9 tracked files.
- `.gitignore` — 1 tracked files.
- `.husky` — 5 tracked files.
- `.npmrc` — 1 tracked files.
- `.nvmrc` — 1 tracked files.
- `.prettierignore` — 1 tracked files.
- `.vscode` — 2 tracked files.
- `AGENTS.md` — 1 tracked files.
- `CLAUDE.md` — 1 tracked files.
- `CODE_OF_CONDUCT.md` — 1 tracked files.
- `CONTRIBUTING.md` — 1 tracked files.
- `README.md` — 1 tracked files.
- `apps` — 2387 tracked files.
- `commitlint.config.mjs` — 1 tracked files.
- `eslint.config.mjs` — 1 tracked files.
- `lint-staged.config.mjs` — 1 tracked files.
- `packages` — 73 tracked files.
- `pnpm-lock.yaml` — 1 tracked files.
- `prettier.config.mjs` — 1 tracked files.
- `prompts` — 4 tracked files.
- `skills` — 18 tracked files.
- `turbo.json` — 1 tracked files.
- `vercel.json` — 1 tracked files.

### heroui-native

Copied 526 upstream files with 43 component provenance records. All support files inherit repository revision and license metadata from their source-map record.

Excluded upstream roots are listed below; the file map records the number of excluded tracked files under each root. These exclusions cover upstream apps, documentation, release infrastructure, and repository configuration rather than runtime implementations.

- `.editorconfig` — 1 tracked files.
- `.gitattributes` — 1 tracked files.
- `.github` — 7 tracked files.
- `.gitignore` — 1 tracked files.
- `.nvmrc` — 1 tracked files.
- `.watchmanconfig` — 1 tracked files.
- `.yarn` — 3 tracked files.
- `.yarnrc.yml` — 1 tracked files.
- `CHANGELOG.md` — 1 tracked files.
- `CODE_OF_CONDUCT.md` — 1 tracked files.
- `CONTRIBUTING.md` — 1 tracked files.
- `README.md` — 1 tracked files.
- `docs` — 6 tracked files.
- `eslint.config.mjs` — 1 tracked files.
- `example` — 231 tracked files.
- `lefthook.yml` — 1 tracked files.
- `yarn.lock` — 1 tracked files.

## Verification and evolution

`pnpm run verify:upstream` regenerates expected file coverage from the exact Git trees and verifies the owned file set, checksums, component records, exclusions, submodule pins, and runtime import resolution. The Stage 1 map uses schema version 1. Intentional source modifications require the explicit policy and schema review described in the [upgrade guide](upgrade-guide.md).
