/*
 * Derived from heroui-native/src/helpers/external/utils/cn.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { extendTailwindMerge } from 'tailwind-merge';
import {
  cx,
  tv as tvBase,
  type CnOptions,
  type TV,
  type TWMergeConfig,
} from 'tailwind-variants';

/**
 * Shared `tailwind-merge` configuration for HeroUI Native.
 *
 * @see https://www.tailwind-variants.org/docs/config
 */
export const twMergeConfig: TWMergeConfig = {
  classGroups: {
    'opacity': [{ opacity: ['disabled'] }],
    'border-w': [{ border: ['field-width'] }],
  },
};

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: twMergeConfig.classGroups,
  },
});

/**
 * Merges class names with `tailwind-merge`, honoring {@link twMergeConfig}.
 *
 * Uses `cx` + `extendTailwindMerge` because `cnMerge(...)(config)` does not
 * apply `twMergeConfig` from the config argument (tailwind-variants reads
 * merge config from module-global state only).
 *
 * @param args - Class values to merge.
 * @returns The merged, de-conflicted class string.
 */
export function cn(...args: CnOptions) {
  const merged = cx(args);

  if (!merged) {
    return merged;
  }

  return twMerge(merged);
}

/**
 * HeroUI Native `tv` with {@link twMergeConfig} merged on every call.
 *
 * @see https://www.tailwind-variants.org/docs/config#advanced-custom-tv-wrapper
 */
export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? true,
    twMergeConfig: {
      ...config?.twMergeConfig,
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
        ...twMergeConfig.classGroups,
      },
    },
  });
