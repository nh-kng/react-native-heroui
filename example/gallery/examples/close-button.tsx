import { Button, CloseButton, Label, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { View } from 'react-native';
import { PreviewSection } from '../preview-section';
export function CloseButtonExamples() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <PreviewSection title="Dismiss a message">
        {visible ? (
          <View className="flex-row items-center gap-4">
            <Typography.Paragraph>Welcome to your workspace.</Typography.Paragraph>
            <CloseButton onPress={() => setVisible(false)} />
          </View>
        ) : (
          <Button onPress={() => setVisible(true)}>
            <Button.Label>Show message again</Button.Label>
          </Button>
        )}
      </PreviewSection>
      <PreviewSection title="Disabled">
        <CloseButton isDisabled />
      </PreviewSection>
    </>
  );
}
