import { Input, Label, LoadingText, TextField, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';

import { PreviewSection } from '../preview-section';

export function LoadingTextExamples() {
  const [text, setText] = useState('Thinking');

  return (
    <>
      <Typography.Paragraph color="muted" type="body-sm">
        Package-authored loading labels inspired by Skeleton. These examples are separate from
        HeroUI React documentation coverage. System reduced motion displays static muted text.
      </Typography.Paragraph>
      <PreviewSection title="Loading labels">
        <LoadingText />
        <LoadingText text="Generating response" />
      </PreviewSection>
      <PreviewSection title="Animation variants">
        <LoadingText text="Shimmer" variant="shimmer" />
        <LoadingText text="Pulse" variant="pulse" />
        <LoadingText text="Static" variant="none" />
      </PreviewSection>
      <PreviewSection title="Sizes">
        <LoadingText text="Small" size="sm" />
        <LoadingText text="Medium" size="md" />
        <LoadingText text="Large" size="lg" />
      </PreviewSection>
      <PreviewSection title="Editable label">
        <TextField>
          <Label>Loading label</Label>
          <Input value={text} onChangeText={setText} />
        </TextField>
        <LoadingText text={text} />
      </PreviewSection>
    </>
  );
}
