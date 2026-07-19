import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button, ButtonGroup } from '@verbb/plugin-kit-react/components';

const captionStyle = { fontSize: 12, color: '#6b7280', margin: '0 0 8px' } as const;
const stackStyle = { display: 'flex', flexDirection: 'column', gap: 20 } as const;

export function ButtonGroupSeparatorsExample() {
    return (
        <div style={stackStyle}>
            <div>
                <div style={captionStyle}>On (default) — 1px divider between controls</div>
                <ButtonGroup>
                    <Button variant="primary">Save</Button>
                    <Button variant="primary">Save and continue</Button>
                </ButtonGroup>
            </div>
            <div>
                <div style={captionStyle}>
                    Off (<code>separators="false"</code>) — flush join
                </div>
                <ButtonGroup separators={false}>
                    <Button variant="primary">Save</Button>
                    <Button variant="primary">Save and continue</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Separators',
    title: 'Separators example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupSeparatorsExample />,
};

export default preview;
