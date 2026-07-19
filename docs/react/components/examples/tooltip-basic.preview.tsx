// #region example
import { Button, Tooltip } from '@verbb/plugin-kit-react/components';

export function TooltipBasicExample() {
    return (
        <Tooltip content="Tooltip content">
            <Button slot="trigger">Hover me</Button>
        </Tooltip>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => <TooltipBasicExample />,
};

export default preview;
