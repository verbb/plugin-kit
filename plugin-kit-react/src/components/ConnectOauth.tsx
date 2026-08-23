import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkConnectOauth } from '@verbb/plugin-kit-web/components/connect/pk-connect-oauth.js';

/** React facade over `<pk-connect-oauth>`. Behavior and styles live in the web component. */
export const PkConnectOauthElement = createPluginKitComponent({
    tagName: 'pk-connect-oauth',
    elementClass: PkConnectOauth,
    react: React,
});

export const ConnectOauth = PkConnectOauthElement;
export type ConnectOauthProps = React.ComponentProps<typeof PkConnectOauthElement>;
