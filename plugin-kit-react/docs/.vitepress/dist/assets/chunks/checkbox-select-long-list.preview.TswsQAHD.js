const e=`// #region example
import { useState } from 'react';
import { CheckboxSelect, type CheckboxSelectValue } from '@verbb/plugin-kit-react/components';

const longOptions = [
    { label: 'Entry titles and slugs', value: 'titles' },
    { label: 'Author names', value: 'authors' },
    { label: 'Section and entry type metadata', value: 'sections' },
    { label: 'Submission status labels', value: 'statuses' },
    { label: 'Integration response summaries', value: 'integrations' },
    { label: 'Very long option label that should wrap cleanly without pushing the checkbox out of alignment', value: 'long' },
];

export function CheckboxSelectLongListExample() {
    const [value, setValue] = useState<CheckboxSelectValue>(['titles', 'statuses']);

    return (
        <div className="max-w-sm text-sm">
            <CheckboxSelect
                options={longOptions}
                value={value}
                onChange={setValue}
                className="space-y-2"
            />
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Long Lists',
    title: 'Checkbox select long list example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxSelectLongListExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
