import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/toggle-group.js';

/** Vue facade over `<pk-toggle-group>`. Behavior and styles live in the web component. */
export const ToggleGroup = createPkComponent({
    name: 'PkToggleGroup',
    tagName: 'pk-toggle-group',
});

export const PkToggleGroupElement = ToggleGroup;

export type ToggleGroupProps = Record<string, unknown>;
