import { useEffect } from "react";
//#region src/hooks/useKeyboardShortcuts.ts
var useKeyboardShortcuts = ({ onSave, onCut, onCopy, onPaste, onUndo, onRedo, onSelectAll, onEscape, onEnter, onDelete } = {}) => {
	useEffect(() => {
		const isInputElement = (element) => {
			if (!element) return false;
			const tagName = element.tagName?.toLowerCase();
			const isInput = tagName === "input" || tagName === "textarea";
			const isContentEditable = element.contentEditable === "true";
			return isInput || isContentEditable;
		};
		const handleKeyDown = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === "s") {
				event.preventDefault();
				if (onSave) onSave();
			}
			if ((event.metaKey || event.ctrlKey) && event.key === "x") {
				if (onCut) onCut();
			}
			if ((event.metaKey || event.ctrlKey) && event.key === "c") {
				if (onCopy) onCopy();
			}
			if ((event.metaKey || event.ctrlKey) && event.key === "v") {
				if (onPaste) onPaste();
			}
			if ((event.metaKey || event.ctrlKey) && event.key === "z" && !event.shiftKey) {
				event.preventDefault();
				if (onUndo) onUndo();
			}
			if ((event.metaKey && event.shiftKey || event.ctrlKey) && (event.key === "z" || event.key === "y")) {
				event.preventDefault();
				if (onRedo) onRedo();
			}
			if ((event.metaKey || event.ctrlKey) && event.key === "a") {
				if (onSelectAll) onSelectAll();
			}
			if (event.key === "Escape") {
				if (onEscape) onEscape();
			}
			if (event.key === "Enter" && !isInputElement(event.target)) {
				if (onEnter) onEnter();
			}
			if (event.key === "Delete" && !isInputElement(event.target)) {
				if (onDelete) onDelete();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [
		onSave,
		onCut,
		onCopy,
		onPaste,
		onUndo,
		onRedo,
		onSelectAll,
		onEscape,
		onEnter,
		onDelete
	]);
};
//#endregion
export { useKeyboardShortcuts };

//# sourceMappingURL=useKeyboardShortcuts.js.map