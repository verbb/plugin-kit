// #region example
import { Lightswitch } from '@verbb/plugin-kit-react/components';

export function LightswitchLabelsExample() {
    return (
        <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
                <Lightswitch defaultChecked />
                <span>Enable notifications</span>
            </label>
            <label className="flex items-center justify-between gap-4 rounded-md border border-gray-200 p-3">
                <span>
                    <span className="block font-medium">Auto-save drafts</span>
                    <span className="text-sm text-gray-500">Save form changes while editing.</span>
                </span>
                <Lightswitch />
            </label>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
