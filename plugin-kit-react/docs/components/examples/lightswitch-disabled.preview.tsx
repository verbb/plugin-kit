import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Lightswitch } from '@verbb/plugin-kit-react/components';

export function LightswitchDisabledExample() {
    return (
        <label className="flex items-center gap-2 text-sm">
            <Lightswitch disabled />
            <span className="peer-disabled:opacity-50 peer-data-disabled:opacity-50">Sync in background</span>
        </label>
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
