// #region example
import { ScrollArea } from '@verbb/plugin-kit-react/components';

const simpleItems = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`);

export function ScrollAreaVerticalExample() {
    return (
        <ScrollArea className="h-[260px] w-[320px] rounded border border-gray-200" orientation="vertical">
            <div className="space-y-2 p-3">
                {simpleItems.map((item) => (
                    <div key={item} className="rounded bg-slate-100 px-2 py-1 text-sm">
                        {item}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Vertical Scrolling',
    title: 'Basic vertical scrolling example',
    language: 'tsx',
    source: true,
    render: () => <ScrollAreaVerticalExample />,
};

export default preview;
