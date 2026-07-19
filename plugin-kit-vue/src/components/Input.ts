import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/input.js';

/** Vue facade over `<pk-input>`. Behavior and styles live in the web component. */
export const Input = createPkComponent({
    name: 'PkInput',
    tagName: 'pk-input',
});

export const PkInputElement = Input;

export type InputProps = Record<string, unknown>;
