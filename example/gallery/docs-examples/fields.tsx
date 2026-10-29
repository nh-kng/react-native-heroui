import {
  Button,
  Chip,
  Description,
  FieldError,
  Input,
  InputGroup,
  InputOTP,
  Label,
  SearchField,
  Spinner,
  Surface,
  TextArea,
  TextField,
  Typography,
} from '@nh-kng/react-native-heroui';
import { useId, useState } from 'react';

import { Glyph, type DemoProps } from './shared';

export function TextDemo({ id, variant }: DemoProps & { variant?: 'primary' | 'secondary' }) {
  const [value, setValue] = useState(
    id.startsWith('field-error-') || id === 'textfield-with-error' ? 'jr' : ''
  );
  const [submitted, setSubmitted] = useState(false);
  if (id === 'textarea-variants' && !variant)
    return (
      <>
        {(['primary', 'secondary'] as const).map((variant) => (
          <TextDemo key={variant} id={id} variant={variant} />
        ))}
      </>
    );
  const area =
    id.startsWith('textarea-') || id === 'text-area-custom-styles' || id === 'textfield-textarea';
  const error =
    id.includes('validation') || id.includes('with-error') || id.startsWith('field-error-');
  const invalid =
    error &&
    (id.startsWith('field-error-') || id.includes('with-error')
      ? value.length > 0 && value.length < 3
      : submitted && value.length < 3);
  const disabled = id === 'textfield-disabled';
  const custom = id.endsWith('custom-styles');
  const field = (
    <TextField
      isRequired={id === 'textfield-required'}
      isDisabled={disabled}
      isInvalid={invalid}
      className="w-full">
      <Label className={id.startsWith('label-') && custom ? 'text-purple-600' : undefined}>
        {area
          ? 'Quick project update'
          : id.startsWith('field-error-') || id === 'textfield-with-error'
            ? 'Username'
            : id.startsWith('label-') || id === 'input-basic'
              ? 'Name'
              : 'Email'}
      </Label>
      {area ? (
        <TextArea
          value={value}
          onChangeText={setValue}
          placeholder="Share a quick project update..."
          className={custom ? 'min-h-32 rounded-xl border-purple-500' : 'min-h-24'}
          webProps={{
            variant,
            ...(id === 'textarea-rows' ? { rows: 5, style: { resize: 'vertical' as const } } : {}),
          }}
          nativeProps={{ variant, ...(id === 'textarea-rows' ? { numberOfLines: 5 } : {}) }}
        />
      ) : (
        <Input
          value={value}
          onChangeText={setValue}
          isDisabled={disabled}
          isInvalid={invalid}
          keyboardType={
            id.startsWith('field-error-') ||
            id === 'textfield-with-error' ||
            id.startsWith('label-') ||
            id === 'input-basic'
              ? 'default'
              : 'email-address'
          }
          placeholder={
            id.startsWith('field-error-') || id === 'textfield-with-error'
              ? 'Enter username'
              : id.startsWith('label-') || id === 'input-basic'
                ? 'Enter your name'
                : 'Enter your email'
          }
          className={custom ? 'rounded-xl border-purple-500' : undefined}
        />
      )}
      {(id.includes('description') || id.startsWith('description-')) && (
        <Description className={custom ? 'text-purple-600' : undefined}>
          We'll never share your email with anyone else.
        </Description>
      )}
      {invalid && (
        <FieldError className={custom ? 'font-semibold' : undefined}>
          {id.startsWith('field-error-')
            ? 'Username must be at least 3 characters'
            : 'Please enter at least three characters.'}
        </FieldError>
      )}
    </TextField>
  );
  if (id === 'input-types' || id === 'textfield-input-types')
    return (
      <>
        <TextField>
          <Label>Email</Label>
          <Input keyboardType="email-address" placeholder="you@example.com" />
        </TextField>
        <TextField>
          <Label>Age</Label>
          <Input keyboardType="numeric" placeholder="30" webProps={{ min: 0 }} />
        </TextField>
        <TextField>
          <Label>Password</Label>
          <Input secureTextEntry placeholder="Enter your password" />
        </TextField>
        <TextField>
          <Label>Phone</Label>
          <Input keyboardType="phone-pad" placeholder="+1 (555) 000-0000" />
        </TextField>
        <TextField>
          <Label>Website</Label>
          <Input keyboardType="url" placeholder="https://example.com" />
        </TextField>
      </>
    );
  if (id === 'input-variants')
    return (
      <>
        {(['primary', 'secondary'] as const).map((variant) => (
          <TextField key={variant}>
            <Label>{variant}</Label>
            <Input variant={variant} placeholder="Enter your email" />
          </TextField>
        ))}
      </>
    );
  return (
    <>
      {id.includes('on-surface') ? <Surface className="rounded-xl p-6">{field}</Surface> : field}
      {id.includes('controlled') && <Description>Value: {value || '(empty)'}</Description>}
      {error && !id.startsWith('field-error-') && (
        <>
          <Button onPress={() => setSubmitted(true)}>
            <Button.Label>Validate</Button.Label>
          </Button>
          {submitted && !invalid && <Description>Looks good.</Description>}
        </>
      )}
    </>
  );
}

