import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    ButtonGroup,
    DropdownItem,
    DropdownMenu,
} from '@verbb/plugin-kit-react/components';

export function ButtonGroupDropdownExample() {
    return (
        <ButtonGroup>
            <Button variant="primary">Actions</Button>
            <DropdownMenu>
                <Button slot="trigger" variant="primary" groupTrigger aria-label="More actions" />
                <DropdownItem value="duplicate">Duplicate</DropdownItem>
                <DropdownItem value="delete" destructive>Delete</DropdownItem>
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
