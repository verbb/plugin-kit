// #region example
import { Tab, TabPanel, Tabs } from '@verbb/plugin-kit-react/components';

export function TabsPaneExample() {
    return (
        <Tabs variant="pane" value="tab1">
            <Tab slot="nav" value="tab1">Tab One</Tab>
            <Tab slot="nav" value="tab2">Tab Two</Tab>
            <TabPanel value="tab1"><div className="p-6">Pane tab one content</div></TabPanel>
            <TabPanel value="tab2"><div className="p-6">Pane tab two content</div></TabPanel>
        </Tabs>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const wrapperStyle = { height: '220px' } as const;

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
