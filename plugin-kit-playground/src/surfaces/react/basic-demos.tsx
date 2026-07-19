import { useRef, useState } from 'react';

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
} from '@verbb/plugin-kit-react/components';

import type { ReactBasicDemoMap } from './shared/createBasicPreview.js';

function DemoStack({ children }: { children: React.ReactNode }) {
    return <div style={{ display: 'grid', gap: '12px', maxWidth: '420px' }}>{children}</div>;
}

export const reactBasicDemos: ReactBasicDemoMap = {
    calendar: function CalendarDemo() {
        const [value, setValue] = useState('2026-07-10');

        return (
            <Calendar
                value={value}
                onPkChange={(event) => { setValue(event.detail.value); }}
            />
        );
    },

    'checkbox-select': function CheckboxSelectDemo() {
        const [value, setValue] = useState<string[]>(['updates']);

        return (
            <CheckboxSelect
                value={value}
                options={[
                    { value: 'updates', label: 'Product updates' },
                    { value: 'security', label: 'Security alerts' },
                    { value: 'marketing', label: 'Marketing tips' },
                ]}
                onPkChange={(event) => { setValue(event.detail.value); }}
            />
        );
    },

    'code-editor': () => (
        <CodeEditor
            value={'{\n  "hello": "world"\n}'}
            language="json"
            style={{ minHeight: '160px' }}
        />
    ),

    'color-input': function ColorInputDemo() {
        const [value, setValue] = useState('#0ea5e9');

        return (
            <ColorInput
                value={value}
                onPkChange={(event) => { setValue(event.detail.value); }}
            />
        );
    },

    combobox: function ComboboxDemo() {
        const [value, setValue] = useState('craft');

        return (
            <Combobox
                value={value}
                options={[
                    { value: 'craft', label: 'Craft CMS' },
                    { value: 'formie', label: 'Formie' },
                    { value: 'freeform', label: 'Freeform' },
                ]}
                placeholder="Choose a plugin…"
                onPkChange={(event) => { setValue(event.detail.value); }}
            />
        );
    },

    'copy-button': () => (
        <CopyButton value="copied-from-plugin-kit" variant="outline">
            Copy value
        </CopyButton>
    ),

    'date-picker': function DatePickerDemo() {
        const [value, setValue] = useState('2026-07-10');

        return (
            <DatePicker
                value={value}
                onPkChange={(event) => { setValue(event.detail.value); }}
            />
        );
    },

    dialog: function DialogDemo() {
        const triggerRef = useRef<HTMLButtonElement>(null);

        return (
            <>
                <Button ref={triggerRef} variant="primary">Open dialog</Button>
                <Dialog triggerRef={triggerRef} heading="Confirm changes">
                    <p style={{ margin: 0 }}>Dialog body content rendered through the React facade.</p>
                    <Button slot="footer" data-dialog-close>Cancel</Button>
                    <Button slot="footer" variant="primary" data-dialog-close>Save</Button>
                </Dialog>
            </>
        );
    },

    'dropdown-menu': function DropdownMenuDemo() {
        const triggerRef = useRef<HTMLButtonElement>(null);

        return (
            <>
                <Button ref={triggerRef} withCaret>Actions</Button>
                <DropdownMenu triggerRef={triggerRef}>
                    <DropdownItem value="edit">Edit</DropdownItem>
                    <DropdownItem value="duplicate">Duplicate</DropdownItem>
                    <DropdownItem value="delete">Delete</DropdownItem>
                </DropdownMenu>
            </>
        );
    },

    lightswitch: function LightswitchDemo() {
        const [checked, setChecked] = useState(true);

        return (
            <Lightswitch
                checked={checked}
                onCheckedChange={setChecked}
            />
        );
    },

    popover: function PopoverDemo() {
        const triggerRef = useRef<HTMLButtonElement>(null);

        return (
            <>
                <Button ref={triggerRef} variant="outline">Open popover</Button>
                <Popover triggerRef={triggerRef} heading="Popover title">
                    <p style={{ margin: 0 }}>Anchored panel content via the React facade.</p>
                </Popover>
            </>
        );
    },

    'radio-group': function RadioGroupDemo() {
        const [value, setValue] = useState('email');

        return (
            <RadioGroupInput
                value={value}
                onChange={setValue}
                options={[
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'SMS' },
                    { value: 'push', label: 'Push notification' },
                ]}
            />
        );
    },

    'scroll-area': () => (
        <ScrollArea style={{ height: '120px', maxWidth: '320px' }}>
            {Array.from({ length: 8 }, (_, index) => (
                <p key={index} style={{ margin: '0 0 8px' }}>
                    Scrollable row {index + 1}
                </p>
            ))}
        </ScrollArea>
    ),

    separator: () => (
        <DemoStack>
            <p style={{ margin: 0 }}>Content above</p>
            <Separator />
            <p style={{ margin: 0 }}>Content below</p>
        </DemoStack>
    ),

    status: () => (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Status variant="success">Published</Status>
            <Status variant="warning">Draft</Status>
            <Status variant="danger">Disabled</Status>
        </div>
    ),

    tabs: () => (
        <Tabs value="general">
            <Tab value="general">General</Tab>
            <Tab value="advanced">Advanced</Tab>
            <TabPanel value="general">General settings panel</TabPanel>
            <TabPanel value="advanced">Advanced settings panel</TabPanel>
        </Tabs>
    ),

    textarea: function TextareaDemo() {
        const [value, setValue] = useState('Multi-line copy for the textarea facade.');

        return (
            <Textarea
                value={value}
                rows={4}
                onInput={(event) => { setValue((event.target as HTMLTextAreaElement).value); }}
            />
        );
    },

    'time-picker': function TimePickerDemo() {
        const [value, setValue] = useState('09:30');

        return (
            <TimePicker
                value={value}
                onPkChange={(event) => { setValue(event.detail.value); }}
            />
        );
    },

    'tiptap-editor': () => (
        <TiptapEditor
            value={{
                type: 'doc',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Rich text via TiptapEditor.' }] }],
            }}
            style={{ minHeight: '160px' }}
        />
    ),

    'tiptap-input': () => (
        <TiptapInput
            value={{
                type: 'doc',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Tokenized single-line field.' }] }],
            }}
        />
    ),

    'tiptap-content': () => (
        <TiptapContent
            value={{
                type: 'doc',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Read-only rendered Tiptap JSON.' }] }],
            }}
        />
    ),

    toggle: function ToggleDemo() {
        const [pressed, setPressed] = useState(false);

        return (
            <Toggle
                pressed={pressed}
                onPkPressedChange={(event) => { setPressed(event.detail.pressed); }}
            >
                Pin entry
            </Toggle>
        );
    },

    'toggle-group': () => (
        <ToggleGroup type="single" value="left">
            <Toggle value="left">Left</Toggle>
            <Toggle value="center">Center</Toggle>
            <Toggle value="right">Right</Toggle>
        </ToggleGroup>
    ),

    tooltip: function TooltipDemo() {
        const triggerRef = useRef<HTMLButtonElement>(null);

        return (
            <>
                <Button ref={triggerRef} variant="outline">Hover me</Button>
                <Tooltip triggerRef={triggerRef}>Tooltip content from the React facade.</Tooltip>
            </>
        );
    },

    select: function SelectDemo() {
        const [value, setValue] = useState('craft');

        return (
            <Select
                value={value}
                onPkChange={(event) => { setValue(event.detail.value); }}
            >
                <Option value="craft">Craft CMS</Option>
                <Option value="formie">Formie</Option>
                <Option value="freeform">Freeform</Option>
            </Select>
        );
    },

    field: () => (
        <Field label="Site name" instructions="Shown in the control panel header.">
            <Input value="Verbb demo" />
        </Field>
    ),
};
