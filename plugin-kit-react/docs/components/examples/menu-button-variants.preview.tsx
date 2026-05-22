import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { MenuButton } from '@verbb/plugin-kit-react/components';

const baseMenuItems = [
    { label: 'Save as a new form' },
    { label: 'Save as a new stencil' },
    { type: 'separator' as const },
    { label: 'Delete', variant: 'destructive' as const },
];

export function MenuButtonVariantsExample() {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <MenuButton mainAction={{ label: 'Default' }} menuItems={baseMenuItems} />
            <MenuButton mainAction={{ label: 'Primary' }} menuItems={baseMenuItems} variant="primary" />
            <MenuButton mainAction={{ label: 'Outline' }} menuItems={baseMenuItems} variant="outline" />
            <MenuButton mainAction={{ label: 'Dashed' }} menuItems={baseMenuItems} variant="dashed" />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'Variants example',
    language: 'tsx',
    source: true,
    render: () => <MenuButtonVariantsExample />,
};

export default preview;
