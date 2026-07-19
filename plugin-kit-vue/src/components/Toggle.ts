import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/toggle.js';

/** Vue facade over `<pk-toggle>`. Behavior and styles live in the web component. */
export const Toggle = createPkComponent({
    name: 'PkToggle',
    tagName: 'pk-toggle',
});

export const PkToggleElement = Toggle;

export type ToggleProps = Record<string, unknown>;
