// #region example
import { Button, Tooltip } from '@verbb/plugin-kit-react/components';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export function TooltipPlacementExample() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            {sides.map((side) => (
                <Tooltip key={side} placement={side} content={`Tooltip on the ${side}`}>
                    <Button slot="trigger" variant="outline">{side}</Button>
                </Tooltip>
            ))}
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Placement',
    title: 'Tooltip placement examples',
    language: 'tsx',
    source: true,
    render: () => <TooltipPlacementExample />,
};

export default preview;
