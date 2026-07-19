import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    DropdownItem,
    DropdownMenu,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuSubmenusExample() {
    return (
        <DropdownMenu>
            <Button slot="trigger" withCaret>Open menu</Button>
            <DropdownItem value="new">New File</DropdownItem>
            <DropdownItem value="share">
                Share
                <DropdownMenu slot="submenu">
                    <DropdownItem value="email">Email</DropdownItem>
                    <DropdownItem value="link">Copy link</DropdownItem>
                </DropdownMenu>
            </DropdownItem>
        </DropdownMenu>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Submenus',
    title: 'Submenus example',
    language: 'tsx',
    source: true,
    render: () => <DropdownMenuSubmenusExample />,
};

export default preview;
