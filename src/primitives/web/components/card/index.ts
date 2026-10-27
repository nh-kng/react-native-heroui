/*
 * Derived from heroui-react/packages/react/src/components/card/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {CardContent, CardDescription, CardFooter, CardHeader, CardRoot, CardTitle} from "./card.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export type Card = {
  Props: ComponentProps<typeof CardRoot>;
  RootProps: ComponentProps<typeof CardRoot>;
  HeaderProps: ComponentProps<typeof CardHeader>;
  TitleProps: ComponentProps<typeof CardTitle>;
  DescriptionProps: ComponentProps<typeof CardDescription>;
  ContentProps: ComponentProps<typeof CardContent>;
  FooterProps: ComponentProps<typeof CardFooter>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {CardRoot, CardHeader, CardTitle, CardDescription, CardContent, CardFooter};

export type {
  CardRootProps,
  CardRootProps as CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./card.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {cardVariants} from "../../../../styles/web/index.js";

export type {CardVariants} from "../../../../styles/web/index.js";
