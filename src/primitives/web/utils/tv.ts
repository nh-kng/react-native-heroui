/*
 * Derived from heroui-react/packages/react/src/utils/tv.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {TV} from "tailwind-variants";
import {tv as tvBase} from "tailwind-variants";

export type {VariantProps} from "tailwind-variants";

export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? false,
    twMergeConfig: {
      ...config?.twMergeConfig,
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
      },
      theme: {
        ...config?.twMergeConfig?.theme,
      },
    },
  });
