Comparing **HeroUI React v3** (`@heroui/react`) with **HeroUI Native** (`heroui-native`), the current official catalogs have **31 component families with the same name**. Shared names do not guarantee identical props or behavior. Sources: [React catalog](https://heroui.com/en/docs/react/components), [Native catalog](https://heroui.com/en/docs/native/components).

| Category | Components available in both |
| --- | --- |
| Buttons | Button, CloseButton |
| Collections | TagGroup |
| Controls | Slider, Switch |
| Forms | Checkbox, Description, FieldError, Input, InputGroup, InputOTP, Label, RadioGroup, SearchField, Select, TextArea, TextField |
| Navigation | Accordion, Tabs |
| Overlays | Popover, Toast |
| Feedback | Alert, Skeleton, Spinner |
| Layout | Card, Separator, Surface |
| Media | Avatar |
| Data display | Chip |
| Typography | Typography |
| Utilities | ScrollShadow |

These components have **similar purposes under different names**. The mappings below are functional comparisons, not interchangeable APIs.

| HeroUI React | HeroUI Native | Relationship |
| --- | --- | --- |
| [Modal](https://heroui.com/en/docs/react/components/modal) | [Dialog](https://heroui.com/en/docs/native/components/dialog) | Modal content and focused interactions |
| [Dropdown](https://heroui.com/en/docs/react/components/dropdown) | [Menu](https://heroui.com/en/docs/native/components/menu) | Triggered menus with actions, options, and submenus |
| [Link](https://heroui.com/en/docs/react/components/link) | [LinkButton](https://heroui.com/en/docs/native/components/link-button) | Link-style interaction; web uses an anchor, native uses a press handler |
| [Drawer](https://heroui.com/en/docs/react/components/drawer) | [BottomSheet](https://heroui.com/en/docs/native/components/bottom-sheet) | Partial match: sliding panels; Native’s sheet opens from the bottom |
| [ListBox](https://heroui.com/en/docs/react/components/list-box) | [ListGroup](https://heroui.com/en/docs/native/components/list-group) | Loose visual match: ListBox manages selection; ListGroup organizes pressable rows |

Native also lists `ControlField`, `SkeletonGroup`, and `PressableFeedback`, without direct same-name React catalog counterparts. [Native catalog](https://heroui.com/en/docs/native/components)

**In your repository**, the currently exported UI adapters are `Button`, `PressableFeedback`, `Card`, `Description`, `FieldError`, `Input`, `Label`, `TextField`, `Typography`, and `Chip`, plus `HeroUIProvider`. See [web exports](/Users/m4rk/Code/react-native-heroui/src/index.web.ts) and [native exports](/Users/m4rk/Code/react-native-heroui/src/index.native.ts).
