// #region example
import { Radio, RadioGroup } from '@verbb/plugin-kit-react/components';

function RichRadioLabel({ title, description }: { title: string; description: string }) {
    return (
        <span>
            <span style={{ fontWeight: 500 }}>{title}</span>
            <span style={{ display: 'block', color: '#64748b' }}>{description}</span>
        </span>
    );
}

export function RadioGroupSupportingDescriptionsExample() {
    return (
        <RadioGroup name="visibility" value="team">
            <Radio value="team">
                <RichRadioLabel title="Team" description="Visible to the whole team." />
            </Radio>
            <Radio value="private">
                <RichRadioLabel title="Private" description="Only visible to you." />
            </Radio>
        </RadioGroup>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Supporting Descriptions',
    title: 'Supporting descriptions example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <RadioGroupSupportingDescriptionsExample />
        </div>
    ),
};

export default preview;
