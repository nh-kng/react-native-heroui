import { forwardRef, type ComponentRef } from 'react';

import { normalizeExpandedKeys } from './accordion-mapping.js';
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionIndicatorProps,
  AccordionContentProps,
} from './accordion.types.js';
import * as W from '../../primitives/web/components/accordion/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './accordion.types.js';

export type AccordionRootRef = ComponentRef<typeof W.Accordion>;
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
  const Target = W.Accordion;
  const [expanded, change] = useControllableValue<ReadonlySet<string>>(
    expandedKeys,
    defaultExpandedKeys ?? new Set<string>(),
    onExpandedChange ? (keys) => onExpandedChange(new Set(keys)) : undefined
  );
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      expandedKeys={normalizeExpandedKeys(expanded, selectionMode)}
      onExpandedChange={(keys) => change(new Set(Array.from(keys, String)))}
      allowsMultipleExpanded={selectionMode === 'multiple'}
      isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export type AccordionItemRef = ComponentRef<typeof W.Accordion.Item>;
const AccordionItem = forwardRef<AccordionItemRef, AccordionItemProps>(function AccordionItem(
  { children, className, value, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = W.Accordion.Item;
  return (
    <Target {...webProps} ref={ref} className={className} id={value} isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export type AccordionTriggerRef = ComponentRef<typeof W.Accordion.Trigger>;
const AccordionTrigger = forwardRef<AccordionTriggerRef, AccordionTriggerProps>(
  function AccordionTrigger({ children, className, webProps, nativeProps }, ref) {
    const Target = W.Accordion.Trigger;
    return (
      <W.Accordion.Heading>
        <Target {...webProps} ref={ref} className={className}>
          {children}
        </Target>
      </W.Accordion.Heading>
    );
  }
);

export type AccordionIndicatorRef = ComponentRef<typeof W.Accordion.Indicator<'svg'>>;
const AccordionIndicator = forwardRef<AccordionIndicatorRef, AccordionIndicatorProps>(
  function AccordionIndicator({ children, className, webProps, nativeProps }, ref) {
    const Target = W.Accordion.Indicator<'svg'>;
    return (
      <Target {...webProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export type AccordionContentRef = ComponentRef<typeof W.Accordion.Panel>;
const AccordionContent = forwardRef<AccordionContentRef, AccordionContentProps>(
  function AccordionContent({ children, className, webProps, nativeProps }, ref) {
    const Target = W.Accordion.Panel;
    return (
      <Target {...webProps} ref={ref} className={className}>
        <W.Accordion.Body>{children}</W.Accordion.Body>
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
