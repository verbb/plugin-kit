import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/dialog.js';

/** Vue facade over `<pk-dialog>`. Behavior and styles live in the web component. */
export const Dialog = createPkComponent({
    name: 'PkDialog',
    tagName: 'pk-dialog',
});

export const PkDialogElement = Dialog;

export type DialogProps = Record<string, unknown>;
