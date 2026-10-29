import { createRef } from 'react';
import {
  SegmentedControl, type SegmentedControlProps, type SegmentedControlItemProps,
  type SegmentedControlListProps, type SegmentedControlRef, type SegmentedControlListRef,
  type SegmentedControlItemRef, type SegmentedControlLabelRef,
} from '@nh-kng/react-native-heroui';
import { SegmentedControl as Subpath } from '@nh-kng/react-native-heroui/segmented-control';

export const sameExport: typeof SegmentedControl = Subpath;
export const rootRef = createRef<SegmentedControlRef>();
export const listRef = createRef<SegmentedControlListRef>();
export const itemRef = createRef<SegmentedControlItemRef>();
export const labelRef = createRef<SegmentedControlLabelRef>();
export const controlled = (
  <SegmentedControl.Root value="system" onValueChange={(value) => value.toUpperCase()} ref={rootRef}
    webProps={{ 'aria-label': 'Appearance' }} nativeProps={{ accessibilityLabel: 'Appearance' }}>
    <SegmentedControl.List ref={listRef}>
      <SegmentedControl.Item value="system" textValue="System" ref={itemRef}>
        <SegmentedControl.Label ref={labelRef}>System</SegmentedControl.Label>
      </SegmentedControl.Item>
      <SegmentedControl.Item value="light" textValue="Light" isDisabled>
        <SegmentedControl.Label>Light</SegmentedControl.Label>
      </SegmentedControl.Item>
    </SegmentedControl.List>
  </SegmentedControl.Root>
);
export const uncontrolled = <Subpath defaultValue="system" onValueChange={(value) => value.toUpperCase()} />;
export const disabled = <Subpath value="system" isDisabled />;

// @ts-expect-error Supply a controlled value or an initial defaultValue.
export const noInitialValue = <SegmentedControl />;
// @ts-expect-error Controlled and uncontrolled initial values are mutually exclusive.
export const conflictingValues = <SegmentedControl value="light" defaultValue="dark" />;
// @ts-expect-error Item identity is a shared string value.
export const numericValue = <SegmentedControl.Item value={1} textValue="One" />;
// @ts-expect-error Rich content still requires a textValue.
export const missingTextValue = <SegmentedControl.Item value="light" />;
// @ts-expect-error The adapter owns selection mode.
export const webSelection: SegmentedControlProps = { value: 'light', webProps: { selectionMode: 'multiple' } };
// @ts-expect-error The adapter owns selected keys.
export const nativeSelection: SegmentedControlProps = { value: 'light', nativeProps: { selectedKeys: new Set(['dark']) } };
// @ts-expect-error Platform props cannot replace the public ref.
export const webRef: SegmentedControlProps = { value: 'light', webProps: { ref: null } };
// @ts-expect-error Platform props cannot replace the public className.
export const nativeClassName: SegmentedControlProps = { value: 'light', nativeProps: { className: 'hidden' } };
// @ts-expect-error Platform props cannot re-enable a disabled item.
export const itemDisabled: SegmentedControlItemProps = { value: 'light', textValue: 'Light', webProps: { isDisabled: false } };
// @ts-expect-error Platform props cannot replace item identity.
export const itemId: SegmentedControlItemProps = { value: 'light', textValue: 'Light', nativeProps: { id: 'dark' } };
// @ts-expect-error Platform props cannot replace the collection children.
export const listChildren: SegmentedControlListProps = { webProps: { children: 'Other' } };

// @ts-expect-error Native disabled state is owned by the direct isDisabled prop.
export const nativeDisabled: SegmentedControlItemProps = { value: 'light', textValue: 'Light', nativeProps: { disabled: false } };
