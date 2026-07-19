// #region example
import { Button, Tooltip } from '@verbb/plugin-kit-react/components';

export function TooltipActionHintsExample() {
    return (
        <Tooltip content="Move this item out of the active list.">
            <Button slot="trigger" variant="outline">Archive</Button>
        </Tooltip>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Action Hints',
    title: 'Action hints example',
    language: 'tsx',
    source: true,
    render: () => <TooltipActionHintsExample />,
};

export default preview;
