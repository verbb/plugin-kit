const t=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@verbb/plugin-kit-react/components';

export function TooltipActionHintsExample() {
    return (
        <Tooltip>
            <TooltipTrigger render={<Button variant="outline">Archive</Button>} />
            <TooltipContent>Move this item out of the active list.</TooltipContent>
        </Tooltip>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Action Hints',
    title: 'Action hints example',
    language: 'tsx',
    source: true,
    render: () => <TooltipActionHintsExample />,
};

export default preview;
`;export{t as default};
