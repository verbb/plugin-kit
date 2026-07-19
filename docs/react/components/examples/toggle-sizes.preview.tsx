import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Icon, Toggle } from '@verbb/plugin-kit-react/components';

export function ToggleSizesExample() {
    return (
        <>
            <Toggle size="sm">
                <Icon icon="bold" />
                {' '}
                Bold
            </Toggle>
            <Toggle>
                <Icon icon="italic" />
                {' '}
                Italic
            </Toggle>
            <Toggle size="lg">
                <Icon icon="underline" />
                {' '}
                Underline
            </Toggle>
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
        <div style={rowStyle}>
            <ToggleSizesExample />
        </div>
    ),
};

export default preview;
