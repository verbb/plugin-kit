import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-react/components';

export function ToggleGroupBasicExample() {
    return (
        <ToggleGroup variant="outline" spacing={0}>
            <Toggle data-value="left" aria-label="Align left"><Icon icon="align-left" /></Toggle>
            <Toggle data-value="center" aria-label="Align center"><Icon icon="align-center" /></Toggle>
            <Toggle data-value="right" aria-label="Align right"><Icon icon="align-right" /></Toggle>
        </ToggleGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ToggleGroupBasicExample />
        </div>
    ),
};

export default preview;
