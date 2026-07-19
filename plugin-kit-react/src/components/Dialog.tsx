import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkDialog } from '@verbb/plugin-kit-web/components/dialog/pk-dialog.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';
import { isHostEvent } from '../utils/isHostEvent.js';

const PkDialogElement = createPluginKitComponent({
    tagName: 'pk-dialog',
    elementClass: PkDialog,
    react: React,
    events: {
        onPkShow: 'pk-show',
        onPkAfterShow: 'pk-after-show',
        onPkHide: 'pk-hide',
        onPkAfterHide: 'pk-after-hide',
        onPkOpenChange: 'pk-open-change',
    },
});

type PkDialogElementProps = React.ComponentProps<typeof PkDialogElement>;

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

/** React facade over `<pk-dialog>`. Behavior and styles live in the web component. */
export const Dialog = React.forwardRef<PkDialog, PkDialogElementProps>(function Dialog(props, ref) {
    const {
        open,
        disablePointerDismissal,
        withoutHeader,
        withoutBodyPadding,
        onPkShow,
        onPkAfterShow,
        onPkHide,
        onPkAfterHide,
        onPkOpenChange,
        ...rest
    } = props;

    return (
        <PkDialogElement
            ref={ref}
            {...rest}
            // `open` must always forward false so controlled dialogs can close.
            open={open}
            {...trueBooleanProps(
                ['disablePointerDismissal', 'withoutHeader', 'withoutBodyPadding'],
                {
                    disablePointerDismissal,
                    withoutHeader,
                    withoutBodyPadding,
                },
            )}
            // Nested tooltip/popover/select also emit these — only the dialog host counts.
            {...(onPkShow ? { onPkShow: bindHostEvent(onPkShow) } : {})}
            {...(onPkAfterShow ? { onPkAfterShow: bindHostEvent(onPkAfterShow) } : {})}
            {...(onPkHide ? { onPkHide: bindHostEvent(onPkHide) } : {})}
            {...(onPkAfterHide ? { onPkAfterHide: bindHostEvent(onPkAfterHide) } : {})}
            {...(onPkOpenChange ? { onPkOpenChange: bindHostEvent(onPkOpenChange) } : {})}
        />
    );
});

Dialog.displayName = 'Dialog';

export { PkDialogElement };
export type DialogProps = PkDialogElementProps;
