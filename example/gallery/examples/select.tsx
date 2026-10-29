import { Label, Select, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function SelectExamples() {
  const [value, setValue] = useState<string | undefined>('design');
  const items = [
    { value: 'design', label: 'Design' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'research', label: 'Research', isDisabled: true },
  ];
  return (
    <>
      <PreviewSection title="Choose a team">
        <Select
          items={items}
          value={value}
          onValueChange={setValue}
          webProps={{ 'aria-label': 'Project team' }}>
          <Label>Project team</Label>
          <Select.Trigger>
            <Select.Value placeholder="Choose a team" />
          </Select.Trigger>
          <Select.Content>
            {items.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                label={item.label}
                isDisabled={item.isDisabled}
              />
            ))}
          </Select.Content>
        </Select>
        <Typography.Paragraph>Selected: {value || 'none'}</Typography.Paragraph>
      </PreviewSection>
      <PreviewSection title="Disabled">
        <Select
          items={items}
          defaultValue="design"
          isDisabled
          webProps={{ 'aria-label': 'Archived team' }}>
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {items.map((item) => (
              <Select.Item key={item.value} value={item.value} label={item.label} />
            ))}
          </Select.Content>
        </Select>
      </PreviewSection>
    </>
  );
}
