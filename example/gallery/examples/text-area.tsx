import { Description, FieldError, Label, TextArea, TextField } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function TextAreaExamples() {
  const [value, setValue] = useState('A new idea for the team.');
  return (
    <>
      <PreviewSection title="Project notes">
        <TextField>
          <Label>Notes</Label>
          <TextArea value={value} onChangeText={setValue} placeholder="Write a note" />
          <Description>{value.length} characters</Description>
        </TextField>
      </PreviewSection>
      <PreviewSection title="Disabled and invalid">
        <TextField isDisabled>
          <Label>Archived notes</Label>
          <TextArea isDisabled defaultValue="This project is archived." />
        </TextField>
        <TextField isInvalid>
          <Label>Required notes</Label>
          <TextArea isInvalid placeholder="Add a note" />
          <FieldError>Please add a note.</FieldError>
        </TextField>
      </PreviewSection>
    </>
  );
}
