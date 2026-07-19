import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Input } from '@verbb/plugin-kit-react/components';

export function InputBasicExample() {
    return <Input placeholder="Search entries" />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <InputBasicExample />
        </div>
    ),
};

export default preview;
