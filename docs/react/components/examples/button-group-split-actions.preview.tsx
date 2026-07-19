import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { rowStyle } from './exampleStyles';

// #region example
import { Button, ButtonGroup, Icon } from '@verbb/plugin-kit-react/components';

export function ButtonGroupSplitActionsExample() {
    return (
        <>
            <ButtonGroup>
                <Button variant="primary">Publish</Button>
                <Button variant="primary" groupTrigger aria-label="More publish actions" />
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="outline"><Icon slot="start" icon="download" /> Export</Button>
                <Button variant="outline" groupTrigger aria-label="More export actions" />
            </ButtonGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Split Actions',
    title: 'Split actions example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ButtonGroupSplitActionsExample />
        </div>
    ),
};

export default preview;
