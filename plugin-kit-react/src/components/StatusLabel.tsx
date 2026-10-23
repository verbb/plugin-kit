import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkStatusLabel } from '@verbb/plugin-kit-web/components/status-label/pk-status-label.js';

/** React facade over `<pk-status-label>`. Behavior and styles live in the web component. */
export const PkStatusLabelElement = createPluginKitComponent({
    tagName: 'pk-status-label',
    elementClass: PkStatusLabel,
    react: React,
});

export const StatusLabel = PkStatusLabelElement;
export type StatusLabelProps = React.ComponentProps<
    typeof PkStatusLabelElement
>;
