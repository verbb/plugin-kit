// #region example
import { Button, Tooltip } from '@verbb/plugin-kit-react/components';

export function TooltipKeyboardExample() {
    return (
        <Tooltip content="Tooltips are available from both pointer and keyboard focus.">
            <Button slot="trigger" variant="transparent">Focus or hover</Button>
        </Tooltip>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Keyboard Trigger',
    title: 'Keyboard-accessible tooltip example',
    language: 'tsx',
    source: true,
    render: () => <TooltipKeyboardExample />,
};

export default preview;
