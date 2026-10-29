# SegmentedControl source references

SegmentedControl is a package-authored component rather than an upstream component copy. It composes the locally owned TagGroup public component API on native and React Aria's public TagGroup API on web; its indicator geometry and animation are independent of Tabs contexts.

Selection behavior was checked against `upstream/heroui-native/src/primitives/tag-group/tag-group.tsx` at `1980fbbbd6e8112cf9363614abec683379e89da3` and `upstream/heroui-react/packages/react/src/components/tag-group/tag-group.tsx` at `e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e`. Visual tokens and primary pill treatment follow the corresponding pinned Tabs styles. Existing upstream license notices remain with those owned sources in `src/primitives/` and `styles/`.

References: [React Tabs](https://heroui.com/en/docs/react/components/tabs), [React TagGroup](https://heroui.com/en/docs/react/components/tag-group), [Native Tabs](https://heroui.com/en/docs/native/components/tabs), and [Native TagGroup](https://heroui.com/en/docs/native/components/tag-group). Live documentation can describe newer releases; pinned source defines the supported integration.
