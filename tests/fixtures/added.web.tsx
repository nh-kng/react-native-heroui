import { createRef, type ComponentRef } from 'react';
import { Accordion } from '@nh-kng/react-native-heroui';
import { Accordion as AccordionSubpath } from '@nh-kng/react-native-heroui/accordion';
export const AccordionSubpathContract: typeof Accordion = AccordionSubpath;
export const AccordionRef = createRef<ComponentRef<typeof Accordion>>();
import { Alert } from '@nh-kng/react-native-heroui';
import { Alert as AlertSubpath } from '@nh-kng/react-native-heroui/alert';
export const AlertSubpathContract: typeof Alert = AlertSubpath;
export const AlertRef = createRef<ComponentRef<typeof Alert>>();
import { Avatar } from '@nh-kng/react-native-heroui';
import { Avatar as AvatarSubpath } from '@nh-kng/react-native-heroui/avatar';
export const AvatarSubpathContract: typeof Avatar = AvatarSubpath;
export const AvatarRef = createRef<ComponentRef<typeof Avatar>>();
import { Checkbox } from '@nh-kng/react-native-heroui';
import { Checkbox as CheckboxSubpath } from '@nh-kng/react-native-heroui/checkbox';
export const CheckboxSubpathContract: typeof Checkbox = CheckboxSubpath;
export const CheckboxRef = createRef<ComponentRef<typeof Checkbox>>();
import { CloseButton } from '@nh-kng/react-native-heroui';
import { CloseButton as CloseButtonSubpath } from '@nh-kng/react-native-heroui/close-button';
export const CloseButtonSubpathContract: typeof CloseButton = CloseButtonSubpath;
export const CloseButtonRef = createRef<ComponentRef<typeof CloseButton>>();
import { InputGroup } from '@nh-kng/react-native-heroui';
import { InputGroup as InputGroupSubpath } from '@nh-kng/react-native-heroui/input-group';
export const InputGroupSubpathContract: typeof InputGroup = InputGroupSubpath;
export const InputGroupRef = createRef<ComponentRef<typeof InputGroup>>();
import { InputOTP } from '@nh-kng/react-native-heroui';
import { InputOTP as InputOTPSubpath } from '@nh-kng/react-native-heroui/input-otp';
export const InputOTPSubpathContract: typeof InputOTP = InputOTPSubpath;
export const InputOTPRef = createRef<ComponentRef<typeof InputOTP>>();
import { Popover } from '@nh-kng/react-native-heroui';
import { Popover as PopoverSubpath } from '@nh-kng/react-native-heroui/popover';
export const PopoverSubpathContract: typeof Popover = PopoverSubpath;
import { RadioGroup } from '@nh-kng/react-native-heroui';
import { RadioGroup as RadioGroupSubpath } from '@nh-kng/react-native-heroui/radio-group';
export const RadioGroupSubpathContract: typeof RadioGroup = RadioGroupSubpath;
export const RadioGroupRef = createRef<ComponentRef<typeof RadioGroup>>();
import { ScrollShadow } from '@nh-kng/react-native-heroui';
import { ScrollShadow as ScrollShadowSubpath } from '@nh-kng/react-native-heroui/scroll-shadow';
export const ScrollShadowSubpathContract: typeof ScrollShadow = ScrollShadowSubpath;
export const ScrollShadowRef = createRef<ComponentRef<typeof ScrollShadow>>();
import { SearchField } from '@nh-kng/react-native-heroui';
import { SearchField as SearchFieldSubpath } from '@nh-kng/react-native-heroui/search-field';
export const SearchFieldSubpathContract: typeof SearchField = SearchFieldSubpath;
export const SearchFieldRef = createRef<ComponentRef<typeof SearchField>>();
import { Select } from '@nh-kng/react-native-heroui';
import { Select as SelectSubpath } from '@nh-kng/react-native-heroui/select';
export const SelectSubpathContract: typeof Select = SelectSubpath;
export const SelectRef = createRef<ComponentRef<typeof Select>>();
import { Separator } from '@nh-kng/react-native-heroui';
import { Separator as SeparatorSubpath } from '@nh-kng/react-native-heroui/separator';
export const SeparatorSubpathContract: typeof Separator = SeparatorSubpath;
export const SeparatorRef = createRef<ComponentRef<typeof Separator>>();
import { Skeleton } from '@nh-kng/react-native-heroui';
import { Skeleton as SkeletonSubpath } from '@nh-kng/react-native-heroui/skeleton';
export const SkeletonSubpathContract: typeof Skeleton = SkeletonSubpath;
import { Slider } from '@nh-kng/react-native-heroui';
import { Slider as SliderSubpath } from '@nh-kng/react-native-heroui/slider';
export const SliderSubpathContract: typeof Slider = SliderSubpath;
export const SliderRef = createRef<ComponentRef<typeof Slider>>();
import { Spinner } from '@nh-kng/react-native-heroui';
import { Spinner as SpinnerSubpath } from '@nh-kng/react-native-heroui/spinner';
export const SpinnerSubpathContract: typeof Spinner = SpinnerSubpath;
export const SpinnerRef = createRef<ComponentRef<typeof Spinner>>();
import { Surface } from '@nh-kng/react-native-heroui';
import { Surface as SurfaceSubpath } from '@nh-kng/react-native-heroui/surface';
export const SurfaceSubpathContract: typeof Surface = SurfaceSubpath;
export const SurfaceRef = createRef<ComponentRef<typeof Surface>>();
import { Switch } from '@nh-kng/react-native-heroui';
import { Switch as SwitchSubpath } from '@nh-kng/react-native-heroui/switch';
export const SwitchSubpathContract: typeof Switch = SwitchSubpath;
export const SwitchRef = createRef<ComponentRef<typeof Switch>>();
import { Tabs } from '@nh-kng/react-native-heroui';
import { Tabs as TabsSubpath } from '@nh-kng/react-native-heroui/tabs';
export const TabsSubpathContract: typeof Tabs = TabsSubpath;
export const TabsRef = createRef<ComponentRef<typeof Tabs>>();
import { TagGroup } from '@nh-kng/react-native-heroui';
import { TagGroup as TagGroupSubpath } from '@nh-kng/react-native-heroui/tag-group';
export const TagGroupSubpathContract: typeof TagGroup = TagGroupSubpath;
export const TagGroupRef = createRef<ComponentRef<typeof TagGroup>>();
import { TextArea } from '@nh-kng/react-native-heroui';
import { TextArea as TextAreaSubpath } from '@nh-kng/react-native-heroui/text-area';
export const TextAreaSubpathContract: typeof TextArea = TextAreaSubpath;
export const TextAreaRef = createRef<ComponentRef<typeof TextArea>>();
import { Toast } from '@nh-kng/react-native-heroui';
import { Toast as ToastSubpath } from '@nh-kng/react-native-heroui/toast';
export const ToastSubpathContract: typeof Toast = ToastSubpath;
export const ToastRef = createRef<ComponentRef<typeof Toast>>();

