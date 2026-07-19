import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkPopover } from '@verbb/plugin-kit-web/components/popover/pk-popover.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';
import { isHostEvent } from '../utils/isHostEvent.js';

const PkPopoverElement = createPluginKitComponent({
    tagName: 'pk-popover',
    elementClass: PkPopover,
    react: React,
    events: {
        onPkShow: 'pk-show',
        onPkAfterShow: 'pk-after-show',
        onPkHide: 'pk-hide',
        onPkAfterHide: 'pk-after-hide',
        onPkOpenChange: 'pk-open-change',
    },
});

type PkPopoverElementProps = React.ComponentProps<typeof PkPopoverElement>;

const bindHostEvent = <T extends (event: Event) => void>(handler: T | undefined) => {
    if (!handler) {
        return undefined;
    }

    return (event: Event) => {
        if (!isHostEvent(event)) {
            return;
        }
        handler(event);
    };
};

/**
 * React facade over `<pk-popover>`. Behavior and styles live in the web component.
 * Nested select/tooltip/popover `pk-open-change` is ignored — same as `Dialog`.
 */
export const Popover = React.forwardRef<PkPopover, PkPopoverElementProps>(function Popover(props, ref) {
    const {
        open,
        flush,
        withArrow,
        onPkShow,
        onPkAfterShow,
        onPkHide,
        onPkAfterHide,
        onPkOpenChange,
        ...rest
    } = props;

    return (
        <PkPopoverElement
            ref={ref}
            {...rest}
            {...(open !== undefined ? { open } : {})}
            {...trueBooleanProps(['flush', 'withArrow'] as const, {
                flush,
                withArrow,
            })}
            {...(onPkShow ? { onPkShow: bindHostEvent(onPkShow) } : {})}
            {...(onPkAfterShow ? { onPkAfterShow: bindHostEvent(onPkAfterShow) } : {})}
            {...(onPkHide ? { onPkHide: bindHostEvent(onPkHide) } : {})}
            {...(onPkAfterHide ? { onPkAfterHide: bindHostEvent(onPkAfterHide) } : {})}
            {...(onPkOpenChange ? { onPkOpenChange: bindHostEvent(onPkOpenChange) } : {})}
        />
    );
});

Popover.displayName = 'Popover';

export { PkPopoverElement };
export type PopoverProps = PkPopoverElementProps;
