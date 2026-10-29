import { Accordion, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function AccordionExamples() {
  const [keys, setKeys] = useState<Set<string>>(new Set(['first']));
  return (
    <>
      <PreviewSection title="Controlled expansion">
        <Accordion expandedKeys={keys} onExpandedChange={setKeys}>
          {['first', 'second'].map((value) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger>
                <Typography.Paragraph>{value} question</Typography.Paragraph>
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                <Typography.Paragraph>
                  Compose shared components with platform-specific behavior.
                </Typography.Paragraph>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
        <Typography.Paragraph>
          Expanded: {Array.from(keys).join(', ') || 'none'}
        </Typography.Paragraph>
      </PreviewSection>
      <PreviewSection title="Multiple and disabled">
        <Accordion selectionMode="multiple" defaultExpandedKeys={new Set(['one', 'two'])}>
          {['one', 'two', 'three'].map((value) => (
            <Accordion.Item key={value} value={value} isDisabled={value === 'three'}>
              <Accordion.Trigger>
                <Typography.Paragraph>{value}</Typography.Paragraph>
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                <Typography.Paragraph>More details for {value}.</Typography.Paragraph>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </PreviewSection>
    </>
  );
}
