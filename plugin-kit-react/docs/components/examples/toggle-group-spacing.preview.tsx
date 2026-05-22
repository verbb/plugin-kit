import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/pro-solid-svg-icons';
import { ToggleGroup, ToggleGroupItem } from '@verbb/plugin-kit-react/components';

export function ToggleGroupSpacingExample() {
    return (
        <ToggleGroup variant="outline" orientation="horizontal" spacing={2}>
            <ToggleGroupItem value="left">
                <FontAwesomeIcon icon={faAlignLeft} />
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
                <FontAwesomeIcon icon={faAlignCenter} />
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
                <FontAwesomeIcon icon={faAlignRight} />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Spacing',
    title: 'Spacing example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ToggleGroupSpacingExample />
        </div>
    ),
};

export default preview;
