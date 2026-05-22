import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@verbb/plugin-kit-react/components';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export function TooltipPlacementExample() {
    return (
        <div className="flex flex-wrap gap-3">
            {sides.map((side) => (
                <Tooltip key={side}>
                    <TooltipTrigger render={<Button variant="outline">{side}</Button>} />
                    <TooltipContent side={side}>Tooltip on the {side}</TooltipContent>
                </Tooltip>
            ))}
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Placement',
    title: 'Tooltip placement examples',
    language: 'tsx',
    source: true,
    render: () => <TooltipPlacementExample />,
};

export default preview;
