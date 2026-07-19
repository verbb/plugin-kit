import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { stackStyle } from './exampleStyles';

// #region example
import { Button, ButtonGroup } from '@verbb/plugin-kit-react/components';

export function ButtonGroupSizesExample() {
    return (
        <>
            <ButtonGroup size="sm">
                <Button variant="primary">Small</Button>
                <Button variant="primary">Group</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="primary">Default</Button>
                <Button variant="primary">Group</Button>
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
