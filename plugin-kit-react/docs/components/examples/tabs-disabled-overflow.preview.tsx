// #region example
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@verbb/plugin-kit-react/components';

export function TabsDisabledOverflowExample() {
    return (
        <Tabs defaultValue="general" className="max-w-md">
            <div className="overflow-x-auto pb-1">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="advanced" disabled>Advanced</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="general">General content</TabsContent>
            <TabsContent value="content">Content settings</TabsContent>
            <TabsContent value="notifications">Notification settings</TabsContent>
            <TabsContent value="integrations">Integration settings</TabsContent>
        </Tabs>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Disabled and Overflow',
    title: 'Disabled and overflowing tabs example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <TabsDisabledOverflowExample />
        </div>
    ),
};

export default preview;
