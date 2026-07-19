import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkSeparator, type PkSeparatorOrientation } from '@verbb/plugin-kit-web/components/separator/pk-separator.js';

/** React facade over `<pk-separator>`. Behavior and styles live in the web component. */
export const PkSeparatorElement = createPluginKitComponent({
    tagName: 'pk-separator',
    elementClass: PkSeparator,
    react: React,
});

export const Separator = PkSeparatorElement;
export type SeparatorProps = React.ComponentProps<typeof PkSeparatorElement>;
export type { PkSeparatorOrientation };
