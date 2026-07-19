import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkScrollArea, type PkScrollAreaOrientation, type PkScrollAreaSize } from '@verbb/plugin-kit-web/components/scroll-area/pk-scroll-area.js';

/** React facade over `<pk-scroll-area>`. Behavior and styles live in the web component. */
export const PkScrollAreaElement = createPluginKitComponent({
    tagName: 'pk-scroll-area',
    elementClass: PkScrollArea,
    react: React,
    events: {
        onPkScroll: 'pk-scroll',
    },
});

export const ScrollArea = PkScrollAreaElement;
export type ScrollAreaProps = React.ComponentProps<typeof PkScrollAreaElement>;
export type { PkScrollAreaOrientation, PkScrollAreaSize };
