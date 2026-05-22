import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaDisabledExample() {
    return <Textarea disabled placeholder="Disabled" />;
}
// #endregion example

const narrow = { maxWidth: '520px' };

const preview: PreviewSourceDefinition = {
    label: 'Disabled',
    title: 'Disabled example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={narrow}>
            <TextareaDisabledExample />
        </div>
    ),
};

export default preview;
