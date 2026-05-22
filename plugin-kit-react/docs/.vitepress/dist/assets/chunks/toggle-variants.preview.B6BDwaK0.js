const e=`import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic } from '@fortawesome/pro-solid-svg-icons';
import { Toggle } from '@verbb/plugin-kit-react/components';

export function ToggleVariantsExample() {
    return (
        <>
            <Toggle variant="default">
                <FontAwesomeIcon icon={faBold} />
                Bold
            </Toggle>
            <Toggle variant="outline">
                <FontAwesomeIcon icon={faItalic} />
                Italic
            </Toggle>
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
        <div style={rowStyle}>
            <ToggleVariantsExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
