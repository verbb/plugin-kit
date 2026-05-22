// #region example
import { ScrollArea } from '@verbb/plugin-kit-react/components';

export function ScrollAreaHorizontalExample() {
    return (
        <ScrollArea className="h-[140px] w-[420px] rounded border border-gray-200 whitespace-nowrap" orientation="horizontal">
            <div className="flex w-max space-x-4 p-4">
                {Array.from({ length: 20 }, (_, index) => (
                    <div
                        key={index}
                        className="flex h-[90px] w-[160px] items-center justify-center rounded bg-slate-100 p-3 text-sm"
                    >
                        {`Card ${index + 1}`}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Horizontal Scrolling',
    title: 'Horizontal scrolling example',
    language: 'tsx',
    source: true,
    render: () => <ScrollAreaHorizontalExample />,
};

export default preview;
