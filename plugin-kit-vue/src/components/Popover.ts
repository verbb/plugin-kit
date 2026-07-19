import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/popover.js';

/** Vue facade over `<pk-popover>`. Behavior and styles live in the web component. */
export const Popover = createPkComponent({
    name: 'PkPopover',
    tagName: 'pk-popover',
});

export const PkPopoverElement = Popover;

export type PopoverProps = Record<string, unknown>;
