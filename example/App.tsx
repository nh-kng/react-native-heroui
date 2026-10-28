import { HeroUIProvider, type ColorScheme } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Gallery } from './gallery/gallery';
import './global.css';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('system');
  return (
    <GestureHandlerRootView style={styles.fill}>
      <SafeAreaProvider>
        <HeroUIProvider colorScheme={colorScheme}>
          <Gallery colorScheme={colorScheme} onColorSchemeChange={setColorScheme} />
        </HeroUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
