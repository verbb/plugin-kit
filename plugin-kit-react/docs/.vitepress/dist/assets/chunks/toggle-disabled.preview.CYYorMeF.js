const e=`import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold } from '@fortawesome/pro-solid-svg-icons';
import { Toggle } from '@verbb/plugin-kit-react/components';

export function ToggleDisabledExample() {
    return (
        <Toggle disabled>
            <FontAwesomeIcon icon={faBold} />
            Disabled
        </Toggle>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Disabled',
    title: 'Disabled example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ToggleDisabledExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
