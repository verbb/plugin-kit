import { configure } from "./configure.js";
import { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/app/PluginKitProvider.tsx
var PluginKitConfigContext = createContext({});
/**
* Applies Plugin Kit environment config for a React tree.
*
* Importing React components already registers their underlying custom elements —
* no `registerAll` / registration bootstrap. Pass `hostBridge` only when the tree
* calls Craft action/selector helpers.
*
* @example
* ```tsx
* import { createRoot } from 'react-dom/client';
* import { PluginKitProvider, Button } from '@verbb/plugin-kit-react';
*
* createRoot(el).render(
*   <PluginKitProvider translationCategory="my-plugin">
*     <Button>Save</Button>
*   </PluginKitProvider>,
* );
* ```
*/
function PluginKitProvider({ children, ...config }) {
	configure(config);
	return /* @__PURE__ */ jsx(PluginKitConfigContext.Provider, {
		value: config,
		children
	});
}
/** Read the nearest {@link PluginKitProvider} config (empty object when absent). */
var usePluginKitConfig = () => {
	return useContext(PluginKitConfigContext);
};
//#endregion
export { PluginKitProvider, usePluginKitConfig };

//# sourceMappingURL=PluginKitProvider.js.map