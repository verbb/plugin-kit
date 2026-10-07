import React from 'react';
import { PkStatePanel } from '@verbb/plugin-kit-web/components/state-panel/pk-state-panel.js';

import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';

/** React facade over `<pk-state-panel>`. Behaviour and styles live in the web component. */
export const PkStatePanelElement = createPluginKitComponent({
    tagName: 'pk-state-panel',
    elementClass: PkStatePanel,
    react: React,
    events: {
        onPkCopy: 'pk-copy',
        onPkCopyError: 'pk-copy-error',
    },
});

export const StatePanel = PkStatePanelElement;
export type StatePanelProps = React.ComponentProps<typeof PkStatePanelElement>;
