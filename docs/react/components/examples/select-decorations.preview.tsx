import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Icon, Option, Select } from '@verbb/plugin-kit-react/components';

export function SelectDecorationsExample() {
    return (
        <Select value="demo" style={{ minWidth: '12rem' }}>
            <Icon slot="start" icon="house" aria-hidden="true" />
            <Icon slot="end" icon="flag-checkered" aria-hidden="true" />
            <Option value="demo">Medium</Option>
            <Option value="large">Large</Option>
        </Select>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Decorations',
    title: 'Decorations example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <SelectDecorationsExample />
        </div>
    ),
};

export default preview;
