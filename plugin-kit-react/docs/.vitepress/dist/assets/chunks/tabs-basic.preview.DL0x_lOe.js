const e=`import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@verbb/plugin-kit-react/components';

export function TabsBasicExample() {
    return (
        <Tabs defaultValue="general">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="general">General content</TabsContent>
            <TabsContent value="settings">Settings content</TabsContent>
            <TabsContent value="advanced">Advanced content</TabsContent>
        </Tabs>
    );
}
// #endregion example

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
`;export{e as default};
