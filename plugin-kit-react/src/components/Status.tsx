import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkStatus, type PkStatusVariant } from '@verbb/plugin-kit-web/components/status/pk-status.js';

/** React facade over `<pk-status>`. Behavior and styles live in the web component. */
export const PkStatusElement = createPluginKitComponent({
    tagName: 'pk-status',
    elementClass: PkStatus,
    react: React,
});

export const Status = PkStatusElement;
export type StatusProps = React.ComponentProps<typeof PkStatusElement>;
export type { PkStatusVariant };
