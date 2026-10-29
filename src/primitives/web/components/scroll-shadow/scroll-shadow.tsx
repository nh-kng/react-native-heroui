/*
 * Derived from heroui-react/packages/react/src/components/scroll-shadow/scroll-shadow.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import {mergeRefs} from "@react-aria/utils";
import type {RefObject} from "react";
import {useMemo, useRef} from "react";

import {useScrollShadow} from "./use-scroll-shadow.js";
import type {ScrollShadowVariants} from "../../../../styles/web/index.js";
import {scrollShadowVariants} from "../../../../styles/web/index.js";
import {useSafeLayoutEffect} from "../../hooks/use-safe-layout-effect.js";

export type ScrollShadowVisibility = "auto" | "both" | "top" | "bottom" | "left" | "right" | "none";

export interface ScrollShadowRootProps
  extends Omit<React.ComponentProps<"div">, "size">, ScrollShadowVariants {
  /**
   * The shadow size in pixels
   * @default 40
   */
  size?: number;

  /**
   * The scroll offset before showing shadows (in pixels)
   * @default 0
   */
  offset?: number;

  /**
   * Controlled shadow visibility state
   * @default "auto"
   */
  visibility?: ScrollShadowVisibility;

  /**
   * Whether scroll shadow detection is enabled
   * @default true
   */
  isEnabled?: boolean;

  /**
   * Callback invoked when shadow visibility changes
   */
  onVisibilityChange?: (visibility: ScrollShadowVisibility) => void;
}

export const ScrollShadowRoot = ({
  children,
  className,
  hideScrollBar = false,
  isEnabled = true,
  offset = 0,
  onVisibilityChange,
  orientation = "vertical",
  ref,
  size = 40,
  style: styleProp,
  variant = "fade",
  visibility = "auto",
  ...props
}: ScrollShadowRootProps) => {
  const internalRef = useRef<HTMLDivElement | null>(null);

  useScrollShadow({
    containerRef: internalRef as RefObject<HTMLElement>,
    isEnabled,
    offset,
    onVisibilityChange,
    orientation,
    visibility,
  });

  // Handle controlled visibility mode
  useSafeLayoutEffect(() => {
    const el = internalRef.current;

    if (!el || visibility === "auto") return;

    // Clear all data attributes
    delete el.dataset["topScroll"];
    delete el.dataset["bottomScroll"];
    delete el.dataset["topBottomScroll"];
    delete el.dataset["leftScroll"];
    delete el.dataset["rightScroll"];
    delete el.dataset["leftRightScroll"];

    // Set controlled visibility
    if (visibility === "both") {
      el.dataset[orientation === "vertical" ? "topBottomScroll" : "leftRightScroll"] = "true";
    } else if (visibility !== "none") {
      el.dataset[`${visibility}Scroll`] = "true";
    }
  }, [visibility, orientation]);

  const slots = useMemo(
    () =>
      scrollShadowVariants({
        hideScrollBar,
        orientation,
        variant,
      }),
    [orientation, hideScrollBar, variant],
  );

  const style = {
    "--scroll-shadow-size": `${size}px`,
    "--scroll-shadow-offset": `${offset}px`,
    ...styleProp,
  } as React.CSSProperties;

  const mergedRef = useMemo(() => mergeRefs(internalRef, ref), [internalRef, ref]);

  return (
    <div
      ref={mergedRef}
      className={slots.base({className})}
      data-orientation={orientation}
      // Selects the scroll-driven fade where supported. Controlled and disabled modes stay
      // attribute-driven, matching what the hook does for the same combination of props.
      data-scroll-shadow-mode={isEnabled && visibility === "auto" ? "auto" : "manual"}
      data-scroll-shadow-size={size}
      data-slot="scroll-shadow"
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

ScrollShadowRoot.displayName = "HeroUI.ScrollShadow";
