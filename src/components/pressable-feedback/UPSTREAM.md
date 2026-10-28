# pressable-feedback provenance

The native adapter wraps the owned HeroUI Native `src/components/pressable-feedback/` implementation at `1980fbbbd6e8112cf9363614abec683379e89da3`. No later revision has been reviewed or incorporated.

The web adapter is local code using the public React Aria Button API. HeroUI React has no corresponding PressableFeedback component. Browser feedback uses shared native-origin classes with additional browser selectors in `styles/web-only.css`.

Shared animation controls expose boolean and disabled states; granular native animation configurations and native `asChild` are outside the shared contract. Web Ripple expands from the center; native Ripple retains the owned touch-origin implementation. Root refs remain platform-specific. See the [component API](../../../docs/api/components.md#pressablefeedback) and [owned source map](../../../docs/upstream/owned-source-map.json).
