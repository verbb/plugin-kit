import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClone,
    faEdit,
    faEllipsis,
    faTrash,
} from '@fortawesome/pro-solid-svg-icons';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuTriggersExample() {
    return (
        <div className="flex flex-wrap items-center gap-6">
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline">Open menu</Button>} />
                <DropdownMenuContent align="start">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger
                    render={(
                        <Button
                            variant="transparent"
                            className="h-9 w-9 rounded-full bg-slate-200 p-0 text-slate-700"
                        >
                            JC
                        </Button>
                    )}
                />
                <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger
                    render={(
                        <Button
                            variant="transparent"
                            className="h-9 w-9 p-0 text-slate-700"
                            aria-label="Open context menu"
                        >
                            <FontAwesomeIcon icon={faEllipsis} className="size-4" />
                        </Button>
                    )}
                />
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <FontAwesomeIcon icon={faEdit} className="size-3" />
                        {' '}
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FontAwesomeIcon icon={faClone} className="size-3" />
                        {' '}
                        Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                        <FontAwesomeIcon icon={faTrash} className="size-3" />
                        {' '}
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Different Triggers',
    title: 'Different triggers example',
    language: 'tsx',
    source: true,
    render: () => <DropdownMenuTriggersExample />,
};

export default preview;
