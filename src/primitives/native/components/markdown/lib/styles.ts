import { Platform } from 'react-native';

export const markdownMonospace = { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' };
export const markdownStructure = {
  row: { flexDirection: 'row' as const, alignItems: 'flex-start' as const },
  content: { flex: 1, minWidth: 0 },
  emphasis: { fontStyle: 'italic' as const },
  strong: { fontWeight: 'bold' as const },
  strike: { textDecorationLine: 'line-through' as const },
};
