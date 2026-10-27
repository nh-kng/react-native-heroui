/*
 * Derived from heroui-native/src/components/card/card.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { TextProps, ViewProps } from 'react-native';

import type { SurfaceRootProps } from '../surface/surface.types.js';

/**
 * Props for the Card.Root component
 */
export interface CardRootProps extends SurfaceRootProps {}

/**
 * Props for the Card.Header component
 */
export interface CardHeaderProps extends ViewProps {
  /**
   * Children elements to be rendered inside the header
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Card.Body component
 */
export interface CardBodyProps extends ViewProps {
  /**
   * Children elements to be rendered inside the body
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Card.Footer component
 */
export interface CardFooterProps extends ViewProps {
  /**
   * Children elements to be rendered inside the footer
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Card.Title component
 */
export interface CardTitleProps extends TextProps {
  /**
   * Children elements to be rendered as the title text
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Card.Description component
 */
export interface CardDescriptionProps extends TextProps {
  /**
   * Children elements to be rendered as the description text
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}
