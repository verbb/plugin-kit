const e=`import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/pro-solid-svg-icons';
import { Toggle } from '@verbb/plugin-kit-react/components';

export function ToggleSizesExample() {
    return (
        <>
            <Toggle size="sm">
                <FontAwesomeIcon icon={faBold} />
                Bold
            </Toggle>
            <Toggle>
                <FontAwesomeIcon icon={faItalic} />
                Italic
            </Toggle>
            <Toggle size="lg">
                <FontAwesomeIcon icon={faUnderline} />
                Underline
            </Toggle>
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
        <div style={rowStyle}>
            <ToggleSizesExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
