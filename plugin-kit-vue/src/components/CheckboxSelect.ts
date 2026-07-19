import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/checkbox-select.js';

/** Vue facade over `<pk-checkbox-select>`. Behavior and styles live in the web component. */
export const CheckboxSelect = createPkComponent({
    name: 'PkCheckboxSelect',
    tagName: 'pk-checkbox-select',
});

export const PkCheckboxSelectElement = CheckboxSelect;

export type CheckboxSelectProps = Record<string, unknown>;
