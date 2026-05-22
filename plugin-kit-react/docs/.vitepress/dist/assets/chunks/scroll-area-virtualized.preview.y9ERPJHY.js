const e=`// #region example
import { VirtualizedScrollArea } from '@verbb/plugin-kit-react/components';

const simpleItems = Array.from({ length: 50 }, (_, index) => \`Item \${index + 1}\`);
const variableItems = Array.from({ length: 50 }, (_, index) => ({
    id: \`var-\${index + 1}\`,
    label: \`Variable item \${index + 1}\`,
    height: 36 + ((index % 4) * 18),
}));

export function ScrollAreaVirtualizedExample() {
    return (
        <div className="flex max-w-none flex-col gap-4">
            <div className="w-[320px] rounded border border-gray-200">
                <VirtualizedScrollArea
                    items={simpleItems}
                    listHeight={260}
                    estimateSize={() => 44}
                    overscan={6}
                    renderItem={(item) => (
                        <div className="px-3 py-2">
                            <div className="rounded bg-slate-100 px-2 py-1 text-sm">{item}</div>
                        </div>
                    )}
                />
            </div>
            <div className="w-[320px] rounded border border-gray-200">
                <VirtualizedScrollArea
                    items={variableItems}
                    listHeight={260}
                    estimateSize={() => 60}
                    overscan={6}
                    enableDynamicHeights
                    getItemKey={(index) => variableItems[index].id}
                    renderItem={(item) => (
                        <div className="px-3 py-2">
                            <div
                                className="rounded bg-slate-100 px-2 py-1 text-sm"
                                style={{ height: item.height }}
                            >
                                {item.label}
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Virtualized Lists',
    title: 'Virtualized lists example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={{ ...stackStyle, maxWidth: 'none' }}>
            <ScrollAreaVirtualizedExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
