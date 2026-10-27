import { Card as WebCard, type CardRootProps as WebCardRootProps } from '@heroui/react/card';
import type { Card as NativeCard , CardRootProps as NativeCardRootProps } from 'heroui-native/card';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
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

type CardRef = ComponentRef<typeof WebCard.Root<'div'>>;

const CardRoot = forwardRef<CardRef, CardProps>(function CardRoot(
  { children, className, nativeProps: _nativeProps, variant, webProps },
  ref,
) {
  return (
    <WebCard.Root {...webProps} ref={ref} className={className} variant={variant}>
      {children}
    </WebCard.Root>
  );
});

export interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeHeaderUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebHeaderUpstreamProps, PartOwnedProps>;
}

const CardHeader = forwardRef<ComponentRef<typeof WebCard.Header<'div'>>, CardHeaderProps>(function CardHeader(
  { children, className, nativeProps: _nativeProps, webProps },
  ref,
) {
  return (
    <WebCard.Header {...webProps} ref={ref} className={className}>
      {children}
    </WebCard.Header>
  );
});

export interface CardBodyProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeBodyUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebContentUpstreamProps, PartOwnedProps>;
}

const CardBody = forwardRef<ComponentRef<typeof WebCard.Content<'div'>>, CardBodyProps>(function CardBody(
  { children, className, nativeProps: _nativeProps, webProps },
  ref,
) {
  return (
    <WebCard.Content {...webProps} ref={ref} className={className}>
      {children}
    </WebCard.Content>
  );
});

export interface CardFooterProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeFooterUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebFooterUpstreamProps, PartOwnedProps>;
}

const CardFooter = forwardRef<ComponentRef<typeof WebCard.Footer<'div'>>, CardFooterProps>(function CardFooter(
  { children, className, nativeProps: _nativeProps, webProps },
  ref,
) {
  return (
    <WebCard.Footer {...webProps} ref={ref} className={className}>
      {children}
    </WebCard.Footer>
  );
});

export interface CardTitleProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeTitleUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebTitleUpstreamProps, PartOwnedProps>;
}

const CardTitle = forwardRef<ComponentRef<typeof WebCard.Title<'h3'>>, CardTitleProps>(function CardTitle(
  { children, className, nativeProps: _nativeProps, webProps },
  ref,
) {
  return (
    <WebCard.Title {...webProps} ref={ref} className={className}>
      {children}
    </WebCard.Title>
  );
});

export interface CardDescriptionProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeDescriptionUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebDescriptionUpstreamProps, PartOwnedProps>;
}

const CardDescription = forwardRef<ComponentRef<typeof WebCard.Description<'p'>>, CardDescriptionProps>(
  function CardDescription({ children, className, nativeProps: _nativeProps, webProps }, ref) {
    return (
      <WebCard.Description {...webProps} ref={ref} className={className}>
        {children}
      </WebCard.Description>
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
