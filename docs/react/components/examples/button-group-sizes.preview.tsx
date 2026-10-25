import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { stackStyle } from './exampleStyles';

// #region example
import { Button, ButtonGroup } from '@verbb/plugin-kit-react/components';

export function ButtonGroupSizesExample() {
    return (
        <>
            <ButtonGroup>
                <Button size="xxs" variant="primary">Extra extra small</Button>
                <Button size="xxs" variant="primary">Group</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button size="xs" variant="primary">Extra small</Button>
                <Button size="xs" variant="primary">Group</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button size="sm" variant="primary">Small</Button>
                <Button size="sm" variant="primary">Group</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button size="default" variant="primary">Default</Button>
                <Button size="default" variant="primary">Group</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button size="lg" variant="primary">Large</Button>
                <Button size="lg" variant="primary">Group</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button size="xl" variant="primary">Extra large</Button>
                <Button size="xl" variant="primary">Group</Button>
            </ButtonGroup>
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
        <div style={stackStyle}>
            <ButtonGroupSizesExample />
        </div>
    ),
};

export default preview;
