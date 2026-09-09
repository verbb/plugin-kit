import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/autocomplete.js";
//#region src/components/Autocomplete.ts
/** Vue facade over `<pk-autocomplete>`. Behavior and styles live in the web component. */
var Autocomplete = createPkComponent({
	name: "PkAutocomplete",
	tagName: "pk-autocomplete"
});
var PkAutocompleteElement = Autocomplete;
//#endregion
export { Autocomplete, PkAutocompleteElement };

//# sourceMappingURL=Autocomplete.js.map