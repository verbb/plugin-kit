import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button, ButtonGroup, Icon } from '@verbb/plugin-kit-react/components';

export function ButtonGroupBasicExample() {
    return (
        <ButtonGroup>
            <Button variant="primary"><Icon slot="start" icon="pen-to-square" /> Edit</Button>
            <Button variant="primary"><Icon slot="start" icon="eye" /> Preview</Button>
            <Button variant="primary" groupTrigger aria-label="More actions" />
        </ButtonGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Example',
    title: 'Basic example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupBasicExample />,
};

export default preview;
