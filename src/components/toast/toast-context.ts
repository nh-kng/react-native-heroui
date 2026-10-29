import { createContext, use } from 'react';

import type { ToastManager } from './toast.types.js';
export const ToastManagerContext = createContext<ToastManager | null>(null);
export function useToast(): ToastManager {
  const manager = use(ToastManagerContext);
  if (!manager) throw new Error('useToast must be used within an enabled HeroUIProvider.');
  return manager;
}
