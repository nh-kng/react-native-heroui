# Example app

This private Expo SDK 57 app consumes the workspace package and presents live examples of all ten public UI components. Select a component in the sidebar, or open Menu on layouts narrower than 900px to use the navigation drawer. Theme controls select system, light, or dark appearance. Switching components resets the examples and scroll position; the selected theme persists during the session. The gallery contains representative previews without API documentation or source-code panels.

Sidebar and drawer items use the package's PressableFeedback with a Highlight overlay and retain the selected item's surface background. The PressableFeedback gallery page demonstrates the root scale, ripple, child scale, disabled state, and animation controls.

Install from the repository root with `pnpm install`. Then run one of these scripts from the root:

```sh
pnpm --filter heroui-example start
pnpm --filter heroui-example web
pnpm --filter heroui-example ios
pnpm --filter heroui-example android
```

`ios` and `android` start Expo for the selected platform; they do not build a development client or native project. The app wraps its tree in the gesture-handler and safe-area roots required by HeroUI Native's provider. The app imports one `global.css`, which loads the package's unified stylesheet and includes the gallery's utility classes. Metro's Uniwind integration compiles that same file on native and web. The System/Light/Dark buttons select the shared provider theme; semantic and brand tokens come from one source. See [quick start](../docs/getting-started/quick-start.md#shared-token-customization) to override tokens in the global stylesheet.

Check the consumer and Expo configuration without launching a runtime:

```sh
pnpm --filter heroui-example exec tsc --noEmit
pnpm --filter heroui-example exec expo config --json
```

See [installation](../docs/getting-started/installation.md), [component API](../docs/api/components.md), and [testing](../docs/development/testing.md) for package setup and verification limits.
