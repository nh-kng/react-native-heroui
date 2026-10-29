import { Checkbox, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { View } from 'react-native';
import { PreviewSection } from '../preview-section';
export function CheckboxExamples() {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <PreviewSection title="Controlled">
        <View className="flex-row items-center gap-3">
          <Checkbox
            isSelected={selected}
            onSelectedChange={setSelected}
            webProps={{ 'aria-label': 'Receive updates' }}
            nativeProps={{ accessibilityLabel: 'Receive updates' }}>
            <Checkbox.Indicator />
          </Checkbox>
          <Typography.Paragraph>Receive updates: {selected ? 'yes' : 'no'}</Typography.Paragraph>
        </View>
      </PreviewSection>
      <PreviewSection title="Default, disabled, and invalid">
        <Checkbox
          defaultSelected
          webProps={{ 'aria-label': 'Initially selected' }}
          nativeProps={{ accessibilityLabel: 'Initially selected' }}>
          <Checkbox.Indicator />
        </Checkbox>
        <Checkbox
          isDisabled
          defaultSelected
          webProps={{ 'aria-label': 'Unavailable' }}
          nativeProps={{ accessibilityLabel: 'Unavailable' }}>
          <Checkbox.Indicator />
        </Checkbox>
        <Checkbox
          isInvalid
          webProps={{ 'aria-label': 'Required agreement' }}
          nativeProps={{ accessibilityLabel: 'Required agreement' }}>
          <Checkbox.Indicator />
        </Checkbox>
      </PreviewSection>
    </>
  );
}
