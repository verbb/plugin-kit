import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { rowStyle } from './exampleStyles';

// #region example
import {
    Button,
    DropdownItem,
    DropdownMenu,
    Icon,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuTriggersExample() {
    return (
        <>
            <DropdownMenu>
                <Button slot="trigger" withCaret>Open menu</Button>
                <DropdownItem value="profile">Profile</DropdownItem>
                <DropdownItem value="settings">Settings</DropdownItem>
            </DropdownMenu>
            <DropdownMenu>
                <Button slot="trigger" aria-label="Open menu">
                    <Icon slot="start" icon="ellipsis" />
                </Button>
                <DropdownItem value="edit">Edit</DropdownItem>
                <DropdownItem value="duplicate">Duplicate</DropdownItem>
            </DropdownMenu>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Different Triggers',
    title: 'Different triggers example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <DropdownMenuTriggersExample />
        </div>
    ),
};

export default preview;
