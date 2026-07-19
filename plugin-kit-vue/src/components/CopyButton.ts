import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/copy-button.js';

/** Vue facade over `<pk-copy-button>`. Behavior and styles live in the web component. */
export const CopyButton = createPkComponent({
    name: 'PkCopyButton',
    tagName: 'pk-copy-button',
});

export const PkCopyButtonElement = CopyButton;

export type CopyButtonProps = Record<string, unknown>;
