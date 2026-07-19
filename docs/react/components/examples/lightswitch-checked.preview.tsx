import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Lightswitch } from '@verbb/plugin-kit-react/components';

export function LightswitchCheckedExample() {
    return (
        <Lightswitch checked>Enable notifications</Lightswitch>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Checked',
    title: 'Checked example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <LightswitchCheckedExample />
        </div>
    ),
};

export default preview;
