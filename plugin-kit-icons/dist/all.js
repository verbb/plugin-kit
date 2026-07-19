import { icons } from "./icons.js";
import { normalizeIconName, registerIcons } from "./registry.js";
//#region src/all.ts
/**
* Side-effect entry: register every curated icon for `<pk-icon icon="…">` lookup.
*
* Prefer named imports + {@link registerIcons} in production CP bundles. Use this
* for docs, playgrounds, the no-build loader, and `registerAll()` workshops.
*
* ```ts
* import '@verbb/plugin-kit-icons/all.js';
* ```
*/
var entries = {};
for (const [name, icon] of Object.entries(icons)) entries[normalizeIconName(name)] = icon;
registerIcons(entries);
//#endregion

//# sourceMappingURL=all.js.map