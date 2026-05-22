const e=`import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { CheckboxInput } from '@verbb/plugin-kit-react/components';

export function CheckboxInputGroupedOptionsExample() {
    return (
        <fieldset className="space-y-2 text-sm">
            <legend className="text-sm font-semibold">Notifications</legend>
            <CheckboxInput label="Product updates" defaultChecked />
            <CheckboxInput label="Security alerts" defaultChecked />
            <CheckboxInput label="Marketing tips" />
        </fieldset>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Grouped Options',
    title: 'Grouped options example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxInputGroupedOptionsExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
