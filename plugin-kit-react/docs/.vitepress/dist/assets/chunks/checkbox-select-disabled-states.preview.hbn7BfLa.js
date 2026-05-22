const e=`// #region example
import { ALL_VALUE, CheckboxSelect } from '@verbb/plugin-kit-react/components';

const fruitOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
];

export function CheckboxSelectDisabledStatesExample() {
    return (
        <div className="space-y-6">
            <div className="text-sm">
                <h3 className="mb-2 text-sm font-bold">Disabled - All selected</h3>
                <CheckboxSelect
                    options={fruitOptions}
                    value={ALL_VALUE}
                    onChange={() => { }}
                    showAllOption
                    disabled
                />
            </div>
            <div className="text-sm">
                <h3 className="mb-2 text-sm font-bold">Disabled - Some selected</h3>
                <CheckboxSelect
                    options={fruitOptions}
                    value={['apple', 'banana']}
                    onChange={() => { }}
                    showAllOption
                    disabled
                />
            </div>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Disabled States',
    title: 'Disabled states example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={{ ...stackStyle, gap: '24px' }}>
            <CheckboxSelectDisabledStatesExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
