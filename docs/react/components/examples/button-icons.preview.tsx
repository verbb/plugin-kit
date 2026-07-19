import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button, Icon } from '@verbb/plugin-kit-react/components';

export function ButtonIconsExample() {
    return (
        <>
            <Button>
                <Icon slot="start" icon="eye" />
                Prepend
            </Button>
            <Button>
                Append
                <Icon slot="end" icon="eye" />
            </Button>
            <Button>
                <Icon slot="start" icon="plus" />
                Both
                <Icon slot="end" icon="eye" />
            </Button>
            <Button aria-label="View">
                <Icon slot="start" icon="eye" />
            </Button>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Icons',
    title: 'Icons example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ButtonIconsExample />
        </div>
    ),
};

export default preview;
