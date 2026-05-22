import { cn } from "../../utils/classes.js";
import { hostOpenElementSelector, hostRequest } from "../../utils/hostBridge.js";
import "../../utils/index.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { Spinner } from "../../components/Spinner.js";
import { Status } from "../../components/Status.js";
import "../../components/index.js";
import { Button } from "../../components/Button.js";
import { FieldLayout } from "../Field.js";
import useElementStoreV2 from "../store/element-store.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/pro-solid-svg-icons";
//#region src/forms/fields/ElementSelectField.tsx
var isRecord = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
var isElementReference = (value) => {
	return isRecord(value) && typeof value.id === "number" && typeof value.siteId === "number";
};
var normalizeSelectedElement = (element, elementType) => {
	const url = typeof element.$element?.data === "function" ? element.$element.data("cp-url") : null;
	return {
		id: element.id,
		siteId: element.siteId,
		label: element.label,
		url: typeof url === "string" ? url : null,
		status: element.status ?? null,
		elementType
	};
};
var normalizeStoredElement = (value, elementType) => {
	if (!isRecord(value) || typeof value.id !== "number" || typeof value.siteId !== "number") return null;
	return {
		id: value.id,
		siteId: value.siteId,
		label: typeof value.label === "string" ? value.label : `Element ${value.id}`,
		url: typeof value.url === "string" ? value.url : null,
		status: typeof value.status === "string" ? value.status : null,
		elementType: typeof value.elementType === "string" ? value.elementType : elementType
	};
};
var ElementSelectField = ({ form, field }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { getElementData, setElementData, hasElementData } = useElementStoreV2();
	const t = useTranslation();
	const selectedElements = getElementData(field.name) || [];
	const errors = form?.getErrorMapFields?.()[field.name] || [];
	const { elementSelectOptionsAction } = field;
	const { elementSelectStorageKeyPrefix } = field;
	const handleButtonClick = () => {
		const elementType = field.elementType || "craft\\elements\\Entry";
		if (!elementSelectStorageKeyPrefix) throw new Error(`ElementSelectField requires "elementSelectStorageKeyPrefix" for "${field.name}".`);
		hostOpenElementSelector(elementType, {
			storageKey: `${elementSelectStorageKeyPrefix}.${field.name}.${elementType}`,
			sources: field.sources || ["*"],
			criteria: field.criteria || {},
			multiSelect: field.limit ? false : true,
			limit: field.limit || null,
			autoFocusSearchBox: false,
			onShow: () => {
				document.body.style.pointerEvents = "";
			},
			onSelect: (elements) => {
				const newElements = elements.map((element) => {
					return normalizeSelectedElement(element, elementType);
				});
				const updatedElements = [...selectedElements, ...newElements];
				setElementData(field.name, updatedElements);
				const formValue = updatedElements.map((element) => {
					return {
						id: element.id,
						siteId: element.siteId
					};
				});
				form.setFieldValue(field.name, formValue);
			},
			closeOtherModals: false
		});
	};
	const removeElement = (elementId) => {
		const updatedElements = selectedElements.filter((el) => {
			return el.id !== elementId;
		});
		setElementData(field.name, updatedElements);
		const formValue = updatedElements.map((element) => {
			return {
				id: element.id,
				siteId: element.siteId
			};
		});
		form.setFieldValue(field.name, formValue);
	};
	useEffect(() => {
		const loadElements = async () => {
			if (field.name && !hasElementData(field.name)) {
				const currentValue = form.getFieldValue(field.name);
				if (currentValue && Array.isArray(currentValue) && currentValue.length > 0) {
					const currentReferences = currentValue.filter(isElementReference);
					if (!currentReferences.length) return;
					setIsLoading(true);
					try {
						if (!elementSelectOptionsAction) throw new Error(`ElementSelectField requires "elementSelectOptionsAction" for "${field.name}".`);
						const response = await hostRequest("POST", elementSelectOptionsAction, { data: { elements: currentReferences } });
						if (response.data && Array.isArray(response.data)) {
							const normalizedElements = response.data.map((item) => {
								return normalizeStoredElement(item, field.elementType || "craft\\elements\\Entry");
							}).filter((item) => {
								return item !== null;
							});
							setElementData(field.name, normalizedElements);
						}
					} catch {
						const fallbackElements = currentReferences.map((item) => {
							return {
								id: item.id,
								siteId: item.siteId,
								label: `Element ${item.id}`,
								url: null,
								status: null,
								elementType: field.elementType || "craft\\elements\\Entry"
							};
						});
						setElementData(field.name, fallbackElements);
					} finally {
						setIsLoading(false);
					}
				}
			}
		};
		loadElements();
	}, [
		form,
		field.name,
		field.elementType,
		elementSelectOptionsAction,
		getElementData,
		setElementData,
		hasElementData
	]);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		withControl: false,
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [
				isLoading && /* @__PURE__ */ jsxs("div", {
					className: "relative flex items-center text-sm text-gray-500 min-h-[34px]",
					children: [/* @__PURE__ */ jsx(Spinner, {
						size: "xs",
						variant: "default",
						className: "absolute left-0"
					}), /* @__PURE__ */ jsx("span", {
						className: "ml-6",
						children: t("Loading elements...")
					})]
				}),
				selectedElements.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					children: selectedElements.map((element) => {
						return /* @__PURE__ */ jsxs("div", {
							className: cn("flex items-center gap-1.5", "border border-gray-200 rounded-lg text-sm", "px-2 py-1.5", "bg-[rgb(243,247,252)]", "shadow-sm"),
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [element.status && /* @__PURE__ */ jsx(Status, { status: element.status }), /* @__PURE__ */ jsx("a", {
									href: element.url,
									children: /* @__PURE__ */ jsx("span", { children: element.label })
								})]
							}), /* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "transparent",
								size: "xs",
								onClick: () => {
									return removeElement(element.id);
								},
								className: cn("-mr-1"),
								"aria-label": t("Remove element"),
								children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
									icon: faXmark,
									className: "size-[15px]"
								})
							})]
						}, `${element.id}-${element.siteId}`);
					})
				}),
				(!field.limit || selectedElements.length < field.limit) && !isLoading && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "dashed",
					"aria-label": t("Choose"),
					className: cn("pl-1.5", errors.length > 0 && ["border-rose-600!", "focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]!"]),
					onClick: handleButtonClick,
					children: [
						/* @__PURE__ */ jsx(FontAwesomeIcon, {
							icon: faPlus,
							className: "size-[16px]"
						}),
						" ",
						t("Choose")
					]
				})
			]
		})
	});
};
//#endregion
export { ElementSelectField };

//# sourceMappingURL=ElementSelectField.js.map