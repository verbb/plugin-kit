import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button, Input, Popover } from '@verbb/plugin-kit-react/components';

export function PopoverFormExample() {
    return (
        <Popover>
            <Button slot="trigger">Edit dimensions</Button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: '16rem' }}>
                <Input placeholder="Width" />
                <Input placeholder="Height" />
                <Button variant="primary">Apply</Button>
            </div>
        </Popover>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Form Content',
    title: 'Popover form content example',
    language: 'tsx',
    source: true,
    render: () => <PopoverFormExample />,
};

export default preview;
