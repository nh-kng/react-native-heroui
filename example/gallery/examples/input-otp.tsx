import { Button, InputOTP, Label, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function InputOTPExamples() {
  const [value, setValue] = useState('');
  return (
    <>
      <PreviewSection title="Verification code">
        <InputOTP
          maxLength={4}
          value={value}
          onChangeText={setValue}
          pattern="^[0-9]+$"
          webProps={{ 'aria-label': 'Verification code' }}>
          <InputOTP.Group>
            {[0, 1, 2, 3].map((index) => (
              <InputOTP.Slot key={index} index={index} />
            ))}
          </InputOTP.Group>
        </InputOTP>
        <Typography.Paragraph>
          {value.length === 4 ? 'Code complete' : `Enter ${4 - value.length} more digits`}
        </Typography.Paragraph>
        <Button onPress={() => setValue('')}>
          <Button.Label>Clear code</Button.Label>
        </Button>
      </PreviewSection>
      <PreviewSection title="Disabled and invalid">
        <InputOTP
          maxLength={4}
          defaultValue="1234"
          isDisabled
          isInvalid
          webProps={{ 'aria-label': 'Unavailable code' }}>
          <InputOTP.Group>
            {[0, 1, 2, 3].map((index) => (
              <InputOTP.Slot key={index} index={index} />
            ))}
          </InputOTP.Group>
        </InputOTP>
      </PreviewSection>
    </>
  );
}
