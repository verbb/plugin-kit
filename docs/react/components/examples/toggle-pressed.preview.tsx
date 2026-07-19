import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Icon, Toggle } from '@verbb/plugin-kit-react/components';

export function TogglePressedExample() {
    return (
        <>
            <Toggle pressed>
                <Icon icon="italic" />
                {' '}
                Italic
            </Toggle>
            <Toggle variant="outline" pressed>
                <Icon icon="bold" />
                {' '}
                Bold
            </Toggle>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Pressed',
    title: 'Pressed example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <TogglePressedExample />
        </div>
    ),
};

export default preview;
