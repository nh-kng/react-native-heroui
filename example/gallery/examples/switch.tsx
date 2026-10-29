import { Switch, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function SwitchExamples() {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <PreviewSection title="Controlled">
        <Switch
          isSelected={selected}
          onSelectedChange={setSelected}
          webProps={{ 'aria-label': 'Notifications' }}
          nativeProps={{ accessibilityLabel: 'Notifications' }}>
          <Switch.Thumb />
        </Switch>
        <Typography.Paragraph>
          Notifications {selected ? 'enabled' : 'disabled'}
        </Typography.Paragraph>
      </PreviewSection>
      <PreviewSection title="Default and disabled">
        <Switch
          defaultSelected
          webProps={{ 'aria-label': 'Enabled by default' }}
          nativeProps={{ accessibilityLabel: 'Enabled by default' }}>
          <Switch.Thumb />
        </Switch>
        <Switch
          isDisabled
          defaultSelected
          webProps={{ 'aria-label': 'Unavailable' }}
          nativeProps={{ accessibilityLabel: 'Unavailable' }}>
          <Switch.Thumb />
        </Switch>
      </PreviewSection>
    </>
  );
}
