import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/autocomplete.js';

/** Vue facade over `<pk-autocomplete>`. Behavior and styles live in the web component. */
export const Autocomplete = createPkComponent({
    name: 'PkAutocomplete',
    tagName: 'pk-autocomplete',
});

export const PkAutocompleteElement = Autocomplete;

export type AutocompleteProps = Record<string, unknown>;
