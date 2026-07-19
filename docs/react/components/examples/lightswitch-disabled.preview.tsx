import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Lightswitch } from '@verbb/plugin-kit-react/components';

export function LightswitchDisabledExample() {
    return (
        <Lightswitch disabled>Sync in background</Lightswitch>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Disabled',
    title: 'Disabled example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <LightswitchDisabledExample />
        </div>
    ),
};

export default preview;
