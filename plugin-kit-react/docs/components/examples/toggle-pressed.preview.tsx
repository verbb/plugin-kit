import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faItalic } from '@fortawesome/pro-solid-svg-icons';
import { Toggle } from '@verbb/plugin-kit-react/components';

export function TogglePressedExample() {
    return (
        <Toggle pressed>
            <FontAwesomeIcon icon={faItalic} />
            Pressed
        </Toggle>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Pressed',
    title: 'Pressed example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <TogglePressedExample />
        </div>
    ),
};

export default preview;
