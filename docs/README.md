# Plugin Kit docs

Unified VitePress site for [docs.verbb.io/plugin-kit](https://docs.verbb.io/plugin-kit/).

## Structure

| Section | Path | Content |
|---------|------|---------|
| Overview | `/overview/` | Product story, packages, where to start |
| Web | `/web/` | Canonical `<pk-*>` reference |
| React | `/react/` | React adapter guides, components, recipes, APIs |
| Vue | `/vue/` | Vue adapter guides, components, APIs |
| Forms | `/forms/` | SchemaForm guides + API (`react/forms` and `vue/forms`) |

Component workshop (visual demos) is separate — root `npm run dev` → `http://localhost:5175`.

## Dev

From the monorepo root:

```bash
npm run docs:dev
```

Or:

```bash
npm run docs:dev -w @verbb/plugin-kit-docs
```

Opens on port **5281** (base path `/plugin-kit/`).

## Build

```bash
npm run docs:build
```

## Edit links

GitHub edit URLs point at `docs/` in the plugin-kit repo — adjust `editLink.pattern` in `.vitepress/config.mts` if the default branch path differs.
