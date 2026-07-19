// #region example
import { Tab, TabPanel, Tabs } from '@verbb/plugin-kit-react/components';

export function TabsBasicExample() {
    return (
        <Tabs value="general">
            <Tab slot="nav" value="general">General</Tab>
            <Tab slot="nav" value="settings">Settings</Tab>
            <Tab slot="nav" value="advanced">Advanced</Tab>
            <TabPanel value="general">General content</TabPanel>
            <TabPanel value="settings">Settings content</TabPanel>
            <TabPanel value="advanced">Advanced content</TabPanel>
        </Tabs>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Tabs',
    title: 'Basic tabs example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <TabsBasicExample />
        </div>
    ),
};

export default preview;
