# Extending TipTap

Plugin Kit exposes an application-level registry for extending its rich-document TipTap schema and toolbar. Use it to add custom nodes, marks, behaviour extensions, and controls without replacing the canonical editor components.

The registry is framework-neutral. The web component, React facade, and Vue facade all use the same registrations.

## Choose the Appropriate Extension Lane

Plugin Kit supports two complementary approaches:

| Requirement | Recommended approach |
| --- | --- |
| A constrained visual text attribute such as small caps, font family, or a known font size | Add an attribute to the existing `TextStyle` mark |
| A semantic inline annotation | Register a custom TipTap mark |
| Structured document content | Register a custom TipTap node |
| Editor-only behaviour, shortcuts, or a ProseMirror plugin | Register a behaviour extension for the `editor` surface |
| A command in the stock toolbar | Register a toolbar control, normally alongside its extension |

TextStyle is intentionally not a replacement for the general registry. It cannot represent nodes, node views, semantic marks, or arbitrary editor behaviour. Plugin Kit enables the official TextStyle extensions for font family, font size, text color, background color, and line height. Their toolbar menus remain opt-in.

## Registration Lifecycle

Register extensions and controls before the first `<pk-tiptap-editor>` or `<pk-tiptap-content>` instance mounts:

```ts
import {
    registerTiptapExtension,
    registerTiptapToolbarControl,
} from '@verbb/plugin-kit-tiptap-core';
```

Registrations are held in the current application module and are applied when an editor or renderer is created. Existing mounted instances are not dynamically rebuilt after a new registration.

Each registration function returns a disposer. This is useful in tests and hot-module replacement; application bootstrap code will normally keep a registration for the life of the page.

## Register a Node or Mark

Provide a stable registration ID and either a TipTap extension or a factory:

```ts
import { Mark } from '@tiptap/core';
import { registerTiptapExtension } from '@verbb/plugin-kit-tiptap-core';

registerTiptapExtension({
    id: 'acme/abbreviation',
    extension: () => Mark.create({
        name: 'abbreviation',
        inclusive: false,
        parseHTML: () => [{ tag: 'abbr' }],
        renderHTML: ({ HTMLAttributes }) => ['abbr', HTMLAttributes, 0],
    }),
});
```

Factories are recommended for extensions with mutable per-editor state. A factory is called once during registration for validation and again when each extension set is composed. It must return the same schema name every time and should otherwise be side-effect free.

Registrations are appended in registration order. Plugin Kit rejects:

- Empty, whitespace-padded, separator, or duplicate registration IDs.
- Duplicate TipTap schema names.
- Replacement of Plugin Kit's built-in schema extensions.
- Factories that return an invalid extension or change their schema name.

## Editor and Content Surfaces

Extensions target both rich-document surfaces by default:

| Surface | Used by | Purpose |
| --- | --- | --- |
| `editor` | `<pk-tiptap-editor>` | Editable authoring and commands |
| `content` | `<pk-tiptap-content>` | Read-only parsing and rendering |

Any node, mark, or attribute that can be persisted should remain available on both surfaces. Restrict an extension only when it cannot affect stored content:

```ts
registerTiptapExtension({
    id: 'acme/editor-shortcuts',
    extension: () => EditorShortcuts,
    surfaces: ['editor'],
});
```

`<pk-tiptap-input>` has a deliberately smaller one-line schema and does not use this registry.

## Register a Toolbar Control

A custom control can use the stock button styling, disabled state, tooltip, and active state:

```ts
import { registerTiptapToolbarControl } from '@verbb/plugin-kit-tiptap-core';
import { asterisk } from '@verbb/plugin-kit-icons';

registerTiptapToolbarControl({
    id: 'abbreviation',
    label: 'Abbreviation',
    icon: asterisk,
    run: (editor) => editor.chain().focus().toggleMark('abbreviation').run(),
    isActive: (editor) => editor.isActive('abbreviation'),
    isVisible: (editor) => editor.isEditable,
});
```

Then include the registered ID in a flat or structured toolbar:

