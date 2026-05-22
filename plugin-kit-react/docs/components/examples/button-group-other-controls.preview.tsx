import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';
import {
    Button,
    ButtonGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@verbb/plugin-kit-react/components';

export function ButtonGroupOtherControlsExample() {
    return (
        <div className="flex flex-col gap-4">
            <ButtonGroup>
                <Input className="w-72" placeholder="Search forms..." />
                <Button variant="outline">
                    <FontAwesomeIcon icon={faSearch} className="size-3" />
                    Search
                </Button>
            </ButtonGroup>

            <ButtonGroup>
                <Select defaultValue="draft">
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="review">In Review</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">Apply</Button>
            </ButtonGroup>

            <ButtonGroup>
                <InputGroup className="w-80">
                    <InputGroupAddon align="inline-start">
                        <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="example.com/contact" />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="none">Go</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
                <Button variant="outline">Validate</Button>
            </ButtonGroup>
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Other Controls',
    title: 'Other controls example',
    language: 'tsx',
    source: true,
    render: () => <ButtonGroupOtherControlsExample />,
};

export default preview;
