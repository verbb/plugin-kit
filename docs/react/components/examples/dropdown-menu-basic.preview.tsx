import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownSeparator,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuBasicExample() {
    return (
        <DropdownMenu>
            <Button slot="trigger" withCaret>Options</Button>
            <DropdownItem value="profile">Profile</DropdownItem>
            <DropdownItem value="settings">Settings</DropdownItem>
            <DropdownSeparator />
            <DropdownItem value="delete" destructive>Delete</DropdownItem>
        </DropdownMenu>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Menu',
    title: 'Basic menu example',
    language: 'tsx',
    source: true,
    render: () => <DropdownMenuBasicExample />,
};

export default preview;
