# Component examples

The Expo gallery follows the Usage, Examples, and Customization previews linked from [HeroUI React components](https://heroui.com/en/docs/react/components). The catalog accounts for 272 previews across 31 public component pages: 228 adapted previews and 44 explicit public API gaps. These are adaptations to the current adapter, not a claim of complete upstream API or visual parity. PressableFeedback has its own adapter examples because it has no React documentation page; HeroUIProvider configures the app rather than appearing as a standalone component demo.

## Coverage

| Component | Adapted previews | API gaps |
| --- | ---: | ---: |
| [Accordion](https://heroui.com/en/docs/react/components/accordion) | 9 | 1 |
| [Alert](https://heroui.com/en/docs/react/components/alert) | 2 | 0 |
| [Avatar](https://heroui.com/en/docs/react/components/avatar) | 6 | 1 |
| [Button](https://heroui.com/en/docs/react/components/button) | 12 | 2 |
| [Card](https://heroui.com/en/docs/react/components/card) | 7 | 0 |
| [Checkbox](https://heroui.com/en/docs/react/components/checkbox) | 12 | 3 |
| [Chip](https://heroui.com/en/docs/react/components/chip) | 5 | 0 |
| [CloseButton](https://heroui.com/en/docs/react/components/close-button) | 4 | 0 |
| [Description](https://heroui.com/en/docs/react/components/description) | 2 | 0 |
| [FieldError](https://heroui.com/en/docs/react/components/field-error) | 2 | 0 |
| [Input](https://heroui.com/en/docs/react/components/input) | 7 | 0 |
| [InputGroup](https://heroui.com/en/docs/react/components/input-group) | 17 | 4 |
| [InputOTP](https://heroui.com/en/docs/react/components/input-otp) | 11 | 0 |
| [Label](https://heroui.com/en/docs/react/components/label) | 2 | 0 |
| [Popover](https://heroui.com/en/docs/react/components/popover) | 5 | 1 |
| [RadioGroup](https://heroui.com/en/docs/react/components/radio-group) | 10 | 2 |
| [ScrollShadow](https://heroui.com/en/docs/react/components/scroll-shadow) | 7 | 0 |
| [SearchField](https://heroui.com/en/docs/react/components/search-field) | 13 | 2 |
| [Select](https://heroui.com/en/docs/react/components/select) | 13 | 6 |
| [Separator](https://heroui.com/en/docs/react/components/separator) | 6 | 1 |
| [Skeleton](https://heroui.com/en/docs/react/components/skeleton) | 7 | 1 |
| [Slider](https://heroui.com/en/docs/react/components/slider) | 5 | 1 |
| [Spinner](https://heroui.com/en/docs/react/components/spinner) | 5 | 0 |
| [Surface](https://heroui.com/en/docs/react/components/surface) | 4 | 0 |
| [Switch](https://heroui.com/en/docs/react/components/switch) | 12 | 3 |
| [Tabs](https://heroui.com/en/docs/react/components/tabs) | 8 | 2 |
| [TagGroup](https://heroui.com/en/docs/react/components/tag-group) | 8 | 4 |
| [TextArea](https://heroui.com/en/docs/react/components/text-area) | 7 | 0 |
| [TextField](https://heroui.com/en/docs/react/components/text-field) | 12 | 1 |
| [Toast](https://heroui.com/en/docs/react/components/toast) | 3 | 8 |
| [Typography](https://heroui.com/en/docs/react/components/typography) | 5 | 1 |

## Sources and maintenance

The [catalog](../../example/gallery/docs-examples/catalog.ts) preserves every upstream preview ID, heading, and order. The pinned MDX pages under `upstream/heroui-react/apps/docs/content/docs/en/react/components/` define that inventory, and `upstream/heroui-react/apps/docs/src/demos/en/` contains the reference implementations. The component index and current Checkbox, Tabs, and Toast page headings were checked against the live site on October 28, 2026. Other pages use the pinned source snapshot; updating it requires checking the corresponding live pages.

Renderers consume public package exports and use typed platform options. [Adaptation notes](../../example/gallery/docs-examples/notes.ts) identify platform differences, local form submission, simulated loading, the separate clear-selection action, native separator thicknesses, and native tabs behavior. Forms keep their state in the demo; social button examples do not connect authentication.

The [limitations registry](../../example/gallery/docs-examples/limitations.ts) is the authoritative list of unsupported preview IDs and precise missing contracts. The gallery displays those entries under Upstream API differences. Examples include omitted render callbacks, multiple Select values, missing compound parts, browser-only clipboard and keyboard APIs, and managed Toast queue/rendering options. Do not substitute an unrelated default component and count it as implementing one of these examples.

Follow the root [agent rules](../../AGENTS.md) and [example rules](../../example/AGENTS.md) when updating previews. Update the catalog, renderer, notes or limitation, and this coverage table together.

## Verification

The non-rendering coverage test checks that the catalog includes every implemented React component and every pinned MDX preview in page order, rejects stale limitation IDs, and checks that examples import public adapters rather than upstream/private implementations. Both example TypeScript export conditions validate the composed public API.

```sh
node --test tests/gallery-examples.test.mjs
pnpm --filter heroui-example exec tsc --noEmit --customConditions browser
pnpm --filter heroui-example exec tsc --noEmit --customConditions react-native
```

These checks do not verify rendering, accessibility, interaction, remote image availability, or native compilation. Follow the repository's [runtime verification boundary](testing.md#runtime-verification-boundary).
