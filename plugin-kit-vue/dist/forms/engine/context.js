import { inject, provide } from "vue";
//#region src/forms/engine/context.ts
var SchemaEngineContextKey = Symbol("SchemaEngineContext");
var provideSchemaEngineContext = (form) => {
	provide(SchemaEngineContextKey, form);
};
var useSchemaEngineContext = () => {
	const context = inject(SchemaEngineContextKey, null);
	if (!context) throw new Error("useSchemaEngineContext must be used within a SchemaEngineProvider");
	return context;
};
//#endregion
export { SchemaEngineContextKey, provideSchemaEngineContext, useSchemaEngineContext };

//# sourceMappingURL=context.js.map