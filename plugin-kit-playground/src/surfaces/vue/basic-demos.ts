import { defineComponent, h, ref, type Component } from 'vue';
import {
    Button,
    Calendar,
    CheckboxSelect,
    CodeEditor,
    ColorInput,
    Combobox,
    CopyButton,
    DatePicker,
    Dialog,
    DropdownItem,
    DropdownMenu,
    EditableTable,
    Field,
    Input,
    Lightswitch,
    Option,
    Popover,
    RadioGroupInput,
    ScrollArea,
    Select,
    Separator,
    Status,
    Tab,
    TabPanel,
    Tabs,
    Textarea,
    TimePicker,
    TiptapContent,
    TiptapEditor,
    TiptapInput,
    Toggle,
    ToggleGroup,
    Tooltip,
} from '@verbb/plugin-kit-vue/components';

export const vueBasicDemos: Record<string, Component> = {
    calendar: defineComponent({
        setup() {
            const value = ref('2026-07-10');

            return () => h(Calendar, {
                value: value.value,
                onPkChange: (event: CustomEvent<{ value: string }>) => { value.value = event.detail.value; },
            });
        },
    }),

    'checkbox-select': defineComponent({
        setup() {
            const value = ref(['updates']);

            return () => h(CheckboxSelect, {
                value: value.value,
                options: [
                    { value: 'updates', label: 'Product updates' },
                    { value: 'security', label: 'Security alerts' },
                    { value: 'marketing', label: 'Marketing tips' },
                ],
                onPkChange: (event: CustomEvent<{ value: string[] }>) => { value.value = event.detail.value; },
            });
        },
    }),

    'code-editor': defineComponent({
        setup() {
            return () => h(CodeEditor, {
                value: '{\n  "hello": "world"\n}',
                language: 'json',
                style: { minHeight: '160px' },
            });
        },
    }),

    'color-input': defineComponent({
        setup() {
            const value = ref('#0ea5e9');

            return () => h(ColorInput, {
                value: value.value,
                onPkChange: (event: CustomEvent<{ value: string }>) => { value.value = event.detail.value; },
            });
        },
    }),

    combobox: defineComponent({
        setup() {
            const value = ref('craft');

            return () => h(Combobox, {
                value: value.value,
                options: [
                    { value: 'craft', label: 'Craft CMS' },
                    { value: 'formie', label: 'Formie' },
                ],
                placeholder: 'Choose a plugin…',
                onPkChange: (event: CustomEvent<{ value: string }>) => { value.value = event.detail.value; },
            });
        },
    }),

    'copy-button': defineComponent({
        setup() {
            return () => h(CopyButton, { value: 'copied-from-plugin-kit', variant: 'outline' }, {
                default: () => 'Copy value',
            });
        },
    }),

    'date-picker': defineComponent({
        setup() {
            const value = ref('2026-07-10');

            return () => h(DatePicker, {
                value: value.value,
                onPkChange: (event: CustomEvent<{ value: string }>) => { value.value = event.detail.value; },
            });
        },
    }),

    dialog: defineComponent({
        setup() {
            const triggerRef = ref<HTMLElement | null>(null);

            return () => h('div', { style: { display: 'grid', gap: '12px' } }, [
                h(Button, { ref: triggerRef, variant: 'primary' }, { default: () => 'Open dialog' }),
                h(Dialog, { triggerRef: triggerRef.value, heading: 'Confirm changes' }, {
                    default: () => h('p', { style: { margin: '0' } }, 'Dialog body content via the Vue facade.'),
                    footer: () => [
                        h(Button, { 'data-dialog-close': '' }, { default: () => 'Cancel' }),
                        h(Button, { variant: 'primary', 'data-dialog-close': '' }, { default: () => 'Save' }),
                    ],
                }),
            ]);
        },
    }),

    'dropdown-menu': defineComponent({
        setup() {
            const triggerRef = ref<HTMLElement | null>(null);

            return () => h('div', [
                h(Button, { ref: triggerRef, withCaret: true }, { default: () => 'Actions' }),
                h(DropdownMenu, { triggerRef: triggerRef.value }, {
                    default: () => [
                        h(DropdownItem, { value: 'edit' }, { default: () => 'Edit' }),
                        h(DropdownItem, { value: 'duplicate' }, { default: () => 'Duplicate' }),
                    ],
                }),
            ]);
        },
    }),

    'editable-table': defineComponent({
        setup() {
            return () => h(EditableTable, {
                columns: [
                    { key: 'label', label: 'Label', type: 'text' },
                    { key: 'value', label: 'Value', type: 'text' },
                ],
                rows: [
                    { id: '1', label: 'Site name', value: 'Verbb demo' },
                ],
            });
        },
    }),

    field: defineComponent({
        setup() {
            return () => h(Field, { label: 'Site name', instructions: 'Shown in the control panel header.' }, {
                default: () => h(Input, { value: 'Verbb demo' }),
            });
        },
    }),

    input: defineComponent({
        setup() {
            const value = ref('Hello');

            return () => h(Input, {
                value: value.value,
                placeholder: 'Type something…',
                onInput: (event: Event) => { value.value = (event.target as HTMLInputElement).value; },
            });
        },
    }),

    popover: defineComponent({
        setup() {
            const triggerRef = ref<HTMLElement | null>(null);

            return () => h('div', [
                h(Button, { ref: triggerRef, variant: 'outline' }, { default: () => 'Open popover' }),
                h(Popover, { triggerRef: triggerRef.value, heading: 'Popover title' }, {
                    default: () => h('p', { style: { margin: '0' } }, 'Anchored panel via the Vue facade.'),
                }),
            ]);
        },
    }),

    'radio-group': defineComponent({
        setup() {
            const value = ref('email');

            return () => h(RadioGroupInput, {
                modelValue: value.value,
                'onUpdate:modelValue': (nextValue: unknown) => { value.value = String(nextValue); },
                options: [
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'SMS' },
                ],
            });
        },
    }),

    'scroll-area': defineComponent({
        setup() {
            return () => h(ScrollArea, { style: { height: '120px', maxWidth: '320px' } }, {
                default: () => Array.from({ length: 6 }, (_, index) => h('p', { style: { margin: '0 0 8px' } }, `Scrollable row ${index + 1}`)),
            });
        },
    }),

    select: defineComponent({
        setup() {
            const value = ref('craft');

            return () => h(Select, {
                value: value.value,
                onPkChange: (event: CustomEvent<{ value: string }>) => { value.value = event.detail.value; },
            }, {
                default: () => [
                    h(Option, { value: 'craft' }, { default: () => 'Craft CMS' }),
                    h(Option, { value: 'formie' }, { default: () => 'Formie' }),
                ],
            });
        },
    }),

    separator: defineComponent({
        setup() {
            return () => h('div', { style: { display: 'grid', gap: '12px', maxWidth: '420px' } }, [
                h('p', { style: { margin: '0' } }, 'Content above'),
                h(Separator),
                h('p', { style: { margin: '0' } }, 'Content below'),
            ]);
        },
    }),

    status: defineComponent({
        setup() {
            return () => h('div', { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' } }, [
                h(Status, { variant: 'success' }, { default: () => 'Published' }),
                h(Status, { variant: 'warning' }, { default: () => 'Draft' }),
            ]);
        },
    }),

    tabs: defineComponent({
        setup() {
            return () => h(Tabs, { value: 'general' }, {
                default: () => [
                    h(Tab, { value: 'general' }, { default: () => 'General' }),
                    h(Tab, { value: 'advanced' }, { default: () => 'Advanced' }),
                    h(TabPanel, { value: 'general' }, { default: () => 'General settings panel' }),
                    h(TabPanel, { value: 'advanced' }, { default: () => 'Advanced settings panel' }),
                ],
            });
        },
    }),

    textarea: defineComponent({
        setup() {
            const value = ref('Multi-line copy for the textarea facade.');

            return () => h(Textarea, {
                value: value.value,
                rows: 4,
                onInput: (event: Event) => { value.value = (event.target as HTMLTextAreaElement).value; },
            });
        },
    }),

    'time-picker': defineComponent({
        setup() {
            const value = ref('09:30');

            return () => h(TimePicker, {
                value: value.value,
                onPkChange: (event: CustomEvent<{ value: string }>) => { value.value = event.detail.value; },
            });
        },
    }),

    'tiptap-editor': defineComponent({
        setup() {
            return () => h(TiptapEditor, {
                value: {
                    type: 'doc',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Rich text via TiptapEditor.' }] }],
                },
                style: { minHeight: '160px' },
            });
        },
    }),

    'tiptap-input': defineComponent({
        setup() {
            return () => h(TiptapInput, {
                value: {
                    type: 'doc',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Tokenized single-line field.' }] }],
                },
            });
        },
    }),

    'tiptap-content': defineComponent({
        setup() {
            return () => h(TiptapContent, {
                value: {
                    type: 'doc',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Read-only rendered Tiptap JSON.' }] }],
                },
            });
        },
    }),

    toggle: defineComponent({
        setup() {
            const pressed = ref(false);

            return () => h(Toggle, {
                pressed: pressed.value,
                onPkPressedChange: (event: CustomEvent<{ pressed: boolean }>) => { pressed.value = event.detail.pressed; },
            }, { default: () => 'Pin entry' });
        },
    }),

    'toggle-group': defineComponent({
        setup() {
            return () => h(ToggleGroup, { type: 'single', value: 'left' }, {
                default: () => [
                    h(Toggle, { value: 'left' }, { default: () => 'Left' }),
                    h(Toggle, { value: 'center' }, { default: () => 'Center' }),
                    h(Toggle, { value: 'right' }, { default: () => 'Right' }),
                ],
            });
        },
    }),

    tooltip: defineComponent({
        setup() {
            const triggerRef = ref<HTMLElement | null>(null);

            return () => h('div', [
                h(Button, { ref: triggerRef, variant: 'outline' }, { default: () => 'Hover me' }),
                h(Tooltip, { triggerRef: triggerRef.value }, { default: () => 'Tooltip content from the Vue facade.' }),
            ]);
        },
    }),
};
