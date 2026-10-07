import { default as React } from 'react';
import { PkAlert } from '@verbb/plugin-kit-web/components/alert/pk-alert.js';
/** React facade over `<pk-alert>`. Behaviour and styles live in the web component. */
export declare const PkAlertElement: import('@lit/react').ReactWebComponent<PkAlert, {
    onPkDismiss: string;
    onPkCopy: string;
    onPkCopyError: string;
}>;
export declare const Alert: import('@lit/react').ReactWebComponent<PkAlert, {
    onPkDismiss: string;
    onPkCopy: string;
    onPkCopyError: string;
}>;
export type AlertProps = React.ComponentProps<typeof PkAlertElement>;
//# sourceMappingURL=Alert.d.ts.map