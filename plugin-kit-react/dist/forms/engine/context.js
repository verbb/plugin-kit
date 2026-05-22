import { createContext, useContext } from "react";
//#region src/forms/engine/context.ts
var SchemaEngineContext = createContext(null);
var useSchemaEngineContext = () => {
	const context = useContext(SchemaEngineContext);
	if (!context) throw new Error("useSchemaEngineContext must be used within a SchemaEngineProvider");
	return context;
};
//#endregion
export { SchemaEngineContext, useSchemaEngineContext };

//# sourceMappingURL=context.js.map