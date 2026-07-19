//#region src/component-registry.ts
/**
* Canonical tag → loader module path mapping for the autoloader.
* Module paths are relative to the directory that contains plugin-kit.loader.js.
*/
var COMPONENT_MODULE_PATHS = {
	"pk-spinner": "components/spinner/spinner.js",
	"pk-icon": "components/icon/icon.js",
	"pk-button": "components/button/button.js",
	"pk-checkbox": "components/checkbox/checkbox.js",
	"pk-checkbox-select": "components/checkbox-select/checkbox-select.js",
	"pk-color-input": "components/color-input/color-input.js",
	"pk-code-editor": "components/code-editor/code-editor.js",
	"pk-input": "components/input/input.js",
	"pk-input-group": "components/input-group/input-group.js",
	"pk-input-group-addon": "components/input-group/input-group-addon.js",
	"pk-input-group-button": "components/input-group/input-group-button.js",
	"pk-input-group-input": "components/input-group/input-group-input.js",
	"pk-input-group-text": "components/input-group/input-group-text.js",
	"pk-input-group-textarea": "components/input-group/input-group-textarea.js",
	"pk-textarea": "components/textarea/textarea.js",
	"pk-tiptap-editor": "components/tiptap/tiptap-editor.js",
	"pk-tiptap-input": "components/tiptap/tiptap-input.js",
	"pk-tiptap-content": "components/tiptap/tiptap-content.js",
	"pk-field": "components/field/field.js",
	"pk-separator": "components/separator/separator.js",
	"pk-status": "components/status/status.js",
	"pk-toggle": "components/toggle/toggle.js",
	"pk-toggle-group": "components/toggle-group/toggle-group.js",
	"pk-lightswitch": "components/lightswitch/lightswitch.js",
	"pk-button-group": "components/button-group/button-group.js",
	"pk-button-group-separator": "components/button-group/button-group-separator.js",
	"pk-button-group-text": "components/button-group/button-group-text.js",
	"pk-dialog": "components/dialog/dialog.js",
	"pk-popup": "components/popup/popup.js",
	"pk-dropdown-label": "components/dropdown-menu/dropdown-label.js",
	"pk-dropdown-item": "components/dropdown-menu/dropdown-item.js",
	"pk-dropdown-separator": "components/dropdown-menu/dropdown-separator.js",
	"pk-dropdown-menu": "components/dropdown-menu/dropdown-menu.js",
	"pk-popover": "components/popover/popover.js",
	"pk-tooltip": "components/tooltip/tooltip.js",
	"pk-radio": "components/radio-group/radio.js",
	"pk-radio-group": "components/radio-group/radio-group.js",
	"pk-tab": "components/tabs/tab.js",
	"pk-tab-heading": "components/tabs/tab-heading.js",
	"pk-tab-panel": "components/tabs/tab-panel.js",
	"pk-tabs": "components/tabs/tabs.js",
	"pk-scroll-area": "components/scroll-area/scroll-area.js",
	"pk-option": "components/select/option.js",
	"pk-option-group": "components/select/option-group.js",
	"pk-select": "components/select/select.js",
	"pk-calendar": "components/calendar/calendar.js",
	"pk-date-picker": "components/date-picker/date-picker.js",
	"pk-combobox": "components/combobox/combobox.js",
	"pk-time-picker": "components/time-picker/time-picker.js",
	"pk-copy-button": "components/copy-button/copy-button.js",
	"pk-editable-table": "components/editable-table/editable-table.js"
};
/** Vite loader-build entries: output key → source module. */
var LOADER_COMPONENT_ENTRIES = {
	"components/spinner/spinner": "src/components/spinner/pk-spinner.ts",
	"components/icon/icon": "src/components/icon/pk-icon-loader.ts",
	"components/button/button": "src/components/button/pk-button.ts",
	"components/checkbox/checkbox": "src/components/checkbox/pk-checkbox.ts",
	"components/checkbox-select/checkbox-select": "src/components/checkbox-select/pk-checkbox-select.ts",
	"components/color-input/color-input": "src/components/color-input/pk-color-input.ts",
	"components/code-editor/code-editor": "src/components/code-editor/pk-code-editor.ts",
	"components/input/input": "src/components/input/pk-input.ts",
	"components/input-group/input-group": "src/components/input-group/pk-input-group.ts",
	"components/input-group/input-group-addon": "src/components/input-group/pk-input-group-addon.ts",
	"components/input-group/input-group-button": "src/components/input-group/pk-input-group-button.ts",
	"components/input-group/input-group-input": "src/components/input-group/pk-input-group-input.ts",
	"components/input-group/input-group-text": "src/components/input-group/pk-input-group-text.ts",
	"components/input-group/input-group-textarea": "src/components/input-group/pk-input-group-textarea.ts",
	"components/textarea/textarea": "src/components/textarea/pk-textarea.ts",
	"components/tiptap/tiptap-editor": "src/components/tiptap/pk-tiptap-editor.ts",
	"components/tiptap/tiptap-input": "src/components/tiptap/pk-tiptap-input.ts",
	"components/tiptap/tiptap-content": "src/components/tiptap/pk-tiptap-content.ts",
	"components/field/field": "src/components/field/pk-field.ts",
	"components/separator/separator": "src/components/separator/pk-separator.ts",
	"components/status/status": "src/components/status/pk-status.ts",
	"components/toggle/toggle": "src/components/toggle/pk-toggle.ts",
	"components/toggle-group/toggle-group": "src/components/toggle-group/pk-toggle-group.ts",
	"components/lightswitch/lightswitch": "src/components/lightswitch/pk-lightswitch.ts",
	"components/button-group/button-group": "src/components/button-group/pk-button-group.ts",
	"components/button-group/button-group-separator": "src/components/button-group/pk-button-group-separator.ts",
	"components/button-group/button-group-text": "src/components/button-group/pk-button-group-text.ts",
	"components/dialog/dialog": "src/components/dialog/pk-dialog.ts",
	"components/popup/popup": "src/components/popup/pk-popup.ts",
	"components/dropdown-menu/dropdown-label": "src/components/dropdown-menu/pk-dropdown-label.ts",
	"components/dropdown-menu/dropdown-item": "src/components/dropdown-menu/pk-dropdown-item.ts",
	"components/dropdown-menu/dropdown-separator": "src/components/dropdown-menu/pk-dropdown-separator.ts",
	"components/dropdown-menu/dropdown-menu": "src/components/dropdown-menu/pk-dropdown-menu.ts",
	"components/popover/popover": "src/components/popover/pk-popover.ts",
	"components/tooltip/tooltip": "src/components/tooltip/pk-tooltip.ts",
	"components/radio-group/radio": "src/components/radio-group/pk-radio.ts",
	"components/radio-group/radio-group": "src/components/radio-group/pk-radio-group.ts",
	"components/tabs/tab": "src/components/tabs/pk-tab.ts",
	"components/tabs/tab-heading": "src/components/tabs/pk-tab-heading.ts",
	"components/tabs/tab-panel": "src/components/tabs/pk-tab-panel.ts",
	"components/tabs/tabs": "src/components/tabs/pk-tabs.ts",
	"components/scroll-area/scroll-area": "src/components/scroll-area/pk-scroll-area.ts",
	"components/select/option": "src/components/select/pk-option.ts",
	"components/select/option-group": "src/components/select/pk-option-group.ts",
	"components/select/select": "src/components/select/pk-select.ts",
	"components/calendar/calendar": "src/components/calendar/pk-calendar.ts",
	"components/date-picker/date-picker": "src/components/date-picker/pk-date-picker.ts",
	"components/combobox/combobox": "src/components/combobox/pk-combobox.ts",
	"components/time-picker/time-picker": "src/components/time-picker/pk-time-picker.ts",
	"components/copy-button/copy-button": "src/components/copy-button/pk-copy-button.ts",
	"components/editable-table/editable-table": "src/components/editable-table/pk-editable-table.ts"
};
/** Loader-only shims → real element modules for the bundler dist graph. */
var BUNDLER_SRC_OVERRIDES = { "src/components/icon/pk-icon-loader.ts": "src/components/icon/pk-icon.ts" };
/**
* Vite `dist/` build entries for bundler cherry-picking.
* Output paths mirror source layout, e.g. `dist/components/button/pk-button.js`.
*/
var BUNDLER_COMPONENT_ENTRIES = Object.fromEntries(Object.values(LOADER_COMPONENT_ENTRIES).map((srcRel) => {
	const bundlerSrc = BUNDLER_SRC_OVERRIDES[srcRel] ?? srcRel;
	return [bundlerSrc.replace(/^src\//, "").replace(/\.ts$/, ""), bundlerSrc];
}));
/** Tag → bundler dist subpath (relative to package root, no `./` prefix). */
var BUNDLER_TAG_IMPORT_PATHS = Object.fromEntries(Object.keys(BUNDLER_COMPONENT_ENTRIES).map((key) => {
	return [key.split("/").pop(), `${key}.js`];
}));
//#endregion
export { COMPONENT_MODULE_PATHS as n, BUNDLER_TAG_IMPORT_PATHS as t };

//# sourceMappingURL=component-registry-CpZiIDh4.js.map