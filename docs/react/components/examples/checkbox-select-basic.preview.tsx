import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CheckboxSelect } from '@verbb/plugin-kit-react/components';

const options = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];

export function CheckboxSelectBasicExample() {
    return <CheckboxSelect options={options} value={['contact']} />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxSelectBasicExample />
        </div>
    ),
};

export default preview;
