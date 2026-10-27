# Platform support

The package ships JavaScript adapters and CSS for web, iOS, and Android. It does not register a native module and does not contain Swift or Kotlin code.

| Platform | Implementation | Package styling | Static verification |
| --- | --- | --- | --- |
| Web | HeroUI React public component subpaths | Tailwind CSS 4 and `styles/web.css` | Web TypeScript fixture and Expo JavaScript export. |
| iOS | HeroUI Native public component subpaths | Uniwind and `styles/native.css` | Native TypeScript fixture and Expo JavaScript export. |
| Android | HeroUI Native public component subpaths | Uniwind and `styles/native.css` | Native TypeScript fixture and Expo JavaScript export. |

Expo SDK 57 and React Native 0.86.3 are the example's pinned baseline. The package does not require a custom development client or package-specific autolinking. Native exports only verify JavaScript bundling; they do not compile Swift/Kotlin, build the host app, or verify rendering and accessibility. Web exports do not verify browser rendering or interaction.

The web provider coordinates the DOM theme classes with Uniwind and follows the system color-scheme media query when `colorScheme="system"`. Native theme selection is delegated to Uniwind. Field association, visibility, disabled state, and validation behavior remain delegated to the upstream component libraries.

## Related documentation

- [Requirements](../getting-started/requirements.md)
- [Architecture](../architecture/overview.md)
- [Testing](../development/testing.md)
