import { createPkComponentFamily } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/button-group.js';

/** Vue facades over the `<pk-button-group>` family. Behavior and styles live in the web components. */
const family = createPkComponentFamily({
    ButtonGroup: 'pk-button-group',
    ButtonGroupSeparator: 'pk-button-group-separator',
    ButtonGroupText: 'pk-button-group-text',
});

export const ButtonGroup = family.ButtonGroup;
export const ButtonGroupSeparator = family.ButtonGroupSeparator;
export const ButtonGroupText = family.ButtonGroupText;

export const PkButtonGroupElement = ButtonGroup;
export const PkButtonGroupSeparatorElement = ButtonGroupSeparator;
export const PkButtonGroupTextElement = ButtonGroupText;

export type ButtonGroupProps = Record<string, unknown>;
export type ButtonGroupSeparatorProps = Record<string, unknown>;
export type ButtonGroupTextProps = Record<string, unknown>;
