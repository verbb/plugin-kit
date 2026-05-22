const o=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
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
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuGroupedExample() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={(
                    <Button className="gap-3">
                        Actions
                        <FontAwesomeIcon icon={faChevronDown} className="size-3" />
                    </Button>
                )}
            />
            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>General</DropdownMenuLabel>
                    <DropdownMenuItem>
                        New File
                        <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Duplicate
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem checked>Show line numbers</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Word wrap</DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Theme</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value="light">
                        <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
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
`;export{o as default};
