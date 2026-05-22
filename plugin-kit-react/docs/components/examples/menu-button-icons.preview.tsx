import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { MenuButton } from '@verbb/plugin-kit-react/components';

const baseIconMenuItems = [
    { label: 'Save as a new form', icon: <FontAwesomeIcon icon={faPen} className="size-2.5" /> },
    { label: 'Save as a new stencil', icon: <FontAwesomeIcon icon={faPen} className="size-2.5" /> },
    { type: 'separator' as const },
    { label: 'Delete', icon: <FontAwesomeIcon icon={faTrash} className="size-2.5" />, variant: 'destructive' as const },
];

export function MenuButtonIconsExample() {
    return (
        <MenuButton mainAction={{ label: 'Actions' }} menuItems={baseIconMenuItems} />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Icons',
    title: 'Icons example',
    language: 'tsx',
    source: true,
    render: () => <MenuButtonIconsExample />,
};

export default preview;
