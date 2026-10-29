import { forwardRef, type ComponentRef } from 'react';

import { normalizeExpandedKeys } from './accordion-mapping.js';
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionIndicatorProps,
  AccordionContentProps,
} from './accordion.types.js';
import * as N from '../../primitives/native/components/accordion/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './accordion.types.js';

export type AccordionRootRef = ComponentRef<typeof N.Accordion>;
const AccordionRoot = forwardRef<AccordionRootRef, AccordionProps>(function AccordionRoot(
  {
    children,
    className,
    expandedKeys,
    defaultExpandedKeys,
    onExpandedChange,
    selectionMode = 'single',
    isDisabled,
    webProps,
    nativeProps,
  },
  ref
) {
  const Target = N.Accordion;
  const [expanded, change] = useControllableValue<ReadonlySet<string>>(
    expandedKeys,
    defaultExpandedKeys ?? new Set<string>(),
    onExpandedChange ? (keys) => onExpandedChange(new Set(keys)) : undefined
  );
  return selectionMode === 'multiple' ? (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      selectionMode="multiple"
      value={Array.from(normalizeExpandedKeys(expanded, selectionMode))}
      onValueChange={(values: string[]) => change(new Set(values))}
      isDisabled={isDisabled}>
      {children}
    </Target>
  ) : (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      selectionMode="single"
      value={expanded.values().next().value}
      onValueChange={(value: string | undefined) =>
        change(new Set(value === undefined ? [] : [value]))
      }
      isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export type AccordionItemRef = ComponentRef<typeof N.Accordion.Item>;
const AccordionItem = forwardRef<AccordionItemRef, AccordionItemProps>(function AccordionItem(
  { children, className, value, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = N.Accordion.Item;
  return (
    <Target {...nativeProps} ref={ref} className={className} value={value} isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export type AccordionTriggerRef = ComponentRef<typeof N.Accordion.Trigger>;
const AccordionTrigger = forwardRef<AccordionTriggerRef, AccordionTriggerProps>(
  function AccordionTrigger({ children, className, webProps, nativeProps }, ref) {
    const Target = N.Accordion.Trigger;
    return (
      <Target {...nativeProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export type AccordionIndicatorRef = ComponentRef<typeof N.Accordion.Indicator>;
const AccordionIndicator = forwardRef<AccordionIndicatorRef, AccordionIndicatorProps>(
  function AccordionIndicator({ children, className, webProps, nativeProps }, ref) {
    const Target = N.Accordion.Indicator;
    return (
      <Target {...nativeProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export type AccordionContentRef = ComponentRef<typeof N.Accordion.Content>;
const AccordionContent = forwardRef<AccordionContentRef, AccordionContentProps>(
  function AccordionContent({ children, className, webProps, nativeProps }, ref) {
    const Target = N.Accordion.Content;
    return (
      <Target {...nativeProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Indicator: AccordionIndicator,
  Content: AccordionContent,
});
