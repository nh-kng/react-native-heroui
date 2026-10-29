/*
 * Derived from heroui-react/packages/react/src/utils/children.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ReactNode} from "react";
import {Children, isValidElement} from "react";

export const pickChildren = <T = ReactNode>(
  children: T | undefined,
  targetChild: React.ElementType,
): [T | undefined, T[] | undefined] => {
  const target: T[] = [];

  const withoutTargetChildren = Children.map(children, (item) => {
    if (!isValidElement(item)) return item;
    if (item.type === targetChild) {
      target.push(item as T);

      return null;
    }

    return item;
  })?.filter(Boolean) as T;

  const targetChildren = target.length > 0 ? target : undefined;

  return [withoutTargetChildren, targetChildren];
};
