import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button, Popover } from '@verbb/plugin-kit-react/components';

function ArrowPopover({ placement, label }: { placement: 'top' | 'right' | 'bottom' | 'left'; label: string }) {
    return (
        <Popover withArrow placement={placement}>
            <Button slot="trigger">{label}</Button>
            <div>
                <strong style={{ fontSize: 14 }}>Arrow popover</strong>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                    The arrow tracks placement and stays aimed at the trigger.
                </p>
            </div>
        </Popover>
    );
}

export function PopoverWithArrowExample() {
    return (
        <>
            <ArrowPopover placement="top" label="Top" />
            <ArrowPopover placement="right" label="Right" />
            <ArrowPopover placement="bottom" label="Bottom" />
            <ArrowPopover placement="left" label="Left" />
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'With Arrow',
    title: 'With arrow example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <PopoverWithArrowExample />
        </div>
    ),
};

export default preview;
