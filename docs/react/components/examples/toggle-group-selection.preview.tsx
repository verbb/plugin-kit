import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-react/components';

export function ToggleGroupSelectionExample() {
    return (
        <>
            {/* Single selection — mutually exclusive alignment */}
            <ToggleGroup spacing={0} value={['left']}>
                <Toggle data-value="left" aria-label="Align left"><Icon icon="align-left" /></Toggle>
                <Toggle data-value="center" aria-label="Align center"><Icon icon="align-center" /></Toggle>
                <Toggle data-value="right" aria-label="Align right"><Icon icon="align-right" /></Toggle>
            </ToggleGroup>
            {/* Multiple selection — independent formatting */}
            <ToggleGroup multiple spacing={0} value={['bold']}>
                <Toggle data-value="bold" aria-label="Bold"><Icon icon="bold" /></Toggle>
                <Toggle data-value="italic" aria-label="Italic"><Icon icon="italic" /></Toggle>
                <Toggle data-value="underline" aria-label="Underline"><Icon icon="underline" /></Toggle>
            </ToggleGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Selection Modes',
    title: 'Toggle group selection mode examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ToggleGroupSelectionExample />
        </div>
    ),
};

export default preview;
