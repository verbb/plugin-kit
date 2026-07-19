// #region example
import { Button, Dialog, Icon } from '@verbb/plugin-kit-react/components';

export function DialogConfirmationExample() {
    return (
        <Dialog disablePointerDismissal>
            <Button slot="trigger" variant="primary">Delete entry</Button>
            <div slot="header" className="pk-dialog__header">
                <h3 className="pk-dialog__title">Delete this entry?</h3>
                <p data-slot="dialog-description" style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: '#64748b' }}>
                    This action cannot be undone. The entry will be removed from the current site.
                </p>
                <Button variant="none" className="pk-dialog__close" aria-label="Close" data-dialog-close>
                    <Icon slot="start" icon="xmark" />
                </Button>
            </div>
            <div className="pk-dialog__body">Confirmation dialog body.</div>
            <Button slot="footer" data-dialog-close>Cancel</Button>
            <Button slot="footer" variant="primary">Delete</Button>
        </Dialog>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Confirmation',
    title: 'Destructive confirmation dialog example',
    language: 'tsx',
    source: true,
    render: () => <DialogConfirmationExample />,
};

export default preview;
