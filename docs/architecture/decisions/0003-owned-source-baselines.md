# ADR 0003: Owned source baselines

> Status: Accepted
> Last reviewed: 2026-10-27
> Partially supersedes: [ADR 0002 — Platform adapter foundation](0002-platform-adapter-foundation.md)

## Context

The approved two-stage migration requires editable, traceable HeroUI React and Native implementations. ADR 0002's adapter-only source ownership cannot provide a reproducible reference for subsequent unification. Replacing public exports during the import would mix source preservation with contract changes.

## Decision

Keep pinned official repositories under `upstream/` and copy both complete component libraries and required support files under `baselines/`, preserving source organization and file contents. Track every copied file and component, retain upstream licenses, and build the owned runtime sources independently with repository-owned configuration. Do not install the baseline manifests as workspace packages or run upstream lifecycle scripts.

Keep existing adapters, public exports, upstream peer dependencies, styles, and example usage until Stage 2. Publish only the existing adapter build directories; source baselines and their generated artifacts remain repository-only. Retain upstream rendering tests for reference and follow the root repository's static verification boundary.

## Consequences

ADR 0002 remains authoritative for the published adapter surface and JavaScript-only native boundary. This decision supersedes its statement that the repository owns no upstream checkout. Build tooling may adjust generated imports and JSX, while copied implementation files remain unchanged. Stage 2 requires a deliberate update to provenance policy, API contracts, styling, exports, and consumers before owned sources become the public implementation.

See [upstream baselines](../../upstream/README.md) for initialization, inventory, licenses, validation, and synchronization.
