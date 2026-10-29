export const calloutTypes = ['note', 'tip', 'important', 'warning', 'caution'];
export const richCallout = `> [!NOTE] Authentication
> Access tokens expire after **30 minutes**.
>
> Refresh your token before making [another request](https://example.com).
>
> - Store tokens securely.
>   - Never expose credentials.
>
> \`\`\`ts
> const token = 'secret';
> \`\`\`
>
> Last *paragraph* with \`inline code\`.`;
export const ordinaryQuotes = [
  '> regular quote',
  '> [!UNKNOWN]\n> body',
  '> [!note]\n> body',
  '> [!NOTE]suffix\n> body',
  '> before\n> [!NOTE]\n> body',
  '> \\[!NOTE]\n> body',
  '> `[!NOTE]`\n> body',
  '> [!NOTE](https://example.com)\n> body',
  '> **[!NOTE] Custom**\n> body',
  '> # [!NOTE] Heading\n> body',
  '> | [!NOTE] Cell |\n> | --- |',
  '>\n> [!NOTE]\n> body',
  '> ```md\n> [!NOTE]\n> ```',
  '>     [!NOTE]\n>     code',
];
