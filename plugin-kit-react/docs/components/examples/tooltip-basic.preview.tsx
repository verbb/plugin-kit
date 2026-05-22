import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@verbb/plugin-kit-react/components';

export function TooltipBasicExample() {
    return (
        <Tooltip>
            <TooltipTrigger render={<Button>Hover me</Button>} />
            <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => <TooltipBasicExample />,
};

export default preview;
