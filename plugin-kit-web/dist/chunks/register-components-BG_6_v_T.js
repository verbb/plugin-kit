//#region src/create-register-components.ts
/**
* Tiny helper for building a local async registrar from an explicit loader map.
* Prefer short family side-effect imports for Craft CP bundles:
* `import '@verbb/plugin-kit-web/components/button.js'`.
*/
function createRegisterComponents(loaders) {
	return async (tags) => {
		await Promise.all(tags.map((tag) => loaders[tag]()));
	};
}
//#endregion
export { createRegisterComponents as t };

//# sourceMappingURL=register-components-BG_6_v_T.js.map