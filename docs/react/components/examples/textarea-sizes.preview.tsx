import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaSizesExample() {
    return (
        <>
            <Textarea placeholder="Default" size="default" />
            <Textarea placeholder="Small" size="sm" />
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <TextareaSizesExample />
        </div>
    ),
};

export default preview;