The example below registers an `abbreviation` mark and adds its control to a live editor. Select text and use the asterisk button to toggle the custom mark.

<ComponentPreview src="./examples/tiptap-extension-toolbar-control.preview.web.ts" />

```html
<pk-tiptap-editor buttons="bold,italic,abbreviation"></pk-tiptap-editor>
```

```js
const editor = document.querySelector('pk-tiptap-editor');

if (editor) {
    editor.toolbar = [
        'bold',
        '|',
        {
            type: 'group',
            label: 'Annotations',
            items: ['abbreviation'],
        },
    ];
}
```

Control properties are:

| Property | Required | Description |
| --- | --- | --- |
| `id` | Yes | Stable ID used by `buttons` and structured toolbar configuration |
| `label` | Yes | Accessible name, fallback text, and tooltip label |
| `icon` | No | Plugin Kit icon data (`width`, `height`, and `path`); raw SVG markup is not accepted |
| `run(editor)` | Yes | Runs the command; return `false` to report that it was not handled |
| `isActive(editor)` | No | Controls the pressed/active presentation |
| `isVisible(editor)` | No | Hides the control when it is not applicable |

Built-in control IDs cannot be replaced. See the [complete built-in control list](/web/components/tiptap-editor#available-toolbar-controls).

## Extending TextStyle Safely

The base `TextStyle` mark and official TextStyle extensions are exported from `@verbb/plugin-kit-tiptap-core` and included in rich-document editors and renderers. Built-in menus are documented on the [Tiptap Editor page](/web/components/tiptap-editor#textstyle-controls). Add constrained global attributes for application-specific styles rather than accepting arbitrary CSS values.

For serializable visual styles, use the built-in definition registry. It creates the global TextStyle attribute and toolbar toggle together:

```ts
import { registerTiptapTextStyleDefinition } from '@verbb/plugin-kit-tiptap-core';

registerTiptapTextStyleDefinition({
    id: 'acme-uppercase',
    label: 'Uppercase',
    attribute: 'textTransform',
    cssProperty: 'text-transform',
    allowedValues: ['uppercase'],
    toolbarValue: 'uppercase',
});
```

The portable definition lane accepts only predefined values for `font-variant-caps` and `text-transform`. Use a regular extension for semantics, arbitrary styling, or behavior that cannot fit this deliberately narrow contract.

Small caps is built in as the reference implementation:

```json
{
    "type": "textStyle",
    "attrs": {
        "fontVariantCaps": "small-caps"
    }
}
```

It renders as inline `font-variant-caps: small-caps`, which remains useful in frontend output and email HTML. Enable its toolbar control with the `small-caps` ID; it is available but is not added to the default toolbar.

When implementing another TextStyle attribute:

- Accept a small, explicit set of values and map them to known CSS output.
- Parse only the corresponding known HTML values.
- Set or unset only your own attribute with `setMark('textStyle', {...})`.
- After unsetting, call `removeEmptyTextStyle()` so empty spans are removed without deleting other TextStyle attributes.
- Register the attribute extension on both `editor` and `content` surfaces.

## Stored Content and Server Parity

A persisted TipTap node, mark, or TextStyle attribute changes the document data contract. Every editor and renderer that can encounter that JSON must understand the same schema.

If content is normalized or rendered on the server through [`verbb/tiptap`](https://github.com/verbb/tiptap), register a matching PHP extension there as well. Otherwise an unknown node or mark may be omitted or rendered without its intended formatting.

Plugin Kit deliberately does not discover Craft plugins, load third-party scripts, or expose product globals such as `Craft.Formie` or `Craft.Vizy`. Consuming applications own allow-listing, bootstrap order, and any public bridge that supplies their bundled TipTap APIs to partner code.

## Bundling Note

The extension registry is intended for applications importing `@verbb/plugin-kit-tiptap-core` and the Plugin Kit components into the same module graph. Register before mounting the component that creates the editor.

The standalone no-build loader does not currently expose a global extension registry. Applications requiring third-party registration should use the npm packages and their normal build pipeline.
