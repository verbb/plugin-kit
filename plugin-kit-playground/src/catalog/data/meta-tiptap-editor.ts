export const tiptapEditorPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'TiptapEditor',
    description: 'Rich-text editing surface with a configurable toolbar and structured JSON output.',
} as const;

export const tiptapEditorPlaygroundSections = {
    basic: {
        title: 'Basic Usage',
        description: 'Use a focused toolbar for the default writing experience and keep the editor controlled so value changes stay in sync with the surrounding form.',
        placeholder: 'Write something',
        buttons: 'bold,italic,underline,strikethrough,code,h2,unordered-list,ordered-list',
        initialValue: JSON.stringify([
            {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Hello from the editor.' }],
            },
        ]),
        maxWidth: '45rem',
        rows: 5,
    },
    expandedToolbar: {
        title: 'Expanded Toolbar',
        description: 'Use a broader toolbar when the editor is the primary authoring surface and needs headings, tables, links, code, and undo or redo support.',
        placeholder: 'Try all the formatting options',
        buttons: 'h1,h2,h3,bold,italic,underline,strikethrough,unordered-list,ordered-list,blockquote,code,code-block,link,table,undo,redo',
        initialValue: JSON.stringify([
            {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'Kitchen Sink Demo' }],
            },
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'This editor exposes more advanced formatting options including ' },
                    {
                        type: 'text',
                        marks: [{ type: 'link', attrs: { href: 'https://verbb.io' } }],
                        text: 'links',
                    },
                    { type: 'text', text: ', tables, and code blocks. Click a link to edit or unlink it.' },
                ],
            },
        ]),
        maxWidth: '50rem',
        rows: 8,
    },
    groupedToolbar: {
        title: 'Grouped Toolbar',
        description: 'Use `headings` for a TipTap-style heading picker, `formatting` for block types, or place the same buttons at the top level.',
        placeholder: 'Try grouped toolbar controls',
        toolbar: JSON.stringify([
            { preset: 'headings', headingLevels: [1, 2, 3, 4] },
            { preset: 'formatting', headingLevels: [1, 2, 3, 4] },
            'h2',
            '|',
            'bold',
            'italic',
            'underline',
            { preset: 'lists' },
            'unordered-list',
            '|',
            { preset: 'align' },
            'blockquote',
            'link',
            '|',
            'undo',
            'redo',
        ]),
        initialValue: JSON.stringify([
            {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'Grouped Toolbar Demo' }],
            },
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'The first dropdown is headings-only. The second groups paragraph, headings, blockquote, and code block.' },
                ],
            },
        ]),
        maxWidth: '50rem',
        rows: 8,
    },
} as const;
