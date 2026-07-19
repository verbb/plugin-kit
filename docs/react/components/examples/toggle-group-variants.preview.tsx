import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const previewStackStyle = Object.assign({}, stackStyle, { maxWidth: 'none', gap: '16px' });

// #region example
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-react/components';

export function ToggleGroupVariantsExample() {
    return (
        <>
            <ToggleGroup spacing={0}>
                <Toggle data-value="bold" aria-label="Bold"><Icon icon="bold" /></Toggle>
                <Toggle data-value="italic" aria-label="Italic"><Icon icon="italic" /></Toggle>
            </ToggleGroup>
            <ToggleGroup variant="outline" spacing={0}>
                <Toggle data-value="bold" aria-label="Bold"><Icon icon="bold" /></Toggle>
                <Toggle data-value="italic" aria-label="Italic"><Icon icon="italic" /></Toggle>
            </ToggleGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'Variants example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={previewStackStyle}>
            <ToggleGroupVariantsExample />
        </div>
    ),
};

export default preview;
