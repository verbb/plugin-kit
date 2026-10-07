import { L as icons } from "../../chunks/svg-D9hLZeTK.js";
import { n as normalizeIconName, r as registerIcons } from "../../chunks/registry-2zstYg5R.js";
import "../../chunks/pk-icon-B3R2o74n.js";
//#region ../../../../Users/joshcrawford/verbb/plugin-kit/plugin-kit/plugin-kit-icons/dist/all.js
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
