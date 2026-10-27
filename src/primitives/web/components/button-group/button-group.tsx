/*
 * Derived from heroui-react/packages/react/src/components/button-group/button-group.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef, ReactNode} from "react";
import React, {Children, createContext, isValidElement, use} from "react";
import {Group} from "react-aria-components/Group";
import {ToggleButtonGroupContext as RACToggleButtonGroupContext} from "react-aria-components/ToggleButtonGroup";
import {useSlottedContext} from "react-aria-components/slots";

import {buttonGroupVariants} from '../../../../styles/web/components/button-group/button-group.styles.js';
import type {ButtonGroupVariants} from '../../../../styles/web/components/button-group/button-group.styles.js';
import { composeSlotClassName , composeTwRenderProps } from '../../utils/compose.js';
import type {DOMRenderProps} from "../../utils/dom.js";
import {dom} from "../../utils/dom.js";
import type {ButtonProps} from "../button/index.js";

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ButtonGroupContext = {
  slots?: ReturnType<typeof buttonGroupVariants>;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  isDisabled?: ButtonProps["isDisabled"];
  fullWidth?: ButtonProps["fullWidth"];
};

const ButtonGroupContext = createContext<ButtonGroupContext>({});

// Property name to mark direct children of ButtonGroup
export const BUTTON_GROUP_CHILD = "__button_group_child";

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonGroupRootProps
  extends
    ComponentPropsWithRef<typeof Group>,
    Pick<ButtonProps, "size" | "variant">,
    ButtonGroupVariants {
  /** The orientation of the button group */
  orientation?: "horizontal" | "vertical";
}

const ButtonGroupRoot = ({
  children,
  className,
  fullWidth,
  isDisabled,
  orientation: orientationProp,
  size,
  variant,
  ...rest
}: ButtonGroupRootProps) => {
  const racContext = useSlottedContext(RACToggleButtonGroupContext);
  const orientation = orientationProp ?? racContext?.orientation ?? "horizontal";

  const slots = React.useMemo(
    () => buttonGroupVariants({fullWidth, orientation}),
    [fullWidth, orientation],
  );

  // Wrap only direct children with context provider
  const wrappedChildren = React.useMemo(
    () =>
      Children.map(children as React.ReactNode, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        // Clone the child and add the special prop
        return React.cloneElement(child, {
          [BUTTON_GROUP_CHILD]: true,
        } as any);
      }),
    [children],
  );

  const context = React.useMemo<ButtonGroupContext>(
    () => ({slots, size, variant, isDisabled, fullWidth}),
    [slots, size, variant, isDisabled, fullWidth],
  );

  return (
    <ButtonGroupContext value={context}>
      <Group
        className={composeTwRenderProps(className, slots.base())}
        data-slot="button-group"
        isDisabled={isDisabled}
        {...rest}
      >
        {wrappedChildren}
      </Group>
    </ButtonGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Separator
 * -----------------------------------------------------------------------------------------------*/
interface ButtonGroupSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ButtonGroupSeparator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: ButtonGroupSeparatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ButtonGroupSeparatorProps<E>>) => {
  const {slots} = use(ButtonGroupContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.separator, className)}
      data-slot="button-group-separator"
      {...(props as any)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupRoot, ButtonGroupSeparator, ButtonGroupContext};

export type {ButtonGroupRootProps, ButtonGroupSeparatorProps};
