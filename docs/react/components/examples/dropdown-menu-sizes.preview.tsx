import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
    DropdownSeparator,
} from '@verbb/plugin-kit-react/components';

function SizeMenu({ size }: { size?: 'xs' | 'sm' | 'lg' }) {
    const label = size ?? 'default';

    return (
        <DropdownMenu {...(size ? { size } : {})}>
            <Button slot="trigger" {...(size ? { size } : {})} withCaret>
                {label}
            </Button>
            <DropdownLabel>Actions</DropdownLabel>
            <DropdownItem value="edit">Edit</DropdownItem>
            <DropdownItem value="duplicate">Duplicate</DropdownItem>
            <DropdownSeparator />
            <DropdownItem value="delete" destructive>Delete</DropdownItem>
        </DropdownMenu>
    );
}

export function DropdownMenuSizesExample() {
    return (
        <>
            <SizeMenu size="xs" />
            <SizeMenu size="sm" />
            <SizeMenu />
            <SizeMenu size="lg" />
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Dropdown sizes example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <DropdownMenuSizesExample />
        </div>
    ),
};

export default preview;
