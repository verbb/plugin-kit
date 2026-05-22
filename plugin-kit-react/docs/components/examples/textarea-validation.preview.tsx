import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaValidationExample() {
    return <Textarea aria-invalid="true" placeholder="Invalid" />;
}
// #endregion example

const narrow = { maxWidth: '520px' };

const preview: PreviewSourceDefinition = {
    label: 'Validation',
    title: 'Validation example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={narrow}>
            <TextareaValidationExample />
        </div>
    ),
};

export default preview;
