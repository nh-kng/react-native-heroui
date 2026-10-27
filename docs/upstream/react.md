# HeroUI React baseline

Repository: [heroui-inc/heroui](https://github.com/heroui-inc/heroui/tree/e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e). Release: v3.2.6. Pinned commit: `e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e`. License: MIT, retained in `baselines/heroui-react/LICENSE` together with original file headers and any selected upstream license notices.

## Source and dependencies

The owned tree preserves `packages/react/` and the entire `packages/styles/`. React component entries are under `packages/react/src/components/`, with the root entry at `packages/react/src/index.ts`. Shared hooks and utilities remain in their original directories. Styles retain their TypeScript variant definitions, CSS components, base rules, utilities, variants, and themes.

The copied `packages/testing/` harness and `packages/standard/` configuration preserve supporting references for upstream tests and tools. Root and package manifests are attribution and dependency references; they are not workspace packages and their lifecycle scripts are not run. The local pnpm workspace and lockfile remain authoritative for installed dependencies.

Third-party implementations stay external: React, React DOM, React Aria Components, React Aria, internationalized dates, Radix Avatar, React Stately utilities, React Types packages, input-otp, and tailwind-variants. `tw-animate-css` and Tailwind v4 support the stylesheet build. These dependencies are declared directly for baseline compilation instead of relying on pnpm transitive visibility.

## Build

`tsconfig.baselines.web.json` checks all runtime React and styles TypeScript sources with strict typing and upstream-compatible JSX preservation. Stories and tests remain copied reference material outside the runtime build. Node declarations provide the upstream `process` references without adding a runtime dependency.

The separate build transforms emitted JSX with TypeScript's automatic JSX runtime, then adjusts emitted JavaScript and declaration import specifiers to local ESM paths. Both typechecking and emitted files resolve `@heroui/styles` to the owned styles implementation. Copied source files remain byte-identical to upstream; build configuration and emitted-artifact adjustments are repository-owned tooling.

The generated React CSS entry points to the copied styles CSS. Tailwind compiles a standalone stylesheet smoke artifact from that entry. This establishes CSS import resolution and compilation, not visual or browser behavior parity. The current published `styles/web.css` entry continues to use the existing installed upstream package.