export function InputGroupDemo({ id, variant }: DemoProps & { variant?: 'primary' | 'secondary' }) {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  if (id === 'input-group-variants' && !variant)
    return (
      <>
        {(['primary', 'secondary'] as const).map((variant) => (
          <InputGroupDemo key={variant} id={id} variant={variant} />
        ))}
      </>
    );
  const disabled = id === 'input-group-disabled';
  const invalid = id === 'input-group-invalid' && !value;
  const password = id === 'input-group-password-with-toggle';
  const prefix = id.includes('prefix') || id === 'input-group-default';
  const suffix = id.includes('suffix') || id === 'input-group-default' || password;
  const group = (
    <TextField isRequired={id === 'input-group-required'} isDisabled={disabled} isInvalid={invalid}>
      <Label>{password ? 'Password' : id.includes('text-prefix') ? 'Website' : 'Amount'}</Label>
      <InputGroup
        webProps={{ variant }}
        isDisabled={disabled}
        className={
          id === 'input-group-custom-styles' ? 'rounded-xl border border-purple-500' : 'w-full'
        }>
        {prefix && (
          <InputGroup.Prefix>
            <Glyph>
              {id === 'input-group-with-text-prefix' ? 'https://' : id.includes('icon') ? '⌕' : '$'}
            </Glyph>
          </InputGroup.Prefix>
        )}
        <InputGroup.Input
          value={value}
          onChangeText={setValue}
          placeholder={password ? 'Enter password' : 'Enter a value'}
          isDisabled={disabled}
          isInvalid={invalid}
          webProps={password ? { type: visible ? 'text' : 'password' } : undefined}
          nativeProps={{ variant, ...(password ? { secureTextEntry: !visible } : {}) }}
        />
        {suffix && (
          <InputGroup.Suffix>
            {password ? (
              <Button size="sm" variant="ghost" onPress={() => setVisible(!visible)}>
                <Button.Label>{visible ? 'Hide' : 'Show'}</Button.Label>
              </Button>
            ) : id === 'input-group-with-loading-suffix' ? (
              <Spinner size="sm" />
            ) : id === 'input-group-with-badge-suffix' ? (
              <Chip size="sm">
                <Chip.Label>PRO</Chip.Label>
              </Chip>
            ) : (
              <Glyph>{id.includes('suffix-icon') ? '✓' : 'USD'}</Glyph>
            )}
          </InputGroup.Suffix>
        )}
      </InputGroup>
      {invalid && <FieldError>Please enter an amount.</FieldError>}
    </TextField>
  );
  return (
    <>
      {id === 'input-group-on-surface' ? (
        <Surface className="rounded-xl p-6">{group}</Surface>
      ) : (
        group
      )}
      {id === 'input-group-required' && (
        <>
          <Button onPress={() => setSubmitted(true)}>
            <Button.Label>Submit</Button.Label>
          </Button>
          {submitted && (
            <Description>
              {value ? `Submitted: ${value}` : 'Please complete the required field.'}
            </Description>
          )}
        </>
      )}
    </>
  );
}

