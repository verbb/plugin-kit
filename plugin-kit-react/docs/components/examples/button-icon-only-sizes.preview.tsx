import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@verbb/plugin-kit-react/components';

export function ButtonIconOnlySizesExample() {
    return (
        <>
            <Button size="xxs" aria-label="View">
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button size="xs" aria-label="View">
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button size="sm" aria-label="View">
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button aria-label="View">
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button size="lg" aria-label="View">
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Button size="xl" aria-label="View">
                <FontAwesomeIcon icon={faEye} />
            </Button>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Icon-Only Sizes',
    title: 'Icon-only button size examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ButtonIconOnlySizesExample />
        </div>
    ),
};

export default preview;
