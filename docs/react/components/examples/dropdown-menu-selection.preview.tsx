import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownSeparator,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuSelectionExample() {
    return (
        <DropdownMenu>
            <Button slot="trigger" withCaret>View</Button>
            <DropdownItem value="cards" type="radio" radioGroup="view" checked>Cards</DropdownItem>
            <DropdownItem value="table" type="radio" radioGroup="view">Table</DropdownItem>
            <DropdownSeparator />
            <DropdownItem value="compact" type="checkbox">Compact density</DropdownItem>
        </DropdownMenu>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Selection Items',
    title: 'Dropdown menu selection item example',
    language: 'tsx',
    source: true,
    render: () => <DropdownMenuSelectionExample />,
};

export default preview;
