import type { ReactNode } from 'react';

export type CalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution';

export interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}

export interface CalloutMetadata {
  type: CalloutType;
  title?: string;
}

export const calloutLabels: Record<CalloutType, string> = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Caution',
};
