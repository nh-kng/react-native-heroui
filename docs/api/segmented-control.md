# SegmentedControl

`SegmentedControl` is a package-authored control that combines primary Tabs styling with single TagGroup selection. It changes a setting or filter without creating tab panels. Import it from `@nh-kng/react-native-heroui` or `@nh-kng/react-native-heroui/segmented-control`.

```tsx
import { SegmentedControl } from '@nh-kng/react-native-heroui';
import { useState } from 'react';

function Appearance() {
  const [value, setValue] = useState('system');
  return (
    <SegmentedControl
      value={value}
      onValueChange={setValue}
      className="w-full"
      webProps={{ 'aria-label': 'Appearance' }}
      nativeProps={{ accessibilityLabel: 'Appearance' }}>
      <SegmentedControl.List>
        {['system', 'light', 'dark'].map((scheme) => (
          <SegmentedControl.Item key={scheme} value={scheme} textValue={scheme} className="flex-1">
            <SegmentedControl.Label>{scheme}</SegmentedControl.Label>
          </SegmentedControl.Item>
        ))}
      </SegmentedControl.List>
    </SegmentedControl>
  );
}
```

## API

- `SegmentedControl` and `SegmentedControl.Root` are the same component. Supply either a controlled string `value` or an uncontrolled initial `defaultValue`; the type contract requires one and excludes supplying both. `onValueChange(value)` reports a different selected item. `isDisabled` disables the entire control. `children`, `className`, `webProps`, and `nativeProps` follow the other adapters.
- `SegmentedControl.List` contains the items in a horizontal, non-wrapping row. Its track and decorative indicator are automatic. Use one list per control.
- `SegmentedControl.Item` requires a unique string `value` and an accessible `textValue`, including when its children contain icons. `isDisabled` disables an individual item. Use `className="flex-1"` on each item with a full-width root for equal-width segments.
- `SegmentedControl.Label` renders item text on both platforms: a span on web and native text within the TagGroup item context. Icons can be siblings of the label; mark decorative icons as hidden from accessibility.

Every compound part accepts `className`, typed `webProps` and `nativeProps`, and its platform-specific ref. Platform props exclude adapter-owned selection, identities, children, classes, refs, and accessibility state. Root refs point to the underlying TagGroup host; the web root has an additional outer track wrapper. Native props target the owned native TagGroup components, while web root/list/item props target React Aria's public TagGroup, TagList, and Tag APIs.

## Selection and platform behavior

The initial value and every subsequent controlled value must match a rendered item. Keep the selected item mounted; if replacing the available options, update the controlled value to an available item in the same render. There is no implicit first-item selection or fallback. Pressing the selected item leaves it selected and emits no callback. Empty TagGroup selection requests are ignored, and multiple selection and removal are not exposed.

On web, React Aria supplies TagGroup collection, focus, keyboard, typeahead, and selection semantics. Root disabling is passed to each item because the pinned React Aria TagGroup has no group-level `isDisabled` prop. Native preserves the owned native TagGroup's list/listitem roles, press behavior, selected accessibility state, and disabled behavior. These are selectable items rather than tablist/tab/tabpanel associations; native does not acquire browser keyboard behavior.

The indicator uses Tabs' default track, segment, segment-foreground, muted, radius, and shadow tokens. Browser item refs and ResizeObserver refresh its relative bounds; native list/item layout events refresh its position and size. Initial positioning is immediate, later changes animate for 250 ms, and system reduced-motion preferences disable movement. Native also honors the provider's animation-disabled state. Web emits no visible indicator before client measurement. Native rebases the measured left-origin position when app-wide RTL mirrors the indicator anchor; a provider direction setting alone does not trigger that correction.

The Expo example uses the existing theme state for System, Light, and Dark. Appearance sits in a bottom footer outside the component navigation ScrollView on desktop and in the mobile drawer, within the gallery's existing safe-area layout. Theme selection does not navigate or close the drawer.

## Verification boundary

Non-rendering tests cover selection conversion, ignored empty and repeated selections, indicator geometry, and package exports. Native and web TypeScript fixtures cover the public contract and forbidden platform overrides. These checks do not establish visual parity, animation quality, runtime accessibility, or native compilation; browser and device checks require an explicit request under the repository's verification rules.
