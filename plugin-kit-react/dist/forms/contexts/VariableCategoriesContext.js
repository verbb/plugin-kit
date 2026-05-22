import { createContext, useContext } from "react";
//#region src/forms/contexts/VariableCategoriesContext.tsx
var VariableCategoriesContext = createContext(null);
var VariableCategoriesProvider = VariableCategoriesContext.Provider;
var useVariableCategoriesContext = () => {
	const value = useContext(VariableCategoriesContext);
	if (value == null) return { getVariableCategories: null };
	return {
		getVariableCategories: value.getVariableCategories ?? null,
		variableCategoryLabels: value.variableCategoryLabels,
		variableCategoryOrder: value.variableCategoryOrder,
		variableTransformerRegistry: value.variableTransformerRegistry
	};
};
//#endregion
export { VariableCategoriesProvider, useVariableCategoriesContext };

//# sourceMappingURL=VariableCategoriesContext.js.map