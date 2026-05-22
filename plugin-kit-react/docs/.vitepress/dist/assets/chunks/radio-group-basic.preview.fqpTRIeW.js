const e=`// #region example
import { RadioGroup, RadioGroupItem } from '@verbb/plugin-kit-react/components';

export function RadioGroupBasicExample() {
    return (
        <RadioGroup defaultValue="daily">
            <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="daily" />
                Daily
            </label>
            <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="weekly" />
                Weekly
            </label>
            <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="monthly" />
                Monthly
            </label>
        </RadioGroup>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <RadioGroupBasicExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
