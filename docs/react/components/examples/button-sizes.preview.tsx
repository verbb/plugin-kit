import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button } from '@verbb/plugin-kit-react/components';

export function ButtonSizesExample() {
    return (
        <>
            <Button size="xs">Small</Button>
            <Button size="sm">Default</Button>
            <Button>Base</Button>
            <Button size="lg">Large</Button>
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
        <div style={rowStyle}>
            <ButtonSizesExample />
        </div>
    ),
};

export default preview;
