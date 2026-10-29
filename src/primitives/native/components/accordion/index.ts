/*
 * Derived from heroui-native/src/components/accordion/index.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
export {
  default as Accordion,
  useAccordion,
  useAccordionItem,
} from './accordion.js';
export { ACCORDION_LAYOUT_TRANSITION as AccordionLayoutTransition } from './accordion.constants.js';
export { accordionClassNames } from './accordion.styles.js';

export type {
  AccordionBackgroundProps,
  AccordionContentProps,
  AccordionContextValue,
  AccordionIndicatorProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionTriggerProps,
  AccordionVariant,
} from './accordion.types.js';
