# Release

> Status: Stable
> Last reviewed: 2026-10-23

## Overview

The root package is configured for public scoped publishing. Releases must include the generated JavaScript and declaration output, a reviewed changelog entry, and verification appropriate to any native or public API change.

## Prepare

From the repository root:

```sh
pnpm install --frozen-lockfile
CI=1 pnpm check
pnpm pack --dry-run
```

Review the tarball contents, `CHANGELOG.md`, platform documentation, and version fields in `package.json` and `android/build.gradle`. The `prepare` script rebuilds `build/` during install and `prepublishOnly` runs the build before publishing.

## Publish

After the version and changelog are reviewed, publish through the repository's normal authenticated release process:

```sh
pnpm publish
```

Publishing is intentionally separate from local checks. Native consumers need a fresh development build after installing a release that changes native code or Expo module registration.

## Related documentation

- [Testing](testing.md)
- [Compatibility](compatibility.md)
- [Platform support](../guides/platform-support.md)
