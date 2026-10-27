import type { Card as WebCard , CardRootProps as WebCardRootProps } from '@heroui/react/card';
import { Card as NativeCard, type CardRootProps as NativeCardRootProps } from 'heroui-native/card';
import type { ComponentProps, ComponentRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';

type RootOwnedProps = 'children' | 'className' | 'variant';
type PartOwnedProps = 'children' | 'className' | 'ref';
type NativeHeaderUpstreamProps = ComponentProps<typeof NativeCard.Header>;
type NativeBodyUpstreamProps = ComponentProps<typeof NativeCard.Body>;
type NativeFooterUpstreamProps = ComponentProps<typeof NativeCard.Footer>;
type NativeTitleUpstreamProps = ComponentProps<typeof NativeCard.Title>;
type NativeDescriptionUpstreamProps = ComponentProps<typeof NativeCard.Description>;
type WebHeaderUpstreamProps = ComponentProps<typeof WebCard.Header>;
type WebContentUpstreamProps = ComponentProps<typeof WebCard.Content>;
type WebFooterUpstreamProps = ComponentProps<typeof WebCard.Footer>;
type WebTitleUpstreamProps = ComponentProps<typeof WebCard.Title>;
type WebDescriptionUpstreamProps = ComponentProps<typeof WebCard.Description>;

export type CardVariant = NonNullable<NativeCardRootProps['variant']> & NonNullable<WebCardRootProps['variant']>;
export type CardNativeProps = Omit<NativeCardRootProps, RootOwnedProps | 'ref'>;
export type CardWebProps = Omit<WebCardRootProps, RootOwnedProps | 'ref'>;

export interface CardProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: CardNativeProps;
  variant?: CardVariant;
  webProps?: CardWebProps;
}

type CardRef = ComponentRef<typeof NativeCard>;

const CardRoot: ForwardRefExoticComponent<CardProps & RefAttributes<CardRef>> = forwardRef<CardRef, CardProps>(function CardRoot(
  { children, className, nativeProps, variant, webProps: _webProps },
  ref,
) {
  return (
    <NativeCard {...nativeProps} ref={ref} className={className} variant={variant}>
      {children}
    </NativeCard>
  );
});

export interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeHeaderUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebHeaderUpstreamProps, PartOwnedProps>;
}

const CardHeader: ForwardRefExoticComponent<CardHeaderProps & RefAttributes<ComponentRef<typeof NativeCard.Header>>> = forwardRef<ComponentRef<typeof NativeCard.Header>, CardHeaderProps>(function CardHeader(
  { children, className, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeCard.Header {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeCard.Header>
  );
});

export interface CardBodyProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeBodyUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebContentUpstreamProps, PartOwnedProps>;
}

const CardBody: ForwardRefExoticComponent<CardBodyProps & RefAttributes<ComponentRef<typeof NativeCard.Body>>> = forwardRef<ComponentRef<typeof NativeCard.Body>, CardBodyProps>(function CardBody(
  { children, className, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeCard.Body {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeCard.Body>
  );
});

export interface CardFooterProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeFooterUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebFooterUpstreamProps, PartOwnedProps>;
}

const CardFooter: ForwardRefExoticComponent<CardFooterProps & RefAttributes<ComponentRef<typeof NativeCard.Footer>>> = forwardRef<ComponentRef<typeof NativeCard.Footer>, CardFooterProps>(function CardFooter(
  { children, className, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeCard.Footer {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeCard.Footer>
  );
});

export interface CardTitleProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeTitleUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebTitleUpstreamProps, PartOwnedProps>;
}

const CardTitle: ForwardRefExoticComponent<CardTitleProps & RefAttributes<ComponentRef<typeof NativeCard.Title>>> = forwardRef<ComponentRef<typeof NativeCard.Title>, CardTitleProps>(function CardTitle(
  { children, className, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeCard.Title {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeCard.Title>
  );
});

export interface CardDescriptionProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeDescriptionUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebDescriptionUpstreamProps, PartOwnedProps>;
}

const CardDescription: ForwardRefExoticComponent<CardDescriptionProps & RefAttributes<ComponentRef<typeof NativeCard.Description>>> = forwardRef<ComponentRef<typeof NativeCard.Description>, CardDescriptionProps>(
  function CardDescription({ children, className, nativeProps, webProps: _webProps }, ref) {
    return (
      <NativeCard.Description {...nativeProps} ref={ref} className={className}>
        {children}
      </NativeCard.Description>
    );
  },
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
