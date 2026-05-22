import { cn } from "../../utils/classes.js";
import { hostRequest } from "../../utils/hostBridge.js";
import "../../utils/index.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { contentToValue } from "../../components/tiptap/variableSerialization.js";
import { TiptapEditor } from "../../components/TiptapEditor.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { useVariableCategoriesContext } from "../contexts/VariableCategoriesContext.js";
import { CalculationsToolbar } from "./CalculationsToolbar.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/pro-solid-svg-icons";
//#region src/forms/fields/CalculationsField.tsx
var flattenVariableOptions = (options = []) => {
	const flat = [];
	const visit = (nodes) => {
		nodes.forEach((node) => {
			flat.push(node);
			if (Array.isArray(node?.children) && node.children.length) visit(node.children);
		});
	};
	visit(options);
	return flat;
};
var getAvailableVariableTokens = (variableCategories) => {
	const flat = flattenVariableOptions(Object.values(variableCategories ?? {}).flatMap((items) => {
		return Array.isArray(items) ? items : [];
	}));
	return Array.from(new Set(flat.map((item) => {
		return typeof item?.value === "string" ? item.value.trim() : "";
	}).filter(Boolean)));
};
var getVariableTokenLabelMap = (variableCategories) => {
	return flattenVariableOptions(Object.values(variableCategories ?? {}).flatMap((items) => {
		return Array.isArray(items) ? items : [];
	})).reduce((map, item) => {
		const token = typeof item?.value === "string" ? item.value.trim() : "";
		if (!token) return map;
		map[token] = (typeof item?.label === "string" ? item.label.trim() : "") || token;
		return map;
	}, {});
};
var getFormulaFromValue = (value) => {
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return contentToValue(value);
	if (value && typeof value === "object" && Array.isArray(value.content)) return contentToValue(value.content);
	return "";
};
var getPageIndexFromScopePath = (scopePathValue) => {
	const scopePath = typeof scopePathValue === "string" ? scopePathValue : "";
	if (!scopePath) return null;
	const match = scopePath.match(/(?:^|\\.)pages\\.(\\d+)(?:\\.|$)/);
	if (!match) return null;
	const pageIndex = Number.parseInt(match[1] || "", 10);
	return Number.isInteger(pageIndex) ? pageIndex : null;
};
var getActivePageIndex = (pages, activePage) => {
	if (!Array.isArray(pages) || !pages.length || typeof activePage !== "string" || !activePage) return null;
	const pageIndex = pages.findIndex((page) => {
		const resolvedPage = page && typeof page === "object" ? page : {};
		return resolvedPage._handle === activePage || resolvedPage.handle === activePage;
	});
	return pageIndex >= 0 ? pageIndex : null;
};
var getValidationErrorDetails = (error, fallbackMessage) => {
	const resolvedError = error && typeof error === "object" ? error : {};
	const responseData = resolvedError.response?.data;
	const message = responseData?.message || resolvedError.message || fallbackMessage;
	return {
		message: String(message),
		technicalMessage: String(responseData?.technicalMessage ?? "")
	};
};
var CalculationsField = ({ form, field }) => {
	const t = useTranslation();
	const { value, setValue, errors } = useEngineField(form, field.name);
	const [guideOpen, setGuideOpen] = useState(false);
	const [validating, setValidating] = useState(false);
	const [validation, setValidation] = useState({
		type: "idle",
		message: ""
	});
	const { getVariableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry } = useVariableCategoriesContext();
	const resolvedVariableCategories = useMemo(() => {
		if (field.variableCategories) return field.variableCategories;
		const { variableConfig } = field;
		if (!variableConfig || !getVariableCategories) return;
		const pages = form?.getFieldValue?.("pages");
		const activePage = form?.getFieldValue?.("activePage");
		const scopePageIndex = getPageIndexFromScopePath(field._scopePath);
		const activePageIndex = getActivePageIndex(pages, activePage);
		const currentPageIndex = Number.isInteger(scopePageIndex) ? scopePageIndex : activePageIndex;
		return getVariableCategories({
			...variableConfig,
			...Number.isInteger(currentPageIndex) ? { currentPageIndex } : {}
		}, { form });
	}, [
		field,
		form,
		getVariableCategories
	]);
	const availableVariableTokens = useMemo(() => {
		return getAvailableVariableTokens(resolvedVariableCategories);
	}, [resolvedVariableCategories]);
	const tokenLabels = useMemo(() => {
		return getVariableTokenLabelMap(resolvedVariableCategories);
	}, [resolvedVariableCategories]);
	const runValidation = async () => {
		const formula = getFormulaFromValue(value).trim();
		if (!formula) {
			setValidation({
				type: "error",
				message: t("Enter a formula to test.")
			});
			return;
		}
		setValidating(true);
		setValidation({
			type: "idle",
			message: "",
			technicalMessage: ""
		});
		try {
			const response = await hostRequest("POST", field.validationAction || "plugin-kit/fields/validate-calculations-formula", { data: {
				formula,
				availableTokens: availableVariableTokens,
				tokenLabels
			} });
			const payload = response?.data ?? response;
			const isValid = Boolean(payload?.valid);
			const message = String(payload?.message ?? "");
			const technicalMessage = String(payload?.technicalMessage ?? "");
			setValidation({
				type: isValid ? "success" : "error",
				message: message || (isValid ? t("Formula is valid.") : t("Formula is invalid.")),
				technicalMessage
			});
		} catch (error) {
			const { message, technicalMessage } = getValidationErrorDetails(error, t("Unable to validate formula."));
			setValidation({
				type: "error",
				message: String(message),
				technicalMessage
			});
		} finally {
			setValidating(false);
		}
	};
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		withControl: false,
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ jsx(TiptapEditor, {
				value: value ?? "",
				onChange: setValue,
				placeholder: field.placeholder,
				rows: field.rows,
				buttons: ["variableTag"],
				toolbarContent: ({ editor, variableCategories, variableCategoryLabels, variableCategoryOrder, variablePickerOpen, onVariablePickerOpenChange }) => {
					return /* @__PURE__ */ jsx(CalculationsToolbar, {
						editor,
						variableCategories,
						variableCategoryLabels,
						variableCategoryOrder,
						variablePickerOpen,
						onVariablePickerOpenChange,
						guideOpen,
						onGuideOpenChange: setGuideOpen,
						validating,
						onValidate: runValidation
					});
				},
				disabled: field.disabled,
				isInvalid: errors.length > 0,
				variableCategories: resolvedVariableCategories,
				variableCategoryLabels,
				variableCategoryOrder,
				variableTransformerRegistry,
				variablePickerTriggerCharacters: field.variablePickerTriggerCharacters
			}), validation.type !== "idle" && /* @__PURE__ */ jsxs("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ jsxs("p", {
					className: cn("flex items-center gap-1", validation.type === "success" ? "text-emerald-700" : "text-rose-700"),
					children: [validation.type === "success" ? /* @__PURE__ */ jsx(FontAwesomeIcon, {
						icon: faCheck,
						className: "size-3 mt-0.5"
					}) : null, validation.message]
				}), validation.type === "error" && validation.technicalMessage && validation.technicalMessage !== validation.message && /* @__PURE__ */ jsxs("details", {
					className: "text-xs text-gray-500",
					children: [/* @__PURE__ */ jsx("summary", {
						className: "cursor-pointer select-none",
						children: t("Show technical details")
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-rose-700",
						children: validation.technicalMessage
					})]
				})]
			})]
		})
	});
};
//#endregion
export { CalculationsField };

//# sourceMappingURL=CalculationsField.js.map