export type ComponentTier = 'ui' | 'react-only' | 'composite';

export type ComponentRegistryEntry = {
    id: string;
    title: string;
    tier: ComponentTier;
    /** Vanilla UI playground page is available */
    vanilla: boolean;
    /** React surface preview is available */
    react: boolean;
    /** Short description for placeholder pages */
    description: string;
    docsPath: string;
};

/**
 * Canonical list of Plugin Kit components.
 * Single source of truth for playground nav and migration tracking.
 */
export const componentRegistry: ComponentRegistryEntry[] = [
    { id: 'button', title: 'Button', tier: 'ui', vanilla: true, react: true, description: 'Action button — variants, sizes, loading.', docsPath: '/components/button' },
    { id: 'button-group', title: 'Button Group', tier: 'ui', vanilla: true, react: true, description: 'Visually joined button cluster.', docsPath: '/components/button-group' },
    { id: 'calendar', title: 'Calendar', tier: 'composite', vanilla: true, react: true, description: 'Inline date grid — single date and range.', docsPath: '/components/calendar' },
    { id: 'checkbox', title: 'Checkbox', tier: 'ui', vanilla: true, react: true, description: 'Checkbox with optional label and hint.', docsPath: '/components/checkbox' },
    { id: 'checkbox-select', title: 'Checkbox Select', tier: 'react-only', vanilla: true, react: true, description: 'Checkbox list for multi-select.', docsPath: '/components/checkbox-select' },
    { id: 'code-editor', title: 'Code Editor', tier: 'composite', vanilla: true, react: true, description: 'CodeMirror field with syntax highlighting.', docsPath: '/components/code-editor' },
    { id: 'color-input', title: 'Color Input', tier: 'ui', vanilla: true, react: true, description: 'Color swatch and hex text field.', docsPath: '/components/color-input' },
    { id: 'combobox', title: 'Combobox', tier: 'ui', vanilla: true, react: true, description: 'Searchable select with filtering and chips.', docsPath: '/components/combobox' },
    { id: 'copy-button', title: 'Copy Button', tier: 'ui', vanilla: true, react: true, description: 'Copies text to clipboard.', docsPath: '/components/copy-button' },
    { id: 'date-picker', title: 'Date Picker', tier: 'composite', vanilla: true, react: true, description: 'Date field with popup calendar.', docsPath: '/components/date-picker' },
    { id: 'dialog', title: 'Dialog', tier: 'ui', vanilla: true, react: true, description: 'Modal overlay with header, body, footer.', docsPath: '/components/dialog' },
    { id: 'dropdown-menu', title: 'Dropdown Menu', tier: 'ui', vanilla: true, react: true, description: 'Action menu from a trigger.', docsPath: '/components/dropdown-menu' },
    { id: 'editable-table', title: 'Editable Table', tier: 'composite', vanilla: true, react: true, description: 'Inline-editable table with mixed cell types, derived columns, and row reorder.', docsPath: '/components/editable-table' },
    { id: 'field', title: 'Field', tier: 'ui', vanilla: true, react: true, description: '`pk-field` wrapper — label, instructions, errors, tips.', docsPath: '/components/field' },
    { id: 'icon', title: 'Icon', tier: 'ui', vanilla: true, react: true, description: 'Raw-SVG icon set — `<pk-icon name>`.', docsPath: '/components/icon' },
    { id: 'input', title: 'Input', tier: 'ui', vanilla: true, react: true, description: 'Single-line text field.', docsPath: '/components/input' },
    { id: 'lightswitch', title: 'Lightswitch', tier: 'ui', vanilla: true, react: true, description: 'On/off toggle switch.', docsPath: '/components/lightswitch' },
    { id: 'popover', title: 'Popover', tier: 'ui', vanilla: true, react: true, description: 'Anchored floating panel.', docsPath: '/components/popover' },
    { id: 'radio-group', title: 'Radio Group', tier: 'react-only', vanilla: true, react: true, description: 'Single-choice option set.', docsPath: '/components/radio-group' },
    { id: 'scroll-area', title: 'Scroll Area', tier: 'react-only', vanilla: true, react: true, description: 'Custom scrollbars for overflow.', docsPath: '/components/scroll-area' },
    { id: 'select', title: 'Select', tier: 'react-only', vanilla: true, react: true, description: 'Dropdown option picker.', docsPath: '/components/select' },
    { id: 'separator', title: 'Separator', tier: 'ui', vanilla: true, react: true, description: 'Visual divider — horizontal and vertical.', docsPath: '/components/separator' },
    { id: 'spinner', title: 'Spinner', tier: 'ui', vanilla: true, react: true, description: 'Loading indicator.', docsPath: '/components/spinner' },
    { id: 'status', title: 'Status', tier: 'ui', vanilla: true, react: true, description: 'Semantic colour dot with label.', docsPath: '/components/status' },
    { id: 'tabs', title: 'Tabs', tier: 'react-only', vanilla: true, react: true, description: 'Tabbed panel switching.', docsPath: '/components/tabs' },
    { id: 'textarea', title: 'Textarea', tier: 'ui', vanilla: true, react: true, description: 'Multi-line text field.', docsPath: '/components/textarea' },
    { id: 'time-picker', title: 'Time Picker', tier: 'composite', vanilla: true, react: true, description: 'Time-of-day select field.', docsPath: '/components/time-picker' },
    { id: 'tiptap-editor', title: 'Tiptap Editor', tier: 'composite', vanilla: true, react: true, description: 'Rich text editor with toolbar.', docsPath: '/components/tiptap-editor' },
    { id: 'tiptap-content', title: 'Tiptap Content', tier: 'composite', vanilla: true, react: true, description: 'Read-only Tiptap JSON renderer.', docsPath: '/components/tiptap-content' },
    { id: 'tiptap-input', title: 'Tiptap Input', tier: 'composite', vanilla: true, react: true, description: 'Single-line tokenized Tiptap field.', docsPath: '/components/tiptap-input' },
    { id: 'toggle', title: 'Toggle', tier: 'ui', vanilla: true, react: true, description: 'Binary pressed/unpressed button.', docsPath: '/components/toggle' },
    { id: 'toggle-group', title: 'Toggle Group', tier: 'ui', vanilla: true, react: true, description: 'Grouped toggle buttons.', docsPath: '/components/toggle-group' },
    { id: 'tooltip', title: 'Tooltip', tier: 'ui', vanilla: true, react: true, description: 'Hover/focus hint on a trigger.', docsPath: '/components/tooltip' },
];

export const getRegistryEntry = (id: string): ComponentRegistryEntry | undefined => {
    return componentRegistry.find((entry) => entry.id === id);
};

export const DOCS_BASE_URL = 'https://docs.verbb.io/plugin-kit';

export const getComponentDocsUrl = (entry: ComponentRegistryEntry): string => {
    return `${DOCS_BASE_URL}${entry.docsPath}`;
};
