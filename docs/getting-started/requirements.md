# Requirements

The library is a JavaScript and TypeScript adapter package. A host app must provide the peer packages used by the platform and component APIs it imports.

| Area | Package range or repository baseline | Use |
| --- | --- | --- |
| React | `>=19.0.0` | Shared component runtime. |
| React Native | `>=0.81.0`; the example pins `0.86.3` | Native adapter runtime. |
| React DOM | `>=19.0.0` | Web adapter runtime. |
| Tailwind CSS | `^4.0.0` | Web CSS and native utility compilation. |
| Uniwind | `^1.13.0` | Native utility styles and theme coordination. |
| MaskedView | `^0.3.2`; the example pins `0.3.2` | Required peer for native LoadingText glyph masking. |
| Expo example | SDK `57.0.31` | Repository consumer baseline. |

The root `package.json` lists all required peers, including React Aria and native support packages. The example uses the Expo SDK 57 bundled versions for its React Native peers. It has no custom native module, autolinking configuration, or development-client requirement.

The optional `@gorhom/bottom-sheet`, `expo-blur`, and `react-native-screens` peers retain the baseline's optional native integrations. See `package.json` for their ranges.

Use a Node.js and pnpm version compatible with the selected Expo SDK and React Native release. The repository pins pnpm `10.32.1` and keeps a single lockfile.

## Related documentation

- [Installation](installation.md)
- [Compatibility](../development/compatibility.md)
- [Platform support](../guides/platform-support.md)
