import type { KeyboardTypeOptions } from 'react-native';

export type WebInputMode =
  'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url';

export function keyboardTypeToInputMode(
  keyboardType?: KeyboardTypeOptions
): WebInputMode | undefined {
  switch (keyboardType) {
    case 'decimal-pad':
      return 'decimal';
    case 'email-address':
      return 'email';
    case 'number-pad':
    case 'numeric':
      return 'numeric';
    case 'phone-pad':
      return 'tel';
    case 'url':
      return 'url';
    case 'web-search':
      return 'search';
    case 'default':
      return 'text';
    default:
      return undefined;
  }
}
