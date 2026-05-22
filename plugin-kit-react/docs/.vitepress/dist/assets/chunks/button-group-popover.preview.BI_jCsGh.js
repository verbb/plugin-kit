const o=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import {
    Button,
    ButtonGroup,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@verbb/plugin-kit-react/components';

export function ButtonGroupPopoverExample() {
    return (
        <ButtonGroup>
            <Button variant="outline">Filters</Button>
            <Popover>
                <PopoverTrigger
                    render={(
                        <Button variant="outline" aria-label="Open filters">
                            <FontAwesomeIcon icon={faChevronDown} className="size-3" />
                        </Button>
                    )}
                />
                <PopoverContent>
                    <PopoverHeader>
                        <PopoverTitle>Quick Filters</PopoverTitle>
                        <PopoverDescription>Refine visible rows before editing.</PopoverDescription>
                    </PopoverHeader>
                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                        <div>Show Active Forms</div>
                        <div>Show Forms With Submissions</div>
                        <div>Show Archived Forms</div>
                    </div>
                </PopoverContent>
            </Popover>
        </ButtonGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Popover',
    title: 'Popover example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupPopoverExample />,
};

export default preview;
`;export{o as default};
