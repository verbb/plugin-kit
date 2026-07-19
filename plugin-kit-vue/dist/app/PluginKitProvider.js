import { configure } from "./configure.js";
import { defineComponent, inject, provide } from "vue";
//#region src/app/PluginKitProvider.ts
var PluginKitConfigKey = Symbol("pluginKitConfig");
/**
* Applies Plugin Kit environment config for a Vue tree.
*
* Importing Vue components already registers their underlying custom elements —
* no `registerAll` / registration bootstrap. Pass `hostBridge` only when the tree
* calls Craft action/selector helpers.
*
* @example
* ```ts
* import { createApp, h } from 'vue';
* import { PluginKitProvider, Button } from '@verbb/plugin-kit-vue';
*
* createApp({
*   setup() {
*     return () => h(PluginKitProvider, { translationCategory: 'my-plugin' }, {
*       default: () => h(Button, null, () => 'Save'),
*     });
*   },
* }).mount(el);
* ```
*/
var PluginKitProvider = defineComponent({
	name: "PluginKitProvider",
	props: {
		translationCategory: {
			type: String,
			default: void 0
		},
		translate: {
			type: Function,
			default: void 0
		},
		hostBridge: {
			type: Object,
			default: void 0
		},
		portalClassName: {
			type: String,
			default: void 0
		},
		portalContainer: {
			type: Object,
			default: void 0
		},
		shadowRootSelectors: {
			type: Array,
			default: void 0
		}
	},
	setup(props, { slots }) {
		const config = {
			...props.translationCategory ? { translationCategory: props.translationCategory } : {},
			...props.translate ? { translate: props.translate } : {},
			...props.hostBridge ? { hostBridge: props.hostBridge } : {},
			...props.portalClassName ? { portalClassName: props.portalClassName } : {},
			...props.portalContainer !== void 0 ? { portalContainer: props.portalContainer } : {},
			...props.shadowRootSelectors ? { shadowRootSelectors: props.shadowRootSelectors } : {}
		};
		configure(config);
		provide(PluginKitConfigKey, config);
		return () => slots.default?.();
	}
});
/** Read the nearest {@link PluginKitProvider} config (empty object when absent). */
var usePluginKitConfig = () => {
	return inject(PluginKitConfigKey, {});
};
//#endregion
export { PluginKitProvider, usePluginKitConfig };

//# sourceMappingURL=PluginKitProvider.js.map