// #region example
import { Tab, TabPanel, Tabs } from '@verbb/plugin-kit-react/components';

export function TabsModalExample() {
    return (
        <Tabs variant="modal" value="details">
            <Tab slot="nav" value="details">Details</Tab>
            <Tab slot="nav" value="layout">Layout</Tab>
            <TabPanel value="details">Modal tab details content</TabPanel>
            <TabPanel value="layout">Modal tab layout content</TabPanel>
        </Tabs>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const wrapperStyle = {
    height: '220px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
} as const;

const preview: PreviewSourceDefinition = {
    label: 'Modal Tabs',
    title: 'Modal tabs example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={wrapperStyle}>
            <TabsModalExample />
        </div>
    ),
};

export default preview;
