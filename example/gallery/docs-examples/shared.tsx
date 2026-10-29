import type { ReactNode } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';

export function Row({ children }: { children: ReactNode }) {
  return <View className="flex-row flex-wrap items-center gap-3">{children}</View>;
}

export function Glyph({ children }: { children: ReactNode }) {
  return <Text className="text-base text-foreground">{children}</Text>;
}

export const colors = ['default', 'accent', 'success', 'warning', 'danger'] as const;
export const sizes = ['sm', 'md', 'lg'] as const;
export const variants = ['primary', 'secondary', 'tertiary', 'soft'] as const;
export type DemoProps = { id: string };

export function NativeHorizontalScroller({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  return Platform.OS === 'web' || !enabled ? (
    <>{children}</>
  ) : (
    <ScrollView horizontal style={{ flexGrow: 0 }}>
      {children}
    </ScrollView>
  );
}
