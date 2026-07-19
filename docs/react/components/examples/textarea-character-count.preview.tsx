// #region example
import { useState } from 'react';
import { Textarea } from '@verbb/plugin-kit-react/components';

const maxLength = 120;

export function TextareaCharacterCountExample() {
    const [value, setValue] = useState('Short helper text for a settings screen.');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '24rem' }}>
            <Textarea
                value={value}
                maxLength={maxLength}
                onChange={(event) => { setValue(event.target.value); }}
            />
            <div style={{ textAlign: 'right', fontSize: 12, color: '#6b7280' }}>
                {value.length}/{maxLength}
            </div>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Character Count',
    title: 'Textarea character count example',
    language: 'tsx',
    source: true,
    render: () => <TextareaCharacterCountExample />,
};

export default preview;
