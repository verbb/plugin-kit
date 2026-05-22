import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';
import { rowStyle } from './exampleStyles';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDownload } from '@fortawesome/pro-solid-svg-icons';
import { Button, ButtonGroup, ButtonGroupSeparator } from '@verbb/plugin-kit-react/components';

export function ButtonGroupSplitActionsExample() {
    return (
        <>
            <ButtonGroup>
                <Button>Save changes</Button>
                <ButtonGroupSeparator />
                <Button aria-label="Open save options">
                    <FontAwesomeIcon icon={faChevronDown} className="size-3" />
                </Button>
            </ButtonGroup>

            <ButtonGroup>
                <Button variant="outline">
                    <FontAwesomeIcon icon={faDownload} className="size-3" />
                    Export
                </Button>
                <ButtonGroupSeparator />
                <Button variant="outline" aria-label="Open export options">
                    <FontAwesomeIcon icon={faChevronDown} className="size-3" />
                </Button>
            </ButtonGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Split Actions',
    title: 'Split actions example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ButtonGroupSplitActionsExample />
        </div>
    ),
};

export default preview;
