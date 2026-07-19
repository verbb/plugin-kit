import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button, Popover } from '@verbb/plugin-kit-react/components';

export function PopoverBasicExample() {
    return (
        <Popover>
            <Button slot="trigger">Open popover</Button>
            <div>
                <strong style={{ fontSize: 14, color: '#0f172a' }}>Dimensions</strong>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                    Set the width and height for the selected element.
                </p>
            </div>
        </Popover>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => <PopoverBasicExample />,
};

export default preview;
