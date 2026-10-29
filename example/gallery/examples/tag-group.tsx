import { Button, Label, Select, TagGroup, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function TagGroupExamples() {
  const [tags, setTags] = useState(['Design', 'Engineering', 'Research']);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <PreviewSection title="Select and remove tags">
      <TagGroup
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        onRemove={(keys) => {
          setTags(tags.filter((tag) => !keys.has(tag)));
          setSelected(new Set([...selected].filter((tag) => !keys.has(tag))));
        }}
        webProps={{ 'aria-label': 'Project teams' }}>
        <TagGroup.List>
          {tags.map((tag) => (
            <TagGroup.Item key={tag} id={tag} textValue={tag}>
              <TagGroup.Label>{tag}</TagGroup.Label>
              <TagGroup.RemoveButton />
            </TagGroup.Item>
          ))}
        </TagGroup.List>
      </TagGroup>
      <Typography.Paragraph>Selected: {[...selected].join(', ') || 'none'}</Typography.Paragraph>
      {!tags.length && <Typography.Paragraph>All tags removed.</Typography.Paragraph>}
      <Button
        onPress={() => {
          setTags(['Design', 'Engineering', 'Research']);
          setSelected(new Set());
        }}>
        <Button.Label>Reset tags</Button.Label>
      </Button>
    </PreviewSection>
  );
}
