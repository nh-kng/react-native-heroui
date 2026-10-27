import type { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type {
  CardBodyProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from './card.types.js';
import { Card as NativeCard } from '../../primitives/native/components/card/index.js';
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

type CardRef = ComponentRef<typeof NativeCard>;

const CardRoot: ForwardRefExoticComponent<CardProps & RefAttributes<CardRef>> = forwardRef<
  CardRef,
  CardProps
>(function CardRoot({ children, className, nativeProps, variant, webProps: _webProps }, ref) {
  return (
    <NativeCard {...nativeProps} ref={ref} className={className} variant={variant}>
      {children}
    </NativeCard>
  );
});

const CardHeader: ForwardRefExoticComponent<
  CardHeaderProps & RefAttributes<ComponentRef<typeof NativeCard.Header>>
> = forwardRef<ComponentRef<typeof NativeCard.Header>, CardHeaderProps>(function CardHeader(
  { children, className, nativeProps, webProps: _webProps },
  ref
) {
  return (
    <NativeCard.Header {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeCard.Header>
  );
});

const CardBody: ForwardRefExoticComponent<
  CardBodyProps & RefAttributes<ComponentRef<typeof NativeCard.Body>>
> = forwardRef<ComponentRef<typeof NativeCard.Body>, CardBodyProps>(function CardBody(
  { children, className, nativeProps, webProps: _webProps },
  ref
) {
  return (
    <NativeCard.Body {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeCard.Body>
  );
});

const CardFooter: ForwardRefExoticComponent<
  CardFooterProps & RefAttributes<ComponentRef<typeof NativeCard.Footer>>
> = forwardRef<ComponentRef<typeof NativeCard.Footer>, CardFooterProps>(function CardFooter(
  { children, className, nativeProps, webProps: _webProps },
  ref
) {
  return (
    <NativeCard.Footer {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeCard.Footer>
  );
});

const CardTitle: ForwardRefExoticComponent<
  CardTitleProps & RefAttributes<ComponentRef<typeof NativeCard.Title>>
> = forwardRef<ComponentRef<typeof NativeCard.Title>, CardTitleProps>(function CardTitle(
  { children, className, nativeProps, webProps: _webProps },
  ref
) {
  return (
    <NativeCard.Title {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeCard.Title>
  );
});

const CardDescription: ForwardRefExoticComponent<
  CardDescriptionProps & RefAttributes<ComponentRef<typeof NativeCard.Description>>
> = forwardRef<ComponentRef<typeof NativeCard.Description>, CardDescriptionProps>(
  function CardDescription({ children, className, nativeProps, webProps: _webProps }, ref) {
    return (
      <NativeCard.Description {...nativeProps} ref={ref} className={className}>
        {children}
      </NativeCard.Description>
    );
  }
);

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
