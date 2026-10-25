import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button } from '@verbb/plugin-kit-react/components';

export function ButtonSizesExample() {
    return (
        <>
            <Button size="xxs">Extra extra small</Button>
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
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
