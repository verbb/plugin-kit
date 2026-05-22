import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { Button, ButtonGroup } from '@verbb/plugin-kit-react/components';

const buttonGroupSizes = ['xs', 'sm', 'default', 'lg'] as const;

export function ButtonGroupSizesExample() {
    return (
        <div className="flex flex-wrap items-center gap-4">
            {buttonGroupSizes.map((size) => (
                <ButtonGroup key={size}>
                    <Button size={size} variant="outline">Edit</Button>
                    <Button size={size} variant="outline">Preview</Button>
                    <Button size={size} variant="outline" aria-label={`More ${size} actions`}>
                        <FontAwesomeIcon icon={faChevronDown} className="size-3" />
                    </Button>
                </ButtonGroup>
            ))}
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupSizesExample />,
};

export default preview;
