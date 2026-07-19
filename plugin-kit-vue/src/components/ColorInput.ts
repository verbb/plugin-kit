import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/color-input.js';

/** Vue facade over `<pk-color-input>`. Behavior and styles live in the web component. */
export const ColorInput = createPkComponent({
    name: 'PkColorInput',
    tagName: 'pk-color-input',
});

export const PkColorInputElement = ColorInput;

export type ColorInputProps = Record<string, unknown>;
