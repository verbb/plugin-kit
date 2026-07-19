import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/separator.js';

/** Vue facade over `<pk-separator>`. Behavior and styles live in the web component. */
export const Separator = createPkComponent({
    name: 'PkSeparator',
    tagName: 'pk-separator',
});

export const PkSeparatorElement = Separator;

export type SeparatorProps = Record<string, unknown>;
