import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
    DropdownSeparator,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuGroupedExample() {
    return (
        <DropdownMenu>
            <Button slot="trigger" withCaret>Open menu</Button>
            <DropdownLabel>General</DropdownLabel>
            <DropdownItem value="new-file">New File</DropdownItem>
            <DropdownItem value="duplicate">Duplicate</DropdownItem>
            <DropdownSeparator />
            <DropdownLabel>Preferences</DropdownLabel>
            <DropdownItem value="line-numbers" type="checkbox" checked>Show line numbers</DropdownItem>
            <DropdownItem value="word-wrap" type="checkbox">Word wrap</DropdownItem>
        </DropdownMenu>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Grouped Options',
    title: 'Grouped options example',
    language: 'tsx',
    source: true,
    render: () => <DropdownMenuGroupedExample />,
};

export default preview;
