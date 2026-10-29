import {
  Button,
  PressableFeedback,
  Typography,
  type ColorScheme,
} from '@nh-kng/react-native-heroui';
import { Platform, ScrollView, View } from 'react-native';

const navigationItemHeight = Platform.OS === 'web' ? 'h-10 md:h-9' : 'h-12';

export const components = [
  'Accordion',
  'Alert',
  'Avatar',
  'Button',
  'Card',
  'Checkbox',
  'Chip',
  'CloseButton',
  'Description',
  'FieldError',
  'Input',
  'InputGroup',
  'InputOTP',
  'Label',
  'LoadingText',
  'Markdown',
  'Popover',
  'PressableFeedback',
  'RadioGroup',
  'ScrollShadow',
  'SearchField',
  'Select',
  'Separator',
  'Skeleton',
  'Slider',
  'Spinner',
  'Surface',
  'Switch',
  'Tabs',
  'TagGroup',
  'TextArea',
  'TextField',
  'Toast',
  'Typography',
] as const;
export type ComponentName = (typeof components)[number];

export interface ThemeControlsProps {
  colorScheme: ColorScheme;
  onColorSchemeChange: (scheme: ColorScheme) => void;
}

interface NavigationProps extends ThemeControlsProps {
  selected: ComponentName;
  onSelect: (name: ComponentName) => void;
}

export function Navigation({
  selected,
  onSelect,
  colorScheme,
  onColorSchemeChange,
}: NavigationProps) {
  return (
    <ScrollView className="heroui-scrollbar" contentContainerStyle={{ padding: 16, gap: 24 }}>
      <View className="gap-2">
        <Typography.Paragraph type="body-sm" weight="medium">
          Components
        </Typography.Paragraph>
        {components.map((name) => (
          <PressableFeedback
            key={name}
            nativeProps={{ 'aria-selected': selected === name }}
            webProps={{ 'aria-current': selected === name ? 'page' : undefined }}
            onPress={() => onSelect(name)}
            className={
              selected === name
                ? `w-full ${navigationItemHeight} justify-center rounded-xl bg-surface px-3`
                : `w-full ${navigationItemHeight} justify-center rounded-xl px-3`
            }>
            <PressableFeedback.Highlight />
            <Typography.Paragraph color={selected === name ? 'default' : 'muted'}>
              {name}
            </Typography.Paragraph>
          </PressableFeedback>
        ))}
      </View>
      <View className="gap-3 border-t border-border pt-4">
        <Typography.Paragraph type="body-sm" color="muted">
          Appearance
        </Typography.Paragraph>
        <View className="flex-row flex-wrap gap-2">
          {(['system', 'light', 'dark'] as const).map((scheme) => (
            <Button
              key={scheme}
              size="sm"
              variant={colorScheme === scheme ? 'primary' : 'secondary'}
              onPress={() => onColorSchemeChange(scheme)}>
              <Button.Label>{scheme}</Button.Label>
            </Button>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
