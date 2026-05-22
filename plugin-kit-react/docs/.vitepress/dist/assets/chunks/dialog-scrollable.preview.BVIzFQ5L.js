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

export function DialogScrollableExample() {
    return (
        <Dialog>
            <DialogTrigger render={<Button>Open long dialog</Button>} />
            <DialogContent className="max-h-[80vh] max-w-lg" showCloseButton>
                <DialogHeader>
                    <DialogTitle>Review settings</DialogTitle>
                    <DialogDescription>
                        Keep long dialog content constrained so the header and footer remain usable.
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-72 overflow-y-auto p-4 text-sm text-gray-600">
                    {Array.from({ length: 10 }, (_, index) => (
                        <p key={index} className="mb-3 last:mb-0">
                            Setting group {index + 1}: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.
                        </p>
                    ))}
                </div>
                <DialogFooter className="gap-2">
                    <DialogClose render={<Button>Cancel</Button>} />
                    <Button variant="primary">Save settings</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Scrollable Content',
    title: 'Scrollable dialog content example',
    language: 'tsx',
    source: true,
    render: () => <DialogScrollableExample />,
};

export default preview;
`;export{e as default};
