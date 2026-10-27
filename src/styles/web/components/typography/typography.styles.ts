/*
 * Derived from heroui-react/packages/styles/src/components/typography/typography.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const typographyVariants = tv({
  defaultVariants: {
    align: "start",
    color: "default",
    type: "body",
  },
  slots: {
    base: "text__root",
    prose: "",
  },
  variants: {
    align: {
      center: "text__root--align-center",
      end: "text__root--align-end",
      justify: "text__root--align-justify",
      start: "text__root--align-start",
    },
    color: {
      default: "text__root--color-default",
      muted: "text__root--color-muted",
    },
    truncate: {
      true: "truncate",
    },
    type: {
      body: "text__root--type-body",
      "body-sm": "text__root--type-body-sm",
      "body-xs": "text__root--type-body-xs",
      code: "text__root--type-code",
      h1: "text__root--type-h1",
      h2: "text__root--type-h2",
      h3: "text__root--type-h3",
      h4: "text__root--type-h4",
      h5: "text__root--type-h5",
      h6: "text__root--type-h6",
    },
    weight: {
      bold: "text__root--weight-bold",
      medium: "text__root--weight-medium",
      normal: "text__root--weight-normal",
      semibold: "text__root--weight-semibold",
    },
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;
