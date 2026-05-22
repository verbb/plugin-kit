const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@verbb/plugin-kit-react/components';

export function PopoverBasicExample() {
    return (
        <Popover>
            <PopoverTrigger render={<Button>Open popover</Button>} />
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Popover title</PopoverTitle>
                    <PopoverDescription>Short description here.</PopoverDescription>
                </PopoverHeader>
                <div className="text-sm text-gray-600">Popover content goes here.</div>
            </PopoverContent>
        </Popover>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => <PopoverBasicExample />,
};

export default preview;
`;export{e as default};
