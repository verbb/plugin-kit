// #region example
import { Radio, RadioGroup } from '@verbb/plugin-kit-react/components';

export function RadioGroupLayoutErrorExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <RadioGroup name="layout" value="daily" orientation="horizontal">
                <Radio value="daily">Daily</Radio>
                <Radio value="weekly">Weekly</Radio>
                <Radio value="monthly">Monthly</Radio>
            </RadioGroup>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <RadioGroup name="channel" value="email" invalid>
                    <Radio value="email">Email</Radio>
                    <Radio value="sms">SMS</Radio>
                </RadioGroup>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#e11d48' }}>
                    Choose an available notification channel.
                </p>
            </div>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Layout and Error',
    title: 'Radio group layout and error examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <RadioGroupLayoutErrorExample />
        </div>
    ),
};

export default preview;
