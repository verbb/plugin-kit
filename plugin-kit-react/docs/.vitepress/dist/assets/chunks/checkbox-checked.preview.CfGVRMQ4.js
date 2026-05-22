const e=`import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Checkbox } from '@verbb/plugin-kit-react/components';

export function CheckboxCheckedExample() {
    return (
        <Checkbox defaultChecked aria-label="Email receipts" />
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
            <CheckboxCheckedExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
