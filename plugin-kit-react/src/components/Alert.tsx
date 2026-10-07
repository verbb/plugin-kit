import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkAlert } from '@verbb/plugin-kit-web/components/alert/pk-alert.js';

/** React facade over `<pk-alert>`. Behaviour and styles live in the web component. */
export const PkAlertElement = createPluginKitComponent({
    tagName: 'pk-alert',
    elementClass: PkAlert,
    react: React,
    events: {
        onPkDismiss: 'pk-dismiss',
        onPkCopy: 'pk-copy',
        onPkCopyError: 'pk-copy-error',
    },
});

export const Alert = PkAlertElement;
export type AlertProps = React.ComponentProps<typeof PkAlertElement>;
