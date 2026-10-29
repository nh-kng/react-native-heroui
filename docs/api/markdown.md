# Markdown

`Markdown` is a source-owned, platform-resolved renderer with package-owned HeroUI typography, spacing, and surfaces. It consumes a Markdown string and follows the normal package theme without an application styling wrapper.

## Usage

```tsx
import { Markdown } from '@nh-kng/react-native-heroui/markdown';

export function Article({ source }: { source: string }) {
  return <Markdown>{source}</Markdown>;
}
```

The root import also exports `Markdown` and its types. Follow the normal [stylesheet setup](../getting-started/quick-start.md); Markdown rules load through the existing shared, native, and web entries. No message model, role palette, toast service, diagram engine, syntax highlighter, clipboard module, or WebView is installed.

## Contract

| Prop | Behavior |
| --- | --- |
| `children: string` | Required source; replace the string as content arrives. |
| `className?: string` | Container class only. |
| `classNames?: MarkdownClassNames` | Typed classes for owned element slots. |
| `isStreaming?: boolean` | Defaults to `false`; unfinished fences/display math remain readable without invoking expensive replacement hooks. |
| `onLinkPress?: (url: string) => boolean \| void` | Runs after URL validation; returning `false` cancels default navigation on either platform. |
| `onCopyCode?` | Host clipboard service receiving the code-block context; may return `void` or `Promise<void>`. Overrides browser copying. |
| `onCopySuccess?` | Receives the context after the clipboard service completes. |
| `onCopyError?` | Receives `(error: unknown, context)` when copying fails. |
| `renderCodeBlock?`, `renderMath?`, `renderMermaid?` | Synchronous replacement hooks receiving `(context, presentation)`. |
| `webProps?` | Typed `div` attributes/styles plus `allowRawHtml?: boolean`, default `false`. |
| `nativeProps?` | Typed React Native `View` attributes/styles. |

Platform props are ignored on the inactive platform. Children, root class names, refs, renderer maps, parser instances, plugins, and unsanitized HTML replacement are excluded from escape hatches. No component ref or size/tone variants are exposed.

### Customization and precedence

`MarkdownSlot` contains `root`, `heading`, `paragraph`, `inlineCode`, `codeBlock`, `codeHeader`, `codeText`, `copyButton`, `link`, `quote`, `list`, `listItem`, `listMarker`, `taskMarker`, `table`, `tableRow`, `tableHeader`, `tableCell`, `image`, `separator`, `math`, and `mermaid`. `classNames` is a partial map from these names to strings. Defaults use existing foreground, muted, surface, border, accent, link, radius, and typography tokens. There is no second Markdown palette.

Package slot classes precede explicit slot classes, merged with the package's Tailwind class convention. Root `className` follows `classNames.root`; platform root styles override root styling. Root overrides do not recursively restyle all child slots. Custom renderer output owns its internal presentation; use the supplied presentation class intentionally. Table header and cell slots style cell containers; native text weight is supplied by Typography. Inline slots must preserve text flow.

Blockquotes and tables use the same large radius token (`--radius-lg`) as code blocks on web and native. Override `classNames.quote` or `classNames.table` to customize their corners.

```tsx
<Markdown
  classNames={{ heading: 'text-accent', quote: 'bg-accent-soft border-accent' }}
  onLinkPress={(url) => !url.startsWith('https://blocked.example/')}
  webProps={{ id: 'article' }}
  nativeProps={{ testID: 'article', style: { padding: 8 } }}
>
  {source}
</Markdown>
```

### Copying

Default fenced and indented code blocks show a language caption and scroll horizontally. Copy writes `context.source` exactly, including interior whitespace and excluding fence markers and the parser's synthetic final newline. Incomplete streaming blocks cannot be copied.

Web shows Copy when `navigator.clipboard.writeText` or a host callback is available. Native shows Copy only when `onCopyCode` is supplied. Connect your host clipboard service without adding a native module to this package:

```tsx
<Markdown
  onCopyCode={({ source }) => clipboard.writeText(source)}
  onCopySuccess={() => setNotice('Copied')}
  onCopyError={() => setNotice('Unable to copy')}
>
  {source}
</Markdown>
```

`clipboard` and `setNotice` are consumer-owned services. A rejected clipboard operation triggers the error callback and a retry label; success changes the button label to Copied. Replacing a code block with a custom renderer also replaces its default copy control.

### Optional renderer hooks

