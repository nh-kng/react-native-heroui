import { Button, Typography } from '@nh-kng/react-native-heroui';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ComponentExamples } from './component-examples';
import { Navigation, type ComponentName, type ThemeControlsProps } from './navigation';

export function Gallery(props: ThemeControlsProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const [selected, setSelected] = useState<ComponentName>('Button');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (isWide) setDrawerOpen(false);
  }, [isWide]);

  const closeDrawer = () => setDrawerOpen(false);
  const navigation = (
    <Navigation
      {...props}
      selected={selected}
      onSelect={(name) => {
        setSelected(name);
        closeDrawer();
      }}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-background" style={styles.fill}>
      {!isWide && (
        <View className="flex-row items-center gap-4 border-b border-border px-4 py-3">
          <Button
            size="sm"
            variant="secondary"
            webProps={{ 'aria-haspopup': 'dialog', 'aria-expanded': drawerOpen }}
            nativeProps={{ accessibilityHint: 'Open component navigation' }}
            onPress={() => setDrawerOpen(true)}>
            <Button.Label>Menu</Button.Label>
          </Button>
          <Typography.Paragraph weight="medium">{selected}</Typography.Paragraph>
        </View>
      )}
      <View style={styles.body}>
        {isWide && <View style={styles.sidebar}>{navigation}</View>}
        <ScrollView key={selected} style={styles.fill} contentContainerStyle={styles.content}>
          <View
            className="gap-8"
            style={[
              styles.page,
              { paddingHorizontal: isWide ? 32 : 16, paddingTop: isWide ? 32 : 24 },
            ]}>
            <Typography.Heading type="h1">{selected}</Typography.Heading>
            <ComponentExamples name={selected} />
          </View>
        </ScrollView>
      </View>
      <Modal
        accessibilityLabel="Component navigation"
        visible={drawerOpen && !isWide}
        transparent
        animationType="fade"
        onRequestClose={closeDrawer}>
        <View style={styles.fill}>
          <Pressable
            accessible={false}
            focusable={false}
            importantForAccessibility="no"
            className="bg-backdrop/60"
            style={StyleSheet.absoluteFill}
            onPress={closeDrawer}
          />
          <SafeAreaView
            accessibilityViewIsModal
            className="bg-background"
            style={[styles.drawer, { width: Math.min(320, width - 32) }]}>
            <View className="flex-row items-center justify-between gap-2 px-4 py-3">
              <Typography.Heading type="h2">Components</Typography.Heading>
              <Button size="sm" variant="secondary" onPress={closeDrawer}>
                <Button.Label>Close</Button.Label>
              </Button>
            </View>
            {navigation}
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, minWidth: 0, minHeight: 0 },
  body: { flex: 1, flexDirection: 'row', minHeight: 0 },
  sidebar: { width: 240 },
  content: { flexGrow: 1 },
  page: { width: '100%', maxWidth: 960, alignSelf: 'center', paddingBottom: 64 },
  drawer: { flex: 1 },
});
