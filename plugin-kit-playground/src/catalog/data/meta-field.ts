export const fieldPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Field',
    description: '`pk-field` wrapper — label, instructions, errors, warnings, tips.',
} as const;

export const fieldPlaygroundSections = {
    standaloneLabels: {
        title: 'Standalone labels',
        description: 'Control-level `label` and `instructions` without `pk-field`.',
        label: 'Title',
        instructions: 'Standalone controls can still expose their own label and instructions.',
        placeholder: 'My entry',
    },
    errorsAndWarnings: {
        title: 'Errors and warnings',
        description: '`errors`, `warning`, and `required`. Inline Markdown in property values.',
        label: 'Entry title',
        instructions: 'Shown on the public entry page. Supports **inline Markdown**, links, and code tokens like `gmail.com`.',
        placeholder: 'My entry',
        error: 'Title is required. Use a value like `my-entry`.',
        warning: 'This title is similar to an existing entry. See the [docs](https://example.com) for naming tips.',
    },
    translatable: {
        title: 'Translatable',
        description: '`translatable` icon beside the label.',
        label: 'Label',
        instructions: 'The label that describes this field.',
        placeholder: 'Test',
    },
    tip: {
        title: 'Tip',
        description: '`tip` below the control.',
        label: 'System Name',
        instructions: 'How you\'ll refer to this field in your templates.',
        tip: 'This can begin with an environment variable (`$HANDLE`). [Learn more](https://craftcms.com/docs/5.x/configure.html#control-panel-settings)',
        placeholder: 'my-handle',
        value: 'testing',
    },
    inlineCode: {
        title: 'Inline code',
        description: 'Markdown `code` in instructions, tip, warning, and errors — Craft chip bg/border per tone.',
        label: 'System Status',
        instructions: 'Accepts boolean-like values (`yes` / `no` / `true` / `false` / `on` / `off` / `0` / `1`).',
        tip: 'This can be set to an environment variable (`yes`/`no`/`true`/`false`/`on`/`off`/`0`/`1`).',
        warning: 'This is being overridden by the `useQueueForNotifications` setting in the `config/formie.php` file.',
        error: 'Invalid status. Use `online` or `offline`.',
        placeholder: 'Online',
    },
    headerEnd: {
        title: 'Header end',
        description: '`header-end` slot for trailing header actions.',
        label: 'Static Options',
        instructions: 'Add, remove, or reorder option rows manually.',
        action: 'Bulk add options',
    },
} as const;
