import { createPkComponentFamily } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/select.js';

/** Vue facades over the `<pk-select>` family. Behavior and styles live in the web components. */
const family = createPkComponentFamily({
    Select: 'pk-select',
    Option: 'pk-option',
    OptionGroup: 'pk-option-group',
});

export const Select = family.Select;
export const PkSelectElement = Select;
export const Option = family.Option;
export const PkOptionElement = Option;
export const OptionGroup = family.OptionGroup;
export const PkOptionGroupElement = OptionGroup;

export type SelectProps = Record<string, unknown>;
export type OptionProps = Record<string, unknown>;
export type OptionGroupProps = Record<string, unknown>;
