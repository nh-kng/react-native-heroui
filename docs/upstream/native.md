# HeroUI Native baseline

Repository: [heroui-inc/heroui-native](https://github.com/heroui-inc/heroui-native/tree/1980fbbbd6e8112cf9363614abec683379e89da3). Release: v1.0.11. Pinned commit: `1980fbbbd6e8112cf9363614abec683379e89da3`. License: Apache-2.0, retained in `baselines/heroui-native/LICENSE` together with original file headers and any selected upstream license notices. These files retain their upstream license independently of the root adapter package's MIT license.

## Source and dependencies

The entire `src/` tree is copied, including components, primitives, providers, hooks, utilities, contexts, optional integrations, styles, types, documentation, and tests. `src/index.tsx` is the root entry; component subdirectories retain their own entries. The upstream root manifest, TypeScript configurations, Babel configuration, Uniwind declaration reference, and scripts are retained as references.

React, React Native, gesture-handler, Reanimated, worklets, safe-area-context, SVG, tailwind-variants, tailwind-merge, Uniwind, and Tailwind stay external dependencies. Node declarations supply `Error.captureStackTrace` and `NodeJS.Timeout` types used by the preserved source.

The full library uses `@gorhom/bottom-sheet` in both types and implementation. It is installed as a development dependency for baseline compilation; the original runtime loading and optional-peer declarations remain unchanged. Optional `expo-blur` and `react-native-screens` integrations use guarded runtime loading and are not required for this static build. No optional native packages are added to the example or to the published adapter's peer contract.

## Build and limits

`tsconfig.baselines.native.json` checks and emits the runtime tree with strict typing, React Native export conditions, and the copied Uniwind declaration reference. Self-imports resolve to owned sources. Upstream test files are retained outside the runtime build.

The baseline build emits JavaScript and declarations and copies the complete stylesheet tree. A standalone smoke stylesheet includes Tailwind, Uniwind, and owned Native styles. Worklet directives remain in the emitted source; this build does not replace the consuming application's Babel/worklets or Metro configuration.

No native module, autolinking, podspec, or native build helper is introduced. JavaScript emission and CSS compilation do not establish native bundling, interaction, accessibility, animation, or native compilation compatibility. The current adapters and example continue using the installed `heroui-native` dependency.
