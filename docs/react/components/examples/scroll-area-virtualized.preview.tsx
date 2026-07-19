// #region example
import { ScrollArea } from '@verbb/plugin-kit-react/components';

const rows = Array.from({ length: 20 }, (_, index) => `Row ${index + 1}`);

export function ScrollAreaVirtualizedExample() {
    return (
        <ScrollArea style={{ height: '10rem', width: '18rem' }}>
            <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {rows.map((row) => (
                    <div key={row}>{row}</div>
                ))}
            </div>
        </ScrollArea>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Long Lists',
    title: 'Long lists example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ScrollAreaVirtualizedExample />
        </div>
    ),
};

export default preview;
