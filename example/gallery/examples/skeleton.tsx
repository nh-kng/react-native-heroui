import { Button, Label, Skeleton, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function SkeletonExamples() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <PreviewSection title="Loading content">
        <Skeleton isLoading={loading} className="h-20 w-full rounded-xl">
          <Typography.Paragraph>Your project is ready.</Typography.Paragraph>
        </Skeleton>
        <Button onPress={() => setLoading(!loading)}>
          <Button.Label>{loading ? 'Show content' : 'Load again'}</Button.Label>
        </Button>
      </PreviewSection>
    </>
  );
}
