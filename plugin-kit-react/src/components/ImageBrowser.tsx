import React, { forwardRef, useCallback } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import {
    PkImageBrowser,
    type PkImageBrowserGroup,
    type PkImageBrowserItem,
    type PkImageBrowserLabelMode,
    type PkImageBrowserMode,
    type PkImageBrowserSize,
    type PkImageBrowserWidth,
} from '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkImageBrowserElement = createPluginKitComponent({
    tagName: 'pk-image-browser',
    elementClass: PkImageBrowser,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onPkClear: 'pk-clear',
        onInput: 'input',
        onNativeChange: 'change',
        onPkShow: 'pk-show',
        onPkAfterShow: 'pk-after-show',
        onPkHide: 'pk-hide',
        onPkAfterHide: 'pk-after-hide',
    },
});

type PkImageBrowserElementProps = React.ComponentProps<typeof PkImageBrowserElement>;

export type ImageBrowserProps = Omit<PkImageBrowserElementProps, 'onChange'> & {
    /** React alias for the CE `invalid` boolean attribute. */
    isInvalid?: boolean;
    /** React/Formie alias for the Lit `readonly` property. */
    readOnly?: boolean;
    /** Controlled value callback — sugar over `onPkChange` detail. */
    onChange?: (value: string) => void;
};

/** React facade over `<pk-image-browser>`. Behavior and styles live in the web component. */
export const ImageBrowser = forwardRef<PkImageBrowser, ImageBrowserProps>(function ImageBrowser(
    {
        disabled,
        invalid,
        isInvalid,
        readonly,
        readOnly,
        withClear,
        open,
        onChange,
        onPkChange,
        ...rest
    },
    ref,
) {
    const resolvedInvalid = Boolean(invalid ?? isInvalid);
    const resolvedReadonly = Boolean(readonly ?? readOnly);

    const handlePkChange = useCallback(
        (event: Event) => {
            onPkChange?.(event as Parameters<NonNullable<PkImageBrowserElementProps['onPkChange']>>[0]);

            if (!onChange) {
                return;
            }

            const detail = (event as CustomEvent<{ value?: string }>).detail;
            if (detail && 'value' in detail) {
                onChange(detail.value ?? '');
            }
        },
        [onPkChange, onChange],
    );

    return (
        <PkImageBrowserElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(['disabled', 'invalid', 'readonly', 'open'], {
                disabled,
                invalid: resolvedInvalid,
                readonly: resolvedReadonly,
                open,
            })}
            {...(typeof withClear === 'boolean' ? { withClear } : {})}
            {...(onChange || onPkChange ? { onPkChange: handlePkChange } : {})}
        />
    );
});

ImageBrowser.displayName = 'ImageBrowser';

export { PkImageBrowserElement };
export type {
    PkImageBrowserGroup,
    PkImageBrowserItem,
    PkImageBrowserLabelMode,
    PkImageBrowserMode,
    PkImageBrowserSize,
    PkImageBrowserWidth,
};
