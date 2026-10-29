import { Button, Label, ScrollShadow, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { ScrollView, Platform } from 'react-native';
import { PreviewSection } from '../preview-section';
export function ScrollShadowExamples() {
  const [enabled, setEnabled] = useState(true);
  return (
    <PreviewSection title="Scrollable content">
      <ScrollShadow className="h-48 w-full" isEnabled={enabled}>
        <ScrollView
          scrollEnabled={Platform.OS !== 'web'}
          style={Platform.OS === 'web' ? { flex: undefined } : { height: 192 }}>
          {Array.from({ length: 15 }, (_, i) => (
            <Typography.Paragraph key={i} className="py-3">
              Project {i + 1}
            </Typography.Paragraph>
          ))}
        </ScrollView>
      </ScrollShadow>
      <Button onPress={() => setEnabled(!enabled)}>
        <Button.Label>{enabled ? 'Disable shadows' : 'Enable shadows'}</Button.Label>
      </Button>
    </PreviewSection>
  );
}
