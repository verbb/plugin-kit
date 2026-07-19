import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/popup.js';

/** Vue facade over `<pk-popup>`. Behavior and styles live in the web component. */
export const Popup = createPkComponent({
    name: 'PkPopup',
    tagName: 'pk-popup',
});

export const PkPopupElement = Popup;

export type PopupProps = Record<string, unknown>;
