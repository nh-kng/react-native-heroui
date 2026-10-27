import { useRef } from 'react';
import {
  Button,
  Card,
  Description,
  FieldError,
  HeroUIProvider,
  Input,
  Label,
  TextField,
  Typography,
} from '@nh-kng/react-native-heroui';
import { Input as InputSubpath } from '@nh-kng/react-native-heroui/input';

const inputRef = useRef<HTMLInputElement>(null);

export function WebConsumerFixture() {
  return (
    <HeroUIProvider colorScheme="system">
      <Button
        isPending
        fullWidth
        onPress={(event) => void event}
        webProps={{ slot: 'save-action' }}
      >
        <Button.Label webProps={{ title: 'Save' }}>Save</Button.Label>
      </Button>
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
      <Typography.Heading type="h2" webProps={{ id: 'heading' }}>Title</Typography.Heading>
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
