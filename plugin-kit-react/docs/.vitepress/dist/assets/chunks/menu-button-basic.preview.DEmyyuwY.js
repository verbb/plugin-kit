const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { MenuButton } from '@verbb/plugin-kit-react/components';

const baseMenuItems = [
    { label: 'Save as a new form' },
    { label: 'Save as a new stencil' },
    { type: 'separator' as const },
    { label: 'Delete', variant: 'destructive' as const },
];

export function MenuButtonBasicExample() {
    return (
        <MenuButton mainAction={{ label: 'Actions' }} menuItems={baseMenuItems} />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => <MenuButtonBasicExample />,
};

export default preview;
`;export{e as default};
