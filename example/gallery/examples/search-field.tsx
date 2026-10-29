import {
  Accordion,
  Avatar,
  Button,
  Checkbox,
  Label,
  SearchField,
  Slider,
  Typography,
} from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function SearchFieldExamples() {
  const [query, setQuery] = useState('');
  const results = ['Accordion', 'Avatar', 'Button', 'Card', 'Checkbox', 'Slider'].filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <PreviewSection title="Filter components">
        <SearchField value={query} onChangeText={setQuery}>
          <Label>Find a component</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search components" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        {results.length ? (
          results.map((name) => <Typography.Paragraph key={name}>{name}</Typography.Paragraph>)
        ) : (
          <Typography.Paragraph>
            No components match. Clear the search to try again.
          </Typography.Paragraph>
        )}
      </PreviewSection>
      <PreviewSection title="Disabled">
        <SearchField isDisabled defaultValue="Archived">
          <Label>Archived search</Label>
          <SearchField.Group>
            <SearchField.Input />
          </SearchField.Group>
        </SearchField>
      </PreviewSection>
    </>
  );
}
