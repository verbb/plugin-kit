# Changelog

## Unreleased

## 2.0.0 - 2026-07-19

### Added
- Initial public release of `@verbb/plugin-kit-vue` — Vue adapters over `@verbb/plugin-kit-web` custom elements.
- Canonical bootstrap is Vue `createApp` + `PluginKitProvider`. Importing a facade registers its custom element family.
- Public surfaces mirror React: `./components`, `./app`, `./forms`, `./fault`, `./hooks`, `./utils`, and `./style.css`.
- SchemaForm UI bindings on `@verbb/plugin-kit-vue/forms`; shared store/validation in `@verbb/plugin-kit-forms`.

### Changed
- Package versions lockstep with `@verbb/plugin-kit-web`, `@verbb/plugin-kit-react`, `@verbb/plugin-kit-forms`, and related `@verbb/plugin-kit-*` packages at `2.0.0`.
