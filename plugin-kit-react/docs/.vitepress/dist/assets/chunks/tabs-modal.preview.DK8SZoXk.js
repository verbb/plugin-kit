const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const wrapperStyle = {
    height: '220px',
    borderRadius: '6px',
    border: '1px solid rgb(226 232 240)',
} as const;

// #region example
import {
    ModalTabs,
    ModalTabsContent,
    ModalTabsList,
    ModalTabsTrigger,
} from '@verbb/plugin-kit-react/components';

export function TabsModalExample() {
    return (
        <ModalTabs defaultValue="details">
            <ModalTabsList>
                <ModalTabsTrigger value="details">Details</ModalTabsTrigger>
                <ModalTabsTrigger value="layout">Layout</ModalTabsTrigger>
            </ModalTabsList>
            <ModalTabsContent value="details" className="text-sm">
                Modal tab details content
            </ModalTabsContent>
            <ModalTabsContent value="layout" className="text-sm">
                Modal tab layout content
            </ModalTabsContent>
        </ModalTabs>
    );
}
// #endregion example

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
`;export{e as default};
