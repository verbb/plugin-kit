const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEye, faPen } from '@fortawesome/pro-solid-svg-icons';
import { Button, ButtonGroup } from '@verbb/plugin-kit-react/components';

export function ButtonGroupBasicExample() {
    return (
        <ButtonGroup>
            <Button variant="primary"><FontAwesomeIcon icon={faPen} className="size-3" /> Edit</Button>
            <Button variant="primary"><FontAwesomeIcon icon={faEye} className="size-3" /> Preview</Button>
            <Button variant="primary" aria-label="More actions"><FontAwesomeIcon icon={faChevronDown} className="size-3" /></Button>
        </ButtonGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Example',
    title: 'Basic example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupBasicExample />,
};

export default preview;
`;export{e as default};
