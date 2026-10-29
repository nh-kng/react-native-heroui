import {
  Alert,
  Avatar,
  Button,
  Card,
  Chip,
  Description,
  Input,
  Label,
  Separator,
  Skeleton,
  Spinner,
  Surface,
  TextField,
  Typography,
} from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { Image, View } from 'react-native';

import { colors, Glyph, Row, sizes, variants, type DemoProps } from './shared';

const portrait = 'https://img.heroui.chat/image/avatar?w=400&h=400&u=3';

export function AlertDemo({ id }: DemoProps) {
  return (
    <>
      {colors.map((status) => (
        <Alert
          key={status}
          status={status}
          className={
            id === 'alert-custom-styles' ? 'rounded-2xl border border-purple-500' : undefined
          }>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {status === 'success'
                ? 'Profile updated successfully'
                : status === 'danger'
                  ? 'Unable to connect to server'
                  : status === 'warning'
                    ? 'Scheduled maintenance'
                    : 'New features available'}
            </Alert.Title>
            <Alert.Description>
              {status === 'danger'
                ? 'Check your details and try again.'
                : 'Check out our latest updates including dark mode support and improved accessibility features.'}
            </Alert.Description>
          </Alert.Content>
        </Alert>
      ))}
    </>
  );
}

export function AvatarDemo({ id }: DemoProps) {
  if (id === 'avatar-sizes')
    return (
      <Row>
        {sizes.map((size) => (
          <Avatar key={size} size={size}>
            <Avatar.Image src={portrait} alt="Jane Doe" />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
        ))}
      </Row>
    );
  if (id === 'avatar-colors')
    return (
      <Row>
        {colors.map((color) => (
          <Avatar key={color} color={color}>
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
        ))}
      </Row>
    );
  if (id === 'avatar-variants')
    return (
      <Row>
        {(['soft', 'default'] as const).map((variant) => (
          <Avatar
            key={variant}
            webProps={{ variant }}
            className={variant === 'default' ? 'bg-accent' : 'bg-accent/10'}>
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
        ))}
      </Row>
    );
  if (id === 'avatar-fallback')
    return (
      <Row>
        <Avatar>
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>
            <Glyph>♙</Glyph>
          </Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image src="data:image/png;base64,invalid" alt="Unavailable portrait" />
          <Avatar.Fallback>AB</Avatar.Fallback>
        </Avatar>
      </Row>
    );
  return (
    <Avatar
      className={
        id === 'avatar-custom-styles' ? 'rounded-xl border-2 border-purple-500' : undefined
      }>
      <Avatar.Image src={portrait} alt="Jane Doe" />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  );
}

export function ChipDemo({ id }: DemoProps) {
  if (id === 'chip-variants')
    return (
      <Row>
        {variants.map((variant) => (
          <Chip key={variant} variant={variant}>
            <Chip.Label>{variant}</Chip.Label>
          </Chip>
        ))}
      </Row>
    );
  return (
    <Row>
      {(id === 'chip-statuses' ? colors : (['accent'] as const)).map((color) => (
        <Chip
          key={color}
          color={color}
          className={
            id === 'chip-custom-styles' ? 'rounded-md border border-purple-500' : undefined
          }>
          {id === 'chip-with-icon' && <Glyph>✓</Glyph>}
          <Chip.Label>{id === 'chip-statuses' ? color : 'New'}</Chip.Label>
        </Chip>
      ))}
    </Row>
  );
}

