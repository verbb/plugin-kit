import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEye, faPen } from '@fortawesome/pro-solid-svg-icons';
import { Button, ButtonGroup, ButtonGroupSeparator } from '@verbb/plugin-kit-react/components';

export function ButtonGroupSeparatorsExample() {
    return (
        <ButtonGroup>
            <Button>Actions</Button>
            <ButtonGroupSeparator />
            <Button><FontAwesomeIcon icon={faPen} className="size-3" /> Edit</Button>
            <ButtonGroupSeparator />
            <Button><FontAwesomeIcon icon={faEye} className="size-3" /> Preview</Button>
            <ButtonGroupSeparator />
            <Button aria-label="More actions"><FontAwesomeIcon icon={faChevronDown} className="size-3" /></Button>
        </ButtonGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Separators',
    title: 'Separators example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupSeparatorsExample />,
};

export default preview;
