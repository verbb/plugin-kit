// #region example
import { Option, Select } from '@verbb/plugin-kit-react/components';

function FruitSelect({ size }: { size?: 'xs' | 'sm' | 'lg' }) {
    return (
        <Select {...(size ? { size } : {})} placeholder="Select a fruit" value="apple">
            <Option value="apple">Apple</Option>
            <Option value="banana">Banana</Option>
            <Option value="blueberry">Blueberry</Option>
            <Option value="grapes">Grapes</Option>
            <Option value="pineapple">Pineapple</Option>
        </Select>
    );
}

export function SelectSizesExample() {
    return (
        <>
            <FruitSelect size="xs" />
            <FruitSelect size="sm" />
            <FruitSelect />
            <FruitSelect size="lg" />
        </>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={{ ...stackStyle, maxWidth: 'none' }}>
            <SelectSizesExample />
        </div>
    ),
};

export default preview;
