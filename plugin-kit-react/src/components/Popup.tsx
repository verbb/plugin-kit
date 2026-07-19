import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkPopup, type PkPopupPlacement, type PkPopupVirtualElement } from '@verbb/plugin-kit-web/components/popup/pk-popup.js';

/** React facade over `<pk-popup>` (low-level positioning primitive). Behavior lives in the web component. */
export const PkPopupElement = createPluginKitComponent({
    tagName: 'pk-popup',
    elementClass: PkPopup,
    react: React,
    events: {
        onPkReposition: 'pk-reposition',
        onPkPopupContentSync: 'pk-popup-content-sync',
    },
});

export const Popup = PkPopupElement;
export type PopupProps = React.ComponentProps<typeof PkPopupElement>;
export type { PkPopupPlacement, PkPopupVirtualElement };
