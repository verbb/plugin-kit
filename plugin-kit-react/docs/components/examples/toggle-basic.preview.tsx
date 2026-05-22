import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold } from '@fortawesome/pro-solid-svg-icons';
import { Toggle } from '@verbb/plugin-kit-react/components';

export function ToggleBasicExample() {
    return (
        <Toggle>
            <FontAwesomeIcon icon={faBold} />
            Bold
        </Toggle>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ToggleBasicExample />
        </div>
    ),
};

export default preview;
