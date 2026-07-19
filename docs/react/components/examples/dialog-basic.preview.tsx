// #region example
import { Button, Dialog, Icon } from '@verbb/plugin-kit-react/components';

export function DialogBasicExample() {
    return (
        <Dialog>
            <Button slot="trigger">Open dialog</Button>
            <div slot="header" className="pk-dialog__header">
                <h3 className="pk-dialog__title">Dialog title</h3>
                <p data-slot="dialog-description" style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: '#64748b' }}>
                    Short description of the dialog content.
                </p>
                <Button variant="none" className="pk-dialog__close" aria-label="Close" data-dialog-close>
                    <Icon slot="start" icon="xmark" />
                </Button>
            </div>
            <div className="pk-dialog__body">This is the dialog body area.</div>
            <Button slot="footer" data-dialog-close>Cancel</Button>
            <Button slot="footer" variant="primary">Save</Button>
        </Dialog>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Dialog',
    title: 'Basic dialog example',
    language: 'tsx',
    source: true,
    render: () => <DialogBasicExample />,
};

export default preview;
