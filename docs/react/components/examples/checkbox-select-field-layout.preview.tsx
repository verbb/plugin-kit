import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CheckboxSelect, Field } from '@verbb/plugin-kit-react/components';

const options = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];

export function CheckboxSelectFieldLayoutExample() {
    return (
        <Field
            label="Forms to monitor"
            instructions="Choose which forms should trigger notifications."
        >
            <CheckboxSelect options={options} value={['contact', 'newsletter']} />
        </Field>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Field Layout',
    title: 'Field layout example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxSelectFieldLayoutExample />
        </div>
    ),
};

export default preview;
