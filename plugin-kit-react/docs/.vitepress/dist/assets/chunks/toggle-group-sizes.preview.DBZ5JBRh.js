const e=`import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const previewStackStyle = Object.assign({}, stackStyle, { maxWidth: 'none', gap: '16px' });

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/pro-solid-svg-icons';
import { ToggleGroup, ToggleGroupItem } from '@verbb/plugin-kit-react/components';

export function ToggleGroupSizesExample() {
    return (
        <>
            <ToggleGroup size="sm" spacing={0}>
                <ToggleGroupItem value="sm-bold">
                    <FontAwesomeIcon icon={faBold} />
                </ToggleGroupItem>
                <ToggleGroupItem value="sm-italic">
                    <FontAwesomeIcon icon={faItalic} />
                </ToggleGroupItem>
                <ToggleGroupItem value="sm-underline">
                    <FontAwesomeIcon icon={faUnderline} />
                </ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup spacing={0}>
                <ToggleGroupItem value="md-bold">
                    <FontAwesomeIcon icon={faBold} />
                </ToggleGroupItem>
                <ToggleGroupItem value="md-italic">
                    <FontAwesomeIcon icon={faItalic} />
                </ToggleGroupItem>
                <ToggleGroupItem value="md-underline">
                    <FontAwesomeIcon icon={faUnderline} />
                </ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup size="lg" spacing={0}>
                <ToggleGroupItem value="lg-bold">
                    <FontAwesomeIcon icon={faBold} />
                </ToggleGroupItem>
                <ToggleGroupItem value="lg-italic">
                    <FontAwesomeIcon icon={faItalic} />
                </ToggleGroupItem>
                <ToggleGroupItem value="lg-underline">
                    <FontAwesomeIcon icon={faUnderline} />
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={previewStackStyle}>
            <ToggleGroupSizesExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