export function AddedCompositionFixture() {
  return (
    <>
      <Accordion defaultExpandedKeys={new Set(['one'])}>
        <Accordion.Item value="one">
          <Accordion.Trigger>
            Details
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>Content</Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Alert>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Saved</Alert.Title>
          <Alert.Description>Ready</Alert.Description>
        </Alert.Content>
      </Alert>
      <Avatar>
        <Avatar.Image src="data:image/png;base64," alt="Avatar" />
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
      <Checkbox defaultSelected>
        <Checkbox.Indicator />
      </Checkbox>
      <Switch defaultSelected>
        <Switch.Thumb />
      </Switch>
      <RadioGroup defaultValue="one">
        <RadioGroup.Item value="one">One</RadioGroup.Item>
      </RadioGroup>
      <InputGroup>
        <InputGroup.Input placeholder="Budget" />
        <InputGroup.Prefix>$</InputGroup.Prefix>
        <InputGroup.Suffix>USD</InputGroup.Suffix>
      </InputGroup>
      <InputOTP maxLength={2}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Separator />
          <InputOTP.Slot index={1} />
        </InputOTP.Group>
      </InputOTP>
      <SearchField defaultValue="query">
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
      <TextArea defaultValue="Notes" />
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Indicator />
          <Tabs.Tab value="one">One</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">Panel</Tabs.Panel>
      </Tabs>
      <Slider defaultValue={[10, 50]}>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb index={0} />
          <Slider.Thumb index={1} />
        </Slider.Track>
      </Slider>
      <TagGroup>
        <TagGroup.List>
          <TagGroup.Item id="one" textValue="One">
            <TagGroup.Label>One</TagGroup.Label>
            <TagGroup.RemoveButton />
          </TagGroup.Item>
        </TagGroup.List>
      </TagGroup>
      <Select items={[{ value: 'one', label: 'One' }]}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="one" label="One" />
        </Select.Content>
      </Select>
      <Popover>
        <Popover.Trigger>
          <CloseButton />
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Arrow />
          Details
        </Popover.Content>
      </Popover>
      <Surface>
        <Separator />
        <Spinner />
        <Skeleton />
        <CloseButton />
      </Surface>
      <ScrollShadow>
        <div />
      </ScrollShadow>
    </>
  );
}

export function RefFixture() {
  return (
    <>
      <Accordion ref={AccordionRef} />
      <Alert ref={AlertRef} />
      <Avatar ref={AvatarRef} />
      <Checkbox ref={CheckboxRef} />
      <CloseButton ref={CloseButtonRef} />
      <InputGroup ref={InputGroupRef} />
      <InputOTP ref={InputOTPRef} maxLength={2} />
      <RadioGroup ref={RadioGroupRef} />
      <ScrollShadow ref={ScrollShadowRef}>
        <div />
      </ScrollShadow>
      <SearchField ref={SearchFieldRef} />
      <Select ref={SelectRef} items={[]} />
      <Separator ref={SeparatorRef} />
      <Slider ref={SliderRef} />
      <Spinner ref={SpinnerRef} />
      <Surface ref={SurfaceRef} />
      <Switch ref={SwitchRef} />
      <Tabs ref={TabsRef} />
      <TagGroup ref={TagGroupRef} />
      <TextArea ref={TextAreaRef} />
    </>
  );
}
