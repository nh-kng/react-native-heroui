# button provenance

Stage 2 public implementation; source baseline checkpoint: `31dfac3`.

- heroui-react: `packages/react/src/components/button/` at `e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e`; last reviewed and incorporated revision is the same.
- heroui-native: `src/components/button/` at `1980fbbbd6e8112cf9363614abec683379e89da3`; last reviewed and incorporated revision is the same.

## Local changes

- Canonical isLoading with deprecated isPending alias; loading disables actions and exposes busy state.
- Native-origin CSS is the authoritative semantic theme and component style system; browser selectors live in web-only.css.

- Native accessibility disabled and busy flags always reflect the shared computed state, including disabled without loading.

## Upgrade notes

Use the [owned source map](../../../docs/upstream/owned-source-map.json) for every copied file and transformed destination, including support modules under `src/primitives/`. Compare upstream changes from the last incorporated revision; reconcile local contracts and shared styles before applying them. No later revisions have been reviewed. Stage 1 sources remain unchanged.
