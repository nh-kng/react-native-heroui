import {
  Button,
  Card,
  Chip,
  Description,
  FieldError,
  Input,
  Label,
  PressableFeedback,
  TextField,
  Typography,
} from '@nh-kng/react-native-heroui';
import { useState, type ComponentType, type ReactNode } from 'react';
import { Platform, View } from 'react-native';

import type { ComponentName } from './navigation';
import { PreviewSection } from './preview-section';

function Row({ children }: { children: ReactNode }) {
  return <View className="flex-row flex-wrap items-center justify-center gap-3">{children}</View>;
}

function ButtonExamples() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <PreviewSection title="Variants">
        <Row>
          {(
            [
              'primary',
              'secondary',
              'tertiary',
              'outline',
              'ghost',
              'danger',
              'danger-soft',
            ] as const
          ).map((variant) => (
            <Button key={variant} variant={variant}>
              <Button.Label>{variant}</Button.Label>
            </Button>
          ))}
        </Row>
      </PreviewSection>
      <PreviewSection title="Sizes">
        <Row>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Button key={size} size={size}>
              <Button.Label>{size}</Button.Label>
            </Button>
          ))}
        </Row>
      </PreviewSection>
      <PreviewSection title="Interactive counter">
        <Row>
          <Button onPress={() => setCount((value) => value + 1)}>
            <Button.Label>Pressed {count} times</Button.Label>
          </Button>
        </Row>
      </PreviewSection>
      <PreviewSection title="Disabled and loading">
        <Row>
          <Button isDisabled>
            <Button.Label>Unavailable</Button.Label>
          </Button>
          <Button isLoading={loading}>
            <Button.Label>Save changes</Button.Label>
          </Button>
          <Button variant="secondary" onPress={() => setLoading((value) => !value)}>
            <Button.Label>{loading ? 'Stop loading' : 'Start loading'}</Button.Label>
          </Button>
        </Row>
      </PreviewSection>
    </>
  );
}

function PressableFeedbackExamples() {
  const [count, setCount] = useState(0);
  return (
    <>
      <PreviewSection title="Scale and highlight">
        <PressableFeedback
          className="rounded-xl bg-surface px-4 py-4"
          onPress={() => setCount((value) => value + 1)}>
          <PressableFeedback.Highlight />
          <Typography.Paragraph>Pressed {count} times</Typography.Paragraph>
        </PressableFeedback>
      </PreviewSection>
      <PreviewSection title="Ripple">
        <PressableFeedback className="rounded-xl bg-surface px-4 py-4">
          <PressableFeedback.Ripple />
          <Typography.Paragraph>Press for a ripple</Typography.Paragraph>
        </PressableFeedback>
      </PreviewSection>
      <PreviewSection title="Scale a child">
        <PressableFeedback animation={false} className="rounded-xl bg-surface px-4 py-4">
          <PressableFeedback.Scale>
            <Typography.Paragraph>Only this content scales</Typography.Paragraph>
          </PressableFeedback.Scale>
        </PressableFeedback>
      </PreviewSection>
      <PreviewSection title="Disabled and animations off">
        <PressableFeedback
          isDisabled
          className="rounded-xl bg-surface px-4 py-4 opacity-50"
          onPress={() => setCount((value) => value + 1)}>
          <PressableFeedback.Highlight />
          <Typography.Paragraph>Unavailable</Typography.Paragraph>
        </PressableFeedback>
        <PressableFeedback
          animation="disable-all"
          className="rounded-xl bg-surface px-4 py-4"
          onPress={() => setCount((value) => value + 1)}>
          <PressableFeedback.Highlight />
          <Typography.Paragraph>Press without animation</Typography.Paragraph>
        </PressableFeedback>
      </PreviewSection>
    </>
  );
}

function CardExamples() {
  return (
    <>
      <PreviewSection title="Basic card">
        <Card>
          <Card.Body>
            <Typography.Paragraph>A little space for your next big idea.</Typography.Paragraph>
          </Card.Body>
        </Card>
      </PreviewSection>
      <PreviewSection title="Project overview">
        <Card>
          <Card.Header>
            <Card.Title>Summer collection</Card.Title>
            <Card.Description>Your next launch is taking shape.</Card.Description>
          </Card.Header>
          <Card.Body className="gap-4">
            <Chip color="success" variant="soft">
              <Chip.Label>On track</Chip.Label>
            </Chip>
            <Typography.Paragraph>
              Bring your favorite ideas together and share them with your team.
            </Typography.Paragraph>
          </Card.Body>
          <Card.Footer>
            <Button fullWidth>
              <Button.Label>View project</Button.Label>
            </Button>
          </Card.Footer>
        </Card>
      </PreviewSection>
    </>
  );
}

function ChipExamples() {
  return (
    <>
      <PreviewSection title="Colors">
        <Row>
          {(['default', 'accent', 'success', 'warning', 'danger'] as const).map((color) => (
            <Chip key={color} color={color}>
              <Chip.Label>{color}</Chip.Label>
            </Chip>
          ))}
        </Row>
      </PreviewSection>
      <PreviewSection title="Variants">
        <Row>
          {(['primary', 'secondary', 'tertiary', 'soft'] as const).map((variant) => (
            <Chip key={variant} color="accent" variant={variant}>
              <Chip.Label>{variant}</Chip.Label>
            </Chip>
          ))}
        </Row>
      </PreviewSection>
      <PreviewSection title="Sizes">
        <Row>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Chip key={size} size={size}>
              <Chip.Label>{size}</Chip.Label>
            </Chip>
          ))}
        </Row>
      </PreviewSection>
    </>
  );
}

