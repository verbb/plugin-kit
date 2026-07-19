# `@verbb/plugin-kit-codemirror-core`

Shared CodeMirror 6 setup for Plugin Kit code-editor surfaces — languages, theme chrome, and a small host helper.

You normally consume this through `<pk-code-editor>` / React `CodeEditor` / Vue `CodeEditor`. Use this package when you need the extensions or host without the web component.

## Install

```bash
npm install @verbb/plugin-kit-codemirror-core
```

## What you get

| Export | Purpose |
|--------|---------|
| `createCodeEditorExtensions` | Language + chrome extensions for a given mode |
| `createLanguageExtension` | Single-language helper |
| `codeEditorTheme` / colour constants | Shared CP-looking editor chrome |
| `CodeMirrorHost` | Mount / teardown helper for a CodeMirror view |
| `computeCodeEditorMinHeight` | Layout helper from line count |

Supported languages include HTML, CSS, JavaScript, and JSON (see `CodeEditorLanguage`).

## UI entry points

| Surface | Import |
|---------|--------|
| Web | `@verbb/plugin-kit-web/components/code-editor.js` |
| React | `CodeEditor` from `@verbb/plugin-kit-react/components` |
| Vue | `CodeEditor` from `@verbb/plugin-kit-vue/components` |

SchemaForm field key: `codeEditor` (via `@verbb/plugin-kit-react/forms` or `@verbb/plugin-kit-vue/forms`).

## Docs

[Code Editor (Web)](https://docs.verbb.io/plugin-kit/web/components/code-editor) · [React](https://docs.verbb.io/plugin-kit/react/components/code-editor) · [Vue](https://docs.verbb.io/plugin-kit/vue/components/code-editor)
