# Example app

This private Expo SDK 57 app consumes the workspace package and presents a shared gallery of the provider, button states, card and typography compounds, controlled and uncontrolled inputs, and field validation.

Install from the repository root with `pnpm install`. Then run one of these scripts from the root:

```sh
pnpm --filter heroui-example start
pnpm --filter heroui-example web
pnpm --filter heroui-example ios
pnpm --filter heroui-example android
```

`ios` and `android` start Expo for the selected platform; they do not build a development client or native project. The app wraps its tree in the gesture-handler and safe-area roots required by HeroUI Native's provider. The platform style bootstrap loads the matching package CSS entry point and includes the gallery's utility classes. The web export uses `postcss.config.mjs` to compile Tailwind CSS and the package's shared semantic component stylesheet.

Check the consumer and Expo configuration without launching a runtime:

```sh
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
```

See [installation](../docs/getting-started/installation.md), [component API](../docs/api/components.md), and [testing](../docs/development/testing.md) for package setup and verification limits.
