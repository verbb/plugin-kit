import { create } from 'zustand';

type ElementStoreState = {
    elementData: Record<string, unknown>;
    getElementData: <T = unknown>(fieldName: string) => T | undefined;
    setElementData: <T = unknown>(fieldName: string, data: T) => void;
    hasElementData: (fieldName: string) => boolean;
    clearElementData: () => void;
    clearFieldData: (fieldName: string) => void;
};

const useElementStoreV2 = create<ElementStoreState>((set, get) => {
    return {
        elementData: {},

        getElementData: <T = unknown>(fieldName: string) => {
            const state = get();
            return state.elementData[fieldName] as T | undefined;
        },

        setElementData: <T = unknown>(fieldName: string, data: T) => {
            set((state) => {
                return {
                    ...state,
                    elementData: {
                        ...state.elementData,
                        [fieldName]: data,
                    },
                };
            });
        },

        hasElementData: (fieldName: string) => {
            const state = get();
            return fieldName in state.elementData;
        },

        clearElementData: () => {
            set({ elementData: {} });
        },

        clearFieldData: (fieldName: string) => {
            set((state) => {
                const newElementData = { ...state.elementData };
                delete newElementData[fieldName];

                return {
                    ...state,
                    elementData: newElementData,
                };
            });
        },
    };
});

export default useElementStoreV2;
