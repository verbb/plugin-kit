const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const wrapStyle = { display: 'flex' as const, flexWrap: 'wrap' as const, alignItems: 'flex-start' as const, gap: '32px' };

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/pro-solid-svg-icons';
import { ToggleGroup, ToggleGroupItem } from '@verbb/plugin-kit-react/components';

export function ToggleGroupOrientationExample() {
    return (
        <>
            <ToggleGroup variant="outline" orientation="horizontal" spacing={0}>
                <ToggleGroupItem value="h-left">
                    <FontAwesomeIcon icon={faAlignLeft} />
                </ToggleGroupItem>
                <ToggleGroupItem value="h-center">
                    <FontAwesomeIcon icon={faAlignCenter} />
                </ToggleGroupItem>
                <ToggleGroupItem value="h-right">
                    <FontAwesomeIcon icon={faAlignRight} />
                </ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup variant="outline" orientation="vertical" spacing={0}>
                <ToggleGroupItem value="v-left">
                    <FontAwesomeIcon icon={faAlignLeft} />
                </ToggleGroupItem>
                <ToggleGroupItem value="v-center">
                    <FontAwesomeIcon icon={faAlignCenter} />
                </ToggleGroupItem>
                <ToggleGroupItem value="v-right">
                    <FontAwesomeIcon icon={faAlignRight} />
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Orientation',
    title: 'Orientation example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={wrapStyle}>
            <ToggleGroupOrientationExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
