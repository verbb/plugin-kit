// #region example
import { Lightswitch } from '@verbb/plugin-kit-react/components';

export function LightswitchLabelsExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Lightswitch checked>Enable notifications</Lightswitch>
            <Lightswitch instructions="Save form changes while editing.">Auto-save drafts</Lightswitch>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Labels',
    title: 'Lightswitch label examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <LightswitchLabelsExample />
        </div>
    ),
};

export default preview;
