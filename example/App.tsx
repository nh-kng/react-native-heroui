import {
  Button,
  Card,
  Chip,
  Description,
  FieldError,
  HeroUIProvider,
  Input,
  Label,
  TextField,
  Typography,
  type ColorScheme,
} from '@nh-kng/react-native-heroui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import './global.css';

const themes: ColorScheme[] = ['system', 'light', 'dark'];

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

interface GalleryProps {
  colorScheme: ColorScheme;
  onColorSchemeChange: (colorScheme: ColorScheme) => void;
}

function Gallery({ colorScheme, onColorSchemeChange }: GalleryProps) {
  const [pressCount, setPressCount] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState('');
  const emailIsInvalid = email.length > 0 && !email.includes('@');

  return (
    <SafeAreaView className="flex-1 bg-background" style={styles.fill}>
      <ScrollView contentContainerStyle={styles.content}>
        <View className="gap-8">
          <View className="gap-3">
            <Typography.Heading type="h1" className="text-foreground">
              HeroUI for native and web
            </Typography.Heading>
            <Typography.Paragraph color="muted">
              Shared components backed by HeroUI React on web and HeroUI Native on iOS and Android.
            </Typography.Paragraph>
          </View>

          <View className="gap-3">
            <Typography.Heading type="h2">Color scheme</Typography.Heading>
            <View className="flex-row flex-wrap gap-2">
              {themes.map((theme) => (
                <Button
                  key={theme}
                  size="sm"
                  variant={colorScheme === theme ? 'primary' : 'secondary'}
                  onPress={() => onColorSchemeChange(theme)}>
                  <Button.Label>{theme}</Button.Label>
                </Button>
              ))}
            </View>
          </View>

          <View className="gap-3">
            <Typography.Heading type="h2">Buttons</Typography.Heading>
            <View className="flex-row flex-wrap gap-2">
              <Button onPress={() => setPressCount((count) => count + 1)}>
                <Button.Label>Press count: {pressCount}</Button.Label>
              </Button>
              <Button variant="secondary">
                <Button.Label>Secondary</Button.Label>
              </Button>
              <Button size="sm" isDisabled>
                <Button.Label>Disabled</Button.Label>
              </Button>
              <Button isLoading={isPending}>
                <Button.Label>Pending example</Button.Label>
              </Button>
              <Button variant="secondary" onPress={() => setIsPending((pending) => !pending)}>
                <Button.Label>Toggle pending</Button.Label>
              </Button>
            </View>
            <Typography.Paragraph color="muted">
              Pending state disables activation and marks the control busy. It does not add a
              spinner.
            </Typography.Paragraph>
          </View>

          <Card className="w-full">
            <Card.Header>
              <Card.Title>Compound card</Card.Title>
              <Card.Description>
                Card.Body maps to HeroUI React Card.Content on web.
              </Card.Description>
            </Card.Header>
            <Card.Body className="gap-3">
              <Typography.Paragraph>
                The component keeps the upstream card structure and lets each part receive platform
                props.
              </Typography.Paragraph>
              <Typography.Code>Typography.Code</Typography.Code>
              <Chip color="success" variant="soft"><Chip.Label>Shared styles</Chip.Label></Chip>
            </Card.Body>
            <Card.Footer>
              <Button size="sm" className="w-full">
                <Button.Label>Card action</Button.Label>
              </Button>
            </Card.Footer>
          </Card>

          <View className="gap-3">
            <Typography.Heading type="h2">Typography</Typography.Heading>
            <Typography.Heading type="h3">Heading levels map across platforms</Typography.Heading>
            <Typography.Paragraph type="body-sm" color="muted">
              Paragraph sizes and semantic heading types keep the same names in the adapter API.
            </Typography.Paragraph>
            <Typography.Code>Typography.Code</Typography.Code>
              <Chip color="success" variant="soft"><Chip.Label>Shared styles</Chip.Label></Chip>
          </View>

          <View className="gap-3">
            <Typography.Heading type="h2">Fields and validation</Typography.Heading>
            <TextField isInvalid={emailIsInvalid} isRequired>
              <Label>Email address</Label>
              <Input
                className="w-full"
                keyboardType="email-address"
                isInvalid={emailIsInvalid}
                onChangeText={setEmail}
                placeholder="you@example.com"
                value={email}
              />
              <Description>Enter an address that includes @.</Description>
              <FieldError>Enter a valid email address.</FieldError>
            </TextField>

            <TextField
              webProps={Platform.OS === 'web' ? { defaultValue: 'Initial value' } : undefined}>
              <Label>Uncontrolled input</Label>
              <Input defaultValue={Platform.OS === 'web' ? undefined : 'Initial value'} />
              <Description>This field uses defaultValue instead of value.</Description>
            </TextField>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { padding: 24, maxWidth: 920, width: '100%', alignSelf: 'center' },
});
