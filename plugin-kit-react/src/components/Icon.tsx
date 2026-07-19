import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkIcon } from '@verbb/plugin-kit-web/components/icon/pk-icon.js';

/** React facade over `<pk-icon>`. Behavior and styles live in the web component. */
export const PkIconElement = createPluginKitComponent({
    tagName: 'pk-icon',
    elementClass: PkIcon,
    react: React,
});

export const Icon = PkIconElement;
export type IconProps = React.ComponentProps<typeof PkIconElement>;
