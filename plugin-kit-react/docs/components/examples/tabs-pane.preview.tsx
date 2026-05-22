import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const wrapperStyle = { height: '220px' } as const;

// #region example
import {
    PaneTabs,
    PaneTabsContent,
    PaneTabsList,
    PaneTabsTrigger,
} from '@verbb/plugin-kit-react/components';

export function TabsPaneExample() {
    return (
        <PaneTabs defaultValue="tab1">
            <PaneTabsList>
                <PaneTabsTrigger value="tab1">Tab One</PaneTabsTrigger>
                <PaneTabsTrigger value="tab2">Tab Two</PaneTabsTrigger>
            </PaneTabsList>
            <PaneTabsContent value="tab1" className="p-4 text-sm">
                Pane tab one content
            </PaneTabsContent>
            <PaneTabsContent value="tab2" className="p-4 text-sm">
                Pane tab two content
            </PaneTabsContent>
        </PaneTabs>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Pane Tabs',
    title: 'Pane tabs example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={wrapperStyle}>
            <TabsPaneExample />
        </div>
    ),
};

export default preview;
