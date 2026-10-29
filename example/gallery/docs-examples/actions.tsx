import {
  Button,
  Checkbox,
  CloseButton,
  Description,
  FieldError,
  Label,
  RadioGroup,
  Slider,
  Spinner,
  Surface,
  Switch,
  Typography,
} from '@nh-kng/react-native-heroui';
import { useId, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Platform, View } from 'react-native';

import { Glyph, Row, sizes, type DemoProps } from './shared';

export function ButtonDemo({ id }: DemoProps) {
  const [pending, setPending] = useState(false);
  const [count, setCount] = useState(0);
  if (id === 'button-variants')
    return (
      <Row>
        {(
          ['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'danger', 'danger-soft'] as const
        ).map((variant) => (
          <Button key={variant} variant={variant}>
            <Button.Label>{variant}</Button.Label>
          </Button>
        ))}
      </Row>
    );
  if (id === 'button-sizes')
    return (
      <Row>
        {sizes.map((size) => (
          <Button key={size} size={size}>
            <Button.Label>{size}</Button.Label>
          </Button>
        ))}
      </Row>
    );
  if (id === 'button-icon-only')
    return (
      <Row>
        {sizes.map((size) => (
          <Button
            key={size}
            size={size}
            isIconOnly
            onPress={() => setCount(count + 1)}
            webProps={{ 'aria-label': 'Add item' }}
            nativeProps={{ accessibilityLabel: 'Add item' }}>
            <Glyph>＋</Glyph>
          </Button>
        ))}
        <Typography.Paragraph>Items: {count}</Typography.Paragraph>
      </Row>
    );
  if (id === 'button-loading' || id === 'button-loading-state')
    return (
      <>
        <Button isLoading={id === 'button-loading' || pending}>
          <Spinner size="sm" />
          <Button.Label>{pending ? 'Saving changes…' : 'Save changes'}</Button.Label>
        </Button>
        {id === 'button-loading-state' && (
          <Button variant="secondary" onPress={() => setPending(!pending)}>
            <Button.Label>{pending ? 'Finish saving' : 'Start saving'}</Button.Label>
          </Button>
        )}
      </>
    );
  if (id === 'button-disabled')
    return (
      <Row>
        <Button isDisabled>
          <Button.Label>Disabled</Button.Label>
        </Button>
        <Button isDisabled variant="secondary">
          <Button.Label>Disabled</Button.Label>
        </Button>
      </Row>
    );
  if (id === 'button-social')
    return (
      <Row>
        {['Google', 'GitHub', 'Apple'].map((name) => (
          <Button key={name} variant="outline" onPress={() => setCount(count + 1)}>
            <Button.Label>Continue with {name}</Button.Label>
          </Button>
        ))}
        <Description>Demo presses: {count}. Authentication is not connected.</Description>
      </Row>
    );
  return (
    <Button
      fullWidth={id === 'button-full-width'}
      className={
        id === 'button-custom-styles'
          ? 'rounded-full bg-purple-600'
          : id === 'button-custom-variants'
            ? 'rounded-full bg-success'
            : undefined
      }
      onPress={() => setCount(count + 1)}>
      {id === 'button-with-icons' && <Glyph>＋</Glyph>}
      <Button.Label>
        {id === 'button-with-icons' ? 'Add item' : count ? `Pressed ${count} times` : 'Click me'}
      </Button.Label>
      {id === 'button-with-icons' && <Glyph>→</Glyph>}
    </Button>
  );
}

export function CloseButtonDemo({ id }: DemoProps) {
  const [count, setCount] = useState(0);
  return (
    <Row>
      <CloseButton
        onPress={
          id === 'close-button-interactive' ? () => setCount((current) => current + 1) : undefined
        }
        className={id === 'close-button-custom-styles' ? 'rounded-full bg-danger/10' : undefined}
        webProps={{ 'aria-label': 'Close' }}
        nativeProps={{ accessibilityLabel: 'Close' }}>
        {id === 'close-button-with-custom-icon' ? <Glyph>×</Glyph> : undefined}
      </CloseButton>
      {id === 'close-button-interactive' && <Description>Pressed {count} times</Description>}
    </Row>
  );
}

export function CheckboxDemo({ id, variant }: DemoProps & { variant?: 'primary' | 'secondary' }) {
  const controlId = useId();
  const [selected, setSelected] = useState(id === 'checkbox-default-selected');
  const [submitted, setSubmitted] = useState(false);
  if (id === 'checkbox-variants' && !variant)
    return (
      <>
        {(['primary', 'secondary'] as const).map((variant) => (
          <CheckboxDemo key={variant} id={id} variant={variant} />
        ))}
      </>
    );
  const invalid = id === 'checkbox-invalid' || (submitted && !selected);
  const control = (
    <Checkbox
      isSelected={selected}
      defaultSelected={id === 'checkbox-default-selected'}
      onSelectedChange={setSelected}
      isDisabled={id === 'checkbox-disabled'}
      isInvalid={invalid}
      className={
        id === 'checkbox-full-rounded'
          ? 'rounded-full [&_[data-slot=checkbox-control]]:rounded-full'
          : id === 'checkbox-custom-styles'
            ? 'border-purple-500'
            : undefined
      }
      webProps={{
        'aria-label': 'Accept terms and conditions',
        id: controlId,
        variant,
        'aria-describedby':
          id === 'checkbox-with-description'
            ? `${controlId}-description`
            : invalid
              ? `${controlId}-error`
              : undefined,
      }}
      nativeProps={{
        accessibilityLabel: 'Accept terms and conditions',
        variant,
        accessibilityHint:
          id === 'checkbox-with-description'
            ? 'You agree to our terms of service and privacy policy.'
            : invalid
              ? 'You must accept the terms.'
              : undefined,
      }}>
      <Checkbox.Indicator>
        {id === 'checkbox-custom-indicator' && selected ? (
          <Svg viewBox="0 0 24 24" width={16} height={16}>
            <Path
              fill="currentColor"
              d="M12 21C9 19 2 14 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 6-7 11-10 13Z"
            />
          </Svg>
        ) : undefined}
      </Checkbox.Indicator>
    </Checkbox>
  );
  return (
    <>
      <Row>
        {control}
        <Label
          webProps={{ htmlFor: controlId }}
          nativeProps={{ onPress: () => setSelected(!selected) }}
          isDisabled={id === 'checkbox-disabled'}>
          Accept terms and conditions
        </Label>
      </Row>
      {id === 'checkbox-with-description' && (
        <Description webProps={{ id: `${controlId}-description` }}>
          You agree to our terms of service and privacy policy.
        </Description>
      )}
      {id === 'checkbox-controlled' && (
        <Description>Selected: {selected ? 'true' : 'false'}</Description>
      )}
      {id === 'checkbox-form' && (
        <>
          <Button onPress={() => setSubmitted(true)}>
            <Button.Label>Submit</Button.Label>
          </Button>
          <Typography.Paragraph>
            {submitted
              ? selected
                ? 'Terms accepted.'
                : 'Please accept the terms to continue.'
              : 'Accept the terms before submitting.'}
          </Typography.Paragraph>
        </>
      )}
      {invalid && (
        <Typography.Paragraph className="text-danger" webProps={{ id: `${controlId}-error` }}>
          You must accept the terms.
        </Typography.Paragraph>
      )}
    </>
  );
}

function SwitchControl({
  label,
  id,
  initialSelected,
  onChange,
}: {
  label: string;
  id: string;
  initialSelected?: boolean;
  onChange?: (selected: boolean) => void;
}) {
  const controlId = useId();
  const change = (next: boolean) => {
    setSelected(next);
    onChange?.(next);
  };
  const [selected, setSelected] = useState(initialSelected ?? id === 'switch-default-selected');
  return (
    <Row>
      {id === 'switch-label-position' && (
        <Label webProps={{ htmlFor: controlId }} nativeProps={{ onPress: () => change(!selected) }}>
          {label}
        </Label>
      )}
      <Switch
        isSelected={selected}
        onSelectedChange={(next) => {
          setSelected(next);
          onChange?.(next);
        }}
        isDisabled={id === 'switch-disabled'}
        className={id === 'switch-custom-styles' ? 'bg-purple-100' : undefined}
        webProps={{
          'aria-label': label,
          id: controlId,
          'aria-describedby':
            id === 'switch-with-description' ? `${controlId}-description` : undefined,
        }}
        nativeProps={{
          accessibilityLabel: label,
          accessibilityHint:
            id === 'switch-with-description'
              ? 'Disable wireless connections while flying.'
              : undefined,
        }}>
        <Switch.Thumb>
          {id === 'switch-with-icons' && <Glyph>{selected ? '☀' : '☾'}</Glyph>}
        </Switch.Thumb>
      </Switch>
      {id !== 'switch-without-label' && id !== 'switch-label-position' && (
        <Label
          webProps={{ htmlFor: controlId }}
          nativeProps={{ onPress: () => change(!selected) }}
          isDisabled={id === 'switch-disabled'}>
          {label}
        </Label>
      )}
      {id === 'switch-controlled' && <Description>{selected ? 'On' : 'Off'}</Description>}
      {id === 'switch-with-description' && (
        <Description webProps={{ id: `${controlId}-description` }}>
          Disable wireless connections while flying.
        </Description>
      )}
    </Row>
  );
}

export function SwitchDemo({ id }: DemoProps) {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    'Enable notifications': false,
    'Subscribe to newsletter': true,
    'Receive marketing updates': false,
  });
  const [saved, setSaved] = useState<Record<string, boolean>>();
  const grouped = id === 'switch-group' || id === 'switch-group-horizontal';
  return (
    <>
      <View className={id === 'switch-group-horizontal' ? 'flex-row flex-wrap gap-4' : 'gap-4'}>
        {(id === 'switch-form'
          ? Object.keys(preferences)
          : grouped
            ? ['Email notifications', 'Push notifications', 'SMS notifications']
            : ['Airplane mode']
        ).map((label) => (
          <SwitchControl
            key={label}
            label={label}
            id={id}
            initialSelected={id === 'switch-form' ? preferences[label] : undefined}
            onChange={(next) => setPreferences((current) => ({ ...current, [label]: next }))}
          />
        ))}
      </View>
      {id === 'switch-form' && (
        <>
          <Button onPress={() => setSaved({ ...preferences })}>
            <Button.Label>Save preferences</Button.Label>
          </Button>
          {saved && (
            <Description>
              Saved:{' '}
              {Object.entries(saved)
                .map(([label, enabled]) => `${label}: ${enabled ? 'on' : 'off'}`)
                .join('; ')}
            </Description>
          )}
        </>
      )}
    </>
  );
}

