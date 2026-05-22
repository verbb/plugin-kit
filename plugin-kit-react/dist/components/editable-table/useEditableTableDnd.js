import { useCallback, useEffect, useState } from "react";
import { isSortable } from "@dnd-kit/react/sortable";
//#region src/components/editable-table/useEditableTableDnd.ts
var useEditableTableDnd = ({ allowReorder, internalData, handleChange }) => {
	const [isDragging, setIsDragging] = useState(false);
	const [isDndHydrated, setIsDndHydrated] = useState(false);
	useEffect(() => {
		if (!allowReorder) {
			setIsDndHydrated(false);
			return;
		}
		let idleId = null;
		let timeoutId = null;
		const enableDnd = () => {
			setIsDndHydrated(true);
		};
		if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(enableDnd, { timeout: 1200 });
		else timeoutId = setTimeout(enableDnd, 250);
		return () => {
			if (idleId !== null && typeof window !== "undefined" && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
			if (timeoutId !== null) clearTimeout(timeoutId);
		};
	}, [allowReorder]);
	return {
		isDragging,
		isDndHydrated,
		effectiveAllowReorder: allowReorder,
		handleDragStart: useCallback(() => {
			setIsDragging(true);
		}, []),
		handleDragEnd: useCallback((event) => {
			setIsDragging(false);
			if (!allowReorder) return;
			if (event.canceled) return;
			const { source } = event.operation ?? {};
			if (!isSortable(source)) return;
			if (!("initialIndex" in source) || typeof source.initialIndex !== "number") return;
			const { initialIndex, index } = source;
			if (initialIndex === index) return;
			if (initialIndex < 0 || index < 0 || initialIndex >= internalData.length || index >= internalData.length) return;
			const nextRows = [...internalData];
			const [movedRow] = nextRows.splice(initialIndex, 1);
			nextRows.splice(index, 0, movedRow);
			handleChange(nextRows);
		}, [
			allowReorder,
			handleChange,
			internalData
		])
	};
};
//#endregion
export { useEditableTableDnd };

//# sourceMappingURL=useEditableTableDnd.js.map