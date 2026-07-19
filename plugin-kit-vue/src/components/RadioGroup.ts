import { createPkComponentFamily } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/radio-group.js';

/** Vue facades over the `<pk-radio-group>` family. Behavior and styles live in the web components. */
const family = createPkComponentFamily({
    RadioGroup: 'pk-radio-group',
    Radio: 'pk-radio',
});

export const RadioGroup = family.RadioGroup;
export const PkRadioGroupElement = RadioGroup;
export const Radio = family.Radio;
export const PkRadioElement = Radio;

export type RadioGroupProps = Record<string, unknown>;
export type RadioProps = Record<string, unknown>;
