const e=`// #region example
import { SelectInput } from '@verbb/plugin-kit-react/components';

const statusOptions = [
    { value: 'new', label: 'New', status: 'green' },
    { value: 'testing', label: 'Testing', status: 'blue' },
    { value: 'viewed', label: 'Viewed', status: 'purple' },
];

export function SelectStatusInputExample() {
    return (
        <SelectInput options={statusOptions} value="testing" placeholder="Select status" />
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Status Input',
    title: 'Status input example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <SelectStatusInputExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
