const e=`// #region example
import { RadioGroup, RadioGroupItem } from '@verbb/plugin-kit-react/components';

export function RadioGroupSupportingDescriptionsExample() {
    return (
        <RadioGroup defaultValue="team">
            <label className="flex items-start gap-2 text-sm">
                <RadioGroupItem value="team" className="mt-0.5" />
                <span>
                    <span className="font-medium">Team</span>
                    <span className="block text-slate-500">Visible to the whole team.</span>
                </span>
            </label>
            <label className="flex items-start gap-2 text-sm">
                <RadioGroupItem value="private" className="mt-0.5" />
                <span>
                    <span className="font-medium">Private</span>
                    <span className="block text-slate-500">Only visible to you.</span>
                </span>
            </label>
        </RadioGroup>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
`;export{e as default};
