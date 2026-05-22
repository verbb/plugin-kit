import { evaluateCondition, normalizeAttrs } from "../utils/schema.js";
import { SchemaEngineContext } from "./engine/context.js";
import { getFormComponentRegistry, getFormFieldRegistry } from "./registry.js";
import { FormStateStore } from "./engine/FormStateStore.js";
import { normalizeSchema } from "./engine/SchemaIndex.js";
import { createValidationEngine } from "./engine/ValidationEngine.js";
import { buildGroupedMessage } from "./engine/buildGroupedMessage.js";
import { createContext, createElement, forwardRef, memo, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/forms/SchemaFormEngine.tsx
var isRecord = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
var hasEventTarget = (value) => {
	return isRecord(value) && isRecord(value.target);
};
var SchemaContext = createContext(null);
var SchemaItemContext = createContext(null);
var SchemaItemProvider = ({ children, ...props }) => {
	return /* @__PURE__ */ jsx(SchemaItemContext.Provider, {
		value: props,
		children
	});
};
var useSchemaContext = () => {
	const context = useContext(SchemaContext);
	if (!context) throw new Error("useSchemaContext must be used within a SchemaProvider");
	return context;
};
var SchemaItem = memo(({ field, children }) => {
	const { form } = useSchemaContext();
	const buildConditionData = useCallback((values) => {
		const scopePath = typeof field._scopePath === "string" ? field._scopePath : "";
		const scopedValues = scopePath ? form?.getFieldValue?.(scopePath) : null;
		const scopedObject = isRecord(scopedValues) ? scopedValues : {};
		const conditionContext = form?.getConditionContext?.(values, field);
		const normalizedConditionContext = isRecord(conditionContext) ? conditionContext : {};
		const fieldData = isRecord(field._data) ? field._data : {};
		return {
			...values,
			...scopedObject,
			...fieldData,
			...normalizedConditionContext
		};
	}, [field, form]);
	const resolveVisibility = useCallback((values) => {
		if (!field.if) return true;
		return evaluateCondition(field.if, buildConditionData(values));
	}, [buildConditionData, field.if]);
	const [shouldShow, setShouldShow] = useState(() => {
		const initialValues = form?.store?.state?.values;
		if (!initialValues || typeof initialValues !== "object") return !field.if;
		return resolveVisibility(initialValues);
	});
	useEffect(() => {
		if (!field.if) {
			setShouldShow(true);
			return;
		}
		const initialValues = form?.store?.state?.values;
		if (initialValues && typeof initialValues === "object") setShouldShow(resolveVisibility(initialValues));
		if (!form?.store?.subscribe) return;
		return form.store.subscribe(() => {
			const { values } = form.store.state;
			setShouldShow(resolveVisibility(values));
		});
	}, [
		field.if,
		form,
		resolveVisibility
	]);
	if (!shouldShow) return field.hideOnIf ? /* @__PURE__ */ jsx("div", {
		style: { display: "none" },
		children
	}) : null;
	return children;
});
SchemaItem.displayName = "SchemaItem";
var renderFormField = (schema, form) => {
	const { $field, ...props } = schema.$field ? {
		$field: schema.$field,
		...schema
	} : {
		$field: schema.type,
		...schema
	};
	const Component = getFormFieldRegistry()[$field];
	if (!Component) {
		console.warn(`Unknown form field type: ${$field}`);
		return null;
	}
	return createElement(Component, {
		schema,
		field: { ...props },
		form
	}, props.children ? /* @__PURE__ */ jsx(SchemaRenderer, { schema: props.children }) : null);
};
var renderHtmlElement = (schema) => {
	const { $el, children, attrs = {} } = schema;
	const normalizedAttrs = normalizeAttrs(isRecord(attrs) ? attrs : {});
	if (typeof $el !== "string" || !$el) return null;
	return createElement($el, { ...normalizedAttrs }, children ? /* @__PURE__ */ jsx(SchemaRenderer, { schema: children }) : null);
};
var renderFormComponent = (schema) => {
	const { $cmp, props = {}, children, ...rest } = schema;
	const Component = getFormComponentRegistry()[$cmp];
	if (!Component) {
		console.warn(`Unknown form component: ${$cmp}`);
		return null;
	}
	const componentProps = {
		...isRecord(props) ? props : {},
		...rest
	};
	if (Boolean(Component.usesSchemaNode)) componentProps.schemaNode = schema;
	else if ("schemaNode" in componentProps) delete componentProps.schemaNode;
	return createElement(Component, componentProps, children ? /* @__PURE__ */ jsx(SchemaRenderer, { schema: children }) : null);
};
var SchemaRenderer = memo(({ schema }) => {
	const { form } = useSchemaContext();
	if (typeof schema === "string") return schema;
	if (Array.isArray(schema)) return schema.map((schemaItem, index) => {
		if (typeof schemaItem === "string") return schemaItem;
		if (!isRecord(schemaItem)) return null;
		const key = typeof schemaItem._id === "string" ? schemaItem._id : `schema-item-${index}`;
		return /* @__PURE__ */ jsx(SchemaItemProvider, { children: /* @__PURE__ */ jsx(SchemaItem, {
			field: schemaItem,
			children: /* @__PURE__ */ jsx(SchemaRenderer, { schema: schemaItem })
		}) }, key);
	});
	if (schema.$field || schema.$cmp === "Field") return renderFormField(schema, form);
	if (schema.$el) return renderHtmlElement(schema);
	if (schema.$cmp) return renderFormComponent(schema);
	console.warn("Unknown schema item:", schema);
	return null;
});
SchemaRenderer.displayName = "SchemaRenderer";
var SchemaProvider = ({ children, form }) => {
	const contextValue = useMemo(() => {
		return {
			form,
			schema: form.schema
		};
	}, [form]);
	return /* @__PURE__ */ jsx(SchemaContext.Provider, {
		value: contextValue,
		children
	});
};
var normalizeServerErrors = (rawErrors) => {
	const normalized = {};
	if (!rawErrors) return normalized;
	const appendMessages = (path, messages) => {
		if (!path) return;
		const nextMessages = messages.filter((message) => {
			return message !== void 0 && message !== null && message !== "";
		}).map((message) => {
			return String(message);
		});
		if (!nextMessages.length) return;
		if (!normalized[path]) normalized[path] = [];
		normalized[path].push(...nextMessages);
	};
	const collectErrors = (node, path) => {
		if (Array.isArray(node)) {
			if (node.length === 0) return;
			if (node.every((entry) => {
				return typeof entry === "string";
			})) {
				appendMessages(path, node);
				return;
			}
			if (!path) {
				node.forEach((entry) => {
					collectErrors(entry, path);
				});
				return;
			}
			node.forEach((entry, index) => {
				collectErrors(entry, `${path}.${index}`);
			});
			return;
		}
		if (!node || typeof node !== "object") return;
		Object.entries(node).forEach(([key, value]) => {
			collectErrors(value, path ? `${path}.${key}` : key);
		});
	};
	if (Array.isArray(rawErrors)) {
		collectErrors(rawErrors, "");
		return normalized;
	}
	if (rawErrors && typeof rawErrors === "object" && "errors" in rawErrors) {
		collectErrors(rawErrors.errors, "");
		return normalized;
	}
	collectErrors(rawErrors, "");
	return normalized;
};
var useStoreSelector = (store, selector, fallbackValue) => {
	return useSyncExternalStore(store ? store.subscribe.bind(store) : (() => {
		return () => {};
	}), () => {
		return store ? selector(store.state) : fallbackValue;
	}, () => {
		return store ? selector(store.state) : fallbackValue;
	});
};
var EngineField = ({ name, children }) => {
	const form = useContext(SchemaEngineContext);
	const store = form?.store ?? null;
	const value = useStoreSelector(store, () => {
		return form?.getFieldValue(name);
	}, void 0);
	const errors = useStoreSelector(store, (state) => {
		return state?.errors[name] || [];
	}, []);
	if (!form) return null;
	return children({
		state: { value },
		handleChange: (valueOrEvent) => {
			if (hasEventTarget(valueOrEvent)) {
				const { type, checked, value: nextValue } = valueOrEvent.target;
				form.setFieldValue(name, type === "checkbox" ? checked : nextValue);
				return;
			}
			form.setFieldValue(name, valueOrEvent);
		},
		handleBlur: () => {
			form.store.setTouched(name, true);
		},
		errors
	});
};
var useSchemaFormEngine = ({ schemaIndex = null, defaultValues = {}, errors, onChange, getConditionContext, parentForm, parentPath }) => {
	const index = useMemo(() => {
		if (!schemaIndex) throw new Error("SchemaFormEngine requires a compiled schemaIndex.");
		const normalizedSchema = normalizeSchema(schemaIndex.schema);
		return {
			...schemaIndex,
			schema: normalizedSchema
		};
	}, [schemaIndex]);
	const storeRef = useRef(null);
	if (!storeRef.current) storeRef.current = new FormStateStore(defaultValues);
	const store = storeRef.current;
	const validationEngine = useMemo(() => {
		return createValidationEngine(index, { conditionDataResolver: getConditionContext });
	}, [index, getConditionContext]);
	const labelMap = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		index.fieldEntries.forEach((entry) => {
			if (entry.path) {
				const label = String(entry.field?.label || entry.field?.name || entry.path);
				map.set(entry.path, label);
			}
		});
		return map;
	}, [index]);
	const onSubmitHandlerRef = useRef(null);
	const onErrorHandlerRef = useRef(null);
	const onSuccessHandlerRef = useRef(null);
	const onChangeHandlerRef = useRef(null);
	const formRef = useRef(null);
	const nestedFormsRef = useRef(/* @__PURE__ */ new Map());
	useEffect(() => {
		if (!onChange) {
			onChangeHandlerRef.current = null;
			return;
		}
		onChangeHandlerRef.current = (value) => {
			if (formRef.current) onChange(value, formRef.current);
		};
	}, [onChange]);
	useEffect(() => {
		return store.subscribe(() => {
			if (onChangeHandlerRef.current) onChangeHandlerRef.current(store.state.values);
		});
	}, [store]);
	useEffect(() => {
		const normalized = normalizeServerErrors(errors);
		if (Object.keys(normalized).length) store.setErrors(normalized);
		else store.clearErrors();
	}, [errors, store]);
	const registerNestedForm = (path, api) => {
		nestedFormsRef.current.set(path, api);
	};
	const unregisterNestedForm = (path) => {
		nestedFormsRef.current.delete(path);
	};
	const validateNestedForms = () => {
		const nestedErrors = {};
		nestedFormsRef.current.forEach((api, path) => {
			const result = api.validate();
			if (result?.fields) Object.entries(result.fields).forEach(([fieldPath, messages]) => {
				const mergedPath = fieldPath ? `${path}.${fieldPath}` : path;
				nestedErrors[mergedPath] = messages;
			});
		});
		return nestedErrors;
	};
	const getGroupedErrorsForPath = (path) => {
		if (!path) return [];
		const currentErrors = store.state.errors || {};
		const rootErrors = currentErrors[path] || [];
		const childKeys = Object.keys(currentErrors).filter((key) => {
			return key.startsWith(`${path}.`);
		});
		if (!childKeys.length) return rootErrors;
		const parentLabel = labelMap.get(path);
		const groupedMessages = [];
		childKeys.forEach((key) => {
			const wildcardPath = key.replace(/\\.\\d+(?=\\.|$)/g, ".*");
			const childLabel = labelMap.get(wildcardPath) || key.split(".").slice(-1)[0];
			(currentErrors[key] || []).forEach((message) => {
				if (parentLabel) {
					groupedMessages.push(buildGroupedMessage(String(message), parentLabel, childLabel));
					return;
				}
				groupedMessages.push(String(message));
			});
		});
		return Array.from(new Set([...rootErrors, ...groupedMessages]));
	};
	const handleSubmit = async () => {
		const errorsMap = validationEngine.validate(store.state.values)?.fields || {};
		const nestedErrors = validateNestedForms();
		const mergedErrors = {
			...errorsMap,
			...nestedErrors
		};
		if (Object.keys(mergedErrors).length > 0) {
			store.setErrors(mergedErrors);
			if (onErrorHandlerRef.current) onErrorHandlerRef.current(mergedErrors);
			return;
		}
		store.clearErrors();
		if (onSubmitHandlerRef.current) await onSubmitHandlerRef.current(store.state.values);
		if (parentForm && parentPath) parentForm.setFieldValue(parentPath, store.state.values);
		if (onSuccessHandlerRef.current) onSuccessHandlerRef.current(store.state.values);
	};
	const form = {
		schema: index.schema,
		store,
		index,
		Field: EngineField,
		getFieldValue: (path) => {
			return store.getValue(path);
		},
		setFieldValue: (path, value) => {
			return store.setValue(path, value);
		},
		getErrorMapFields: () => {
			return store.state.errors || {};
		},
		SchemaRenderer,
		handleSubmit,
		onChange: (handler) => {
			onChangeHandlerRef.current = handler;
		},
		onSubmit: (handler) => {
			onSubmitHandlerRef.current = handler;
		},
		onError: (handler) => {
			onErrorHandlerRef.current = handler;
		},
		onSuccess: (handler) => {
			onSuccessHandlerRef.current = handler;
		},
		registerNestedForm,
		unregisterNestedForm,
		getGroupedErrorsForPath,
		getConditionContext: (values, field) => {
			return getConditionContext?.(values, field) || {};
		}
	};
	formRef.current = form;
	useEffect(() => {
		if (!parentForm || !parentPath) return;
		const nestedApi = {
			path: parentPath,
			validate: () => {
				const result = validationEngine.validate(store.state.values);
				const fieldErrors = result?.fields || {};
				if (Object.keys(fieldErrors).length) store.setErrors(fieldErrors);
				else store.clearErrors();
				return result;
			},
			getValues: () => {
				return store.state.values;
			}
		};
		parentForm.registerNestedForm(parentPath, nestedApi);
		return () => {
			parentForm.unregisterNestedForm(parentPath);
		};
	}, [
		parentForm,
		parentPath,
		store,
		validationEngine
	]);
	return form;
};
var SchemaFormEngine = forwardRef(({ form, className, withoutForm = false }, ref) => {
	useImperativeHandle(ref, () => {
		return form;
	});
	if (withoutForm) return /* @__PURE__ */ jsx(SchemaEngineContext.Provider, {
		value: form,
		children: /* @__PURE__ */ jsx(SchemaProvider, {
			form,
			children: /* @__PURE__ */ jsx("div", {
				className,
				children: /* @__PURE__ */ jsx(SchemaRenderer, { schema: form.schema })
			})
		})
	});
	return /* @__PURE__ */ jsx(SchemaEngineContext.Provider, {
		value: form,
		children: /* @__PURE__ */ jsx(SchemaProvider, {
			form,
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: (event) => {
					event.preventDefault();
					event.stopPropagation();
					form.handleSubmit();
				},
				className,
				children: [/* @__PURE__ */ jsx(SchemaRenderer, { schema: form.schema }), /* @__PURE__ */ jsx("button", {
					type: "submit",
					tabIndex: -1,
					"aria-hidden": "true",
					className: "sr-only"
				})]
			})
		})
	});
});
SchemaFormEngine.displayName = "SchemaFormEngine";
//#endregion
export { SchemaFormEngine, useSchemaFormEngine };

//# sourceMappingURL=SchemaFormEngine.js.map