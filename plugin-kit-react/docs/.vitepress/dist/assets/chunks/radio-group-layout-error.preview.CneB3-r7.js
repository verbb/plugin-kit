const e=`// #region example
import { RadioGroup, RadioGroupItem } from '@verbb/plugin-kit-react/components';

export function RadioGroupLayoutErrorExample() {
    return (
        <div className="flex flex-col gap-4">
            <RadioGroup defaultValue="daily" className="flex gap-4">
                {['daily', 'weekly', 'monthly'].map((value) => (
                    <label key={value} className="flex items-center gap-2 capitalize">
                        <RadioGroupItem value={value} />
                        <span>{value}</span>
                    </label>
                ))}
            </RadioGroup>
            <RadioGroup defaultValue="email" aria-invalid="true">
                <label className="flex items-center gap-2">
                    <RadioGroupItem value="email" aria-invalid="true" />
                    <span>Email</span>
                </label>
                <label className="flex items-center gap-2">
                    <RadioGroupItem value="sms" aria-invalid="true" />
                    <span>SMS</span>
                </label>
                <p className="text-sm text-error">Choose an available notification channel.</p>
            </RadioGroup>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
`;export{e as default};
