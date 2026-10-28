import { useRef } from 'react';
import {
  Button,
  Card,
  Chip,
  Description,
  FieldError,
  HeroUIProvider,
  Input,
  Label,
  PressableFeedback,
  TextField,
  Typography,
} from '@nh-kng/react-native-heroui';
import { Input as InputSubpath } from '@nh-kng/react-native-heroui/input';
import { PressableFeedback as FeedbackSubpath } from '@nh-kng/react-native-heroui/pressable-feedback';

const inputRef = useRef<HTMLInputElement>(null);

export function WebConsumerFixture() {
  return (
    <HeroUIProvider colorScheme="system">
      <FeedbackSubpath
        ref={useRef<HTMLButtonElement>(null)}
        animation={false}
        onPress={(event) => void event}
        webProps={{ 'aria-label': 'Open project' }}>
        <PressableFeedback.Highlight />
        <PressableFeedback.Ripple />
        <PressableFeedback.Scale webProps={{ title: 'Project' }}>
          Open project
        </PressableFeedback.Scale>
      </FeedbackSubpath>
      {/* @ts-expect-error Disabled state belongs to the shared contract. */}
      <PressableFeedback webProps={{ isDisabled: false }} />
      {/* @ts-expect-error Native refs are not HTML button refs. */}
      <PressableFeedback ref={useRef<import('react-native').View>(null)} />
      {/* @ts-expect-error Overlays are decorative and do not accept content. */}
      <PressableFeedback.Ripple>Hidden content</PressableFeedback.Ripple>
      <Button
        isLoading
        fullWidth
        onPress={(event) => void event}
        webProps={{ slot: 'save-action' }}>
        <Button.Label webProps={{ title: 'Save' }}>Save</Button.Label>
      </Button>
      <Chip color="success" size="sm" variant="soft">
        <Chip.Label>Ready</Chip.Label>
      </Chip>
      <Card variant="secondary">
        <Card.Header>
          <Card.Title>Account</Card.Title>
          <Card.Description>Manage your account.</Card.Description>
        </Card.Header>
        <Card.Body webProps={{ id: 'account-content' }}>Content</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
      <TextField isRequired>
        <Label>Email</Label>
        <InputSubpath
          ref={inputRef}
          secureTextEntry
          isInvalid={false}
          keyboardType="email-address"
          onChangeText={(value) => value.trim()}
          webProps={{ autoComplete: 'email', name: 'email' }}
        />
        <Description>Use your work address.</Description>
        <FieldError>Enter a valid email address.</FieldError>
      </TextField>
      <Typography.Heading type="h2" webProps={{ id: 'heading' }}>
        Title
      </Typography.Heading>
      <Typography.Paragraph type="body-xs">Caption</Typography.Paragraph>
      <Typography.Code>const answer = 42;</Typography.Code>
      {/* @ts-expect-error HTML type is adapter-owned through secureTextEntry */}
      <Input type="email" />
      {/* @ts-expect-error Native keyboard options belong in keyboardType */}
      <Input nativeProps={{ keyboardType: 'wrong' }} />
      {/* @ts-expect-error Adapter-owned props cannot be overridden in webProps */}
      <Input webProps={{ isInvalid: true }} />
      {/* @ts-expect-error Web refs target HTMLInputElement */}
      <Input ref={useRef<import('react-native').TextInput>(null)} />
      {/* @ts-expect-error Web Button variants are constrained */}
      <Button variant="bright-purple">No such variant</Button>
    </HeroUIProvider>
  );
}
