import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@verbb/plugin-kit-react/components';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export function PopoverPlacementExample() {
    return (
        <div className="flex flex-wrap gap-3">
            {sides.map((side) => (
                <Popover key={side}>
                    <PopoverTrigger render={<Button variant="outline">{side}</Button>} />
                    <PopoverContent side={side}>
                        <PopoverHeader>
                            <PopoverTitle>{side} popover</PopoverTitle>
                            <PopoverDescription>Position popovers near the control they support.</PopoverDescription>
                        </PopoverHeader>
                    </PopoverContent>
                </Popover>
            ))}
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Placement',
    title: 'Popover placement examples',
    language: 'tsx',
    source: true,
    render: () => <PopoverPlacementExample />,
};

export default preview;
