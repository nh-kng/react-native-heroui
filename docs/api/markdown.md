# Markdown (Phase 1)

`Markdown` is a source-owned, platform-resolved renderer. Phase 1 provides parsing, public contracts, structural native rendering, and extension hooks. HeroUI typography, theme tokens, appearance variants, slot styling, code copy controls, and gallery examples are deferred to Phase 2. Native retains the imported renderer's basic default styles, including fixed colors; web uses semantic HTML and browser defaults. This is not yet the finished themed presentation.

## Usage

```tsx
import { Markdown } from '@nh-kng/react-native-heroui/markdown';

export function Article({ source }: { source: string }) {
  return <Markdown>{source}</Markdown>;
}
```

The root import also exports `Markdown` and all its types. Follow the normal [stylesheet setup](../getting-started/quick-start.md); no new Markdown stylesheet is required in Phase 1. No application provider, message model, role palette, theme hook, or toast service is imported.

## Contract

| Prop | Behavior |
| --- | --- |
| `children: string` | Required source; replace the string as content arrives. |
| `className?: string` | Container class only; not a recursive typography API. |
| `isStreaming?: boolean` | Defaults to `false`; when true, unfinished fences/display math use source fallbacks until closed. |
| `onLinkPress?: (url: string) => boolean \| void` | Runs after URL validation. Returning `false` cancels default navigation on either platform. |
| `renderCodeBlock?` | Synchronous replacement for fenced or indented code. |
| `renderMath?` | Synchronous replacement for parsed math, with `mode: 'inline' \| 'display'`. Inline output must be safe inside native `Text` and web inline text. |
| `renderMermaid?` | Synchronous replacement for a fence whose language is `mermaid`, compared without case sensitivity. |
| `webProps?` | Typed `div` attributes/styles plus `allowRawHtml?: boolean`, default `false`. |
| `nativeProps?` | Typed React Native `View` attributes/styles. |

Platform props are ignored on the inactive platform. Children, container class names, refs, renderer maps, parser instances, plugins, and unsanitized HTML replacement are excluded from escape hatches. No component ref is exposed. Use root styles intentionally; they do not replace every element's presentation.

`MarkdownBlockContext` contains `source`, `id`, `revision`, and `isComplete`. `MarkdownCodeBlockContext` adds `language: string | undefined`; `MarkdownMathContext` adds `mode`. Code source retains interior whitespace and excludes the parser's synthetic final newline; it does not contain fence markers. `MarkdownRenderResult` excludes promises. Return `undefined` to use the source fallback, or `null` to deliberately omit output. Mermaid falls back to `renderCodeBlock`, then source. Math falls back to source. No KaTeX, Mermaid, WebView, syntax highlighter, clipboard service, or native module is installed.

```tsx
<Markdown
  isStreaming
  onLinkPress={(url) => !url.startsWith('https://blocked.example/')}
  renderCodeBlock={({ source, language }) =>
    language === 'custom' ? <MyCode source={source} /> : undefined
  }
  webProps={{ id: 'article', allowRawHtml: false }}
  nativeProps={{ testID: 'article', style: { padding: 8 } }}
>
  {source}
</Markdown>
```

`MyCode` is a consumer-owned component. Custom renderers own their presentation, accessibility, and engine lifecycle. Incomplete streaming blocks do not invoke expensive renderer hooks; their parser metadata records `isComplete: false`. With `isStreaming: false`, parsed blocks are treated as complete even when the final closing fence is absent.

## Features and platform differences

| Feature | Web | Native |
| --- | --- | --- |
| Headings, paragraphs, emphasis, strike-through, quotes, separators | Semantic HTML | Owned view/text rules with basic upstream styles |
| Nested lists and ordered starts | Supported | Supported |
| Task lists | GFM read-only checkboxes | Literal task markers; no task-list plugin |
| Footnotes and autolink literals | GFM | No footnote semantics; ordinary reference-link rules apply. Bare URLs remain text; explicit links/autolinks work |
| Tables | Semantic HTML | Basic upstream flex layout; measured widths and scrolling enhancements deferred |
| Images | HTTP(S) and relative references | HTTP(S), bounded container width, intrinsic aspect ratio, alt-text fallback on unsupported URL/error |
| Inline/fenced/indented code | Supported | Supported |
| Math | Double-dollar inline and display syntax | Double-dollar single-line inline and delimiter-only multiline display syntax |
| Mermaid | Fenced source or configured hook | Fenced source or configured hook |
| Raw HTML | Literal by default; sanitized opt-in | Literal; no HTML interpretation |
| Streaming input | String updates, structural IDs, completion metadata | String updates, structural keys, separate content revisions |

Custom single-dollar, bracket/backslash math delimiters, multiline inline-math parity, specialized math layout, and application table measurement are deferred. Currency text and math-like content inside code are not typeset. Math parsing does not imply typesetting. Raw HTML images do not gain the native image helper's behavior on web.

## URLs and HTML

Links allow HTTP(S), mailto, and relative references. Images allow HTTP(S), with relative images supported only on web. Data, file, JavaScript, control-character, and backslash URL forms are rejected. Native invokes the callback for valid relative links but only delegates absolute supported URLs to `Linking.openURL`; the host can handle relative navigation and return `false`. Native navigation failures are contained; no toast service is assumed. Web retains normal same-document/browser navigation and modifier-key behavior.

Set `webProps.allowRawHtml` to opt into raw parsing followed by the owned fixed sanitizer schema. Script/event/style attributes and unsafe URLs are removed. Only needed language/math and standard GFM classes are allowed. IDs are prefixed to prevent DOM clobbering; fragment links and footnote associations are adjusted to sanitized targets. Consumers cannot replace this pipeline or inject `dangerouslySetInnerHTML`.

The application reference enabled raw HTML by default and ignored the web link callback's return value. This package deliberately changes both behaviors. Enabling raw HTML does not enable arbitrary application HTML/CSS compatibility.

## Streaming identity and verification limits

IDs use node-type ordinals within structural parent paths, distinguishing duplicate fences without content-based or random keys. Appending blocks leaves preceding block IDs stable. Editing a block at the same structural position retains identity while changing its content revision. Inserting or removing preceding same-type siblings can reassign IDs; arbitrary insertion stability is not promised. A content revision is an invalidation hint, not a cryptographic identifier. Native AST/table revisions are distinct from React keys; measured table caches are deferred.

Both platform builds, consumer fixtures, parser/rule contracts, URL/sanitizer behavior, and provenance are checked statically or through non-rendering JavaScript. These checks do not verify rendered accessibility, image loading/layout, clipboard behavior, native compilation, mount preservation at runtime, diagram fidelity, or streaming frame performance. No browser, device, simulator, or emulator verification is claimed.

For source pins, dependency modernization and upgrade procedures, see [Markdown provenance](../upstream/markdown.md).
