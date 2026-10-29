import { SegmentedControl, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { Text } from 'react-native';

import { PreviewSection } from '../preview-section';

const reports = ['Overview', 'Analytics', 'Reports'] as const;

export function SegmentedControlExamples() {
  const [value, setValue] = useState('Analytics');
  return (
    <>
      <Typography.Paragraph color="muted">
        Package-authored examples: Tabs styling with single TagGroup selection. One option stays selected.
      </Typography.Paragraph>
      <PreviewSection title="Controlled selection">
        <SegmentedControl value={value} onValueChange={setValue} className="w-full"
          webProps={{ 'aria-label': 'Report view' }} nativeProps={{ accessibilityLabel: 'Report view' }}>
          <SegmentedControl.List>
            {reports.map((name) => (
              <SegmentedControl.Item key={name} value={name} textValue={name} className="flex-1">
                <SegmentedControl.Label>{name}</SegmentedControl.Label>
              </SegmentedControl.Item>
            ))}
          </SegmentedControl.List>
        </SegmentedControl>
        <Typography.Paragraph color="muted">Selected: {value}</Typography.Paragraph>
      </PreviewSection>
      <PreviewSection title="Uncontrolled selection with icons">
        <SegmentedControl defaultValue="news"
          webProps={{ 'aria-label': 'Topic' }} nativeProps={{ accessibilityLabel: 'Topic' }}>
          <SegmentedControl.List>
            {[
              { value: 'news', label: 'News', icon: '▤' },
              { value: 'travel', label: 'Travel', icon: '◎' },
              { value: 'gaming', label: 'Gaming', icon: '♧' },
            ].map((item) => (
              <SegmentedControl.Item key={item.value} value={item.value} textValue={item.label}>
                <Text accessibilityElementsHidden importantForAccessibility="no" aria-hidden>{item.icon}</Text>
                <SegmentedControl.Label>{item.label}</SegmentedControl.Label>
              </SegmentedControl.Item>
            ))}
          </SegmentedControl.List>
        </SegmentedControl>
      </PreviewSection>
      <PreviewSection title="Disabled item">
        <SegmentedControl defaultValue="Overview"
          webProps={{ 'aria-label': 'Available reports' }} nativeProps={{ accessibilityLabel: 'Available reports' }}>
          <SegmentedControl.List>
            {reports.map((name) => (
              <SegmentedControl.Item key={name} value={name} textValue={name} isDisabled={name === 'Reports'}>
                <SegmentedControl.Label>{name}</SegmentedControl.Label>
              </SegmentedControl.Item>
            ))}
          </SegmentedControl.List>
        </SegmentedControl>
      </PreviewSection>
      <PreviewSection title="Disabled control">
        <SegmentedControl defaultValue="light" isDisabled
          webProps={{ 'aria-label': 'Disabled appearance' }} nativeProps={{ accessibilityLabel: 'Disabled appearance' }}>
          <SegmentedControl.List>
            {['system', 'light', 'dark'].map((scheme) => (
              <SegmentedControl.Item key={scheme} value={scheme} textValue={scheme}>
                <SegmentedControl.Label>{scheme}</SegmentedControl.Label>
              </SegmentedControl.Item>
            ))}
          </SegmentedControl.List>
        </SegmentedControl>
      </PreviewSection>
    </>
  );
}
