import {
  Children,
  Fragment,
  isValidElement,
  type ComponentPropsWithRef,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
  type ComponentRef,
} from 'react';

import type { TagGroupRemoveButtonProps } from './tag-group.types.js';
import { Tag } from '../../primitives/web/components/tag/index.js';

type RemoveButtonComponent = ForwardRefExoticComponent<
  TagGroupRemoveButtonProps & RefAttributes<ComponentRef<typeof Tag.RemoveButton>>
>;

export function mapTagGroupChildren(children: ReactNode, removeButton: RemoveButtonComponent): ReactNode {
  return Children.map(children, (child) => {
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      return mapTagGroupChildren(child.props.children, removeButton);
    }
    if (!isValidElement<ComponentPropsWithRef<RemoveButtonComponent>>(child) || child.type !== removeButton) {
      return child;
    }
    return (
      <Tag.RemoveButton
        {...child.props.webProps}
        key={child.key}
        ref={child.props.ref}
        className={child.props.className}>
        {child.props.children}
      </Tag.RemoveButton>
    );
  });
}
