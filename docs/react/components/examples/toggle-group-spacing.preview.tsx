import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-react/components';

export function ToggleGroupSpacingExample() {
    return (
        <>
            <ToggleGroup spacing={0}>
                <Toggle data-value="bold" aria-label="Bold"><Icon icon="bold" /></Toggle>
                <Toggle data-value="italic" aria-label="Italic"><Icon icon="italic" /></Toggle>
            </ToggleGroup>
            <ToggleGroup spacing={2}>
                <Toggle data-value="bold" aria-label="Bold"><Icon icon="bold" /></Toggle>
                <Toggle data-value="italic" aria-label="Italic"><Icon icon="italic" /></Toggle>
            </ToggleGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Spacing',
    title: 'Spacing example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ToggleGroupSpacingExample />
        </div>
    ),
};

export default preview;
