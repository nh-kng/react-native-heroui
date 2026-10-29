import { Button, Label, Popover, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function PopoverExamples() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewSection title="Controlled popover">
      <Popover isOpen={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button>
            <Button.Label>Project details</Button.Label>
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Arrow />
          <Typography.Heading type="h3">Summer collection</Typography.Heading>
          <Typography.Paragraph>Your next launch is taking shape.</Typography.Paragraph>
          <Button onPress={() => setOpen(false)}>
            <Button.Label>Close details</Button.Label>
          </Button>
        </Popover.Content>
      </Popover>
      <Typography.Paragraph>{open ? 'Details open' : 'Details closed'}</Typography.Paragraph>
    </PreviewSection>
  );
}
