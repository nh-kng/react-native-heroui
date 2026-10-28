import { Typography } from '@nh-kng/react-native-heroui';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export function PreviewSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-4">
      <Typography.Heading type="h2">{title}</Typography.Heading>
      <View className="rounded-2xl border border-border px-4 py-10" style={styles.preview}>
        <View className="w-full gap-6" style={styles.examples}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: { minHeight: 280, alignItems: 'center', justifyContent: 'center' },
  examples: { maxWidth: 480 },
});
