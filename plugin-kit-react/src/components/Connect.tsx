import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkConnect } from '@verbb/plugin-kit-web/components/connect/pk-connect.js';

/** React facade over `<pk-connect>`. Behavior and styles live in the web component. */
export const PkConnectElement = createPluginKitComponent({
    tagName: 'pk-connect',
    elementClass: PkConnect,
    react: React,
    events: {
        onPkStatusChange: 'pk-status-change',
    },
});

export const Connect = PkConnectElement;
export type ConnectProps = React.ComponentProps<typeof PkConnectElement>;
