// #region example
import { Radio, RadioGroup } from '@verbb/plugin-kit-react/components';

export function RadioGroupDisabledOptionsExample() {
    return (
        <RadioGroup name="plan" value="starter">
            <Radio value="starter">Starter</Radio>
            <Radio value="pro">Pro</Radio>
            <Radio value="enterprise" disabled>Enterprise</Radio>
        </RadioGroup>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Disabled Options',
    title: 'Disabled options example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <RadioGroupDisabledOptionsExample />
        </div>
    ),
};

export default preview;