export function OTPDemo({ id, variant }: DemoProps & { variant?: 'primary' | 'secondary' }) {
  const statusId = useId();
  const [value, setValue] = useState('');
  const [complete, setComplete] = useState('');
  const [submitted, setSubmitted] = useState(false);
  if (id === 'input-otp-variants' && !variant)
    return (
      <>
        {(['primary', 'secondary'] as const).map((variant) => (
          <OTPDemo key={variant} id={id} variant={variant} />
        ))}
      </>
    );
  const count = id === 'input-otp-four-digits' ? 4 : 6;
  const pattern = id === 'input-otp-with-pattern' ? '^[a-zA-Z0-9]+$' : '^[0-9]+$';
  const validation = id === 'input-otp-with-validation' || id === 'input-otp-form-example';
  const invalid = validation && submitted && value.length !== count;
  const input = (
    <InputOTP
      maxLength={count}
      value={value}
      onChangeText={(next) => {
        setValue(next);
        setComplete('');
      }}
      onComplete={setComplete}
      pattern={pattern}
      isDisabled={id === 'input-otp-disabled'}
      isInvalid={invalid}
      webProps={{ 'aria-label': 'Verification code', 'aria-describedby': statusId, variant }}
      className={id === 'input-otp-custom-styles' ? 'gap-3' : undefined}>
      <InputOTP.Group>
        {Array.from({ length: count }, (_, index) => (
          <InputOTP.Slot
            key={index}
            index={index}
            nativeProps={{ variant }}
            className={
              id === 'input-otp-custom-styles' ? 'rounded-xl border-purple-500' : undefined
            }
          />
        ))}
      </InputOTP.Group>
    </InputOTP>
  );
  return (
    <>
      {id === 'input-otp-on-surface' ? (
        <Surface className="rounded-xl p-5">{input}</Surface>
      ) : (
        input
      )}
      <Description webProps={{ id: statusId }}>
        {id === 'input-otp-with-pattern'
          ? 'Enter letters or digits.'
          : `Enter the ${count}-digit code.`}
      </Description>
      {id === 'input-otp-controlled' && <Description>Value: {value || '(empty)'}</Description>}
      {id === 'input-otp-on-complete' && (
        <Description>{complete ? `Completed: ${complete}` : 'Waiting for all digits…'}</Description>
      )}
      {validation && (
        <>
          <Button onPress={() => setSubmitted(true)}>
            <Button.Label>Verify</Button.Label>
          </Button>
          <Typography.Paragraph>
            {submitted
              ? invalid
                ? `Enter all ${count} digits.`
                : 'Code submitted for this demo.'
              : 'Enter your code to continue.'}
          </Typography.Paragraph>
        </>
      )}
    </>
  );
}

export function SearchDemo({ id, variant }: DemoProps & { variant?: 'primary' | 'secondary' }) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  if (id === 'search-field-variants' && !variant)
    return (
      <>
        {(['primary', 'secondary'] as const).map((variant) => (
          <SearchDemo key={variant} id={id} variant={variant} />
        ))}
      </>
    );
  const invalid =
    (id.includes('validation') && value.length > 0 && value.length < 3) || (submitted && !value);
  const required = id === 'search-field-required';
  const results = ['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry'].filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );
  const field = (
    <SearchField
      value={value}
      onChangeText={setValue}
      isDisabled={id === 'search-field-disabled'}
      isInvalid={invalid}
      className="w-full"
      webProps={{ isRequired: required, variant }}
      nativeProps={{ isRequired: required }}>
      <Label>Search</Label>
      <SearchField.Group
        className={
          id === 'search-field-custom-styles' ? 'rounded-full border border-purple-500' : undefined
        }>
        <SearchField.SearchIcon>
          {id === 'search-field-custom-icons' ? <Glyph>⌕</Glyph> : undefined}
        </SearchField.SearchIcon>
        <SearchField.Input placeholder="Search fruit…" nativeProps={{ variant }} />
        <SearchField.ClearButton>
          {id === 'search-field-custom-icons' ? <Glyph>×</Glyph> : undefined}
        </SearchField.ClearButton>
      </SearchField.Group>
      {id === 'search-field-with-description' && (
        <Description>Search for your favorite fruit.</Description>
      )}
      {invalid && <FieldError>Enter at least three characters.</FieldError>}
    </SearchField>
  );
  return (
    <>
      {id === 'search-field-on-surface' ? (
        <Surface className="rounded-xl p-6">{field}</Surface>
      ) : (
        field
      )}
      {(id === 'search-field-controlled' || id === 'search-field-form-example') && (
        <>
          <Description>{value ? `Results for “${value}”` : 'All fruit'}</Description>
          {results.length ? (
            results.map((item) => <Typography.Paragraph key={item}>{item}</Typography.Paragraph>)
          ) : (
            <Description>No matches. Clear the search to try again.</Description>
          )}
        </>
      )}
      {(required || id === 'search-field-form-example' || id.includes('validation')) && (
        <>
          <Button onPress={() => setSubmitted(true)}>
            <Button.Label>Search</Button.Label>
          </Button>
          {submitted && !invalid && (
            <Description>Found {results.length} matching fruit.</Description>
          )}
        </>
      )}
    </>
  );
}
