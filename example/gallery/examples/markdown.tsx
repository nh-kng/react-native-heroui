import { Button, Markdown, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { Platform, Text, View } from 'react-native';

import { PreviewSection } from '../preview-section';

const rich = `
# Markdown Rendering Showcase

A comprehensive Markdown document designed to test typography, layout, syntax highlighting, mathematical expressions, diagrams, interactive elements, and responsive rendering.

---

# 1. Typography and Text Formatting

## 1.1 Basic Formatting

This is a regular paragraph containing **bold text**, *italic text*, ***bold and italic text***, ~~strikethrough text~~, and \`inline code\`.

You can also combine different formatting styles:

- **Bold with *nested italics***
- *Italic with **nested bold***
- ~~Strikethrough with **bold text**~~
- **Bold with \`inline code\`**
- A [standard hyperlink](https://heroui.com)
- An [OpenAI documentation link](https://platform.openai.com/docs)

Markdown should preserve whitespace, punctuation, and formatting while maintaining consistent typography.

## 1.2 Heading Hierarchy

# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4
##### Heading Level 5
###### Heading Level 6

Regular text following the heading hierarchy should have appropriate spacing.

## 1.3 Escaped Characters

These characters should remain literal:

\\*Not italic\\*

\\**Not bold\\**

\\# Not a heading

\\- Not a list item

\\\`Not inline code\\\`

Special characters:

- Ampersand: &
- Less than: &lt;
- Greater than: &gt;
- Copyright: ©
- Trademark: ™
- Registered: ®
- Emoji: 🚀 🎨 ✨ 💙

## 1.4 Long Paragraph

A well-designed Markdown renderer should handle long paragraphs gracefully without introducing unexpected line breaks, inconsistent spacing, or horizontal overflow. Typography should remain readable across mobile, tablet, and desktop layouts. The renderer should correctly manage line height, font weight, text selection, and wrapping behavior while preserving the semantic structure of the original Markdown content.

This paragraph includes a very long token to test overflow behavior:

\`supercalifragilisticexpialidocious_really_long_identifier_without_any_natural_breakpoints_1234567890\`

---

# 2. Blockquotes

## 2.1 Simple Blockquote

> Good design is as little design as possible.

## 2.2 Multiline Blockquote

> Markdown allows content to be written in a simple, readable format.
>
> A renderer transforms that content into structured visual elements.
>
> Each element should inherit the appropriate typography and color tokens.

## 2.3 Nested Blockquotes

> Level 1: Primary quotation.
>
> > Level 2: Nested quotation.
> >
> > > Level 3: Deeply nested quotation.
>
> Back to Level 1.

## 2.4 Rich Blockquote

> ### Important Notice
>
> This blockquote contains **bold text**, *italic text*, and \`inline code\`.
>
> - First item
> - Second item
> - Third item
>
> The quotation should preserve nested content correctly.

---

# 3. Lists

## 3.1 Unordered List

- Apple
- Banana
- Cherry
- Dragon fruit
- Elderberry

## 3.2 Ordered List

1. Initialize the application.
2. Configure the theme.
3. Register components.
4. Render Markdown content.
5. Verify responsive behavior.

## 3.3 Custom Starting Number

7. This list starts at seven.
8. The second item is eight.
9. The third item is nine.

## 3.4 Nested Unordered List

- Frontend
  - React
    - Components
    - Hooks
      - \`useState\`
      - \`useEffect\`
      - \`useMemo\`
  - React Native
    - iOS
    - Android
    - Web
- Backend
  - Node.js
  - Python
  - PostgreSQL

## 3.5 Mixed Nested Lists

1. Project setup
   - Initialize repository
   - Install dependencies
     1. Runtime dependencies
     2. Development dependencies
   - Configure environment variables

2. Development
   - Build components
     - Buttons
     - Inputs
     - Cards
   - Add tests

3. Deployment
   1. Build production artifacts
   2. Run verification
   3. Deploy application

## 3.6 Task Lists

- [x] Configure typography
- [x] Implement headings
- [x] Implement lists
- [x] Add syntax highlighting
- [ ] Support mathematical expressions
- [ ] Support Mermaid diagrams
- [ ] Test accessibility
- [ ] Verify mobile rendering

### Nested Task Lists

- [x] Markdown renderer
  - [x] Paragraphs
  - [x] Headings
  - [x] Inline formatting
  - [ ] Advanced extensions
    - [ ] Mermaid
    - [ ] Mathematics
    - [ ] Footnotes

## 3.7 Lists Containing Paragraphs

1. **First item**

   This item contains an additional paragraph.

   The paragraph should remain associated with the first list item.

2. **Second item**

   This item contains a code block:

   \`\`\`ts
   const enabled = true;
   \`\`\`

3. **Third item**

   > This item contains a blockquote.

---

# 4. Tables

## 4.1 Basic Table

| Feature | Description | Status |
|---|---|---|
| Typography | Headings and paragraphs | Complete |
| Lists | Ordered and unordered | Complete |
| Tables | GFM table support | Complete |
| Code | Syntax highlighting | Complete |
| Mathematics | LaTeX rendering | Planned |
| Diagrams | Mermaid support | Planned |

## 4.2 Column Alignment

| Left aligned | Center aligned | Right aligned |
|:---|:---:|---:|
| Apple | 10 | $2.50 |
| Banana | 20 | $3.75 |
| Cherry | 30 | $12.00 |
| Dragon fruit | 5 | $15.99 |

## 4.3 Long Table Content

| Component | Platform | Behavior | Additional Notes |
|:---|:---:|:---|:---|
| Button | Web | Interactive | Supports multiple visual variants and loading states |
| Input | Native | Editable | Supports validation, accessibility labels, and keyboard interaction |
| Modal | Both | Overlay | Should handle focus management and responsive layouts |
| Markdown | Both | Rich content | Supports paragraphs, tables, code blocks, mathematical notation, and custom renderers |

## 4.4 Inline Formatting in Tables

| Syntax | Example | Result |
|---|---|---|
| Bold | \`**text**\` | **text** |
| Italic | \`*text*\` | *text* |
| Strike | \`~~text~~\` | ~~text~~ |
| Code | \`\` \`value\` \`\` | \`value\` |
| Link | \`[HeroUI](https://heroui.com)\` | [HeroUI](https://heroui.com) |

---

# 5. Code Blocks

## 5.1 TypeScript

\`\`\`ts
interface User {
  id: string;
  name: string;
  email?: string;
  roles: Array<"admin" | "user">;
}

const users: User[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    roles: ["admin"],
  },
  {
    id: "2",
    name: "Bob",
    roles: ["user"],
  },
];

function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

console.log(getUserById("1"));
\`\`\`

## 5.2 JavaScript

\`\`\`javascript
async function fetchUsers() {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status}\`);
  }

  return response.json();
}

fetchUsers()
  .then(console.log)
  .catch(console.error);
\`\`\`

## 5.3 React JSX

\`\`\`tsx
import { useState } from "react";

interface CounterProps {
  initialValue?: number;
}

export function Counter({
  initialValue = 0,
}: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="flex items-center gap-3">
      <button onClick={() => setCount((n) => n - 1)}>
        Decrease
      </button>

      <span>{count}</span>

      <button onClick={() => setCount((n) => n + 1)}>
        Increase
      </button>
    </div>
  );
}
\`\`\`

## 5.4 Python

\`\`\`python
from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: str
    name: str
    email: Optional[str] = None

def greet(user: User) -> str:
    return f"Hello, {user.name}!"

if __name__ == "__main__":
    user = User(id="1", name="Alice")
    print(greet(user))
\`\`\`

## 5.5 JSON

\`\`\`json
{
  "name": "markdown-showcase",
  "version": "1.0.0",
  "features": {
    "typography": true,
    "tables": true,
    "syntaxHighlighting": true,
    "mathematics": true,
    "mermaid": true
  },
  "platforms": ["web", "ios", "android"]
}
\`\`\`

## 5.6 YAML

\`\`\`yaml
application:
  name: markdown-showcase
  version: 1.0.0

theme:
  mode: system
  primaryColor: "#1E90FF"

features:
  markdown: true
  syntaxHighlighting: true
  mathematics: true
  diagrams: true
\`\`\`

## 5.7 Bash

\`\`\`bash
pnpm install
pnpm run build
pnpm run test

git status
git add .
git commit -m "feat: add markdown renderer"
\`\`\`

## 5.8 SQL

\`\`\`sql
SELECT
    users.id,
    users.name,
    COUNT(messages.id) AS message_count
FROM users
LEFT JOIN messages
    ON messages.user_id = users.id
WHERE users.active = TRUE
GROUP BY users.id, users.name
ORDER BY message_count DESC
LIMIT 10;
\`\`\`

## 5.9 HTML

\`\`\`html
<article class="markdown-content">
  <header>
    <h1>Markdown Showcase</h1>
  </header>

  <section>
    <p>Hello, <strong>world!</strong></p>
  </section>
</article>
\`\`\`

## 5.10 CSS

\`\`\`css
.markdown-content {
  color: var(--foreground);
  font-size: 1rem;
  line-height: 1.75;
}

.markdown-content pre {
  overflow-x: auto;
  border-radius: 0.75rem;
  padding: 1rem;
}

.markdown-content code {
  font-family: ui-monospace, monospace;
}
\`\`\`

## 5.11 Diff

\`\`\`diff
- const theme = "light";
+ const theme = "system";

- const enabled = false;
+ const enabled = true;
\`\`\`

## 5.12 Long Code Line

The following code tests horizontal scrolling:

\`\`\`ts
const veryLongConfigurationVariable = { application: "markdown-renderer", platform: "react-native-web", appearance: "system", features: ["tables", "mathematics", "syntax-highlighting", "mermaid-diagrams", "nested-lists", "responsive-images"], enabled: true };
\`\`\`

## 5.13 Code Without Language

\`\`\`
Plain text content
No syntax highlighting
Preserve indentation

    Nested indentation

Special symbols: < > & { } [ ] ( )
\`\`\`

---

# 6. Mathematical Expressions

## 6.1 Inline Mathematics

The Pythagorean theorem is \\(a^2 + b^2 = c^2\\).

Euler's identity is \\(e^{i\\pi} + 1 = 0\\).

A quadratic function can be written as \\(f(x) = ax^2 + bx + c\\).

The Greek letters \\(\\alpha\\), \\(\\beta\\), \\(\\gamma\\), and \\(\\theta\\) should render correctly.

## 6.2 Display Mathematics

\\[
x^2 + y^2 = z^2
\\]

## 6.3 Quadratic Formula

\\[
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
\\]

## 6.4 Summation

\\[
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
\\]

## 6.5 Integral

\\[
\\int_0^1 x^2 \\, dx = \\frac{1}{3}
\\]

## 6.6 Matrix

\\[
A =
\\begin{bmatrix}
1 & 2 & 3 \\\\
4 & 5 & 6 \\\\
7 & 8 & 9
\\end{bmatrix}
\\]

## 6.7 Limits

\\[
\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1
\\]

## 6.8 Probability

\\[
P(A \\mid B) =
\\frac{P(B \\mid A)P(A)}{P(B)}
\\]

## 6.9 Piecewise Function

\\[
f(x) =
\\begin{cases}
x^2, & x \\geq 0 \\\\
-x, & x < 0
\\end{cases}
\\]

## 6.10 Currency Escaping

A product costs $5.

Two products cost $10.

This sentence contains $20 and $30 without intending mathematical rendering.

---

# 7. Mermaid Diagrams

## 7.1 Flowchart

\`\`\`mermaid
flowchart TD
    A[User Input] --> B[Markdown Parser]
    B --> C{Node Type}
    C -->|Text| D[Typography Renderer]
    C -->|Code| E[Code Renderer]
    C -->|Math| F[Math Renderer]
    C -->|Diagram| G[Mermaid Renderer]
    D --> H[Rendered Output]
    E --> H
    F --> H
    G --> H
\`\`\`

## 7.2 Sequence Diagram

\`\`\`mermaid
sequenceDiagram
    participant User
    participant UI
    participant API
    participant Database

    User->>UI: Send message
    UI->>API: POST /messages
    API->>Database: Save message
    Database-->>API: Success
    API-->>UI: Response
    UI-->>User: Display message
\`\`\`

## 7.3 State Diagram

\`\`\`mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Loading: Start request
    Loading --> Success: Request completed
    Loading --> Error: Request failed
    Error --> Loading: Retry
    Success --> Idle: Reset
\`\`\`

## 7.4 Class Diagram

\`\`\`mermaid
classDiagram
    class MarkdownRenderer {
        +string content
        +render()
        +parse()
    }

    class CodeRenderer {
        +string language
        +highlight()
    }

    class MathRenderer {
        +renderLatex()
    }

    MarkdownRenderer --> CodeRenderer
    MarkdownRenderer --> MathRenderer
\`\`\`

## 7.5 Pie Chart

\`\`\`mermaid
pie title Markdown Feature Coverage
    "Typography" : 30
    "Code Blocks" : 25
    "Tables" : 15
    "Mathematics" : 15
    "Diagrams" : 15
\`\`\`

---

# 8. Images

## 8.1 Basic Image

![Mountain landscape](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80)

## 8.2 Wide Landscape Image

![Mountain valley](https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=80)

## 8.3 Portrait Image

![Portrait photography](https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80)

## 8.4 Image With a Link

[![Nature photography](https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80)](https://unsplash.com)

## 8.5 Missing Image Fallback

![This image should display alternative text](https://example.invalid/missing-image.png)

---

# 9. Links and References

## 9.1 Inline Links

Visit [HeroUI](https://heroui.com) for UI components.

Read the [React documentation](https://react.dev).

Explore [TypeScript](https://www.typescriptlang.org).

## 9.2 Reference Links

You can visit [GitHub][github] or read the [MDN documentation][mdn].

[github]: https://github.com
[mdn]: https://developer.mozilla.org

## 9.3 Automatic Links

<https://github.com>

<https://react.dev>

<hello@example.com>

---

# 10. Horizontal Rules

The following examples represent horizontal separators.

---

***

___

Content after a horizontal rule should have consistent vertical spacing.

---

# 11. Footnotes

Here is a sentence with a footnote.[^1]

Another sentence contains a longer explanation.[^note]

[^1]: This is a simple footnote.

[^note]: This is a longer footnote containing additional information about the Markdown rendering system.

    A footnote can also contain multiple paragraphs.

---

# 12. Definition Lists

Some Markdown extensions support definition lists.

Markdown
: A lightweight markup language for structured text.

Renderer
: A component responsible for transforming Markdown syntax into visual elements.

Theme
: A set of design tokens controlling typography, colors, spacing, and surfaces.

---

# 13. HTML Compatibility

Some Markdown processors support inline HTML.

<details>
<summary>Click to expand</summary>

This content is inside a collapsible section.

- Item one
- Item two
- Item three

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd>

H<sub>2</sub>O

E = mc<sup>2</sup>

<mark>Highlighted text</mark>

---

# 14. Unicode and Internationalization

## 14.1 Vietnamese

Xin chào! Đây là một đoạn văn bản tiếng Việt có dấu nhằm kiểm tra khả năng hiển thị phông chữ và khoảng cách dòng.

**Tiếng Việt in đậm**, *tiếng Việt in nghiêng*, và ~~văn bản bị gạch ngang~~.

Các ký tự: ă â ê ô ơ ư đ Ă Â Ê Ô Ơ Ư Đ.

## 14.2 Japanese

こんにちは、世界！

これは日本語のテキスト表示テストです。

## 14.3 Korean

안녕하세요, 세계!

마크다운 렌더링 테스트입니다.

## 14.4 Chinese

你好，世界！

这是一个 Markdown 渲染测试。

## 14.5 Arabic

مرحبًا بالعالم!

هذا اختبار لعرض النص العربي من اليمين إلى اليسار.

## 14.6 Emoji

😀 😎 🚀 🎉 ❤️ 💙 💚 ⭐ 🔥

👨‍💻 👩‍🚀 🧑‍🎨

🇻🇳 🇺🇸 🇯🇵

---

# 15. Nested Formatting Stress Test

> ## Complex Content
>
> This blockquote contains several Markdown structures.
>
> ### Checklist
>
> - [x] Parse text
> - [x] Render components
> - [ ] Validate responsive layout
>
> ### Code
>
> \`\`\`typescript
> function greet(name: string) {
>   return \`Hello, \${name}!\`;
> }
> \`\`\`
>
> ### Mathematics
>
> \\[
> E = mc^2
> \\]
>
> ### Nested Quote
>
> > This is another level of quotation.
>
> End of complex content.

---

# 16. Streaming Markdown Edge Cases

Streaming Markdown renderers may receive incomplete syntax while content is being generated.

## 16.1 Partial Bold

The following characters might arrive incrementally:

\`\`\`text
**
**Hello
**Hello world
**Hello world**
\`\`\`

## 16.2 Partial Code Fence

\`\`\`text
\`
\`\`
\`\`\`ts
\`\`\`

A streaming renderer should avoid unstable layout while the message is incomplete.

## 16.3 Partial Table

\`\`\`text
| Name
| Name | Status
| Name | Status |
|---|---|
| Alice | Ready |
\`\`\`

## 16.4 Partial Mathematics

\`\`\`text
\\(
\\(x^2
\\(x^2 + y^2\\)
\`\`\`

## 16.5 Partial Link

\`\`\`text
[Open
[OpenAI]
[OpenAI](https://
[OpenAI](https://openai.com)
\`\`\`

---

# 17. Accessibility Test

Markdown content should remain accessible to screen readers and keyboard navigation.

1. Headings should preserve their semantic hierarchy.
2. Links should have meaningful accessible names.
3. Images should expose alternative text.
4. Code blocks should support text selection.
5. Tables should preserve their row and column relationships.
6. Interactive elements should support keyboard navigation.
7. Contrast should remain sufficient in light and dark appearance modes.

---

# 18. Final Rendering Checklist

- [ ] Headings have consistent typography.
- [ ] Paragraph spacing is correct.
- [ ] Inline formatting renders correctly.
- [ ] Nested lists preserve indentation.
- [ ] Task lists display their checkbox states.
- [ ] Tables support horizontal scrolling.
- [ ] Code blocks preserve whitespace.
- [ ] Syntax highlighting follows the active theme.
- [ ] Inline code has appropriate contrast.
- [ ] Mathematical expressions render correctly.
- [ ] Mermaid diagrams render without overflow.
- [ ] Images preserve aspect ratio.
- [ ] Links are interactive.
- [ ] Blockquotes have clear visual hierarchy.
- [ ] Long text wraps correctly.
- [ ] Unicode characters render properly.
- [ ] Dark mode follows theme tokens.
- [ ] Mobile layouts remain responsive.
- [ ] Streaming content does not cause excessive layout shifts.

---

# Conclusion

A robust Markdown renderer should correctly support **typography**, *emphasis*, \`code\`, [links](https://heroui.com), mathematical expressions, structured tables, images, and diagrams.

The implementation should preserve the original Markdown semantics while adapting visual presentation to the application's active appearance settings.

**End of Markdown Showcase.**
`;
const callouts = `
> [!NOTE] Authentication
> Access tokens expire after **30 minutes**.
>
> Refresh your token before making [another request](https://heroui.com).
>
> - Store tokens securely.
> - Never expose credentials.

> [!TIP]
> Cache reusable data to reduce unnecessary requests.

> [!IMPORTANT]
> Read the migration guide before upgrading.

> [!WARNING] Be Careful
> Review this command before running it:
>
> \`\`\`sh
> npm install
> \`\`\`

> [!CAUTION]
> Deleting a token immediately revokes its access.

> This remains a regular blockquote.

> [!UNKNOWN]
> Unsupported markers remain ordinary blockquotes.
`;
const streamed = '```ts\nconst message = "Still arriving";\n```';

export function MarkdownExamples() {
  const [end, setEnd] = useState(18);
  const [copied, setCopied] = useState('');
  const [custom, setCustom] = useState(false);
  return (
    <>
      <PreviewSection title="Themed defaults">
        <Typography.Paragraph type="body-sm" color="muted">
          Use Appearance to compare light and dark tokens. Math and Mermaid show readable source
          until an engine is configured.
        </Typography.Paragraph>
        <Markdown>{rich}</Markdown>
      </PreviewSection>
      <PreviewSection title="Markdown callouts">
        <Typography.Paragraph type="body-sm" color="muted">
          GitHub-style alerts use HeroUI surfaces and semantic colors. Use Appearance to compare light and dark modes.
        </Typography.Paragraph>
        <Markdown>{callouts}</Markdown>
      </PreviewSection>
      <PreviewSection title="Intentional slot customization">
        <Button variant="secondary" onPress={() => setCustom(!custom)}>
          <Button.Label>Toggle slots</Button.Label>
        </Button>
        <Markdown
          classNames={
            custom
              ? {
                  heading: 'text-accent',
                  quote: 'bg-accent-soft border-accent',
                  inlineCode: 'bg-accent-soft',
                }
              : undefined
          }>
          {'# Make it yours\n\n> A local quote treatment.\n\nUse `theme tokens`.'}
        </Markdown>
      </PreviewSection>
      <PreviewSection title="Streaming and copy service">
        <Button
          variant="secondary"
          onPress={() => setEnd(end >= streamed.length ? 18 : Math.min(streamed.length, end + 8))}>
          <Button.Label>{end >= streamed.length ? 'Restart stream' : 'Append source'}</Button.Label>
        </Button>
        <Markdown
          isStreaming
          onCopyCode={Platform.OS === 'web' ? undefined : ({ source }) => setCopied(source)}
          onCopySuccess={() => {
            if (Platform.OS === 'web') setCopied('Browser clipboard updated');
          }}
          onCopyError={() => setCopied('Clipboard unavailable')}>
          {streamed.slice(0, end)}
        </Markdown>
        <Typography.Paragraph type="body-sm" color="muted">
          {Platform.OS === 'web'
            ? 'Copy uses the browser clipboard when available.'
            : 'Native host callback simulation: Copy stores the source below; no system clipboard is connected.'}
        </Typography.Paragraph>
        {!!copied && <Typography.Paragraph>{copied}</Typography.Paragraph>}
      </PreviewSection>
      <PreviewSection title="Optional renderer hooks">
        <Typography.Paragraph type="body-sm" color="muted">
          These local text previews demonstrate hook inputs; they are not a typesetter or diagram
          engine.
        </Typography.Paragraph>
        <Markdown
          renderMath={({ source }, presentation) =>
            Platform.OS === 'web' ? (
              <span className={presentation.className}>Math source: {source}</span>
            ) : (
              <Text style={{ color: presentation.theme.accent }}>Math source: {source}</Text>
            )
          }
          renderMermaid={({ source }, presentation) => (
            <View className={presentation.className}>
              <Typography.Paragraph>Diagram source: {source}</Typography.Paragraph>
            </View>
          )}>
          {'Inline \\(x^2\\)\n\n```mermaid\ngraph LR; A-->B\n```'}
        </Markdown>
      </PreviewSection>
    </>
  );
}
