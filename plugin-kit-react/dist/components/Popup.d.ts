import { default as React } from 'react';
import { PkPopup, PkPopupPlacement, PkPopupVirtualElement } from '@verbb/plugin-kit-web/components/popup/pk-popup.js';
/** React facade over `<pk-popup>` (low-level positioning primitive). Behavior lives in the web component. */
export declare const PkPopupElement: import('@lit/react').ReactWebComponent<PkPopup, {
    onPkReposition: string;
    onPkPopupContentSync: string;
}>;
export declare const Popup: import('@lit/react').ReactWebComponent<PkPopup, {
    onPkReposition: string;
    onPkPopupContentSync: string;
}>;
export type PopupProps = React.ComponentProps<typeof PkPopupElement>;
export type { PkPopupPlacement, PkPopupVirtualElement };
//# sourceMappingURL=Popup.d.ts.map