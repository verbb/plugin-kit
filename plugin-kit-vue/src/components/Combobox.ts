import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/combobox.js';

/** Vue facade over `<pk-combobox>`. Behavior and styles live in the web component. */
export const Combobox = createPkComponent({
    name: 'PkCombobox',
    tagName: 'pk-combobox',
});

export const PkComboboxElement = Combobox;

export type ComboboxProps = Record<string, unknown>;
