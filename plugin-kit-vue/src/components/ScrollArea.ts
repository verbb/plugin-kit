import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/scroll-area.js';

/** Vue facade over `<pk-scroll-area>`. Behavior and styles live in the web component. */
export const ScrollArea = createPkComponent({
    name: 'PkScrollArea',
    tagName: 'pk-scroll-area',
});

export const PkScrollAreaElement = ScrollArea;

export type ScrollAreaProps = Record<string, unknown>;
