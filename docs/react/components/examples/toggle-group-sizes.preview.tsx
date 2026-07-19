import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const previewStackStyle = Object.assign({}, stackStyle, { maxWidth: 'none', gap: '16px' });

// #region example
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-react/components';

export function ToggleGroupSizesExample() {
    return (
        <>
            <ToggleGroup size="sm" spacing={0}>
                <Toggle data-value="left" aria-label="Align left"><Icon icon="align-left" /></Toggle>
                <Toggle data-value="center" aria-label="Align center"><Icon icon="align-center" /></Toggle>
            </ToggleGroup>
            <ToggleGroup spacing={0}>
                <Toggle data-value="left" aria-label="Align left"><Icon icon="align-left" /></Toggle>
                <Toggle data-value="center" aria-label="Align center"><Icon icon="align-center" /></Toggle>
            </ToggleGroup>
            <ToggleGroup size="lg" spacing={0}>
                <Toggle data-value="left" aria-label="Align left"><Icon icon="align-left" /></Toggle>
                <Toggle data-value="center" aria-label="Align center"><Icon icon="align-center" /></Toggle>
            </ToggleGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={previewStackStyle}>
            <ToggleGroupSizesExample />
        </div>
    ),
};

export default preview;
