const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@verbb/plugin-kit-react/components';

export function PopoverFormExample() {
    return (
        <Popover>
            <PopoverTrigger render={<Button>Edit shortcut</Button>} />
            <PopoverContent className="w-80">
                <PopoverHeader>
                    <PopoverTitle>Quick edit</PopoverTitle>
                    <PopoverDescription>Use popovers for compact, contextual edits.</PopoverDescription>
                </PopoverHeader>
                <div className="mt-3 space-y-3">
                    <Input defaultValue="Primary action" />
                    <div className="flex justify-end gap-2">
                        <Button>Cancel</Button>
                        <Button variant="primary">Save</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Form Content',
    title: 'Popover form content example',
    language: 'tsx',
    source: true,
    render: () => <PopoverFormExample />,
};

export default preview;
`;export{e as default};
