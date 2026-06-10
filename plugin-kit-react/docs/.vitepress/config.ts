import { fileURLToPath } from 'node:url';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitepress';
import type { DefaultTheme } from 'vitepress/theme';

type DocsSidebarItem = Omit<DefaultTheme.SidebarItem, 'items'> & {
    icon?: string;
    items?: DocsSidebarItem[];
};

type DocsSidebarGroup = {
    text: string;
    icon?: string;
    items: DocsSidebarItem[];
};

type DocsThemeConfig = DefaultTheme.Config & {
    docsTheme?: {
        primary?: string;
    };
};

const gettingStartedItems = [
    { text: 'Overview', link: '/getting-started/overview' },
    { text: 'Quick Start', link: '/getting-started/quick-start' },
    { text: 'CSS Setup', link: '/getting-started/css-setup' },
    { text: 'Testing and Debugging', link: '/getting-started/testing-and-debugging' },
];

const reactAppItems = [
    { text: 'Creating a React App', link: '/react-app/creating-a-react-app' },
];

const componentItems = [
    { text: 'Button', link: '/components/button' },
    { text: 'ButtonGroup', link: '/components/button-group' },
    { text: 'Calendar', link: '/components/calendar' },
    { text: 'Checkbox', link: '/components/checkbox' },
    { text: 'CheckboxInput', link: '/components/checkbox-input' },
    { text: 'CheckboxSelect', link: '/components/checkbox-select' },
    { text: 'CodeEditor', link: '/components/code-editor' },
    { text: 'ColorInput', link: '/components/color-input' },
    { text: 'Combobox', link: '/components/combobox' },
    { text: 'CopyButton', link: '/components/copy-button' },
    { text: 'DatePicker', link: '/components/date-picker' },
    { text: 'Dialog', link: '/components/dialog' },
    { text: 'DropdownMenu', link: '/components/dropdown-menu' },
    { text: 'EditableTable', link: '/components/editable-table' },
    { text: 'Input', link: '/components/input' },
    { text: 'Lightswitch', link: '/components/lightswitch' },
    { text: 'MenuButton', link: '/components/menu-button' },
    { text: 'Popover', link: '/components/popover' },
    { text: 'RadioGroup', link: '/components/radio-group' },
    { text: 'ScrollArea', link: '/components/scroll-area' },
    { text: 'Select', link: '/components/select' },
    { text: 'Separator', link: '/components/separator' },
    { text: 'Spinner', link: '/components/spinner' },
    { text: 'Status', link: '/components/status' },
    { text: 'Tabs', link: '/components/tabs' },
    { text: 'Textarea', link: '/components/textarea' },
    { text: 'TimePicker', link: '/components/time-picker' },
    { text: 'TiptapEditor', link: '/components/tiptap-editor' },
    { text: 'TiptapContent', link: '/components/tiptap-content' },
    { text: 'TiptapInput', link: '/components/tiptap-input' },
    { text: 'Toggle', link: '/components/toggle' },
    { text: 'ToggleGroup', link: '/components/toggle-group' },
    { text: 'Tooltip', link: '/components/tooltip' },
];

const formsItems = [
    { text: 'Overview', link: '/forms/overview' },
    { text: 'Schema Structure', link: '/forms/schema-structure' },
    { text: 'Conditions', link: '/forms/conditions' },
    { text: 'Schema Components', link: '/forms/schema-components' },
    {
        text: 'Built-in Schema Components',
        collapsed: true,
        items: [
            { text: 'FieldWrap', link: '/forms/schema-components/field-wrap' },
            { text: 'ModalTabs', link: '/forms/schema-components/modal-tabs' },
            { text: 'ModalTabsList', link: '/forms/schema-components/modal-tabs-list' },
            { text: 'ModalTabsTrigger', link: '/forms/schema-components/modal-tabs-trigger' },
            { text: 'ModalTabsContent', link: '/forms/schema-components/modal-tabs-content' },
        ],
    },
    { text: 'Custom Schema Components', link: '/forms/custom-schema-components' },
    { text: 'Schema Fields', link: '/forms/schema-fields' },
    {
        text: 'Built-in Schema Fields',
        collapsed: true,
        items: [
            { text: 'CalculationsField', link: '/forms/schema-fields/calculations-field' },
            { text: 'CheckboxSelectField', link: '/forms/schema-fields/checkbox-select-field' },
            { text: 'CodeEditorField', link: '/forms/schema-fields/code-editor-field' },
            { text: 'ColorField', link: '/forms/schema-fields/color-field' },
            { text: 'ComboboxField', link: '/forms/schema-fields/combobox-field' },
            { text: 'DateTimeField', link: '/forms/schema-fields/date-time-field' },
            { text: 'EditableTableField', link: '/forms/schema-fields/editable-table-field' },
            { text: 'ElementSelectField', link: '/forms/schema-fields/element-select-field' },
            { text: 'GroupField', link: '/forms/schema-fields/group-field' },
            { text: 'HandleField', link: '/forms/schema-fields/handle-field' },
            { text: 'LightswitchField', link: '/forms/schema-fields/lightswitch-field' },
            { text: 'ListField', link: '/forms/schema-fields/list-field' },
            { text: 'NumberField', link: '/forms/schema-fields/number-field' },
            { text: 'RadioGroupField', link: '/forms/schema-fields/radio-group-field' },
            { text: 'RichTextField', link: '/forms/schema-fields/rich-text-field' },
            { text: 'SelectField', link: '/forms/schema-fields/select-field' },
            { text: 'StaticTableField', link: '/forms/schema-fields/static-table-field' },
            { text: 'TextField', link: '/forms/schema-fields/text-field' },
            { text: 'TextareaField', link: '/forms/schema-fields/textarea-field' },
            { text: 'VariablePickerField', link: '/forms/schema-fields/variable-picker-field' },
        ],
    },
    { text: 'Custom Schema Fields', link: '/forms/custom-schema-fields' },
];

