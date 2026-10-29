import { webToastOptions } from './toast-mapping.js';
import type { ToastManager } from './toast.types.js';
import type { ToastQueue } from '../../primitives/web/components/toast/index.js';

export function createWebToastManager(queue: ToastQueue): ToastManager {
  return {
    show(options) {
      const mapped = webToastOptions(options);
      return queue.add(mapped.content, mapped.options);
    },
    dismiss(id) {
      queue.close(id);
    },
    dismissAll() {
      queue.clear();
    },
  };
}
