import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/icon.js';

/** Vue facade over `<pk-icon>`. Behavior and styles live in the web component. */
export const Icon = createPkComponent({
    name: 'PkIcon',
    tagName: 'pk-icon',
});

export const PkIconElement = Icon;

export type IconProps = Record<string, unknown>;
