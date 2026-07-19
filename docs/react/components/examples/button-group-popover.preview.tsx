import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    ButtonGroup,
    Popover,
} from '@verbb/plugin-kit-react/components';

export function ButtonGroupPopoverExample() {
    return (
        <ButtonGroup>
            <Button variant="primary">Filter</Button>
            <Popover>
                <Button slot="trigger" variant="primary" groupTrigger aria-label="Filter options" />
                <div style={{ minWidth: '12rem', padding: '0.75rem' }}>Filter options</div>
            </Popover>
        </ButtonGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Popover',
    title: 'Popover example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupPopoverExample />,
};

export default preview;