`MarkdownBlockContext` contains `source`, `id`, `revision`, and `isComplete`. `MarkdownCodeBlockContext` adds `language: string | undefined`; `MarkdownMathContext` adds `mode: 'inline' | 'display'`. Existing callbacks taking only the first argument remain valid. `MarkdownRenderResult` excludes promises.

The second argument, `MarkdownPresentation`, contains `className` and `theme`. `MarkdownTheme` provides `foreground`, `muted`, `surface`, `border`, `accent`, and `link`. Web values are CSS references such as `var(--color-foreground)`; native values are resolved Uniwind colors. Engines requiring concrete browser colors must resolve the CSS references in their own integration. Native theme changes update resolved colors; web CSS references follow the cascade. Engines own browser color resolution and subscriptions. Theme presentation is separate from structural block identity.

Return `undefined` for the package fallback or `null` to omit output. Mermaid first tries `renderMermaid`, then `renderCodeBlock`, then the default code surface. Math falls back to readable monospace source. Inline math output must be safe within native `Text` and web inline text. Hooks own engine lifecycle and accessibility; do not trigger services during render.

## Features and platform differences

| Feature | Web | Native |
| --- | --- | --- |
| Headings and paragraphs | Semantic Typography headings/paragraphs | Typography presets, header roles, inherited inline text |
| Emphasis, strike-through, inline code, links | Semantic inline elements | Nested text and accessible inline links |
| Quotes and separators | Semantic blockquote and Separator | Token-based containers and Separator |
| Nested lists, ordered starts, tight/loose spacing | Semantic lists with owned visual markers | Separate markers and content containers |
| Task lists | Disabled GFM checkboxes | Read-only checked/unchecked markers with accessibility state |
| Footnotes and bare-URL autolinking | GFM | No footnote semantics; bare URLs remain text; explicit links/autolinks work |
| Tables | Semantic table with horizontal overflow | Measured columns, distinguished header, horizontal scrolling |
| Images | HTTP(S)/relative references, intrinsic dimensions, lazy loading and alt fallback | HTTP(S), bounded width, intrinsic aspect ratio, loading label and alt fallback |
| Inline/fenced/indented code | Owned monospace presentation and optional Copy | Same presentation; copying needs a host callback |
| Math | Double-dollar syntax, `\(...\)` inline, standalone `\[...\]` display | Same syntax; display delimiters may occupy their own lines |
| Mermaid | Fenced source or configured hook | Fenced source or configured hook |
| Raw HTML | Literal by default; sanitized opt-in | Literal; no HTML interpretation |
| Streaming | String updates, structural IDs, completion metadata | Structural keys and separate measurement invalidation |

Single-dollar math remains disabled so currency stays literal. Escaped delimiters and content inside inline/fenced code stay literal. Inline parenthesis math does not cross lines. Unclosed custom expressions remain readable; web may retain their literal delimiters until parsing completes. Math parsing does not imply typesetting. KaTeX and Mermaid engines remain consumer-supplied.

Unordered lists use enlarged foreground bullets at every nesting level. Read-only task markers use HeroUI field backgrounds, rounded corners, and field shadows, with an accent fill and contrasting checkmark for completed tasks. Their checked state comes from the Markdown source; they do not toggle on press.

Native columns measure text-source previews without mounting duplicate custom engines or images, using a 64-unit minimum and 480-unit natural-width cap; spare container width is distributed across columns. Measurement state resets for content, width, font scale, relevant theme font metrics, and slot changes. Native image loading and measured layout are not established by static checks. Intentionally customized or engine-rendered table content requires runtime layout review.

## URLs and HTML

Links allow HTTP(S), mailto, and relative references. Images allow HTTP(S), with relative images supported only on web. Data, file, JavaScript, control-character, and backslash URL forms are rejected. Native calls the callback for valid relative links but delegates only absolute supported URLs to `Linking.openURL`; the host can handle relative navigation and return `false`. Native navigation failures are contained. Web retains normal browser navigation and modifier-key behavior.

`webProps.allowRawHtml` opts into raw parsing followed by the fixed sanitizer schema. Script/event/style attributes and unsafe URLs are removed; only required language/math and standard GFM classes survive. IDs are prefixed against DOM clobbering; fragment links and footnote associations follow the sanitized targets. Consumers cannot replace this pipeline or inject `dangerouslySetInnerHTML`.

## Streaming and verification limits

