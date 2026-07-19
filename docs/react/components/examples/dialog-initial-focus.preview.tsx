import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button, Dialog, Field, Icon, Input } from '@verbb/plugin-kit-react/components';

export function DialogInitialFocusExample() {
    return (
        <Dialog>
            <Button slot="trigger">Edit field</Button>
            <div slot="header" className="pk-dialog__header">
                <h3 className="pk-dialog__title">Edit Field</h3>
                <Button variant="none" aria-label="Close" className="pk-dialog__close" data-dialog-close="">
                    <Icon slot="start" icon="xmark" />
                </Button>
            </div>
            <div className="pk-dialog__body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Field label="Label" instructions="The label that describes this field." required translatable>
                    <Input value="Test" autoFocus />
                </Field>
                <Field label="Placeholder" instructions="The text that will be shown if the field doesn’t have a value.">
                    <Input placeholder="Placeholder text" />
                </Field>
            </div>
            <Button slot="footer" data-dialog-close="">Cancel</Button>
            <Button slot="footer" variant="primary">Save</Button>
        </Dialog>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Initial Focus',
    title: 'Initial focus example',
    language: 'tsx',
    source: true,
    render: () => <DialogInitialFocusExample />,
};

export default preview;
