const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@verbb/plugin-kit-react/components';

export function DialogConfirmationExample() {
    return (
        <Dialog>
            <DialogTrigger render={<Button variant="primary">Delete entry</Button>} />
            <DialogContent className="max-w-lg" showCloseButton>
                <DialogHeader>
                    <DialogTitle>Delete this entry?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. The entry will be removed from the current site.
                    </DialogDescription>
                </DialogHeader>
                <div className="p-4 text-sm text-gray-600">
                    Use a confirmation dialog when the user needs a clear chance to back out before a destructive action.
                </div>
                <DialogFooter className="gap-2">
                    <DialogClose render={<Button>Cancel</Button>} />
                    <Button variant="primary">Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Confirmation',
    title: 'Destructive confirmation dialog example',
    language: 'tsx',
    source: true,
    render: () => <DialogConfirmationExample />,
};

export default preview;
`;export{e as default};
