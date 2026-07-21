# Changelog

## Unreleased

### Fixed
- Slotted menu/button/option/tab labels inherit kit size-token type metrics from the web-component host (lockstep with `@verbb/plugin-kit-web` slotted-host fix). No Vue API change.

## 2.0.3 - 2026-07-19

### Changed
- Restored lockstep versioning across all `@verbb/plugin-kit-*` packages after interim `2.0.1` / `2.0.2` drift.

## 2.0.0 - 2026-07-19

### Added
- Initial public release of `@verbb/plugin-kit-vue` — Vue adapters over `@verbb/plugin-kit-web` custom elements.
- Canonical bootstrap is Vue `createApp` + `PluginKitProvider`. Importing a facade registers its custom element family.
- Public surfaces mirror React: `./components`, `./app`, `./forms`, `./fault`, `./hooks`, `./utils`, and `./style.css`.
- SchemaForm UI bindings on `@verbb/plugin-kit-vue/forms`; shared store/validation in `@verbb/plugin-kit-forms`.

### Changed
- Package versions lockstep with `@verbb/plugin-kit-web`, `@verbb/plugin-kit-react`, `@verbb/plugin-kit-forms`, and related `@verbb/plugin-kit-*` packages at `2.0.0`.
