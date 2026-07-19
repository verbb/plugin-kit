import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    ButtonGroup,
    Input,
} from '@verbb/plugin-kit-react/components';

export function ButtonGroupOtherControlsExample() {
    return (
        <ButtonGroup>
            <Input placeholder="Search" style={{ width: '12rem' }} />
            <Button variant="primary">Search</Button>
        </ButtonGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Other Controls',
    title: 'Other controls example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupOtherControlsExample />,
};

export default preview;
