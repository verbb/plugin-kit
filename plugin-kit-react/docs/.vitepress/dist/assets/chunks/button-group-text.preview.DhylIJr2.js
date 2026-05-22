const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEye, faPen } from '@fortawesome/pro-solid-svg-icons';
import { Button, ButtonGroup } from '@verbb/plugin-kit-react/components';

export function ButtonGroupRegularButtonsExample() {
    return (
        <ButtonGroup>
            <Button>Actions</Button>
            <Button><FontAwesomeIcon icon={faPen} className="size-3" /> Edit</Button>
            <Button><FontAwesomeIcon icon={faEye} className="size-3" /> Preview</Button>
            <Button aria-label="More actions"><FontAwesomeIcon icon={faChevronDown} className="size-3" /></Button>
        </ButtonGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Text',
    title: 'Text example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupRegularButtonsExample />,
};

export default preview;
`;export{e as default};
