# toast

Derived from HeroUI React 3.2.6 at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e and HeroUI Native 1.0.11 at 1980fbbbd6e8112cf9363614abec683379e89da3. Sources and license notices are tracked in the [owned implementation map](../../../docs/upstream/owned-source-map.json).

Shared direct props and compound parts normalize the pinned public APIs; typed platform extensions exclude adapter-owned props and refs.

Provider-scoped useToast normalizes show/dismiss operations and millisecond duration, including zero for persistent notifications. Custom Toast roots require the platform renderer lifecycle props.

Each platform retains its pinned upstream component CSS; web slot generators retain the original React classes. Rendering, interaction and accessibility remain unverified.

Web adds an accent indicator color in `styles/web-only.css` to match the title's `accent-soft-foreground` token; the pinned React stylesheet colors only the accent title. The copied upstream CSS remains unchanged.
