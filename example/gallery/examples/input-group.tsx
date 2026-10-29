import { Description, InputGroup, Label, TextField, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function InputGroupExamples() {
  const [value, setValue] = useState('25');
  return (
    <>
      <PreviewSection title="Prefix and suffix">
        <TextField>
          <Label>Budget</Label>
          <InputGroup>
            <InputGroup.Prefix>
              <Typography.Paragraph>$</Typography.Paragraph>
            </InputGroup.Prefix>
            <InputGroup.Input value={value} onChangeText={setValue} placeholder="Amount" />
            <InputGroup.Suffix>
              <Typography.Paragraph>USD</Typography.Paragraph>
            </InputGroup.Suffix>
          </InputGroup>
          <Description>Budget: ${value || '0'}</Description>
        </TextField>
      </PreviewSection>
      <PreviewSection title="Disabled">
        <TextField isDisabled>
          <Label>Locked budget</Label>
          <InputGroup isDisabled>
            <InputGroup.Input isDisabled defaultValue="100" />
          </InputGroup>
        </TextField>
      </PreviewSection>
    </>
  );
}
