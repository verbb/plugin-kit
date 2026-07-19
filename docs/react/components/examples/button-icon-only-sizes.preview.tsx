import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button, Icon } from '@verbb/plugin-kit-react/components';

export function ButtonIconOnlySizesExample() {
    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <Button size="xxs" aria-label="View">
                    <Icon slot="start" icon="eye" />
                </Button>
                <Button size="xs" aria-label="View">
                    <Icon slot="start" icon="eye" />
                </Button>
                <Button size="sm" aria-label="View">
                    <Icon slot="start" icon="eye" />
                </Button>
                <Button aria-label="View">
                    <Icon slot="start" icon="eye" />
                </Button>
                <Button size="lg" aria-label="View">
                    <Icon slot="start" icon="eye" />
                </Button>
                <Button size="xl" aria-label="View">
                    <Icon slot="start" icon="eye" />
                </Button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <Button variant="none" size="sm" icon aria-label="Remove">
                    <Icon slot="start" icon="xmark" />
                </Button>
                <Button variant="none" icon aria-label="More">
                    <Icon slot="start" icon="ellipsis" />
                </Button>
            </div>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Icon-Only Sizes',
    title: 'Icon-only button size examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ButtonIconOnlySizesExample />
        </div>
    ),
};

export default preview;
