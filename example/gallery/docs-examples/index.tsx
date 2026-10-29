import { Button, Description, Typography } from '@nh-kng/react-native-heroui';
import type { ComponentType } from 'react';
import { Linking, View } from 'react-native';

import type { ComponentName } from '../navigation';
import { PreviewSection } from '../preview-section';
import {
  ButtonDemo,
  CheckboxDemo,
  CloseButtonDemo,
  RadioGroupDemo,
  SliderDemo,
  SwitchDemo,
} from './actions';
import { docsExamples, type DocsComponentName } from './catalog';
import {
  AccordionDemo,
  PopoverDemo,
  ScrollShadowDemo,
  SelectDemo,
  TabsDemo,
  TagGroupDemo,
  ToastDemo,
} from './collections';
import {
  AlertDemo,
  AvatarDemo,
  CardDemo,
  ChipDemo,
  SeparatorDemo,
  SkeletonDemo,
  SpinnerDemo,
  SurfaceDemo,
  TypographyDemo,
} from './content';
import { InputGroupDemo, OTPDemo, SearchDemo, TextDemo } from './fields';
import { limitations } from './limitations';
import { exampleNotes } from './notes';
import type { DemoProps } from './shared';

const renderers = {
  Accordion: AccordionDemo,
  Alert: AlertDemo,
  Avatar: AvatarDemo,
  Button: ButtonDemo,
  Card: CardDemo,
  Checkbox: CheckboxDemo,
  Chip: ChipDemo,
  CloseButton: CloseButtonDemo,
  Description: TextDemo,
  FieldError: TextDemo,
  Input: TextDemo,
  InputGroup: InputGroupDemo,
  InputOTP: OTPDemo,
  Label: TextDemo,
  Popover: PopoverDemo,
  RadioGroup: RadioGroupDemo,
  ScrollShadow: ScrollShadowDemo,
  SearchField: SearchDemo,
  Select: SelectDemo,
  Separator: SeparatorDemo,
  Skeleton: SkeletonDemo,
  Slider: SliderDemo,
  Spinner: SpinnerDemo,
  Surface: SurfaceDemo,
  Switch: SwitchDemo,
  Tabs: TabsDemo,
  TagGroup: TagGroupDemo,
  TextArea: TextDemo,
  TextField: TextDemo,
  Toast: ToastDemo,
  Typography: TypographyDemo,
} satisfies Record<DocsComponentName, ComponentType<DemoProps>>;

export function DocsExamples({ name }: { name: Exclude<ComponentName, 'PressableFeedback' | 'Markdown' | 'LoadingText' | 'SegmentedControl'> }) {
  const page = docsExamples[name];
  const Demo = renderers[name];
  const available = page.examples.filter((example) => !limitations[example.id]);
  const unavailable = page.examples.filter((example) => limitations[example.id]);
  return (
    <>
      <Description>
        Examples adapted from the HeroUI React documentation to this package's public API.
      </Description>
      <Button
        variant="secondary"
        onPress={() =>
          void Linking.openURL(`https://heroui.com/en/docs/react/components/${page.slug}`)
        }>
        <Button.Label>HeroUI {name} examples</Button.Label>
      </Button>
      {available.map((example) => (
        <PreviewSection
          key={example.id}
          title={
            example.title === 'Usage'
              ? 'Usage'
              : example.title === 'Tailwind CSS'
                ? 'Custom styles'
                : example.title
          }>
          <View
            className={
              [
                'Description',
                'FieldError',
                'Input',
                'InputGroup',
                'InputOTP',
                'Label',
                'SearchField',
                'Select',
                'TextArea',
                'TextField',
              ].includes(name) && !example.id.includes('full-width')
                ? 'w-full max-w-72 self-center gap-4'
                : 'w-full gap-4'
            }>
            <Demo id={example.id} />
          </View>
          {exampleNotes[example.id] && <Description>{exampleNotes[example.id]}</Description>}
        </PreviewSection>
      ))}
      {unavailable.length > 0 && (
        <View className="gap-4">
          <Typography.Heading type="h2">Upstream API differences</Typography.Heading>
          {unavailable.map((example) => (
            <View key={example.id} className="gap-1">
              <Typography.Paragraph weight="medium">{example.title}</Typography.Paragraph>
              <Description>{limitations[example.id]}</Description>
            </View>
          ))}
        </View>
      )}
    </>
  );
}
