// #region example
import { Radio, RadioGroup } from '@verbb/plugin-kit-react/components';

export function RadioGroupBasicExample() {
    return (
        <RadioGroup name="frequency" value="daily">
            <Radio value="daily">Daily</Radio>
            <Radio value="weekly">Weekly</Radio>
            <Radio value="monthly">Monthly</Radio>
        </RadioGroup>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

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
