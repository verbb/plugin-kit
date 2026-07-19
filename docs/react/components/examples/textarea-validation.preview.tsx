import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaValidationExample() {
    return <Textarea invalid placeholder="Invalid" />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Validation',
    title: 'Validation example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <TextareaValidationExample />
        </div>
    ),
};

export default preview;
