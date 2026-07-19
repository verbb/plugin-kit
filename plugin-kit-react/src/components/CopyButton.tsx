import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkCopyButton } from '@verbb/plugin-kit-web/components/copy-button/pk-copy-button.js';

/** React facade over `<pk-copy-button>`. Behavior and styles live in the web component. */
export const PkCopyButtonElement = createPluginKitComponent({
    tagName: 'pk-copy-button',
    elementClass: PkCopyButton,
    react: React,
    events: {
        onPkCopy: 'pk-copy',
        onPkCopyError: 'pk-copy-error',
    },
});

export const CopyButton = PkCopyButtonElement;
export type CopyButtonProps = React.ComponentProps<typeof PkCopyButtonElement>;
