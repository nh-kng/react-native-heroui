/*
 * Derived from heroui-react/packages/react/src/components/slider/slider.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import React, {createContext, use} from "react";
import type {SliderRenderProps} from "react-aria-components/Slider";
import {
  SliderOutput as SliderOutputPrimitive,
  Slider as SliderPrimitive,
  SliderThumb as SliderThumbPrimitive,
  SliderTrack as SliderTrackPrimitive,
} from "react-aria-components/Slider";

import {sliderVariants} from "../../../../styles/web/index.js";
import type {SliderVariants} from "../../../../styles/web/index.js";
import {dataAttr} from "../../utils/assertion.js";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose.js";
import type {DOMRenderProps} from "../../utils/dom.js";
import {dom} from "../../utils/dom.js";

/* -------------------------------------------------------------------------------------------------
 * Component Status: Preview
 * -----------------------------------------------------------------------------------------------*/

// TODO: steps support
// TODO: marks support
// TODO: rtl support

/* -------------------------------------------------------------------------------------------------
 * Slider Context
 * -----------------------------------------------------------------------------------------------*/
interface SliderContext {
  slots?: ReturnType<typeof sliderVariants>;
  state?: SliderRenderProps;
}

const SliderContext = createContext<SliderContext>({});

/* -------------------------------------------------------------------------------------------------
 * Slider Root
 * -----------------------------------------------------------------------------------------------*/
interface SliderRootProps extends ComponentPropsWithRef<typeof SliderPrimitive>, SliderVariants {}

const SliderRoot = ({
  children,
  className,
  orientation = "horizontal",
  ...props
}: SliderRootProps) => {
  const slots = React.useMemo(() => sliderVariants({}), []);

  return (
    <SliderPrimitive
      data-slot="slider"
      orientation={orientation}
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <SliderContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </SliderContext>
      )}
    </SliderPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Output
 * -----------------------------------------------------------------------------------------------*/
interface SliderOutputProps extends ComponentPropsWithRef<typeof SliderOutputPrimitive> {}

const SliderOutput = ({children, className, ...props}: SliderOutputProps) => {
  const {slots} = use(SliderContext);

  return (
    <SliderOutputPrimitive
      className={composeTwRenderProps(className, slots?.output())}
      data-slot="slider-output"
      {...props}
    >
      {children
        ? (values) => <>{typeof children === "function" ? children(values) : children}</>
        : ({state}) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")}
    </SliderOutputPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Track
 * -----------------------------------------------------------------------------------------------*/
interface SliderTrackProps extends ComponentPropsWithRef<typeof SliderTrackPrimitive> {}

const SliderTrack = ({children, className, ...props}: SliderTrackProps) => {
  const {slots, state} = use(SliderContext);

  const {getThumbPercent, values} = state?.state || {};

  const singleThumb = values?.length && values.length === 1;

  const [startOffset, endOffset] = [
    values?.length && values.length > 1 ? getThumbPercent?.(0) : 0,
    getThumbPercent?.(values?.length ? values.length - 1 : 0),
  ].sort();

  const fillWidth = (endOffset! - startOffset!) * 100;

  return (
    <SliderTrackPrimitive
      className={composeTwRenderProps(className, slots?.track())}
      data-disabled={dataAttr(state?.isDisabled)}
      data-slot="slider-track"
      {...(singleThumb
        ? {
            "data-fill-start": dataAttr(fillWidth > 0),
            "data-fill-end": dataAttr(fillWidth == 100),
          }
        : {
            "data-fill-start": dataAttr(startOffset == 0),
            "data-fill-end": dataAttr(startOffset! * 100 + fillWidth == 100),
          })}
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </SliderTrackPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Fill
 * -----------------------------------------------------------------------------------------------*/
interface SliderFillProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

const SliderFill = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  style,
  ...props
}: SliderFillProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderFillProps<E>>) => {
  const {slots, state} = use(SliderContext);

  const {getThumbPercent, orientation, values} = state?.state || {};

  const [startOffset, endOffset] = [
    values?.length && values.length > 1 ? getThumbPercent?.(0) : 0,
    getThumbPercent?.(values?.length ? values.length - 1 : 0),
  ].sort();

  const isVertical = orientation === "vertical";

  return (
    <dom.div
      className={composeSlotClassName(slots?.fill, className)}
      data-disabled={dataAttr(state?.isDisabled)}
      data-slot="slider-fill"
      style={{
        ...style,
        // TODO: rtl support
        [isVertical ? "bottom" : "left"]: `${startOffset! * 100}%`,
        ...(isVertical
          ? {
              height: `${(endOffset! - startOffset!) * 100}%`,
            }
          : {
              width: `${(endOffset! - startOffset!) * 100}%`,
            }),
      }}
      {...(props as any)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Thumb
 * -----------------------------------------------------------------------------------------------*/
interface SliderThumbProps extends ComponentPropsWithRef<typeof SliderThumbPrimitive> {}

const SliderThumb = ({children, className, ...props}: SliderThumbProps) => {
  const {slots} = use(SliderContext);

  return (
    <SliderThumbPrimitive
      className={composeTwRenderProps(className, slots?.thumb())}
      data-slot="slider-thumb"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </SliderThumbPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TODO: Slider Marks
 * -----------------------------------------------------------------------------------------------*/
interface SliderMarksProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

const SliderMarks = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: SliderMarksProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderMarksProps<E>>) => {
  const {slots} = use(SliderContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.marks, className)}
      data-slot="slider-marks"
      {...(props as any)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SliderRoot, SliderOutput, SliderTrack, SliderFill, SliderThumb, SliderMarks};

export type {
  SliderRootProps,
  SliderOutputProps,
  SliderTrackProps,
  SliderFillProps,
  SliderThumbProps,
  SliderMarksProps,
};
