import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { rowStyle } from './exampleStyles';

// #region example
import { Button, Popover } from '@verbb/plugin-kit-react/components';

export function PopoverPlacementExample() {
    return (
        <>
            <Popover placement="top">
                <Button slot="trigger">Top</Button>
                <div>Popover on top</div>
            </Popover>
            <Popover placement="bottom">
                <Button slot="trigger">Bottom</Button>
                <div>Popover on bottom</div>
            </Popover>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Placement',
    title: 'Popover placement examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <PopoverPlacementExample />
        </div>
    ),
};

export default preview;
