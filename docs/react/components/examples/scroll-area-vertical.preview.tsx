// #region example
import { ScrollArea } from '@verbb/plugin-kit-react/components';

const simpleItems = Array.from({ length: 8 }, (_, index) => `Item ${index + 1}`);

export function ScrollAreaVerticalExample() {
    return (
        <ScrollArea orientation="vertical" style={{ height: '8rem', width: '16rem' }}>
            <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {simpleItems.map((item) => (
                    <div key={item}>{item}</div>
                ))}
            </div>
        </ScrollArea>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Vertical Scrolling',
    title: 'Basic vertical scrolling example',
    language: 'tsx',
    source: true,
    render: () => <ScrollAreaVerticalExample />,
};

export default preview;
