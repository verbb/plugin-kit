type ElementStoreState = {
    elementData: Record<string, unknown>;
    getElementData: <T = unknown>(fieldName: string) => T | undefined;
    setElementData: <T = unknown>(fieldName: string, data: T) => void;
    hasElementData: (fieldName: string) => boolean;
    clearElementData: () => void;
    clearFieldData: (fieldName: string) => void;
};
declare const useElementStoreV2: import('zustand').UseBoundStore<import('zustand').StoreApi<ElementStoreState>>;
export default useElementStoreV2;
//# sourceMappingURL=element-store.d.ts.map