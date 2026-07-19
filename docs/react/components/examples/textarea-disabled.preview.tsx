import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaDisabledExample() {
    return <Textarea disabled placeholder="Disabled" />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Disabled',
    title: 'Disabled example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <TextareaDisabledExample />
        </div>
    ),
};

export default preview;
