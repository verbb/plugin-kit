# Tiptap Editor

TiptapEditor provides a rich-text editing surface with a configurable toolbar and structured JSON output.

## Basic Usage

Use a focused toolbar for the default writing experience and keep the editor controlled so value changes stay in sync with the surrounding form.

<ComponentPreview src="./examples/tiptap-editor-basic.preview.tsx" />

## Expanded Toolbar

Use a broader toolbar when the editor is the primary authoring surface and needs headings, tables, links, code, and undo or redo support.

<ComponentPreview src="./examples/tiptap-editor-expanded-toolbar.preview.tsx" />

## Grouped Toolbar

The `toolbar` prop accepts a JSON array of buttons, separators (`"|"`), and group objects. Groups use a `preset` (or custom `items`) to open a Craft-style dropdown cluster.

Built-in presets:

| Preset | Menu contents |
| --- | --- |
| `formatting` | Paragraph, heading levels, blockquote, and code block |
| `headings` | Heading levels only |
| `lists` | Unordered and ordered list |
| `align` | Left, center, right, and justify |

`formatting` and `headings` accept optional `headingLevels` (e.g. `[1, 2, 3, 4]`). When omitted, levels default to `1`–`4`.

You can also pass a group with custom `items` instead of a preset, or mix presets with standalone buttons and separators in the same toolbar.

<ComponentPreview src="./examples/tiptap-editor-grouped-toolbar.preview.tsx" />
