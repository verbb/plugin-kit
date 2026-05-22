const e=`import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Lightswitch } from '@verbb/plugin-kit-react/components';

export function LightswitchCheckedExample() {
    return (
        <label className="flex items-center gap-2 text-sm">
            <Lightswitch defaultChecked />
            Enable notifications
        </label>
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
`;export{e as default};
