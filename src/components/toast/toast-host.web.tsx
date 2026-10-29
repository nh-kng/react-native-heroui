import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { ToastManagerContext } from './toast-context.js';
import { createWebToastManager } from './toast-manager.web.js';
import type { ToastManager } from './toast.types.js';
import { Toast as W, ToastQueue } from '../../primitives/web/components/toast/index.js';
export function ToastHost({ children }: { children: ReactNode }) {
  const [queue] = useState(() => new ToastQueue());
  const manager = useMemo<ToastManager>(() => createWebToastManager(queue), [queue]);
  useEffect(() => () => queue.destroy(), [queue]);
  return (
    <ToastManagerContext value={manager}>
      {children}
      <W.Provider queue={queue} />
    </ToastManagerContext>
  );
}