function DescriptionExamples() {
  return (
    <>
      <PreviewSection title="Field helper text">
        <TextField>
          <Label>Display name</Label>
          <Input placeholder="Alex Morgan" />
          <Description>This is how your name appears to others.</Description>
        </TextField>
      </PreviewSection>
      <PreviewSection title="Multiline guidance">
        <TextField>
          <Label>Delivery instructions</Label>
          <Input placeholder="Leave at the front desk" />
          <Description>
            Include a floor, apartment number, or a safe place for your package. Please keep access
            codes private.
          </Description>
        </TextField>
      </PreviewSection>
    </>
  );
}

function ValidationExample() {
  const [email, setEmail] = useState('');
  const invalid = email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <TextField isRequired isInvalid={invalid}>
      <Label>Email address</Label>
      <Input
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="you@example.com"
        isInvalid={invalid}
      />
      <Description>We will send your receipt to this address.</Description>
      <FieldError>Enter a valid email address.</FieldError>
    </TextField>
  );
}

function FieldErrorExamples() {
  return (
    <>
      <PreviewSection title="Invalid field">
        <TextField isInvalid>
          <Label>Invitation code</Label>
          <Input value="EXPIRED" isInvalid />
          <FieldError>This invitation has expired. Request a new code.</FieldError>
        </TextField>
      </PreviewSection>
      <PreviewSection title="Interactive validation">
        <ValidationExample />
      </PreviewSection>
    </>
  );
}

function InputExamples() {
  const [query, setQuery] = useState('');
  return (
    <>
      <PreviewSection title="Basic input">
        <TextField>
          <Label>City</Label>
          <Input placeholder="San Francisco" />
        </TextField>
      </PreviewSection>
      <PreviewSection title="Controlled input">
        <TextField>
          <Label>Search products</Label>
          <Input value={query} onChangeText={setQuery} placeholder="Try a product name" />
          <Description>
            {query ? `Searching for: ${query}` : 'Your search appears here as you type.'}
          </Description>
        </TextField>
      </PreviewSection>
      <PreviewSection title="Disabled input">
        <TextField isDisabled>
          <Label>Account ID</Label>
          <Input value="ACCT-2048" isDisabled />
          <Description>Your account ID is assigned automatically.</Description>
        </TextField>
      </PreviewSection>
    </>
  );
}

function LabelExamples() {
  return (
    <>
      <PreviewSection title="Labeled field">
        <TextField>
          <Label>Full name</Label>
          <Input placeholder="Alex Morgan" />
        </TextField>
      </PreviewSection>
      <PreviewSection title="Required label">
        <TextField isRequired>
          <Label>Shipping address</Label>
          <Input placeholder="Street address" />
          <Description>Required for delivery.</Description>
        </TextField>
      </PreviewSection>
      <PreviewSection title="Disabled label">
        <TextField isDisabled>
          <Label>Membership number</Label>
          <Input value="MEM-1001" isDisabled />
        </TextField>
      </PreviewSection>
    </>
  );
}

function TextFieldExamples() {
  return (
    <>
      <PreviewSection title="Complete field">
        <TextField>
          <Label>Project name</Label>
          <Input placeholder="My next project" />
          <Description>Choose a name your team will recognize.</Description>
          <FieldError>Enter a project name.</FieldError>
        </TextField>
      </PreviewSection>
      <PreviewSection title="Validation">
        <ValidationExample />
      </PreviewSection>
      <PreviewSection title="Uncontrolled value">
        <TextField webProps={Platform.OS === 'web' ? { defaultValue: 'Weekend plans' } : undefined}>
          <Label>List name</Label>
          <Input defaultValue={Platform.OS === 'web' ? undefined : 'Weekend plans'} />
          <Description>Make this list your own.</Description>
        </TextField>
      </PreviewSection>
    </>
  );
}

function TypographyExamples() {
  return (
    <>
      <PreviewSection title="Heading hierarchy">
        {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((type) => (
          <Typography.Heading key={type} type={type}>
            {type.toUpperCase()} — Make room for ideas
          </Typography.Heading>
        ))}
      </PreviewSection>
      <PreviewSection title="Paragraph styles">
        <Typography.Paragraph>
          A fresh perspective starts with a little curiosity.
        </Typography.Paragraph>
        <Typography.Paragraph type="body-sm">
          Small details can make a big difference.
        </Typography.Paragraph>
        <Typography.Paragraph type="body-xs" color="muted">
          Last updated just now.
        </Typography.Paragraph>
      </PreviewSection>
      <PreviewSection title="Inline code">
        <Typography.Paragraph>
          Use a clear name like <Typography.Code>summer-collection</Typography.Code> for your
          project.
        </Typography.Paragraph>
      </PreviewSection>
    </>
  );
}

const examples: Record<ComponentName, ComponentType> = {
  Button: ButtonExamples,
  Card: CardExamples,
  Chip: ChipExamples,
  Description: DescriptionExamples,
  FieldError: FieldErrorExamples,
  Input: InputExamples,
  Label: LabelExamples,
  PressableFeedback: PressableFeedbackExamples,
  TextField: TextFieldExamples,
  Typography: TypographyExamples,
};

export function ComponentExamples({ name }: { name: ComponentName }) {
  const Examples = examples[name];
  return <Examples />;
}
