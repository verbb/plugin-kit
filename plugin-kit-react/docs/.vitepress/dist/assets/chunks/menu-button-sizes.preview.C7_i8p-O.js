const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { MenuButton } from '@verbb/plugin-kit-react/components';

const baseMenuItems = [
    { label: 'Save as a new form' },
    { label: 'Save as a new stencil' },
    { type: 'separator' as const },
    { label: 'Delete', variant: 'destructive' as const },
];

const menuButtonSizes = ['xs', 'sm', 'default', 'lg'] as const;

export function MenuButtonSizesExample() {
    return (
        <div className="flex flex-wrap items-center gap-4">
            {menuButtonSizes.map((size) => (
                <MenuButton
                    key={size}
                    mainAction={{ label: size }}
                    menuItems={baseMenuItems}
                    size={size}
                />
            ))}
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => <MenuButtonSizesExample />,
};

export default preview;
`;export{e as default};
