// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faFloppyDisk, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { Button, MenuButton } from '@verbb/plugin-kit-react/components';

export function MenuButtonToolbarExample() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <MenuButton
                variant="primary"
                mainAction={{
                    label: 'Save',
                    icon: <FontAwesomeIcon icon={faFloppyDisk} />,
                }}
                menuItems={[
                    { label: 'Save and continue', icon: <FontAwesomeIcon icon={faFloppyDisk} /> },
                    { label: 'Duplicate', icon: <FontAwesomeIcon icon={faCopy} /> },
                    { type: 'separator' },
                    { label: 'Delete', icon: <FontAwesomeIcon icon={faTrash} />, variant: 'destructive' },
                ]}
            />
            <Button>Cancel</Button>
        </div>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Toolbar',
    title: 'Menu button toolbar example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <MenuButtonToolbarExample />
        </div>
    ),
};

export default preview;
