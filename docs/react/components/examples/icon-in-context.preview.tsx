// #region example
import { Button, Icon } from '@verbb/plugin-kit-react/components';

export function IconInContextExample() {
    return (
        <>
            <Button variant="dashed">
                <Icon slot="start" icon="plus" />
                Add a link
            </Button>
            <Button aria-label="Settings">
                <Icon slot="start" icon="gear" />
            </Button>
        </>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'In Context',
    title: 'In context example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <IconInContextExample />
        </div>
    ),
};

export default preview;
