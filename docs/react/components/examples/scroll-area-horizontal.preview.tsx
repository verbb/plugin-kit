// #region example
import { ScrollArea } from '@verbb/plugin-kit-react/components';

const items = ['Alpha', 'Beta', 'Gamma', 'Delta'];

export function ScrollAreaHorizontalExample() {
    return (
        <ScrollArea orientation="horizontal" style={{ width: '16rem' }}>
            <div style={{ display: 'flex', gap: 8, width: 'max-content', padding: 8 }}>
                {items.map((item) => (
                    <div key={item} style={{ minWidth: '6rem' }}>
                        {item}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Horizontal Scrolling',
    title: 'Horizontal scrolling example',
    language: 'tsx',
    source: true,
    render: () => <ScrollAreaHorizontalExample />,
};

export default preview;
