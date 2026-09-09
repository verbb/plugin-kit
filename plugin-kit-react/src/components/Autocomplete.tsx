import React, { forwardRef, useCallback } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import {
    PkAutocomplete,
    type PkAutocompleteAsyncOption,
    type PkAutocompleteFetchHandler,
    type PkAutocompleteFilter,
    type PkAutocompleteSize,
} from '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkAutocompleteElement = createPluginKitComponent({
    tagName: 'pk-autocomplete',
    elementClass: PkAutocomplete,
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
        onPkOpenChange: 'pk-open-change',
    },
});

type PkAutocompleteElementProps = React.ComponentProps<typeof PkAutocompleteElement>;

export type AutocompleteProps = Omit<PkAutocompleteElementProps, 'onChange'> & {
    /** React alias for the CE `invalid` boolean attribute. */
    isInvalid?: boolean;
    /** Controlled value callback — sugar over `onPkChange` detail. */
    onChange?: (value: string) => void;
};

/** React facade over `<pk-autocomplete>`. Behavior and styles live in the web component. */
export const Autocomplete = forwardRef<PkAutocomplete, AutocompleteProps>(function Autocomplete(
    {
        disabled,
        invalid,
        isInvalid,
        clearable,
        open,
        async: asyncMode,
        autoHighlight,
        withClear,
        onChange,
        onPkChange,
        ...rest
    },
    ref,
) {
    const resolvedInvalid = Boolean(invalid ?? isInvalid);

    const handlePkChange = useCallback(
        (event: Event) => {
            onPkChange?.(event as Parameters<NonNullable<PkAutocompleteElementProps['onPkChange']>>[0]);

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
        <PkAutocompleteElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(
                ['disabled', 'invalid', 'clearable', 'open', 'async', 'autoHighlight', 'withClear'],
                {
                    disabled,
                    invalid: resolvedInvalid,
                    clearable,
                    open,
                    async: asyncMode,
                    autoHighlight,
                    withClear,
                },
            )}
            {...(onChange || onPkChange ? { onPkChange: handlePkChange } : {})}
        />
    );
});

Autocomplete.displayName = 'Autocomplete';

export { PkAutocompleteElement };
export type {
    PkAutocompleteAsyncOption,
    PkAutocompleteFetchHandler,
    PkAutocompleteFilter,
    PkAutocompleteSize,
};