IDs use node-type ordinals within structural parent paths. Duplicate fences remain distinct; appending blocks leaves preceding IDs stable; edits at the same structural position retain identity while changing content revisions. Inserting/removing preceding same-type siblings can reassign IDs. Arbitrary insertion stability is not promised. Revisions are invalidation hints, not cryptographic identifiers or React keys.

Incomplete streaming blocks defer replacement hooks. With `isStreaming: false`, parsed blocks are treated as complete even without a final closing fence. Tables and source fallbacks continue updating as text grows.

Static builds, typing, parser/rule contracts, clipboard service boundaries, URL/sanitizer policy, measurement calculations, stylesheet contracts, and provenance are checked without mounting a renderer. These checks do not verify rendered accessibility, image loading, actual clipboard availability, native compilation, diagram fidelity, mount preservation, or streaming frame performance. Browser/device/simulator testing is not claimed.

## Application migration checklist

1. Replace the application Markdown import with the package root or `/markdown` export; continue passing plain Markdown strings from the composer.
2. Load the normal package stylesheet; remove injected `.md-content` CSS, per-role style maps, and theme wrappers. Use theme tokens or explicit slots for intentional differences.
3. Return `false` from `onLinkPress` when the host handles or rejects navigation. Cancellation now works on web as well as native.
4. Wire the native host clipboard through `onCopyCode`; move toast/notice behavior into success/error callbacks.
5. Supply existing Math/Mermaid engines through typed hooks, adapt presentation colors for each engine, and keep inline output text-safe. Remove engine and app service imports from the core renderer.
6. Explicitly enable sanitized web raw HTML only where needed. The reference application's raw HTML default and arbitrary styling are not retained.
7. Review the documented native footnote/autolink limitations and custom math syntax; single-dollar math remains literal.
8. Run host runtime accessibility, clipboard, table/image layout, RTL, and streaming checks separately before claiming application parity.

For source pins and upgrade procedures, see [Markdown provenance](../upstream/markdown.md).

## Callouts

Markdown automatically recognizes `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, and `CAUTION` on the first line of a blockquote. Markers are case-sensitive and must occupy the line, optionally followed by spaces or tabs and a custom title. Unknown markers, escaped markers, markers inside code, and markers after introductory quote content remain ordinary Markdown. Separate callouts follow CommonMark blockquote boundaries: use an unquoted blank line between them.

```markdown
> [!NOTE] Authentication
> Access tokens expire after **30 minutes**.
>
> Refresh your token before making another request.
>
> - Store tokens securely.
> - Never expose credentials.
```

Callouts retain nested paragraphs, lists, links, inline formatting, and fenced code, including existing code-rendering and copy callbacks. They have a static icon/title header and an expanded body. Titles are plain text; default labels are Note, Tip, Important, Warning, and Caution. Supply a custom title for localized content. Empty callouts display their header only.

`Callout`, `CalloutType`, and `CalloutProps` are exported from the package root and `@nh-kng/react-native-heroui/markdown`. `Callout` accepts `type: 'note' | 'tip' | 'important' | 'warning' | 'caution'`, optional `title: string`, and required `children: React.ReactNode` for direct composition.

```tsx
import { Callout, Typography } from '@nh-kng/react-native-heroui';

<Callout type="tip" title="Keep it secure">
  <Typography.Paragraph>Store tokens securely.</Typography.Paragraph>
</Callout>;
```

Callouts follow Alert typography, spacing, and radius tokens, with subtle backgrounds and semantic borders. Note and Important keep blue and purple identities independently of the app accent through `--callout-note` and `--callout-important`; both have light/dark defaults. Override these variables, or their optional `-soft` and `-foreground` variants, in your theme. Tip, Warning, and Caution use the existing success, warning, and danger tokens. Body text uses the regular Markdown foreground. The `callout`, `calloutHeader`, `calloutIcon`, `calloutTitle`, and `calloutBody` class-name slots customize Markdown callout presentation.

Parser parity, component composition, public types, and theme-token wiring are checked statically. Browser/device appearance, assistive-technology behavior, and native compilation have not been runtime-verified.

Callout recognition uses each parser’s blockquote AST and shared marker rules. For recognized markers, a second parse masks the title-line characters while preserving line breaks and source offsets, then removes the marker line. Paragraph placeholders retain CommonMark lazy continuations inside their original blockquote. This keeps custom titles separate from body formatting and preserves code-block metadata without replacing either platform’s parser.
