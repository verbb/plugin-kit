import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Icon, Toggle } from '@verbb/plugin-kit-react/components';

export function ToggleVariantsExample() {
    return (
        <>
            <Toggle>
                <Icon icon="bold" />
                {' '}
                Bold
            </Toggle>
            <Toggle variant="outline">
                <Icon icon="italic" />
                {' '}
                Italic
            </Toggle>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'Variants example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ToggleVariantsExample />
        </div>
    ),
};

export default preview;
