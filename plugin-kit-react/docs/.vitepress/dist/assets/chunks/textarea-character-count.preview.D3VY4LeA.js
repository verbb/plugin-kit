const e=`// #region example
import { useState } from 'react';
import { Textarea } from '@verbb/plugin-kit-react/components';

const maxLength = 120;

export function TextareaCharacterCountExample() {
    const [value, setValue] = useState('Short helper text for a settings screen.');

    return (
        <div className="flex flex-col gap-1">
            <Textarea
                value={value}
                maxLength={maxLength}
                onChange={(event) => { setValue(event.target.value); }}
            />
            <div className="text-right text-xs text-gray-500">
                {value.length}/{maxLength}
            </div>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Character Count',
    title: 'Textarea character count example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <TextareaCharacterCountExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
