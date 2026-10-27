import type { ComponentProps, ReactNode } from 'react';

import type {
  Card as NativeCard,
  CardRootProps as NativeCardRootProps,
} from '../../primitives/native/components/card/index.js';
import type {
  Card as WebCard,
  CardRootProps as WebCardRootProps,
} from '../../primitives/web/components/card/index.js';

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

export type CardVariant = NonNullable<NativeCardRootProps['variant']> &
  NonNullable<WebCardRootProps['variant']>;

export type CardNativeProps = Omit<NativeCardRootProps, RootOwnedProps | 'ref'>;

export type CardWebProps = Omit<WebCardRootProps, RootOwnedProps | 'ref'>;

export interface CardProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: CardNativeProps;
  variant?: CardVariant;
  webProps?: CardWebProps;
}

export interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeHeaderUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebHeaderUpstreamProps, PartOwnedProps>;
}

export interface CardBodyProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeBodyUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebContentUpstreamProps, PartOwnedProps>;
}

export interface CardFooterProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeFooterUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebFooterUpstreamProps, PartOwnedProps>;
}

export interface CardTitleProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeTitleUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebTitleUpstreamProps, PartOwnedProps>;
}

export interface CardDescriptionProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<NativeDescriptionUpstreamProps, PartOwnedProps>;
  webProps?: Omit<WebDescriptionUpstreamProps, PartOwnedProps>;
}
