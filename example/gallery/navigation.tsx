import {
  PressableFeedback,
  SegmentedControl,
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
  'SegmentedControl',
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
    <View style={{ flex: 1, minHeight: 0 }}>
      <ScrollView className="heroui-scrollbar" style={{ flex: 1, minHeight: 0 }} contentContainerStyle={{ padding: 16 }}>
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
      </ScrollView>
      <View className="gap-3 border-t border-border p-4">
        <Typography.Paragraph type="body-sm" color="muted">
          Appearance
        </Typography.Paragraph>
        <SegmentedControl
          className="w-full"
          value={colorScheme}
          onValueChange={(scheme) => {
            if (scheme === 'system' || scheme === 'light' || scheme === 'dark') onColorSchemeChange(scheme);
          }}
          webProps={{ 'aria-label': 'Appearance' }}
          nativeProps={{ accessibilityLabel: 'Appearance' }}>
          <SegmentedControl.List>
            {(['system', 'light', 'dark'] as const).map((scheme) => (
              <SegmentedControl.Item key={scheme} value={scheme} textValue={scheme} className="flex-1 px-2">
                <SegmentedControl.Label>{scheme}</SegmentedControl.Label>
              </SegmentedControl.Item>
            ))}
          </SegmentedControl.List>
        </SegmentedControl>
      </View>
    </View>
  );
}
