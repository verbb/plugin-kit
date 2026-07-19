// #region example
import { Option, Select, Status } from '@verbb/plugin-kit-react/components';

export function SelectStatusInputExample() {
    return (
        <Select placeholder="Select status" value="testing" style={{ minWidth: '12rem' }}>
            <Option value="new">
                <Status slot="start" status="green" aria-label="New" />
                New
            </Option>
            <Option value="testing">
                <Status slot="start" status="blue" aria-label="Testing" />
                Testing
            </Option>
            <Option value="viewed">
                <Status slot="start" status="purple" aria-label="Viewed" />
                Viewed
            </Option>
        </Select>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

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
