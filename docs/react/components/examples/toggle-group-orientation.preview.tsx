import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const wrapStyle = { display: 'flex' as const, flexWrap: 'wrap' as const, alignItems: 'flex-start' as const, gap: '32px' };

// #region example
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-react/components';

export function ToggleGroupOrientationExample() {
    return (
        <>
            <ToggleGroup spacing={0}>
                <Toggle data-value="left" aria-label="Align left"><Icon icon="align-left" /></Toggle>
                <Toggle data-value="center" aria-label="Align center"><Icon icon="align-center" /></Toggle>
                <Toggle data-value="right" aria-label="Align right"><Icon icon="align-right" /></Toggle>
            </ToggleGroup>
            <ToggleGroup orientation="vertical" spacing={0}>
                <Toggle data-value="left" aria-label="Align left"><Icon icon="align-left" /></Toggle>
                <Toggle data-value="center" aria-label="Align center"><Icon icon="align-center" /></Toggle>
                <Toggle data-value="right" aria-label="Align right"><Icon icon="align-right" /></Toggle>
            </ToggleGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Orientation',
    title: 'Orientation example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={wrapStyle}>
            <ToggleGroupOrientationExample />
        </div>
    ),
};

export default preview;
