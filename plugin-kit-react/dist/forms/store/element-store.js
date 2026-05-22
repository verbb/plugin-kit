import { create } from "zustand";
//#region src/forms/store/element-store.ts
var useElementStoreV2 = create((set, get) => {
	return {
		elementData: {},
		getElementData: (fieldName) => {
			return get().elementData[fieldName];
		},
		setElementData: (fieldName, data) => {
			set((state) => {
				return {
					...state,
					elementData: {
						...state.elementData,
						[fieldName]: data
					}
				};
			});
		},
		hasElementData: (fieldName) => {
			return fieldName in get().elementData;
		},
		clearElementData: () => {
			set({ elementData: {} });
		},
		clearFieldData: (fieldName) => {
			set((state) => {
				const newElementData = { ...state.elementData };
				delete newElementData[fieldName];
				return {
					...state,
					elementData: newElementData
				};
			});
		}
	};
});
//#endregion
export { useElementStoreV2 as default };

//# sourceMappingURL=element-store.js.map