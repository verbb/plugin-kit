const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { TiptapInput } from '@verbb/plugin-kit-react/components';

export function TiptapInputPlainExample() {
    const [value, setValue] = useState('Hello world');

    return (
        <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155' }}>Plain text</label>
                <TiptapInput
                    value={value}
                    onChange={setValue}
                    placeholder="Write something"
                />
            </div>
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Plain Input',
    title: 'Plain input example',
    language: 'tsx',
    source: true,
    render: () => <TiptapInputPlainExample />,
};

export default preview;
`;export{e as default};
