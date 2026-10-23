import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/status-label.js';

/** Vue facade over `<pk-status-label>`. Behavior and styles live in the web component. */
export const StatusLabel = createPkComponent({
    name: 'PkStatusLabel',
    tagName: 'pk-status-label',
});

export const PkStatusLabelElement = StatusLabel;

export type StatusLabelProps = {
    status?: import('@verbb/plugin-kit-web/components/status/pk-status.js').PkStatusVariant;
} & Record<string, unknown>;
