import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import {
    Button,
    ButtonGroup,
    ButtonGroupSeparator,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@verbb/plugin-kit-react/components';

export function ButtonGroupDropdownExample() {
    return (
        <ButtonGroup>
            <Button variant="primary">Actions</Button>
            <ButtonGroupSeparator />

            <DropdownMenu>
                <DropdownMenuTrigger
                    render={(
                        <Button variant="primary" aria-label="Open actions">
                            <FontAwesomeIcon icon={faChevronDown} className="size-3" />
                        </Button>
                    )}
                />
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </ButtonGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Dropdown',
    title: 'Dropdown example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupDropdownExample />,
};

export default preview;
