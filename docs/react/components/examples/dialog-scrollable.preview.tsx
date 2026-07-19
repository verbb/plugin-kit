// #region example
import { Button, Dialog, Icon } from '@verbb/plugin-kit-react/components';

export function DialogScrollableExample() {
    return (
        <Dialog>
            <Button slot="trigger">Open long dialog</Button>
            <div slot="header" className="pk-dialog__header">
                <h3 className="pk-dialog__title">Review settings</h3>
                <p data-slot="dialog-description" style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: '#64748b' }}>
                    Long content constrained inside the body.
                </p>
                <Button variant="none" className="pk-dialog__close" aria-label="Close" data-dialog-close>
                    <Icon slot="start" icon="xmark" />
                </Button>
            </div>
            <div className="pk-dialog__body">
                {Array.from({ length: 10 }, (_, index) => (
                    <p key={index} style={{ margin: '0 0 12px' }}>
                        {`Setting group ${index + 1}: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.`}
                    </p>
                ))}
            </div>
            <Button slot="footer" data-dialog-close>Cancel</Button>
            <Button slot="footer" variant="primary">Save settings</Button>
        </Dialog>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Scrollable Content',
    title: 'Scrollable dialog content example',
    language: 'tsx',
    source: true,
    render: () => <DialogScrollableExample />,
};

export default preview;
