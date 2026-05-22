const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@verbb/plugin-kit-react/components';

export function TooltipKeyboardExample() {
    return (
        <Tooltip>
            <TooltipTrigger render={<Button variant="transparent">Focus or hover</Button>} />
            <TooltipContent>
                Tooltips are available from both pointer and keyboard focus.
            </TooltipContent>
        </Tooltip>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Keyboard Trigger',
    title: 'Keyboard-accessible tooltip example',
    language: 'tsx',
    source: true,
    render: () => <TooltipKeyboardExample />,
};

export default preview;
`;export{e as default};
