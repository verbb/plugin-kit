const n=`import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEye } from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@verbb/plugin-kit-react/components';

export function ButtonIconsExample() {
    return (
        <>
            <Button><FontAwesomeIcon icon={faEye} /> Prepend</Button>
            <Button>Append <FontAwesomeIcon icon={faEye} /></Button>
            <Button><FontAwesomeIcon icon={faAdd} /> Both <FontAwesomeIcon icon={faEye} /></Button>
            <Button><FontAwesomeIcon icon={faEye} /></Button>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Icons',
    title: 'Icons example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ButtonIconsExample />
        </div>
    ),
};

export default preview;
`;export{n as default};
