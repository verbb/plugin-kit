import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuSelectionExample() {
    const [showArchived, setShowArchived] = useState(false);
    const [sort, setSort] = useState('recent');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={(
                    <Button className="gap-3">
                        View options
                        <FontAwesomeIcon icon={faChevronDown} className="size-3" />
                    </Button>
                )}
            />
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Display</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
                        Show archived
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                        <DropdownMenuRadioItem value="recent">Recently updated</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">Delete selected</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
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