export function CardDemo({ id }: DemoProps) {
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const cards =
    id === 'card-variants'
      ? (['default', 'secondary', 'tertiary', 'transparent'] as const)
      : (['default'] as const);
  return (
    <>
      {cards.map((variant) => (
        <Card
          key={variant}
          variant={variant}
          className={
            id === 'card-horizontal'
              ? 'flex-row flex-wrap'
              : id === 'card-custom-styles'
                ? 'rounded-2xl border border-purple-500'
                : undefined
          }>
          {id === 'card-with-images' && (
            <Image
              source={{ uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg' }}
              accessibilityLabel="Cherries"
              style={{ width: '100%', height: 180, borderRadius: 12 }}
            />
          )}
          <Card.Header>
            {id === 'card-with-avatar' && (
              <Avatar>
                <Avatar.Image src={portrait} alt="Jane Doe" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
            )}
            <Card.Title>
              {id === 'card-with-form'
                ? 'Create an account'
                : id === 'card-variants'
                  ? `${variant} card`
                  : 'Become an Acme Creator!'}
            </Card.Title>
            <Card.Description>
              {id === 'card-with-form'
                ? 'Enter your email to get started.'
                : 'Visit the Acme Creator Hub to sign up today and start earning credits from your fans and followers.'}
            </Card.Description>
          </Card.Header>
          <Card.Body>
            {id === 'card-with-form' ? (
              <TextField isInvalid={saved && !email.includes('@')}>
                <Label>Email</Label>
                <Input
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                />
                <Description>
                  {saved
                    ? email.includes('@')
                      ? `Account draft created for ${email}`
                      : 'Enter a valid email address.'
                    : 'Your information stays in this demo.'}
                </Description>
              </TextField>
            ) : (
              <Typography.Paragraph>
                Build accessible interfaces with carefully crafted components.
              </Typography.Paragraph>
            )}
          </Card.Body>
          <Card.Footer>
            <Button onPress={() => setSaved(!saved)}>
              <Button.Label>
                {id === 'card-with-form'
                  ? 'Create account draft'
                  : saved
                    ? 'Added to your collection'
                    : 'Add to collection'}
              </Button.Label>
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
}

export function SeparatorDemo({ id }: DemoProps) {
  if (id === 'separator-variants')
    return (
      <>
        {(['default', 'secondary', 'tertiary'] as const).map((variant) => (
          <View key={variant} className="gap-3">
            <Typography.Paragraph>{variant} variant</Typography.Paragraph>
            <Separator
              webProps={{ variant }}
              nativeProps={{
                thickness: variant === 'default' ? 1 : variant === 'secondary' ? 2 : 3,
              }}
            />
          </View>
        ))}
      </>
    );
  const vertical = id === 'separator-vertical';
  const content = (
    <View className={vertical ? 'h-12 flex-row items-center gap-4' : 'gap-4'}>
      <Typography.Paragraph>HeroUI</Typography.Paragraph>
      {id === 'separator-with-content' ? (
        <Row>
          <View className="flex-1">
            <Separator />
          </View>
          <Typography.Paragraph>OR</Typography.Paragraph>
          <View className="flex-1">
            <Separator />
          </View>
        </Row>
      ) : (
        <Separator
          orientation={vertical ? 'vertical' : 'horizontal'}
          className={id === 'separator-custom-styles' ? 'bg-purple-500' : undefined}
        />
      )}
      <Typography.Paragraph>Beautiful, fast and modern.</Typography.Paragraph>
    </View>
  );
  return id === 'separator-with-surface' ? (
    <Surface className="rounded-xl p-5">{content}</Surface>
  ) : (
    content
  );
}

export function SkeletonDemo({ id }: DemoProps) {
  const [loading, setLoading] = useState(true);
  if (id === 'skeleton-animation-types')
    return (
      <>
        {(['shimmer', 'pulse', 'none'] as const).map((animationType) => (
          <View key={animationType} className="gap-3">
            <Description>{animationType}</Description>
            <Skeleton
              className="h-20 w-full rounded-lg"
              webProps={{ animationType }}
              nativeProps={{ variant: animationType }}
            />
            <Skeleton
              className="h-3 w-3/5 rounded-lg"
              webProps={{ animationType }}
              nativeProps={{ variant: animationType }}
            />
            <Skeleton
              className="h-3 w-4/5 rounded-lg"
              webProps={{ animationType }}
              nativeProps={{ variant: animationType }}
            />
          </View>
        ))}
      </>
    );
  const profile = id === 'skeleton-user-profile';
  const count = id === 'skeleton-list' || id === 'skeleton-grid' ? 3 : 1;
  return (
    <>
      <View className={id === 'skeleton-grid' ? 'flex-row flex-wrap gap-4' : 'gap-4'}>
        {Array.from({ length: count }, (_, index) => (
          <View
            key={index}
            className={id === 'skeleton-grid' ? 'min-w-28 flex-1 gap-3' : 'w-full gap-3'}>
            {profile && (
              <Skeleton isLoading={loading} className="size-12 rounded-full">
                <Avatar>
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
              </Skeleton>
            )}
            {id !== 'skeleton-text-content' && (
              <Skeleton
                isLoading={loading}
                className={
                  id === 'skeleton-custom-styles'
                    ? 'h-24 w-full rounded-2xl bg-purple-200'
                    : 'h-24 w-full rounded-xl'
                }>
                <Typography.Paragraph>Content loaded</Typography.Paragraph>
              </Skeleton>
            )}
            <Skeleton isLoading={loading} className="h-4 w-3/4 rounded-md">
              <Typography.Paragraph>
                {profile ? 'Jane Doe' : 'Your content is ready'}
              </Typography.Paragraph>
            </Skeleton>
            <Skeleton isLoading={loading} className="h-4 w-1/2 rounded-md">
              <Typography.Paragraph>More details</Typography.Paragraph>
            </Skeleton>
          </View>
        ))}
      </View>
      <Button variant="secondary" onPress={() => setLoading(!loading)}>
        <Button.Label>{loading ? 'Show content' : 'Show skeleton'}</Button.Label>
      </Button>
    </>
  );
}

export function SpinnerDemo({ id }: DemoProps) {
  if (id === 'spinner-speed')
    return (
      <Row>
        {(
          [
            {
              label: 'Slow',
              speed: 0.5,
              className: 'animate-[spin_1.5s_linear_infinite] motion-reduce:animate-none',
            },
            { label: 'Default', speed: 1, className: undefined },
            {
              label: 'Fast',
              speed: 2,
              className: 'animate-[spin_0.4s_linear_infinite] motion-reduce:animate-none',
            },
          ] as const
        ).map(({ label, speed, className }) => (
          <View key={label} className="items-center gap-2">
            <Spinner className={className} />
            <Description>{label}</Description>
          </View>
        ))}
      </Row>
    );
  if (id === 'spinner-colors')
    return (
      <Row>
        {(['accent', 'success', 'warning', 'danger'] as const).map((color) => (
          <Spinner key={color} color={color} />
        ))}
      </Row>
    );
  if (id === 'spinner-sizes')
    return (
      <Row>
        {sizes.map((size) => (
          <Spinner key={size} size={size} />
        ))}
      </Row>
    );
  return (
    <Spinner className={id === 'spinner-custom-styles' ? 'size-12 text-purple-500' : undefined} />
  );
}

export function SurfaceDemo({ id }: DemoProps) {
  return (
    <>
      {(id === 'surface-variants'
        ? (['default', 'secondary', 'tertiary', 'transparent'] as const)
        : (['default'] as const)
      ).map((variant) => (
        <Surface
          key={variant}
          variant={variant}
          className={
            id === 'surface-custom-styles'
              ? 'rounded-2xl border border-purple-500 p-6'
              : 'rounded-xl p-6'
          }>
          {id === 'surface-with-form-components' ? (
            <TextField>
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
              <Description>Form controls inside a surface.</Description>
            </TextField>
          ) : (
            <Typography.Paragraph>{variant === 'default' ? 'Surface Content' : `${variant} surface`}</Typography.Paragraph>
          )}
        </Surface>
      ))}
    </>
  );
}

export function TypographyDemo({ id }: DemoProps) {
  if (id === 'typography-typography-scale')
    return (
      <>
        {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((type) => (
          <Typography.Heading key={type} type={type}>
            {({ h1: 'Build better interfaces', h2: 'Built for the intelligence age', h3: 'Pricing on your terms', h4: 'Apply to the startup program', h5: 'Card titles', h6: 'Smaller feature headers' })[type]}
          </Typography.Heading>
        ))}
        {(['body', 'body-sm', 'body-xs'] as const).map((type) => (
          <Typography.Paragraph key={type} type={type}>
            {type} — The quick brown fox jumps over the lazy dog.
          </Typography.Paragraph>
        ))}
      </>
    );
  if (id === 'typography-primitives')
    return (
      <>
        <Typography.Heading type="h3">Dashboard</Typography.Heading>
        <Typography.Paragraph>
          Convenience primitives are thin wrappers over Typography. Compose a paragraph with <Typography.Code>inline code</Typography.Code>.
        </Typography.Paragraph>
        <Typography.Paragraph weight="bold">Bold text</Typography.Paragraph>
        <Typography.Paragraph color="muted">Muted supporting text.</Typography.Paragraph>
      </>
    );
  return (
    <View className="gap-4">
      <Typography.Heading
        type="h3"
        className={id === 'typography-custom-styles' ? 'text-purple-600' : undefined}>
        Beautiful typography
      </Typography.Heading>
      <Typography.Paragraph>
        Typography establishes a clear hierarchy, guides readers through content, and brings your
        interface to life.
      </Typography.Paragraph>
      {id === 'typography-prose' && (
        <>
          <Typography.Heading type="h4">Getting started</Typography.Heading>
          <Typography.Paragraph>
            Compose headings and paragraphs to make your content easy to read. Use{' '}
            <Typography.Code>Typography.Code</Typography.Code> to call out inline code.
          </Typography.Paragraph>
        </>
      )}
    </View>
  );
}
