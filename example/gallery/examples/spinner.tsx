import { Button, Label, Spinner } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { View } from 'react-native';
import { PreviewSection } from '../preview-section';
export function SpinnerExamples() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <PreviewSection title="Sizes and colors">
        <View className="flex-row gap-5">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Spinner key={size} size={size} />
          ))}
        </View>
        <View className="flex-row gap-5">
          {(['accent', 'success', 'warning', 'danger'] as const).map((color) => (
            <Spinner key={color} color={color} />
          ))}
        </View>
      </PreviewSection>
      <PreviewSection title="Loading state">
        <Spinner isLoading={loading} />
        <Button onPress={() => setLoading(!loading)}>
          <Button.Label>{loading ? 'Finish loading' : 'Load again'}</Button.Label>
        </Button>
      </PreviewSection>
    </>
  );
}
