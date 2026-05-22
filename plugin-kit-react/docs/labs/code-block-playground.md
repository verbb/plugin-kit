# Code Block Playground

This page is now the package docs reference for code-block authoring.

Default to native VitePress markdown syntax for normal documentation. Reach for `ComponentPreview` only when the page needs a live rendered example that stays visually joined to its code block.

Use it as a scratchpad while we lock in parity with Mintlify's code formatting patterns from [Format code](https://www.mintlify.com/docs/create/code).

## Fenced block

This should be the default for most docs pages.

```tsx
import { Button } from '@verbb/plugin-kit-react/components';

export function SaveButton() {
    return <Button variant="primary">Save changes</Button>;
}
```

## Line highlighting

Use VitePress line ranges when you want a durable highlight that stays in markdown instead of component props.

```tsx{4,7-8}
import { Button } from '@verbb/plugin-kit-react/components';

export function ToolbarActions() {
    return (
        <div className="flex gap-2">
            <Button variant="primary">Publish</Button>
            <Button variant="secondary">Preview</Button>
        </div>
    );
}
```

## Inline directives

Use inline directives when the meaning belongs on a specific line.

```ts:line-numbers
export const releaseGate = {
    severity: 'warning', // [!code warning]
    needsManualQA: true, // [!code highlight]
    readyForRelease: false, // [!code error]
};
```

## Diff syntax

Use VitePress diff comments instead of a custom wrapper whenever the page just needs colored added and removed lines.

```ts:line-numbers
export const docsCodeBlockConfig = {
    copyButton: true,
    titleRequired: false, // [!code --]
    titleRequired: true, // [!code ++]
    wrapLongLines: false,
};
```

## Code groups

Use `::: code-group` for standard tabbed examples.

::: code-group
```tsx [React]
import { Button } from '@verbb/plugin-kit-react/components';

export function Example() {
    return <Button variant="primary">Continue</Button>;
}
```

```html [HTML]
<button class="btn btn--primary">Continue</button>
```

```css [CSS]
.btn--primary {
    background: #dc2626;
    color: white;
}
```
:::

## Preview block

Use `ComponentPreview` when the page needs the live rendered example visually joined to its code, while keeping the code shell as close as possible to the standard fenced-block treatment.

<ComponentPreview src="../components/examples/button-variants.preview.tsx" />

## Preview tabs

Use joined preview tabs when multiple examples need the same preview-plus-code treatment, not just a plain code-group. The preview renderer should preserve the same code-tab and copy-button behavior as the standard shell.

<ComponentPreview :src="[
  '../components/examples/button-variants.preview.tsx',
  '../components/examples/button-icons.preview.tsx',
  '../components/examples/button-loading.preview.tsx',
]" />
