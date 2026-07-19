import { default as React } from 'react';
import { PkCopyButton } from '@verbb/plugin-kit-web/components/copy-button/pk-copy-button.js';
/** React facade over `<pk-copy-button>`. Behavior and styles live in the web component. */
export declare const PkCopyButtonElement: import('@lit/react').ReactWebComponent<PkCopyButton, {
    onPkCopy: string;
    onPkCopyError: string;
}>;
export declare const CopyButton: import('@lit/react').ReactWebComponent<PkCopyButton, {
    onPkCopy: string;
    onPkCopyError: string;
}>;
export type CopyButtonProps = React.ComponentProps<typeof PkCopyButtonElement>;
//# sourceMappingURL=CopyButton.d.ts.map