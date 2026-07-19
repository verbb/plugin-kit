import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkToggle, type PkToggleSize, type PkToggleVariant } from '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';

/** React facade over `<pk-toggle>`. Behavior and styles live in the web component. */
export const PkToggleElement = createPluginKitComponent({
    tagName: 'pk-toggle',
    elementClass: PkToggle,
    react: React,
    events: {
        onPkPressedChange: 'pk-pressed-change',
        onChange: 'change',
    },
});

export const Toggle = PkToggleElement;
export type ToggleProps = React.ComponentProps<typeof PkToggleElement>;
export type { PkToggleSize, PkToggleVariant };
