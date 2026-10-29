import type MarkdownIt from 'markdown-it';

export function taskPlugin(parser: MarkdownIt) {
  parser.core.ruler.after('inline', 'markdown_tasks', (state) => {
    for (let index = 0; index < state.tokens.length; index++) {
      const item = state.tokens[index];
      const paragraph = state.tokens[index + 1];
      const inline = state.tokens[index + 2];
      if (
        item.type !== 'list_item_open' ||
        paragraph?.type !== 'paragraph_open' ||
        inline?.type !== 'inline'
      )
        continue;
      const text = inline.children?.[0];
      if (text?.type !== 'text') continue;
      const match = /^\[([ xX])\](?:[ \t]+|$)/.exec(text.content);
      if (!match) continue;
      item.attrSet('data-task-checked', match[1] === ' ' ? 'false' : 'true');
      text.content = text.content.slice(match[0].length);
    }
  });
}
