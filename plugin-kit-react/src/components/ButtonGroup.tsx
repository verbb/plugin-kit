import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkButtonGroup, type PkButtonGroupOrientation } from '@verbb/plugin-kit-web/components/button-group/pk-button-group.js';
import {
    PkButtonGroupSeparator,
    type PkButtonGroupSeparatorOrientation,
} from '@verbb/plugin-kit-web/components/button-group/pk-button-group-separator.js';
import { PkButtonGroupText } from '@verbb/plugin-kit-web/components/button-group/pk-button-group-text.js';

/** React facade over `<pk-button-group>`. Behavior and styles live in the web component. */
export const PkButtonGroupElement = createPluginKitComponent({
    tagName: 'pk-button-group',
    elementClass: PkButtonGroup,
    react: React,
});

export const PkButtonGroupSeparatorElement = createPluginKitComponent({
    tagName: 'pk-button-group-separator',
    elementClass: PkButtonGroupSeparator,
    react: React,
});

export const PkButtonGroupTextElement = createPluginKitComponent({
    tagName: 'pk-button-group-text',
    elementClass: PkButtonGroupText,
    react: React,
});

export const ButtonGroup = PkButtonGroupElement;
export const ButtonGroupSeparator = PkButtonGroupSeparatorElement;
export const ButtonGroupText = PkButtonGroupTextElement;

export type ButtonGroupProps = React.ComponentProps<typeof PkButtonGroupElement>;
export type ButtonGroupSeparatorProps = React.ComponentProps<typeof PkButtonGroupSeparatorElement>;
export type ButtonGroupTextProps = React.ComponentProps<typeof PkButtonGroupTextElement>;
export type { PkButtonGroupOrientation, PkButtonGroupSeparatorOrientation };
