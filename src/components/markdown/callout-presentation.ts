import type { CalloutType } from './callout.types.js';

export const calloutColorClasses: Record<CalloutType, string> = {
  note: 'text-callout-note-foreground',
  tip: 'text-success-soft-foreground',
  important: 'text-callout-important-foreground',
  warning: 'text-warning-soft-foreground',
  caution: 'text-danger-soft-foreground',
};
