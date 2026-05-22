import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { buildVariableTagAttrs, replaceTokenWithVariable } from "./variableSerialization.js";
import { getVariableCategoryEntries, matchesVariableQuery, toTopLevelGroups } from "./variablePickerUtils.js";
import { useCallback, useEffect, useMemo, useState } from "react";
//#region src/components/tiptap/useInlineVariablePicker.ts
/** Keep cursor placeholders from blocking inline variable trigger matching. */
var INLINE_TRIGGER_REGEX = /(?:^|[\s\u200B\u2060])@([A-Za-z0-9:_-]*)$/;
function getFilteredVariables(t, variableCategories, variableCategoryLabels, variableCategoryOrder, query, activeParent) {
	const groupedTopLevelOptions = toTopLevelGroups(getVariableCategoryEntries(variableCategories, variableCategoryLabels, variableCategoryOrder), t);
	const q = query.trim().toLowerCase();
	if (activeParent?.children?.length) {
		const { children } = activeParent;
		if (!q) return {
			groups: [],
			options: children.slice(0, 50),
			isChildMode: true
		};
		return {
			groups: [],
			options: children.filter((item) => {
				return matchesVariableQuery(item, q);
			}).slice(0, 50),
			isChildMode: true
		};
	}
	if (!q) return {
		groups: groupedTopLevelOptions,
		options: groupedTopLevelOptions.flatMap((g) => {
			return g.items;
		}).slice(0, 100),
		isChildMode: false
	};
	const filteredGroups = groupedTopLevelOptions.map((group) => {
		return {
			...group,
			items: group.items.filter((item) => {
				if (matchesVariableQuery(item, q)) return true;
				return (Array.isArray(item.children) ? item.children : []).some((c) => {
					return matchesVariableQuery(c, q);
				});
			})
		};
	}).filter((g) => {
		return g.items.length > 0;
	});
	const options = [];
	for (const group of filteredGroups) {
		for (let ii = 0; ii < group.items.length; ii++) {
			const item = group.items[ii];
			const hasChildren = Array.isArray(item.children) && item.children.length > 0;
			const parentMatches = matchesVariableQuery(item, q);
			if (!hasChildren || parentMatches) options.push(item);
			if (hasChildren) {
				for (const child of item.children) if (matchesVariableQuery(child, q)) options.push(child);
			}
			if (options.length >= 100) break;
		}
		if (options.length >= 100) break;
	}
	return {
		groups: filteredGroups,
		options,
		isChildMode: false
	};
}
function useInlineVariablePicker(editor, options) {
	const { variableCategories, variableCategoryLabels, variableCategoryOrder, variablePickerTriggerCharacters = ["@"], disabled = false, readOnly = false, wrapperRef, onOpenDropdown } = options;
	const t = useTranslation();
	const [state, setState] = useState({
		open: false,
		query: "",
		from: 0,
		to: 0,
		top: 0,
		left: 0,
		selectedIndex: -1,
		activeParent: null
	});
	const filteredVariables = useMemo(() => {
		return getFilteredVariables(t, variableCategories, variableCategoryLabels, variableCategoryOrder, state.query, state.activeParent);
	}, [
		t,
		variableCategories,
		variableCategoryLabels,
		variableCategoryOrder,
		state.query,
		state.activeParent
	]);
	const updateFromCursor = useCallback(() => {
		if (!editor || readOnly || disabled) return;
		const { state: editorState, view } = editor;
		const { selection } = editorState;
		if (!selection.empty) {
			setState((prev) => {
				return prev.open ? {
					...prev,
					open: false,
					query: "",
					selectedIndex: -1
				} : prev;
			});
			return;
		}
		const cursorPos = selection.from;
		const start = Math.max(0, cursorPos - 120);
		const match = editorState.doc.textBetween(start, cursorPos, "\n").match(INLINE_TRIGGER_REGEX);
		if (!match) {
			setState((prev) => {
				return prev.open ? {
					...prev,
					open: false,
					query: "",
					selectedIndex: -1
				} : prev;
			});
			return;
		}
		const query = match[1] ?? "";
		const tokenFrom = cursorPos - (query.length + 1);
		const coords = view.coordsAtPos(cursorPos);
		const wrapperRect = wrapperRef.current?.getBoundingClientRect();
		if (!wrapperRect) return;
		setState((prev) => {
			return {
				...prev,
				open: true,
				query,
				from: tokenFrom,
				to: cursorPos,
				top: coords.bottom - wrapperRect.top + 4,
				left: coords.left - wrapperRect.left,
				activeParent: prev.activeParent
			};
		});
	}, [
		disabled,
		editor,
		readOnly,
		wrapperRef
	]);
	const handleSelect = (selected, baseVariableOpt) => {
		if (!selected) return;
		if (Array.isArray(selected.children) && selected.children.length > 0) {
			setState((prev) => {
				return {
					...prev,
					activeParent: selected,
					query: "",
					selectedIndex: -1
				};
			});
			return;
		}
		replaceTokenWithVariable(editor, buildVariableTagAttrs(baseVariableOpt ?? state.activeParent ?? selected, selected, { openOnInsert: false }), state.from, state.to);
		requestAnimationFrame(() => {
			editor?.commands.focus();
		});
		setState((prev) => {
			return {
				...prev,
				open: false,
				query: "",
				selectedIndex: -1,
				activeParent: null
			};
		});
	};
	const closePicker = () => {
		setState((prev) => {
			return {
				...prev,
				open: false,
				query: "",
				selectedIndex: -1,
				activeParent: null
			};
		});
	};
	const goBack = () => {
		setState((prev) => {
			return {
				...prev,
				activeParent: null,
				selectedIndex: -1
			};
		});
	};
	const setQuery = (query) => {
		setState((prev) => {
			return {
				...prev,
				query
			};
		});
	};
	const handleKeyDown = (view, event) => {
		if (!Object.values(variableCategories ?? {}).flatMap((items) => {
			return Array.isArray(items) ? items : [];
		}).length || disabled || readOnly) return false;
		const isShortcut = (event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "v";
		const isTrigger = variablePickerTriggerCharacters.includes(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey;
		if (!isShortcut && !isTrigger) return false;
		if (state.open) return false;
		if (isTrigger) {
			const { from } = view.state.selection;
			const prevChar = from > 1 ? view.state.doc.textBetween(from - 1, from, "\n") : "";
			/** Allow @ after whitespace, brackets, quotes, or zwsp (used after variable tags) */
			if (prevChar && !/[\s\u200B\u2060]|\(|\[|"|'/.test(prevChar)) return false;
		}
		if (isShortcut) {
			event.preventDefault();
			onOpenDropdown?.();
			return true;
		}
		return false;
	};
	useEffect(() => {
		if (!editor) return;
		editor.on("update", updateFromCursor);
		editor.on("selectionUpdate", updateFromCursor);
		return () => {
			editor.off("update", updateFromCursor);
			editor.off("selectionUpdate", updateFromCursor);
		};
	}, [editor, updateFromCursor]);
	return {
		state,
		filteredVariables,
		handleSelect,
		closePicker,
		goBack,
		handleKeyDown,
		setQuery
	};
}
//#endregion
export { useInlineVariablePicker };

//# sourceMappingURL=useInlineVariablePicker.js.map