import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/status.js';

/** Vue facade over `<pk-status>`. Behavior and styles live in the web component. */
export const Status = createPkComponent({
    name: 'PkStatus',
    tagName: 'pk-status',
});

export const PkStatusElement = Status;

export type StatusProps = Record<string, unknown>;
