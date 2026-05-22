import { cn } from "../../utils/classes.js";
import "../../utils/index.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { buildVariableTagAttrs, parseTokenWithDefault } from "./variableSerialization.js";
import { VariableCommandList } from "./VariableCommandList.js";
import { useVariablePicker } from "./useVariablePicker.js";
import { Input } from "../Input.js";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover.js";
import { useVariablePickerContext } from "./VariablePickerContext.js";
import { VariableTransformControls } from "./VariableTransformControls.js";
import "../index.js";
import { Button } from "../Button.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { NodeViewWrapper } from "@tiptap/react";
//#region src/components/tiptap/VariableTagView.tsx
var VariableTagView_default = (props) => {
	const t = useTranslation();
	const { editor, node, updateAttributes, deleteNode, selected: isActive } = props;
	const isReadOnly = !editor?.isEditable || false;
	const openOnInsert = Boolean(node?.attrs?.openOnInsert);
	const [isConfigOpen, setIsConfigOpen] = useState(openOnInsert);
	const [isPickerMode, setIsPickerMode] = useState(false);
	const [defaultIfEmpty, setDefaultIfEmpty] = useState(node?.attrs?.default ?? "");
	const [transformerId, setTransformerId] = useState(node?.attrs?.transformerId ?? "");
	const [transformerParams, setTransformerParams] = useState(() => {
		const raw = node?.attrs?.transformerParams;
		if (!raw || typeof raw !== "object") return {};
		return Object.entries(raw).reduce((acc, [key, value]) => {
			acc[key] = value == null ? "" : String(value);
			return acc;
		}, {});
	});
	const openOnInsertHandled = useRef(false);
	const popoverContentRef = useRef(null);
	const pickerContext = useVariablePickerContext();
	const selectedVariableMeta = useMemo(() => {
		const [token] = parseTokenWithDefault(String(node?.attrs?.value ?? ""));
		const groups = Object.values(pickerContext?.variableCategories ?? {});
		const visit = (items) => {
			for (const item of items) {
				if (item?.value === token) return item;
				const childMatch = (Array.isArray(item?.children) ? item.children : []).find((child) => {
					return child?.value === token;
				});
				if (childMatch) return childMatch;
			}
			return null;
		};
		for (const groupItems of groups) {
			const match = visit(Array.isArray(groupItems) ? groupItems : []);
			if (match) return match;
		}
		return null;
	}, [pickerContext?.variableCategories, node?.attrs?.value]);
	const transformOptions = useMemo(() => {
		const registry = pickerContext?.variableTransformerRegistry ?? {};
		const compatibleWith = Array.isArray(selectedVariableMeta?.compatibleWith) ? selectedVariableMeta.compatibleWith : [];
		const allowedTypes = /* @__PURE__ */ new Set();
		const hasCompatibilityHints = compatibleWith.length > 0;
		(Array.isArray(selectedVariableMeta?.transformValueTypes) ? selectedVariableMeta.transformValueTypes : []).forEach((type) => {
			if (typeof type === "string" && type.trim() !== "") allowedTypes.add(type);
		});
		const hasTransformHints = hasCompatibilityHints || allowedTypes.size > 0;
		if (compatibleWith.includes("plainText") || compatibleWith.includes("email")) allowedTypes.add("text");
		if (compatibleWith.includes("number") || compatibleWith.includes("calculations")) allowedTypes.add("number");
		if (compatibleWith.includes("url")) allowedTypes.add("url");
		if (compatibleWith.includes("date")) allowedTypes.add("date");
		if (compatibleWith.includes("boolean")) allowedTypes.add("boolean");
		if (compatibleWith.includes("array")) allowedTypes.add("array");
		const byId = /* @__PURE__ */ new Map();
		Object.entries(registry).forEach(([valueType, transformers]) => {
			if (hasTransformHints && allowedTypes.size > 0 && !allowedTypes.has(valueType)) return;
			(Array.isArray(transformers) ? transformers : []).forEach((transformer) => {
				const appliesTo = Array.isArray(transformer.appliesTo) && transformer.appliesTo.length ? transformer.appliesTo : [valueType];
				if (hasTransformHints && allowedTypes.size > 0 && !appliesTo.some((type) => {
					return allowedTypes.has(type);
				})) return;
				if (!byId.has(transformer.id)) byId.set(transformer.id, {
					value: transformer.id,
					label: transformer.label,
					description: transformer.description,
					params: Array.isArray(transformer.params) ? transformer.params : [],
					appliesTo
				});
			});
		});
		return Array.from(byId.values());
	}, [pickerContext?.variableTransformerRegistry, selectedVariableMeta]);
	const selectedTransformer = useMemo(() => {
		return transformOptions.find((option) => {
			return option.value === transformerId;
		}) ?? null;
	}, [transformOptions, transformerId]);
	const hasIncompatibleTransformerSelection = useMemo(() => {
		return transformerId.trim() !== "" && !selectedTransformer;
	}, [transformerId, selectedTransformer]);
	const initialPage = useMemo(() => {
		const currentValue = node?.attrs?.value;
		if (!currentValue || !pickerContext?.variableCategories) return null;
		const findParentWithChild = (items) => {
			for (const item of items) {
				const children = Array.isArray(item?.children) ? item.children : [];
				if (children.some((c) => {
					return c?.value === currentValue;
				})) return item;
				const nested = findParentWithChild(children);
				if (nested) return nested;
			}
			return null;
		};
		return findParentWithChild(Object.values(pickerContext.variableCategories).flatMap((items) => {
			return items ?? [];
		}));
	}, [node?.attrs?.value, pickerContext?.variableCategories]);
	const picker = useVariablePicker({
		variableCategories: pickerContext?.variableCategories ?? {},
		variableCategoryLabels: pickerContext?.variableCategoryLabels,
		variableCategoryOrder: pickerContext?.variableCategoryOrder,
		isOpen: isConfigOpen,
		initialPage,
		getDefaultIfEmpty: () => {
			return defaultIfEmpty;
		},
		onApply: (baseVariable, variable, defaultText) => {
			const attrs = buildVariableTagAttrs(baseVariable, variable, { defaultIfEmpty: defaultText });
			updateAttributes?.(attrs);
			setDefaultIfEmpty("");
			setTransformerId("");
			setTransformerParams({});
			setIsConfigOpen(false);
			setIsPickerMode(false);
			picker.reset();
		}
	});
	const hasFullPicker = pickerContext && Object.values(pickerContext.variableCategories ?? {}).some((items) => {
		return Array.isArray(items) && items.length > 0;
	});
	const isConfigurable = !isReadOnly;
	const canChangeVariable = !!hasFullPicker;
	useEffect(() => {
		if (!openOnInsert) return;
		openOnInsertHandled.current = false;
	}, [openOnInsert]);
	useEffect(() => {
		if (!openOnInsert || openOnInsertHandled.current) return;
		openOnInsertHandled.current = true;
		setIsConfigOpen(true);
		queueMicrotask(() => {
			updateAttributes?.({ openOnInsert: false });
		});
	}, [openOnInsert, updateAttributes]);
	const handleDelete = () => {
		if (!isReadOnly) deleteNode();
	};
	function closeConfig() {
		setIsConfigOpen(false);
		setIsPickerMode(false);
		picker.reset();
	}
	const exitPickerMode = useCallback(() => {
		setIsPickerMode(false);
	}, []);
	const handleOpenConfig = useCallback(() => {
		if (!isConfigurable) return;
		setIsConfigOpen(true);
	}, [isConfigurable]);
	useEffect(() => {
		const editorDom = editor?.view?.dom;
		if (!editorDom || !isActive || !isConfigurable) return;
		const handleEditorKeyDown = (event) => {
			if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
			const tagName = event.target?.tagName;
			if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") return;
			if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
				event.preventDefault();
				event.stopPropagation();
				handleOpenConfig();
			}
		};
		editorDom.addEventListener("keydown", handleEditorKeyDown, true);
		return () => {
			editorDom.removeEventListener("keydown", handleEditorKeyDown, true);
		};
	}, [
		editor,
		isActive,
		isConfigurable,
		handleOpenConfig
	]);
	const handleSaveOptions = () => {
		const trimmedDefault = defaultIfEmpty.trim();
		const trimmedTransformerId = transformerId.trim();
		const normalizedParams = trimmedTransformerId ? Object.entries(transformerParams).reduce((acc, [key, value]) => {
			const trimmed = String(value ?? "").trim();
			if (trimmed !== "") acc[key] = trimmed;
			return acc;
		}, {}) : null;
		updateAttributes?.({
			default: trimmedDefault || null,
			transformerId: trimmedTransformerId || null,
			transformerParams: trimmedTransformerId ? normalizedParams : null
		});
		closeConfig();
	};
	const handleConfigOpenChange = (nextOpen) => {
		setIsConfigOpen(nextOpen);
		setIsPickerMode(false);
		if (!nextOpen) picker.reset();
	};
	const handleTagKeyDown = (event) => {
		if (!isConfigurable) return;
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			event.stopPropagation();
			handleOpenConfig();
		}
	};
	useEffect(() => {
		setDefaultIfEmpty(node?.attrs?.default ?? "");
		setTransformerId(node?.attrs?.transformerId ?? "");
		const raw = node?.attrs?.transformerParams;
		if (raw && typeof raw === "object") setTransformerParams(Object.entries(raw).reduce((acc, [key, value]) => {
			acc[key] = value == null ? "" : String(value);
			return acc;
		}, {}));
		else setTransformerParams({});
	}, [
		isConfigOpen,
		node?.attrs?.default,
		node?.attrs?.transformerId,
		node?.attrs?.transformerParams
	]);
	useEffect(() => {
		if (!selectedTransformer) return;
		setTransformerParams((current) => {
			const next = { ...current };
			(selectedTransformer.params ?? []).forEach((param) => {
				if (next[param.name] == null || next[param.name] === "") next[param.name] = param.default == null ? "" : String(param.default);
			});
			return next;
		});
	}, [selectedTransformer]);
	useEffect(() => {
		if (!isConfigOpen || !isPickerMode) return;
		let frame = 0;
		let cancelled = false;
		const focusSearch = (attempt = 0) => {
			if (cancelled) return;
			const input = popoverContentRef.current?.querySelector("[data-slot=\"command-input\"]");
			if (input) {
				input.focus();
				return;
			}
			if (attempt < 8) frame = requestAnimationFrame(() => {
				focusSearch(attempt + 1);
			});
		};
		focusSearch();
		return () => {
			cancelled = true;
			if (frame) cancelAnimationFrame(frame);
		};
	}, [isConfigOpen, isPickerMode]);
	const fallbackPreview = String(props.node?.attrs?.default ?? "").trim();
	const appliedTransformerId = String(props.node?.attrs?.transformerId ?? "").trim();
	const appliedTransformer = transformOptions.find((option) => {
		return option.value === appliedTransformerId;
	}) ?? null;
	let transformPreview = "";
	if (appliedTransformer?.label) transformPreview = appliedTransformer.label;
	else if (appliedTransformerId) transformPreview = appliedTransformerId;
	const tokenValue = String(node?.attrs?.value ?? "");
	const tagLabel = selectedVariableMeta?.label ?? node?.attrs?.label ?? "";
	const tagTitle = tagLabel;
	return /* @__PURE__ */ jsx(NodeViewWrapper, {
		as: "span",
		className: cn("relative inline-block leading-none mx-[1px] cursor-default"),
		tabIndex: isConfigurable ? 0 : void 0,
		onKeyDown: handleTagKeyDown,
		"data-drag-handle": true,
		"data-variable-value": tokenValue,
		children: /* @__PURE__ */ jsxs("span", {
			className: cn("relative inline-flex items-stretch whitespace-nowrap gap-0 overflow-hidden", "-mt-[3px] text-[11px] font-normal! leading-none align-middle", "bg-[#5C6BC0] text-white rounded-[2px]", isReadOnly && "inline-flex flex-1 px-[5px] py-[4px]", isActive && !isReadOnly && "outline-none shadow-[0_0_0_2px_rgba(123,140,232,0.5)]", isReadOnly && isActive && "shadow-none"),
			children: [
				fallbackPreview && /* @__PURE__ */ jsx("span", {
					className: "pointer-events-none absolute top-0 left-0 h-0 w-0 border-t-[8px] border-r-[8px] border-t-orange-400 border-r-transparent",
					"aria-label": t("Has fallback value")
				}),
				isConfigurable ? /* @__PURE__ */ jsxs(Popover, {
					open: isConfigOpen,
					onOpenChange: handleConfigOpenChange,
					children: [/* @__PURE__ */ jsx(PopoverTrigger, { render: /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "inline-flex flex-1 min-w-0 self-stretch items-center cursor-pointer bg-transparent border-0 px-[5px] py-[4px] m-0 text-left text-inherit focus:outline-none",
						title: tagTitle,
						onClick: (event) => {
							event.preventDefault();
							event.stopPropagation();
							handleOpenConfig();
						},
						children: /* @__PURE__ */ jsxs("span", {
							className: "block truncate max-w-[220px]",
							children: [
								tagLabel,
								transformPreview && /* @__PURE__ */ jsx("span", {
									className: "ml-1 inline-flex items-center rounded bg-white/20 px-1 py-[1px] text-[9px] leading-none text-white/95 align-middle",
									title: t("Transform: {transform}", { transform: transformPreview }),
									"aria-label": t("Transform: {transform}", { transform: transformPreview }),
									children: transformPreview
								}),
								fallbackPreview && false
							]
						})
					}) }), /* @__PURE__ */ jsx(PopoverContent, {
						ref: popoverContentRef,
						align: "start",
						side: "bottom",
						sideOffset: 6,
						className: hasFullPicker ? "min-w-[260px] max-w-[360px] p-0" : "w-[260px] p-0",
						onMouseDown: (event) => {
							const target = event.target;
							const tagName = target?.tagName;
							const isFocusableInput = tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
							const isSelectControl = Boolean(target?.closest("[data-slot=\"select-trigger\"]"));
							if (isFocusableInput || isSelectControl) return;
							event.preventDefault();
							event.stopPropagation();
						},
						children: isPickerMode ? canChangeVariable && /* @__PURE__ */ jsx(VariableCommandList, {
							search: picker.search,
							onSearchChange: picker.setSearch,
							groups: picker.groups,
							options: picker.options,
							selectedValue: node?.attrs?.value,
							onSelect: picker.handleSelect,
							placeholder: t("Search variables"),
							showSearch: true,
							shouldFilter: false,
							onBack: picker.page ? picker.handleBack : exitPickerMode,
							isChildMode: !!picker.page
						}) : /* @__PURE__ */ jsxs("div", {
							className: "p-2",
							children: [
								/* @__PURE__ */ jsx("label", {
									className: "text-[11px] text-gray-500 block mb-1",
									children: t("Default if empty (optional)")
								}),
								/* @__PURE__ */ jsx(Input, {
									type: "text",
									value: defaultIfEmpty,
									onChange: (event) => {
										setDefaultIfEmpty(event.target.value);
									},
									onKeyDown: (event) => {
										if (event.key === "Enter") {
											event.preventDefault();
											event.stopPropagation();
											handleSaveOptions();
										}
									}
								}),
								/* @__PURE__ */ jsx(VariableTransformControls, {
									transformerId,
									onTransformerIdChange: (nextId) => {
										setTransformerId(nextId);
										if (!nextId) setTransformerParams({});
									},
									transformOptions,
									hasIncompatibleTransformerSelection,
									selectedTransformer,
									transformerParams,
									onTransformerParamChange: (paramName, nextValue) => {
										setTransformerParams((current) => {
											return {
												...current,
												[paramName]: nextValue
											};
										});
									}
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-3 -mx-2 -mb-2 border-t border-slate-200 bg-[#f3f7fd] px-2 py-2 flex items-center justify-between gap-2",
									children: [canChangeVariable ? /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "default",
										size: "sm",
										className: "text-[11px]",
										onClick: () => {
											setIsPickerMode(true);
										},
										children: t("Change variable")
									}) : /* @__PURE__ */ jsx("span", { className: "inline-block" }), /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "primary",
										size: "sm",
										className: "text-[11px]",
										onClick: handleSaveOptions,
										children: t("Save")
									})]
								})
							]
						})
					})]
				}) : /* @__PURE__ */ jsxs("span", {
					className: "block truncate max-w-[220px]",
					title: tagTitle,
					children: [
						tagLabel,
						transformPreview && !isReadOnly && /* @__PURE__ */ jsx("span", {
							className: "ml-1 inline-flex items-center rounded bg-white/20 px-1 py-[1px] text-[9px] leading-none text-white/95 align-middle",
							title: t("Transform: {transform}", { transform: transformPreview }),
							"aria-label": t("Transform: {transform}", { transform: transformPreview }),
							children: transformPreview
						}),
						fallbackPreview && false
					]
				}),
				/* @__PURE__ */ jsx("span", {
					className: cn("inline-flex items-center justify-center cursor-pointer", "px-1 pr-[5px] py-[4px] self-stretch", isReadOnly && "hidden"),
					onMouseDown: (event) => {
						event.preventDefault();
						event.stopPropagation();
					},
					onClick: (event) => {
						event.preventDefault();
						event.stopPropagation();
						handleDelete();
					},
					children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
						icon: faXmark,
						className: "size-[10px]"
					})
				})
			]
		})
	});
};
//#endregion
export { VariableTagView_default as default };

//# sourceMappingURL=VariableTagView.js.map