/*
 * Derived from heroui-react/packages/react/src/components/typography/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {Code, Heading, Paragraph, Prose, TypographyRoot} from "./typography.js";

export const Typography = Object.assign(TypographyRoot, {
  Code,
  Heading,
  Paragraph,
  Prose,
  Root: TypographyRoot,
});

export type Typography = {
  CodeProps: ComponentProps<typeof Code>;
  HeadingProps: ComponentProps<typeof Heading>;
  ParagraphProps: ComponentProps<typeof Paragraph>;
  ProseProps: ComponentProps<typeof Prose>;
  Props: ComponentProps<typeof TypographyRoot>;
  RootProps: ComponentProps<typeof TypographyRoot>;
};

export {Code, Heading, Paragraph, Prose, TypographyRoot};

export type {
  CodeProps,
  HeadingProps,
  ParagraphProps,
  ProseProps,
  TypographyRootProps,
  TypographyRootProps as TypographyProps,
} from "./typography.js";

export {typographyVariants} from "../../../../styles/web/index.js";

export type {TypographyVariants} from "../../../../styles/web/index.js";
