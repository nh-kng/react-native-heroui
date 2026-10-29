import { twMerge } from 'tailwind-merge';

import type { MarkdownClassNames, MarkdownSlot, MarkdownTheme } from './markdown.types.js';

export function markdownClass(
  slot: MarkdownSlot,
  classes?: MarkdownClassNames,
  className?: string
): string {
  const name = slot.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  return twMerge(`markdown__${name}`, classes?.[slot], className);
}

export const markdownWebTheme: MarkdownTheme = {
  foreground: 'var(--color-foreground)',
  muted: 'var(--color-muted)',
  surface: 'var(--color-surface)',
  border: 'var(--color-border)',
  accent: 'var(--color-accent)',
  link: 'var(--color-link)',
};
