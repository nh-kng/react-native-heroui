import { Tabs, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function TabsExamples() {
  const [value, setValue] = useState('overview');
  return (
    <PreviewSection title="Project tabs">
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Indicator />
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="activity">Activity</Tabs.Tab>
          <Tabs.Tab value="settings" isDisabled>
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">
          <Typography.Paragraph>Your project overview.</Typography.Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="activity">
          <Typography.Paragraph>No new activity today.</Typography.Paragraph>
        </Tabs.Panel>
      </Tabs>
      <Typography.Paragraph>Selected: {value}</Typography.Paragraph>
    </PreviewSection>
  );
}
