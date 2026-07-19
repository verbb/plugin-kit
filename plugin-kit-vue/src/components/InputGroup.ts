import { createPkComponentFamily } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/input-group.js';

/** Vue facades over the `<pk-input-group>` family. Behavior and styles live in the web components. */
const family = createPkComponentFamily({
    InputGroup: 'pk-input-group',
    InputGroupAddon: 'pk-input-group-addon',
    InputGroupButton: 'pk-input-group-button',
    InputGroupInput: 'pk-input-group-input',
    InputGroupText: 'pk-input-group-text',
    InputGroupTextarea: 'pk-input-group-textarea',
});

export const InputGroup = family.InputGroup;
export const PkInputGroupElement = InputGroup;
export const InputGroupAddon = family.InputGroupAddon;
export const PkInputGroupAddonElement = InputGroupAddon;
export const InputGroupButton = family.InputGroupButton;
export const PkInputGroupButtonElement = InputGroupButton;
export const InputGroupInput = family.InputGroupInput;
export const PkInputGroupInputElement = InputGroupInput;
export const InputGroupText = family.InputGroupText;
export const PkInputGroupTextElement = InputGroupText;
export const InputGroupTextarea = family.InputGroupTextarea;
export const PkInputGroupTextareaElement = InputGroupTextarea;

export type InputGroupProps = Record<string, unknown>;
export type InputGroupAddonProps = Record<string, unknown>;
export type InputGroupButtonProps = Record<string, unknown>;
export type InputGroupInputProps = Record<string, unknown>;
export type InputGroupTextProps = Record<string, unknown>;
export type InputGroupTextareaProps = Record<string, unknown>;
