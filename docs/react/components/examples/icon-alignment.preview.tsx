// #region example
import { Button, Icon } from '@verbb/plugin-kit-react/components';

export function IconAlignmentExample() {
    return (
        <div data-pk-icon-align>
            <p data-pk-icon-align-line style={{ fontSize: 16, lineHeight: 1.5, margin: 0 }}>
                Inline with text
                {' '}
                <Icon icon="gear" />
                <Icon icon="plus" />
                <Icon icon="ellipsis-vertical" />
                <Icon icon="arrows-rotate" />
                {' '}
                — baseline nudge is <code>-0.125em</code>
            </p>

            <p data-pk-icon-align-line style={{ fontSize: 24, lineHeight: 1.5, margin: 0 }}>
                Larger type
                {' '}
                <Icon icon="gear" />
                <Icon icon="plus" />
                <Icon icon="ellipsis-vertical" />
                {' '}
                scales with <code>font-size</code>
            </p>

            <div data-pk-icon-align-grid aria-label="Square canvas comparison">
                <span data-pk-icon-align-cell>
                    <Icon icon="ellipsis-vertical" style={{ fontSize: 32 }} />
                    <code>ellipsis-vertical</code>
                    <small>128×512 → square</small>
                </span>
                <span data-pk-icon-align-cell>
                    <Icon icon="plus" style={{ fontSize: 32 }} />
                    <code>plus</code>
                    <small>448×512 → square</small>
                </span>
                <span data-pk-icon-align-cell>
                    <Icon icon="gear" style={{ fontSize: 32 }} />
                    <code>gear</code>
                    <small>512×512 square</small>
                </span>
                <span data-pk-icon-align-cell>
                    <Icon icon="link" style={{ fontSize: 32 }} />
                    <code>link</code>
                    <small>576×512 → square</small>
                </span>
            </div>

            <div data-pk-icon-align-row>
                <Button variant="outline">
                    <Icon slot="start" icon="plus" />
                    Flex slot (nudge off)
                </Button>
                <Button variant="outline" aria-label="More">
                    <Icon slot="start" icon="ellipsis-vertical" />
                </Button>
                <Button variant="outline" aria-label="Reload">
                    <Icon slot="start" icon="arrows-rotate" />
                </Button>
            </div>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Alignment',
    title: 'Alignment example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <IconAlignmentExample />
        </div>
    ),
};

export default preview;
