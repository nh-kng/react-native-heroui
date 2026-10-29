import {
  Accordion,
  Button,
  Card,
  Description,
  Input,
  Label,
  Popover,
  ScrollShadow,
  Select,
  Separator,
  Surface,
  Tabs,
  TagGroup,
  TextField,
  Typography,
  useToast,
} from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';

import { Glyph, NativeHorizontalScroller, Row, type DemoProps } from './shared';

const questions = [
  ['item-1', 'How do I place an order?', "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase."],
  ['item-2', 'Can I modify or cancel my order?', "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes."],
  ['item-3', 'What payment methods do you accept?', 'We accept all major credit cards, including Visa, Mastercard, and American Express.'],
  ['item-4', 'How much does shipping cost?', 'Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.'],
  ['item-5', 'Do you ship internationally?', 'Yes, we ship to most countries. Please check our shipping rates and policies for more information.'],
  ['item-6', 'How do I request a refund?', "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance."],
] as const;

export function AccordionDemo({ id }: DemoProps) {
  const [keys, setKeys] = useState<Set<string>>(new Set(['item-1']));
  const content = (
    <Accordion
      expandedKeys={id === 'accordion-controlled' ? keys : undefined}
      onExpandedChange={setKeys}
      defaultExpandedKeys={new Set(['item-1'])}
      selectionMode={id === 'accordion-multiple' ? 'multiple' : 'single'}
      className={
        id === 'accordion-custom-styles' ? 'rounded-xl border border-purple-500 p-4' : undefined
      }>
      {questions.map(([value, title, body], index) => (
        <Accordion.Item
          key={value}
          value={value}
          isDisabled={id === 'accordion-disabled' && index === 1}
          className={id === 'accordion-without-separator' ? 'border-0' : undefined}>
          <Accordion.Trigger>
            <Typography.Paragraph weight="medium">
              {id === 'accordion-faq' ? `${index + 1}. ${title}` : title}
            </Typography.Paragraph>
            {id === 'accordion-custom-indicator' ? (
              <Glyph>{keys.has(value) ? '−' : '+'}</Glyph>
            ) : (
              <Accordion.Indicator />
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <Typography.Paragraph>{body}</Typography.Paragraph>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
  return (
    <>
      {id === 'accordion-surface' ? (
        <Surface className="rounded-xl p-4">{content}</Surface>
      ) : (
        content
      )}
      {id === 'accordion-controlled' && (
        <Description>Expanded: {[...keys].join(', ') || 'none'}</Description>
      )}
    </>
  );
}

export function PopoverDemo({ id }: DemoProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');
  const placements =
    id === 'popover-placement'
      ? (['top', 'right', 'bottom', 'left'] as const)
      : (['bottom'] as const);
  return (
    <>
      <Row>
        {placements.map((placement) => (
          <Popover
            key={placement}
            isOpen={id === 'popover-interactive' ? open : undefined}
            onOpenChange={id === 'popover-interactive' ? setOpen : undefined}>
            <Popover.Trigger>
              <Button variant="secondary">
                <Button.Label>
                  {id === 'popover-placement' ? placement : 'Open popover'}
                </Button.Label>
              </Button>
            </Popover.Trigger>
            <Popover.Content
              className={
                id === 'popover-custom-styles'
                  ? 'max-w-72 rounded-2xl border border-purple-500 p-5'
                  : 'max-w-72 p-4'
              }
              webProps={{ placement }}
              nativeProps={{ presentation: 'popover', placement }}>
              {(id === 'popover-with-arrow' || id === 'popover-placement') && <Popover.Arrow />}
              <Typography.Heading type="h3">Popover content</Typography.Heading>
              {id === 'popover-interactive' ? (
                <>
                  <TextField>
                    <Label>Name</Label>
                    <Input value={name} onChangeText={setName} placeholder="Jane Doe" />
                  </TextField>
                  <Button
                    isDisabled={!name.trim()}
                    onPress={() => {
                      setSaved(name.trim());
                      setOpen(false);
                    }}>
                    <Button.Label>Save</Button.Label>
                  </Button>
                </>
              ) : (
                <Typography.Paragraph>This is the content of the popover.</Typography.Paragraph>
              )}
            </Popover.Content>
          </Popover>
        ))}
      </Row>
      {saved && <Description>Saved name: {saved}</Description>}
    </>
  );
}

const fruit = [
  { value: 'florida', label: 'Florida' },
  { value: 'delaware', label: 'Delaware' },
  { value: 'california', label: 'California' },
  { value: 'texas', label: 'Texas' },
  { value: 'new-york', label: 'New York' },
  { value: 'washington', label: 'Washington' },
];

export function SelectDemo({ id, variant }: DemoProps & { variant?: 'primary' | 'secondary' }) {
  const [value, setValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(id === 'select-asynchronous-loading' ? [] : fruit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  if (id === 'select-variants' && !variant)
    return (
      <>
        {(['primary', 'secondary'] as const).map((variant) => (
          <SelectDemo key={variant} id={id} variant={variant} />
        ))}
      </>
    );
  const controlled = ['select-controlled', 'select-with-clear-button'].includes(id);
  const select = (
    <Select
      items={items}
      {...(controlled ? { value, onValueChange: setValue } : { defaultValue: undefined })}
      isDisabled={id === 'select-disabled'}
      isOpen={id === 'select-controlled-open-state' ? open : undefined}
      onOpenChange={setOpen}
      className="w-full"
      webProps={{ 'aria-label': 'State', isRequired: id === 'select-required', variant }}
      nativeProps={{ accessibilityLabel: 'State' }}>
      <Label>State</Label>
      <Select.Trigger
        className={id === 'select-custom-styles' ? 'rounded-full border-purple-500' : undefined}>
        <Select.Value placeholder={loading ? 'Loading…' : 'Select one'} />
      </Select.Trigger>
      <Select.Content>
        {items.map((item, index) => (
          <Select.Item
            key={item.value}
            {...item}
            isDisabled={id === 'select-with-disabled-options' && index === 1}
          />
        ))}
      </Select.Content>
      {id === 'select-with-description' && (
        <Description>Choose your state of residence.</Description>
      )}
    </Select>
  );
  return (
    <>
      {id === 'select-on-surface' ? <Surface className="rounded-xl p-6">{select}</Surface> : select}
      {id === 'select-controlled' && <Description>Selected: {value || 'none'}</Description>}
      {id === 'select-with-clear-button' && (
        <Button isDisabled={!value} variant="secondary" onPress={() => setValue(undefined)}>
          <Button.Label>Clear selection</Button.Label>
        </Button>
      )}
      {id === 'select-controlled-open-state' && (
        <>
          <Button onPress={() => setOpen(!open)}>
            <Button.Label>{open ? 'Close select' : 'Open select'}</Button.Label>
          </Button>
          <Description>{open ? 'Open' : 'Closed'}</Description>
        </>
      )}
      {id === 'select-asynchronous-loading' && (
        <>
          <Button
            isDisabled={loading}
            onPress={async () => {
              setLoading(true);
              setError(false);
              await new Promise<void>((resolve) => setTimeout(resolve, 600));
              setItems(fruit);
              setLoading(false);
            }}>
            <Button.Label>
              {loading ? 'Loading states…' : items.length ? 'Reload states' : 'Load states'}
            </Button.Label>
          </Button>
          <Button
            variant="secondary"
            isDisabled={loading}
            onPress={() => {
              setItems([]);
              setError(true);
            }}>
            <Button.Label>Simulate loading failure</Button.Label>
          </Button>
          {error && <Description>Couldn't load states. Choose Load states to retry.</Description>}
          {!loading && !error && !items.length && <Description>No states loaded yet.</Description>}
          <Description>Uses a local simulated request.</Description>
        </>
      )}
    </>
  );
}

export function TabsDemo({ id }: DemoProps) {
  const [value, setValue] = useState('overview');
  const vertical = id.includes('vertical') && Platform.OS === 'web';
  const labels =
    id === 'tabs-overflow'
      ? [
          'Overview',
          'Analytics',
          'Reports',
          'Notifications',
          'Integrations',
          'Team',
          'Billing',
          'Settings',
        ]
      : ['Overview', 'Analytics', 'Settings'];
  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className={vertical ? 'flex-row gap-4' : undefined}
      nativeProps={{ variant: id.includes('secondary') ? 'secondary' : 'primary' }}
      webProps={{
        orientation: vertical ? 'vertical' : 'horizontal',
        variant: id.includes('secondary') ? 'secondary' : 'primary',
        align: id === 'tabs-vertical-alignment' ? 'start' : 'center',
      }}>
      <NativeHorizontalScroller enabled={id === 'tabs-overflow'}>
        <Tabs.List
          className={
            vertical
              ? 'flex-col'
              : id === 'tabs-custom-styles'
                ? 'rounded-xl border border-purple-500'
                : undefined
          }
          webProps={{ 'aria-label': 'Dashboard sections' }}>
          <Tabs.Indicator />
          {labels.map((label) => (
            <Tabs.Tab
              key={label}
              value={label.toLowerCase()}
              isDisabled={id === 'tabs-disabled' && label === 'Settings'}>
              {label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </NativeHorizontalScroller>
      {labels.map((label) => (
        <Tabs.Panel key={label} value={label.toLowerCase()}>
          <Typography.Heading type="h3">{label}</Typography.Heading>
          <Typography.Paragraph>Your {label.toLowerCase()} content goes here.</Typography.Paragraph>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

export function TagGroupDemo({ id }: DemoProps) {
  const [tags, setTags] = useState(['Design', 'Engineering', 'Marketing']);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<'none' | 'single' | 'multiple'>('multiple');
  const removable = id === 'tag-group-with-remove-button' || id === 'tag-group-with-list-data';
  return (
    <>
      {id === 'tag-group-selection-modes' && (
        <Row>
          {(['none', 'single', 'multiple'] as const).map((next) => (
            <Button
              key={next}
              variant={mode === next ? 'primary' : 'secondary'}
              onPress={() => {
                setMode(next);
                setSelected(new Set());
              }}>
              <Button.Label>{next}</Button.Label>
            </Button>
          ))}
        </Row>
      )}
      <TagGroup
        selectionMode={
          id === 'tag-group-selection-modes'
            ? mode
            : id === 'tag-group-controlled'
              ? 'multiple'
              : 'none'
        }
        selectedKeys={selected}
        onSelectionChange={setSelected}
        disabledKeys={id === 'tag-group-disabled' ? new Set(['Engineering']) : undefined}
        onRemove={
          removable
            ? (keys) => {
                setTags((current) => current.filter((tag) => !keys.has(tag)));
                setSelected((current) => new Set([...current].filter((tag) => !keys.has(tag))));
              }
            : undefined
        }
        webProps={{ 'aria-label': 'Teams' }}>
        <TagGroup.List>
          {tags.map((tag) => (
            <TagGroup.Item
              key={tag}
              id={tag}
              textValue={tag}
              className={
                id === 'tag-group-custom-styles' ? 'rounded-md border-purple-500' : undefined
              }>
              {id === 'tag-group-with-prefix' && <Glyph>♯</Glyph>}
              <TagGroup.Label>{tag}</TagGroup.Label>
              {removable && <TagGroup.RemoveButton />}
            </TagGroup.Item>
          ))}
        </TagGroup.List>
      </TagGroup>
      {id === 'tag-group-controlled' && (
        <Description>Selected: {[...selected].join(', ') || 'none'}</Description>
      )}
      {!tags.length && <Description>No teams remain.</Description>}
      {removable && (
        <Button
          variant="secondary"
          onPress={() => {
            setTags(['Design', 'Engineering', 'Marketing']);
            setSelected(new Set());
          }}>
          <Button.Label>Reset teams</Button.Label>
        </Button>
      )}
    </>
  );
}

export function ScrollShadowDemo({ id }: DemoProps) {
  const [horizontal, setHorizontal] = useState(false);
  const [visible, setVisible] = useState(true);
  const content = (
    <View
      className={horizontal ? 'flex-row gap-6 p-4' : 'gap-4 p-4'}
      style={horizontal ? { minWidth: 1200 } : undefined}>
      {Array.from({ length: 15 }, (_, index) => (
        <Typography.Paragraph key={index}>Item {index + 1}</Typography.Paragraph>
      ))}
    </View>
  );
  const list = (
    <ScrollShadow
      orientation={horizontal ? 'horizontal' : 'vertical'}
      size={id === 'scroll-shadow-size' ? 80 : 40}
      className={
        id === 'scroll-shadow-custom-styles'
          ? 'h-48 w-full rounded-xl border border-purple-500'
          : 'h-48 w-full'
      }
      webProps={{
        hideScrollBar: id === 'scroll-shadow-hide-scroll-bar',
        onVisibilityChange: (value) => setVisible(value !== 'none'),
      }}>
      {Platform.OS === 'web' ? (
        content
      ) : (
        <ScrollView
          horizontal={horizontal}
          showsHorizontalScrollIndicator={id !== 'scroll-shadow-hide-scroll-bar'}
          showsVerticalScrollIndicator={id !== 'scroll-shadow-hide-scroll-bar'}
          style={{ height: 192 }}>
          {content}
        </ScrollView>
      )}
    </ScrollShadow>
  );
  return (
    <>
      {id === 'scroll-shadow-with-card' ? (
        <Card>
          <Card.Header>
            <Card.Title>Scrollable card</Card.Title>
          </Card.Header>
          <Card.Body>{list}</Card.Body>
        </Card>
      ) : (
        list
      )}
      {id === 'scroll-shadow-orientation' && (
        <Button onPress={() => setHorizontal(!horizontal)}>
          <Button.Label>
            {horizontal ? 'Use vertical scrolling' : 'Use horizontal scrolling'}
          </Button.Label>
        </Button>
      )}
      {id === 'scroll-shadow-visibility-change' && (
        <Description>
          Shadows: {visible ? 'visible' : 'hidden'} (web visibility callback)
        </Description>
      )}
    </>
  );
}

export function ToastDemo({ id }: DemoProps) {
  const toast = useToast();
  return (
    <Row>
      {(id === 'toast-variants'
        ? (['default', 'accent', 'success', 'warning', 'danger'] as const)
        : (['default'] as const)
      ).map((variant) => (
        <Button
          key={variant}
          onPress={() =>
            toast.show({
              title: id === 'toast-simple' ? 'Event created' : 'Your changes have been saved',
              description:
                id === 'toast-simple' ? undefined : 'Your changes have been successfully saved.',
              variant,
            })
          }>
          <Button.Label>{id === 'toast-variants' ? `Show ${variant}` : 'Show toast'}</Button.Label>
        </Button>
      ))}
    </Row>
  );
}
