import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import type {
  CardBodyProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from './card.types.js';
import { Card as WebCard } from '../../primitives/web/components/card/index.js';
export type {
  CardBodyProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardNativeProps,
  CardProps,
  CardTitleProps,
  CardVariant,
  CardWebProps,
} from './card.types.js';

type CardRef = ComponentRef<typeof WebCard.Root<'div'>>;

const CardRoot = forwardRef<CardRef, CardProps>(function CardRoot(
  { children, className, nativeProps: _nativeProps, variant, webProps },
  ref
) {
  return (
    <WebCard.Root {...webProps} ref={ref} className={className} variant={variant}>
      {children}
    </WebCard.Root>
  );
});

const CardHeader = forwardRef<ComponentRef<typeof WebCard.Header<'div'>>, CardHeaderProps>(
  function CardHeader({ children, className, nativeProps: _nativeProps, webProps }, ref) {
    return (
      <WebCard.Header {...webProps} ref={ref} className={className}>
        {children}
      </WebCard.Header>
    );
  }
);

const CardBody = forwardRef<ComponentRef<typeof WebCard.Content<'div'>>, CardBodyProps>(
  function CardBody({ children, className, nativeProps: _nativeProps, webProps }, ref) {
    return (
      <WebCard.Content {...webProps} ref={ref} className={className}>
        {children}
      </WebCard.Content>
    );
  }
);

const CardFooter = forwardRef<ComponentRef<typeof WebCard.Footer<'div'>>, CardFooterProps>(
  function CardFooter({ children, className, nativeProps: _nativeProps, webProps }, ref) {
    return (
      <WebCard.Footer {...webProps} ref={ref} className={className}>
        {children}
      </WebCard.Footer>
    );
  }
);

const CardTitle = forwardRef<ComponentRef<typeof WebCard.Title<'h3'>>, CardTitleProps>(
  function CardTitle({ children, className, nativeProps: _nativeProps, webProps }, ref) {
    return (
      <WebCard.Title {...webProps} ref={ref} className={className}>
        {children}
      </WebCard.Title>
    );
  }
);

const CardDescription = forwardRef<
  ComponentRef<typeof WebCard.Description<'p'>>,
  CardDescriptionProps
>(function CardDescription({ children, className, nativeProps: _nativeProps, webProps }, ref) {
  return (
    <WebCard.Description {...webProps} ref={ref} className={className}>
      {children}
    </WebCard.Description>
  );
});

CardRoot.displayName = 'Card';
CardHeader.displayName = 'Card.Header';
CardBody.displayName = 'Card.Body';
CardFooter.displayName = 'Card.Footer';
CardTitle.displayName = 'Card.Title';
CardDescription.displayName = 'Card.Description';

type CardComponent = typeof CardRoot & {
  Root: typeof CardRoot;
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
};

export const Card: CardComponent = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
});
