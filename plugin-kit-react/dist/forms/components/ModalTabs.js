import { cn } from "../../utils/classes.js";
import { hasSchemaErrorsCached } from "../../utils/schemaIndexCache.js";
import "../../utils/index.js";
import { ModalTabs as ModalTabs$1, ModalTabsContent as ModalTabsContent$1, ModalTabsList as ModalTabsList$1, ModalTabsTrigger as ModalTabsTrigger$1 } from "../../components/ModalTabs.js";
import "../../components/index.js";
import { SchemaEngineContext } from "../engine/context.js";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/pro-solid-svg-icons";
//#region src/forms/components/ModalTabs.tsx
var ModalTabsErrorsContext = createContext({});
var useModalTabsErrors = () => {
	return useContext(ModalTabsErrorsContext);
};
var ModalTabs = Object.assign(({ children, schema, schemaNode, ...props }) => {
	const form = useContext(SchemaEngineContext);
	const node = schemaNode ?? schema;
	const [tabErrors, setTabErrors] = useState({});
	const getTabErrors = useCallback(() => {
		const errors = {};
		if (!node?.children || !form?.getErrorMapFields) return errors;
		const formErrors = form.getErrorMapFields?.() || {};
		Object.values(node.children).forEach((item) => {
			if (typeof item !== "object" || item === null || Array.isArray(item)) return;
			const childNode = item;
			const value = typeof childNode.props?.value === "string" ? childNode.props.value : "";
			if (childNode.$cmp === "ModalTabsContent" && value) errors[value] = hasSchemaErrorsCached(formErrors, childNode.children || []);
		});
		return errors;
	}, [form, node]);
	useEffect(() => {
		if (!form?.store?.subscribe) {
			setTabErrors(getTabErrors());
			return;
		}
		const update = () => {
			setTabErrors(getTabErrors());
		};
		update();
		return form.store.subscribe(update);
	}, [form, getTabErrors]);
	return /* @__PURE__ */ jsx(ModalTabsErrorsContext.Provider, {
		value: tabErrors,
		children: /* @__PURE__ */ jsx(ModalTabs$1, {
			...props,
			children
		})
	});
}, { usesSchemaNode: true });
function ModalTabsList({ children, ...props }) {
	return /* @__PURE__ */ jsx(ModalTabsList$1, {
		...props,
		children
	});
}
function ModalTabsTrigger({ children, value, ...props }) {
	const tabErrors = useModalTabsErrors();
	const hasErrors = Boolean(tabErrors[value]);
	return /* @__PURE__ */ jsxs(ModalTabsTrigger$1, {
		value,
		"data-has-errors": hasErrors,
		className: cn("flex items-center gap-1", hasErrors && "text-error"),
		...props,
		children: [children, hasErrors && /* @__PURE__ */ jsx(FontAwesomeIcon, {
			icon: faTriangleExclamation,
			className: "block size-3"
		})]
	});
}
function ModalTabsContent({ children, value, ...props }) {
	return /* @__PURE__ */ jsx(ModalTabsContent$1, {
		value,
		...props,
		children: /* @__PURE__ */ jsx("div", {
			className: cn("grid grid-cols-1 gap-4"),
			children
		})
	});
}
//#endregion
export { ModalTabs, ModalTabsContent, ModalTabsList, ModalTabsTrigger, useModalTabsErrors };

//# sourceMappingURL=ModalTabs.js.map