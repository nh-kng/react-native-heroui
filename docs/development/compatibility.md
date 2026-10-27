# Compatibility

The package peers are declared in the root `package.json`. They cover the two upstream component packages and their public runtime/type dependencies because both platform declarations include the typed `nativeProps` and `webProps` escape hatches.

| Dependency group | Declared range | Example pin |
| --- | --- | --- |
| React | `>=19.0.0` | `19.2.3` |
| React DOM | `>=19.0.0` | `19.2.3` |
| React Native | `>=0.81.0` | `0.86.3` |
| `@heroui/react` | `^3.2.6` | `3.2.6` |
| `heroui-native` | `^1.0.11` | `1.0.11` |
| Tailwind CSS | `^4.0.0` | `4.3.3` |
| Uniwind | `^1.13.0` | `1.13.0` |

The example is pinned to Expo SDK 57.0.31 and the matching packages reported by Expo's bundled native module metadata. Its Expo and React Native versions are a repository baseline, not additional native package code or an Expo module requirement.

The repository typechecks and exports JavaScript for web, iOS, and Android. It does not claim that those checks establish browser runtime support, native compilation, or device accessibility behavior.

## Related documentation

- [Requirements](../getting-started/requirements.md)
- [Platform support](../guides/platform-support.md)
- [Testing](testing.md)
