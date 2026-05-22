const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@verbb/plugin-kit-react/components';

export function DropdownMenuBasicExample() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={(
                    <Button className="gap-3">
                        Options
                        <FontAwesomeIcon icon={faChevronDown} className="size-3" />
                    </Button>
                )}
            />
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
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
`;export{e as default};
