const e=`// #region example
import { RadioGroup, RadioGroupItem } from '@verbb/plugin-kit-react/components';

export function RadioGroupDisabledOptionsExample() {
    return (
        <RadioGroup defaultValue="starter">
            <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="starter" />
                Starter
            </label>
            <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="pro" />
                Pro
            </label>
            <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="enterprise" disabled />
                Enterprise
            </label>
        </RadioGroup>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
`;export{e as default};
