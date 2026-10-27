# Release preparation

The package publishes generated web and native JavaScript and declarations, platform CSS, changelog, license, and package documentation. `package.json` controls the published files through its `files` list.

Before preparing a release, install from the frozen workspace lockfile and run the checks relevant to the change:

```sh
pnpm install --frozen-lockfile
pnpm run build
pnpm run typecheck
pnpm run typecheck:fixtures
pnpm run lint
pnpm test
pnpm pack --dry-run
```

Review the generated files and dry-run package contents, confirm public API documentation and `CHANGELOG.md` match the implementation, and update the package version only as part of an explicitly requested release. Publishing is outside local verification.

## Related documentation

- [Testing](testing.md)
- [Compatibility](compatibility.md)
- [API overview](../api/README.md)
