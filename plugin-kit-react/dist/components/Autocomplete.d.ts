import { default as React } from 'react';
import { PkAutocomplete, PkAutocompleteAsyncOption, PkAutocompleteFetchHandler, PkAutocompleteFilter, PkAutocompleteSize } from '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';
declare const PkAutocompleteElement: import('@lit/react').ReactWebComponent<PkAutocomplete, {
    onPkChange: string;
    onPkClear: string;
    onInput: string;
    onNativeChange: string;
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
    onPkOpenChange: string;
}>;
type PkAutocompleteElementProps = React.ComponentProps<typeof PkAutocompleteElement>;
export type AutocompleteProps = Omit<PkAutocompleteElementProps, 'onChange'> & {
    /** React alias for the CE `invalid` boolean attribute. */
    isInvalid?: boolean;
    /** Controlled value callback — sugar over `onPkChange` detail. */
    onChange?: (value: string) => void;
};
/** React facade over `<pk-autocomplete>`. Behavior and styles live in the web component. */
export declare const Autocomplete: React.ForwardRefExoticComponent<Omit<AutocompleteProps, "ref"> & React.RefAttributes<PkAutocomplete>>;
export { PkAutocompleteElement };
export type { PkAutocompleteAsyncOption, PkAutocompleteFetchHandler, PkAutocompleteFilter, PkAutocompleteSize, };
//# sourceMappingURL=Autocomplete.d.ts.map