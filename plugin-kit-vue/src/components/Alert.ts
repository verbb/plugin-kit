import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/alert.js';

/** Vue facade over `<pk-alert>`. Behaviour and styles live in the web component. */
export const Alert = createPkComponent({
    name: 'PkAlert',
    tagName: 'pk-alert',
});

export const PkAlertElement = Alert;

export type AlertProps = Record<string, unknown>;
