const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@verbb/plugin-kit-react/components';

export function DialogBasicExample() {
    return (
        <Dialog>
            <DialogTrigger render={<Button>Open dialog</Button>} />
            <DialogContent className="max-w-lg" showCloseButton>
                <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>Short description of the dialog content.</DialogDescription>
                </DialogHeader>
                <div className="p-4 text-sm text-gray-600">This is the dialog body area.</div>
                <DialogFooter className="gap-2">
                    <DialogClose render={<Button>Cancel</Button>} />
                    <Button variant="primary">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Dialog',
    title: 'Basic dialog example',
    language: 'tsx',
    source: true,
    render: () => <DialogBasicExample />,
};

export default preview;
`;export{e as default};
