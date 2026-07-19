import React, { forwardRef } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkInputGroup } from '@verbb/plugin-kit-web/components/input-group/pk-input-group.js';
import {
    PkInputGroupAddon,
    type PkInputGroupAddonAlign,
} from '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js';
import {
    PkInputGroupButton,
    type PkInputGroupButtonSize,
} from '@verbb/plugin-kit-web/components/input-group/pk-input-group-button.js';
import {
    PkInputGroupInput,
    type PkInputGroupInputSize,
} from '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js';
import { PkInputGroupText } from '@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js';
import { PkInputGroupTextarea } from '@verbb/plugin-kit-web/components/input-group/pk-input-group-textarea.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

/** React facades over the `<pk-input-group>` family. Behavior and styles live in the web components. */
export const PkInputGroupElement = createPluginKitComponent({
    tagName: 'pk-input-group',
    elementClass: PkInputGroup,
    react: React,
});

export const PkInputGroupAddonElement = createPluginKitComponent({
    tagName: 'pk-input-group-addon',
    elementClass: PkInputGroupAddon,
    react: React,
});

export const PkInputGroupButtonElement = createPluginKitComponent({
    tagName: 'pk-input-group-button',
    elementClass: PkInputGroupButton,
    react: React,
});

export const PkInputGroupInputElement = createPluginKitComponent({
    tagName: 'pk-input-group-input',
    elementClass: PkInputGroupInput,
    react: React,
    events: {
        // React `onChange` is live (every keystroke); native `change` is blur-commit.
        onInput: 'input',
        onChange: 'input',
    },
});

export const PkInputGroupTextElement = createPluginKitComponent({
    tagName: 'pk-input-group-text',
    elementClass: PkInputGroupText,
    react: React,
});

export const PkInputGroupTextareaElement = createPluginKitComponent({
    tagName: 'pk-input-group-textarea',
    elementClass: PkInputGroupTextarea,
    react: React,
    events: {
        // React `onChange` is live (every keystroke); native `change` is blur-commit.
        onInput: 'input',
        onChange: 'input',
    },
});

export const InputGroup = PkInputGroupElement;
export const InputGroupAddon = PkInputGroupAddonElement;
export const InputGroupButton = PkInputGroupButtonElement;

type PkInputGroupInputElementProps = React.ComponentProps<typeof PkInputGroupInputElement>;

export const InputGroupInput = forwardRef<PkInputGroupInput, PkInputGroupInputElementProps>(
    function InputGroupInput(props, ref) {
        const {
            disabled, readonly, invalid, ...rest
        } = props;

        return (
            <PkInputGroupInputElement
                ref={ref}
                {...rest}
                {...trueBooleanProps(['disabled', 'readonly', 'invalid'], { disabled, readonly, invalid })}
            />
        );
    },
);

InputGroupInput.displayName = 'InputGroupInput';

export const InputGroupText = PkInputGroupTextElement;

type PkInputGroupTextareaElementProps = React.ComponentProps<typeof PkInputGroupTextareaElement>;

export const InputGroupTextarea = forwardRef<PkInputGroupTextarea, PkInputGroupTextareaElementProps>(
    function InputGroupTextarea(props, ref) {
        const {
            disabled, readonly, invalid, ...rest
        } = props;

        return (
            <PkInputGroupTextareaElement
                ref={ref}
                {...rest}
                {...trueBooleanProps(['disabled', 'readonly', 'invalid'], { disabled, readonly, invalid })}
            />
        );
    },
);

InputGroupTextarea.displayName = 'InputGroupTextarea';

export type InputGroupProps = React.ComponentProps<typeof PkInputGroupElement>;
export type InputGroupAddonProps = React.ComponentProps<typeof PkInputGroupAddonElement>;
export type InputGroupButtonProps = React.ComponentProps<typeof PkInputGroupButtonElement>;
export type InputGroupInputProps = React.ComponentProps<typeof PkInputGroupInputElement>;
export type InputGroupTextProps = React.ComponentProps<typeof PkInputGroupTextElement>;
export type InputGroupTextareaProps = React.ComponentProps<typeof PkInputGroupTextareaElement>;
export type { PkInputGroupAddonAlign, PkInputGroupButtonSize, PkInputGroupInputSize };
