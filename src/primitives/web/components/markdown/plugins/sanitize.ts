import type { Root } from 'hast';
import { defaultSchema, sanitize } from 'hast-util-sanitize';
import type { Schema } from 'hast-util-sanitize';
import { visit } from 'unist-util-visit';

const schema: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [
      ...(defaultSchema.attributes?.code ?? []).filter((attribute) => !Array.isArray(attribute) || attribute[0] !== 'className'),
      ['className', /^language-[\w-]+$/, 'math-inline', 'math-display'],
    ],
    div: [...(defaultSchema.attributes?.div ?? []), ['className', 'math', 'math-display']],
  },
  protocols: { ...defaultSchema.protocols, href: ['http', 'https', 'mailto'], src: ['http', 'https'] },
};

export default function rehypeSanitize() {
  return (tree: Root): Root => {
    const result = sanitize(tree, schema);
    if (result.type !== 'root') throw new Error('Expected Markdown root');
    const ids = new Set<string>();
    visit(result, 'element', (node) => {
      if (typeof node.properties.id === 'string') ids.add(node.properties.id);
    });
    visit(result, 'element', (node) => {
      const href = node.properties.href;
      if (typeof href === 'string' && href.startsWith('#')) {
        const target = `${schema.clobberPrefix ?? 'user-content-'}${href.slice(1)}`;
        if (ids.has(target)) node.properties.href = `#${target}`;
      }
      const describedBy = node.properties.ariaDescribedBy;
      if (Array.isArray(describedBy)) {
        node.properties.ariaDescribedBy = describedBy.map((id) => {
          const target = `${schema.clobberPrefix ?? 'user-content-'}${id}`;
          return ids.has(target) ? target : id;
        });
      }
    });
    return result;
  };
}
