import { useMemo, type ReactNode } from 'react';

import { ToastManagerContext } from './toast-context.js';
import { nativeToastOptions } from './toast-mapping.js';
import type { ToastManager } from './toast.types.js';
import { useToast as useNativeToast } from '../../primitives/native/providers/toast/index.js';
export function ToastHost({ children }: { children: ReactNode }) {
  const { toast } = useNativeToast();
  const manager = useMemo<ToastManager>(
    () => ({
      show(options) {
        return String(toast.show(nativeToastOptions(options)));
      },
      dismiss(id) {
        toast.hide(id);
      },
      dismissAll() {
        toast.hide('all');
      },
    }),
    [toast]
  );
  return <ToastManagerContext value={manager}>{children}</ToastManagerContext>;
}
