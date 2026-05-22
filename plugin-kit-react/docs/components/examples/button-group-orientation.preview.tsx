import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button, ButtonGroup } from '@verbb/plugin-kit-react/components';

export function ButtonGroupOrientationExample() {
    return (
        <ButtonGroup orientation="vertical">
            <Button variant="outline">First</Button>
            <Button variant="outline">Second</Button>
            <Button variant="outline">Third</Button>
        </ButtonGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Orientation',
    title: 'Orientation example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupOrientationExample />,
};

export default preview;
