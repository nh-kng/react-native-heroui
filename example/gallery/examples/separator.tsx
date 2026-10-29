import { Separator, Typography } from '@nh-kng/react-native-heroui';
import { View } from 'react-native';
import { PreviewSection } from '../preview-section';
export function SeparatorExamples() {
  return (
    <>
      <PreviewSection title="Horizontal">
        <Typography.Paragraph>Account</Typography.Paragraph>
        <Separator />
        <Typography.Paragraph>Preferences</Typography.Paragraph>
      </PreviewSection>
      <PreviewSection title="Vertical">
        <View className="h-12 flex-row items-stretch gap-4">
          <Typography.Paragraph>Today</Typography.Paragraph>
          <Separator orientation="vertical" />
          <Typography.Paragraph>This week</Typography.Paragraph>
        </View>
      </PreviewSection>
    </>
  );
}
