import React from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/tiptap/VariablePickerContext.tsx
var VariablePickerContext = React.createContext(null);
function VariablePickerProvider({ variableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry, renderVariableConfigureSection, resolveVariableTagLabel, children }) {
	const value = React.useMemo(() => {
		return {
			variableCategories: variableCategories ?? {},
			variableCategoryLabels,
			variableCategoryOrder,
			variableTransformerRegistry: variableTransformerRegistry ?? {},
			renderVariableConfigureSection,
			resolveVariableTagLabel
		};
	}, [
		variableCategories,
		variableCategoryLabels,
		variableCategoryOrder,
		variableTransformerRegistry,
		renderVariableConfigureSection,
		resolveVariableTagLabel
	]);
	return /* @__PURE__ */ jsx(VariablePickerContext.Provider, {
		value,
		children
	});
}
function useVariablePickerContext() {
	return React.useContext(VariablePickerContext);
}
//#endregion
export { VariablePickerProvider, useVariablePickerContext };

//# sourceMappingURL=VariablePickerContext.js.map