export function RadioGroupDemo({ id, variant }: DemoProps & { variant?: 'primary' | 'secondary' }) {
  const [value, setValue] = useState('standard');
  const [submitted, setSubmitted] = useState(false);
  if (id === 'radio-group-variants' && !variant)
    return (
      <>
        {(['primary', 'secondary'] as const).map((variant) => (
          <RadioGroupDemo key={variant} id={id} variant={variant} />
        ))}
      </>
    );
  const options =
    id === 'radio-group-delivery-and-payment'
      ? [
          ['standard', 'Standard delivery — Free'],
          ['express', 'Express delivery — $9.99'],
          ['overnight', 'Overnight — $19.99'],
        ]
      : [
          ['standard', 'Standard'],
          ['express', 'Express'],
          ['overnight', 'Overnight'],
        ];
  const group = (
    <>
      <RadioGroup
        value={id === 'radio-group-uncontrolled' ? undefined : value}
        defaultValue={id === 'radio-group-uncontrolled' ? 'standard' : undefined}
        onValueChange={setValue}
        isDisabled={id === 'radio-group-disabled'}
        isInvalid={id === 'radio-group-validation' && submitted && value === 'standard'}
        className={
          id === 'radio-group-horizontal'
            ? 'flex-row flex-wrap gap-4'
            : id === 'radio-group-custom-styles'
              ? 'rounded-xl border border-purple-500 p-4'
              : undefined
        }
        webProps={{
          'aria-label': 'Delivery method',
          variant,
          orientation: id === 'radio-group-horizontal' ? 'horizontal' : 'vertical',
        }}
        nativeProps={{ accessibilityLabel: 'Delivery method' }}>
        {options.map(([key, label]) => (
          <RadioGroup.Item key={key} value={key} nativeProps={{ variant }}>
            {label}
          </RadioGroup.Item>
        ))}
        {id === 'radio-group-validation' && submitted && value === 'standard' && (
          <FieldError>Choose an express or overnight delivery method.</FieldError>
        )}
      </RadioGroup>
      {id === 'radio-group-controlled' && <Description>Selected: {value}</Description>}
      {id === 'radio-group-validation' && (
        <>
          <Button onPress={() => setSubmitted(true)}>
            <Button.Label>Confirm express delivery</Button.Label>
          </Button>
          {submitted && (
            <Typography.Paragraph>
              {value === 'standard'
                ? 'Choose an express or overnight delivery method.'
                : `Delivery confirmed: ${value}`}
            </Typography.Paragraph>
          )}
        </>
      )}
    </>
  );
  return id === 'radio-group-on-surface' ? (
    <Surface className="rounded-xl p-5">{group}</Surface>
  ) : (
    group
  );
}

export function SliderDemo({ id }: DemoProps) {
  const isRange = id === 'slider-range';
  const [value, setValue] = useState<number | number[]>(isRange ? [25, 75] : 30);
  return (
    <>
      <Slider
        value={value}
        onChange={setValue}
        isDisabled={id === 'slider-disabled'}
        orientation={id === 'slider-vertical' ? 'vertical' : 'horizontal'}
        className={
          id === 'slider-vertical'
            ? 'h-48'
            : id === 'slider-custom-styles'
              ? 'w-full max-w-72'
              : undefined
        }
        webProps={{ 'aria-label': isRange ? 'Price range' : 'Volume' }}>
        <Label>{isRange ? 'Price range' : 'Volume'}</Label>
        <Slider.Output>{String(value)}</Slider.Output>
        <Slider.Track>
          <Slider.Fill className={id === 'slider-custom-styles' ? 'bg-purple-500' : undefined} />
          <Slider.Thumb
            index={0}
            nativeProps={{ accessibilityLabel: isRange ? 'Minimum price' : 'Volume' }}
          />
          {isRange && (
            <Slider.Thumb index={1} nativeProps={{ accessibilityLabel: 'Maximum price' }} />
          )}
        </Slider.Track>
      </Slider>
    </>
  );
}
