import { useRef } from 'react';
import {
  Button,
  Card,
  Chip,
  HeroUIProvider,
  Input,
  Label,
  TextField,
  Typography,
  type ButtonRef,
  type ButtonPressEvent,
  type InputComponentRef,
} from '@nh-kng/react-native-heroui';
import { Button as ButtonSubpath } from '@nh-kng/react-native-heroui/button';

const buttonRef = useRef<ButtonRef>(null);
const inputRef = useRef<InputComponentRef>(null);

export function NativeConsumerFixture() {
  return (
    <HeroUIProvider colorScheme="dark" nativeProps={{ config: { textProps: { allowFontScaling: false } } }}>
      <ButtonSubpath
        ref={buttonRef}
        fullWidth
        isLoading
        onPress={(event) => {
          const retainedEvent: ButtonPressEvent = event;
          void retainedEvent;
        }}
        nativeProps={{ delayLongPress: 400 }}
      >
        <Button.Label nativeProps={{ allowFontScaling: false }}>Save</Button.Label>
      </ButtonSubpath>
      <Chip color="success" size="sm" variant="soft"><Chip.Label>Ready</Chip.Label></Chip>
      <Card variant="secondary">
        <Card.Header>
          <Card.Title>Profile</Card.Title>
        </Card.Header>
        <Card.Body nativeProps={{ collapsable: false }}>
          <Typography.Heading type="h2">Details</Typography.Heading>
          <Typography.Paragraph type="body-sm">Example</Typography.Paragraph>
        </Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
      <TextField isInvalid>
        <Label isInvalid>Email</Label>
        <Input
          ref={inputRef}
          value="person@example.com"
          keyboardType="email-address"
          onChangeText={(value) => value.trim()}
          nativeProps={{ autoCapitalize: 'none' }}
        />
      </TextField>
      {/* @ts-expect-error HTML input attributes belong in webProps */}
      <Input type="email" />
      {/* @ts-expect-error Adapter-owned props cannot be overridden in nativeProps */}
      <Input nativeProps={{ isInvalid: false }} />
      {/* @ts-expect-error Native refs are not HTML input refs */}
      <Input ref={useRef<HTMLInputElement>(null)} />
      {/* @ts-expect-error Native Button variants are constrained */}
      <Button variant="bright-purple">No such variant</Button>
    </HeroUIProvider>
  );
}
