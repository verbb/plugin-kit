import { Icon } from "../../components/Icon.js";
import { Tab, TabPanel, Tabs } from "../../components/Tabs.js";
import { SchemaEngineContext } from "../engine/context.js";
import { schemaSubtreeHasErrors } from "./schemaErrors.js";
import { cn } from "../../utils/cn.js";
import { Fragment, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { evaluateCondition } from "@verbb/plugin-kit-forms";
//#region src/forms/components/ModalTabs.tsx
var ModalTabsErrorsContext = createContext({});
var useModalTabsErrors = () => {
	return useContext(ModalTabsErrorsContext);
};
var isRecord = (value) => {
	return typeof value === "object" && value !== null && !Array.isArray(value);
};
/**
* Collect ModalTabsTrigger handles + optional tab-level `if` from schema.
* O(schema nodes under this ModalTabs) once per schema identity — not nested field visibility.
*/
var collectTabHandles = (node) => {
	if (!node?.children) return [];
	const handles = [];
	const visit = (items) => {
		if (!Array.isArray(items)) return;
		items.forEach((item) => {
			if (!isRecord(item)) return;
			const child = item;
			if (child.$cmp === "ModalTabsTrigger") {
				const value = typeof child.props?.value === "string" ? child.props.value : typeof child.value === "string" ? child.value : "";
				if (value) handles.push({
					value,
					if: typeof child.if === "string" ? child.if : void 0
				});
				return;
			}
			if (child.children) visit(child.children);
		});
	};
	visit(node.children);
	return handles;
};
/**
* Schema `$cmp: 'ModalTabs'` — wraps stock `Tabs` `variant="modal"`.
* Owns tab ↔ schema error mapping (same contract as kit v1 ModalTabs).
*/
var ModalTabs = Object.assign(({ children, schemaNode, schema, _id: _schemaId, _data: _schemaData, className, value: controlledValue, defaultValue = "", ...props }) => {
	const form = useContext(SchemaEngineContext);
	const node = schemaNode ?? schema;
	const [tabErrors, setTabErrors] = useState({});
	const [uncontrolledValue, setUncontrolledValue] = useState(() => controlledValue ?? defaultValue ?? "");
	const isControlled = controlledValue !== void 0 && controlledValue !== null;
	const resolvedValue = isControlled ? String(controlledValue) : uncontrolledValue;
	const tabHandles = useMemo(() => collectTabHandles(node), [node]);
	const getTabErrors = useCallback(() => {
		const errors = {};
		if (!node?.children || !form?.getErrorMapFields) return errors;
		const formErrors = form.getErrorMapFields?.() || {};
		Object.values(node.children).forEach((item) => {
			if (typeof item !== "object" || item === null || Array.isArray(item)) return;
			const childNode = item;
			const value = typeof childNode.props?.value === "string" ? childNode.props.value : "";
			if (childNode.$cmp === "ModalTabsContent" && value) errors[value] = schemaSubtreeHasErrors(formErrors, childNode.children || []);
		});
		return errors;
	}, [form, node]);
	/** First tab whose tab-level `if` (if any) currently passes. */
	const getFirstVisibleTabValue = useCallback((values) => {
		for (const handle of tabHandles) if (!handle.if || evaluateCondition(handle.if, values)) return handle.value;
		return tabHandles[0]?.value ?? "";
	}, [tabHandles]);
	const isTabVisible = useCallback((tabValue, values) => {
		const handle = tabHandles.find((item) => item.value === tabValue);
		if (!handle) return false;
		if (!handle.if) return true;
		return evaluateCondition(handle.if, values);
	}, [tabHandles]);
	useEffect(() => {
		if (!form?.store?.subscribe) {
			setTabErrors(getTabErrors());
			return;
		}
		const update = () => {
			setTabErrors(getTabErrors());
			if (isControlled) return;
			const { values } = form.store.state;
			const formValues = values && typeof values === "object" ? values : {};
			if (!resolvedValue || isTabVisible(resolvedValue, formValues)) return;
			const next = getFirstVisibleTabValue(formValues);
			if (next && next !== resolvedValue) setUncontrolledValue(next);
		};
		update();
		return form.store.subscribe(update);
	}, [
		form,
		getFirstVisibleTabValue,
		getTabErrors,
		isControlled,
		isTabVisible,
		resolvedValue
	]);
	return /* @__PURE__ */ jsx(ModalTabsErrorsContext.Provider, {
		value: tabErrors,
		children: /* @__PURE__ */ jsx(Tabs, {
			variant: "modal",
			value: resolvedValue,
			className: cn("h-full min-h-0", className),
			...props,
			onPkChange: (event) => {
				event.stopPropagation();
				const next = event.detail?.value;
				if (typeof next !== "string" || !next || isControlled) return;
				setUncontrolledValue(next);
			},
			children
		})
	});
}, { usesSchemaNode: true });
function ModalTabsList({ children }) {
	return /* @__PURE__ */ jsx(Fragment, { children });
}
function ModalTabsTrigger({ children, value, className, ...props }) {
	const tabErrors = useModalTabsErrors();
	const hasErrors = Boolean(value && tabErrors[value]);
	return /* @__PURE__ */ jsx(Tab, {
		value,
		"data-has-errors": hasErrors ? "true" : void 0,
		className,
		...props,
		slot: "nav",
		children: /* @__PURE__ */ jsxs("span", {
			className: "inline-flex items-center gap-1",
			children: [children, hasErrors ? /* @__PURE__ */ jsx(Icon, {
				icon: "triangle-exclamation",
				className: "block size-3"
			}) : null]
		})
	});
}
function ModalTabsContent({ children, className, ...props }) {
	return /* @__PURE__ */ jsx(TabPanel, {
		className,
		...props,
		children: /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 gap-4",
			children
		})
	});
}
//#endregion
export { ModalTabs, ModalTabsContent, ModalTabsList, ModalTabsTrigger, useModalTabsErrors };

//# sourceMappingURL=ModalTabs.js.map