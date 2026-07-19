import { A as icons } from "../../chunks/icons-B1i-oRoD.js";
import { n as normalizeIconName, r as registerIcons } from "../../chunks/registry-CmL0rH9r.js";
//#region ../plugin-kit-icons/dist/all.js
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
