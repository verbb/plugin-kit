import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownSeparator,
    Icon,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuIconsExample() {
    return (
        <DropdownMenu>
            <Button slot="trigger" aria-label="Field actions">
                <Icon slot="start" icon="ellipsis" />
            </Button>
            <DropdownItem value="edit">
                <Icon slot="prefix" icon="pen" aria-hidden="true" />
                Edit
            </DropdownItem>
            <DropdownItem value="make-required">
                <Icon slot="prefix" icon="asterisk" aria-hidden="true" />
                Make required
            </DropdownItem>
            <DropdownItem value="duplicate">
                <Icon slot="prefix" icon="copy" aria-hidden="true" />
                Duplicate
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem value="move-up">
                <Icon slot="prefix" icon="arrow-up" aria-hidden="true" />
                Move up
            </DropdownItem>
            <DropdownItem value="move-down">
                <Icon slot="prefix" icon="arrow-down" aria-hidden="true" />
                Move down
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem value="delete" destructive>
                <Icon slot="prefix" icon="xmark" aria-hidden="true" />
                Delete
            </DropdownItem>
        </DropdownMenu>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Item Icons',
    title: 'Items with icons example',
    language: 'tsx',
    source: true,
    render: () => <DropdownMenuIconsExample />,
};

export default preview;
