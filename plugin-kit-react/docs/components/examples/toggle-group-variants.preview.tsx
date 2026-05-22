import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const previewStackStyle = Object.assign({}, stackStyle, { maxWidth: 'none', gap: '16px' });

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/pro-solid-svg-icons';
import { ToggleGroup, ToggleGroupItem } from '@verbb/plugin-kit-react/components';

export function ToggleGroupVariantsExample() {
    return (
        <>
            <ToggleGroup variant="default" spacing={0}>
                <ToggleGroupItem value="bold">
                    <FontAwesomeIcon icon={faBold} />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                    <FontAwesomeIcon icon={faItalic} />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                    <FontAwesomeIcon icon={faUnderline} />
                </ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup variant="outline" spacing={0}>
                <ToggleGroupItem value="outline-bold">
                    <FontAwesomeIcon icon={faBold} />
                </ToggleGroupItem>
                <ToggleGroupItem value="outline-italic">
                    <FontAwesomeIcon icon={faItalic} />
                </ToggleGroupItem>
                <ToggleGroupItem value="outline-underline">
                    <FontAwesomeIcon icon={faUnderline} />
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'Variants example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={previewStackStyle}>
            <ToggleGroupVariantsExample />
        </div>
    ),
};

export default preview;