const apiItems = [
    { text: 'Overview', link: '/api/overview' },
    { text: 'Public Hooks', link: '/api/public-hooks' },
    { text: 'Public Utilities', link: '/api/public-utilities' },
    { text: 'Public Types', link: '/api/public-types' },
    { text: 'Form APIs', link: '/api/form-apis' },
    { text: 'SchemaForm API', link: '/api/schema-form-api' },
    { text: 'SchemaForm Registry', link: '/api/schema-form-registry' },
    { text: 'React App APIs', link: '/api/react-app-apis' },
    { text: 'Styling APIs', link: '/api/styling-apis' },
];

const recipeItems = [
    { text: 'Build a Settings Screen', link: '/recipes/build-a-settings-screen' },
    {
        text: 'Compose a Form with Field Primitives',
        link: '/recipes/compose-a-form-with-field-primitives',
    },
    {
        text: 'Register a Custom SchemaForm Component',
        link: '/recipes/register-a-custom-schemaform-component',
    },
];

const sidebar: DocsSidebarGroup[] = [
    { text: 'Getting Started', items: gettingStartedItems },
    { text: 'React App', items: reactAppItems },
    { text: 'Components', items: componentItems },
    { text: 'SchemaForm', items: formsItems },
    { text: 'API Reference', items: apiItems },
    { text: 'Recipes', items: recipeItems },
];

const themeConfig: DocsThemeConfig = {
    logo: '/plugin-kit-react-logo.svg',
    siteTitle: 'Plugin Kit React',
    docsTheme: {
        homeLink: '/plugin-kit/',
        primary: '#e64d4c',
    },
    nav: [],
    outline: [2, 3],
    sidebar: sidebar as DefaultTheme.SidebarItem[],
    socialLinks: [{ icon: 'github', link: 'https://github.com/verbb/plugin-kit' }],
    editLink: {
        pattern: 'https://github.com/verbb/plugin-kit/edit/main/plugin-kit-react/docs/:path',
        text: 'Edit this page',
    },
    lastUpdatedText: 'Last updated',
    search: {
        provider: 'local',
    },
};

export default defineConfig({
    title: 'Plugin Kit React',
    description: 'React components, forms, and app utilities for Verbb plugin-kit UIs.',
    base: '/plugin-kit/',
    cleanUrls: true,
    appearance: false,
    lastUpdated: true,
    vite: {
        optimizeDeps: {
            // The docs site is Vue (VitePress) but our live previews embed React.
            // Without explicit dedupe, Vite can end up bundling multiple React copies
            // (e.g. one from the docs build graph and one from a dependency), which
            // triggers "Invalid hook call" at runtime in previews.
            include: [
                'react',
                'react-dom',
                'react-dom/client',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
            ],
        },
        server: {
            port: 5281,
            strictPort: true,
        },
        preview: {
            port: 4281,
            strictPort: true,
        },
        ssr: {
            noExternal: [
                '@babel/runtime',
                '@babel/runtime/helpers/interopRequireDefault',
                '@verbb/vitepress-theme',
            ],
        },
        resolve: {
            alias: [
                {
                    find: 'mark.js/src/vanilla.js',
                    replacement: fileURLToPath(new URL('../../../../node_modules/mark.js/dist/mark.es6.js', import.meta.url)),
                },
                {
                    find: /^@verbb\/vitepress-theme$/,
                    replacement: fileURLToPath(new URL('../../../../verbb-vitepress-theme/src/index.ts', import.meta.url)),
                },
                {
                    find: /^@verbb\/plugin-kit-react$/,
                    replacement: path.resolve(fileURLToPath(new URL('../..', import.meta.url)), 'src/index.ts'),
                },
                {
                    find: /^@verbb\/plugin-kit-react\/(.*)$/,
                    replacement: `${path.resolve(fileURLToPath(new URL('../..', import.meta.url)), 'src')}/$1`,
                },
            ],
            dedupe: [
                'react',
                'react-dom',
                'react-dom/client',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
            ],
        },
        plugins: [
            tailwindcss(),
        ],
    },
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/plugin-kit/favicon.svg' }],
    ],
    themeConfig: themeConfig as DefaultTheme.Config,
});
