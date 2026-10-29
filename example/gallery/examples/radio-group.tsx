import { RadioGroup, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function RadioGroupExamples() {
  const [value, setValue] = useState('weekly');
  return (
    <>
      <PreviewSection title="Notification frequency">
        <RadioGroup
          value={value}
          onValueChange={setValue}
          webProps={{ 'aria-label': 'Notification frequency' }}
          nativeProps={{ accessibilityLabel: 'Notification frequency' }}>
          <RadioGroup.Item value="daily">Daily</RadioGroup.Item>
          <RadioGroup.Item value="weekly">Weekly</RadioGroup.Item>
          <RadioGroup.Item value="never" isDisabled>
            Never (unavailable)
          </RadioGroup.Item>
        </RadioGroup>
        <Typography.Paragraph>Selected: {value}</Typography.Paragraph>
      </PreviewSection>
      <PreviewSection title="Disabled and invalid">
        <RadioGroup
          defaultValue="one"
          isDisabled
          isInvalid
          webProps={{ 'aria-label': 'Unavailable choice' }}>
          <RadioGroup.Item value="one">One</RadioGroup.Item>
        </RadioGroup>
      </PreviewSection>
    </>
  );
}
