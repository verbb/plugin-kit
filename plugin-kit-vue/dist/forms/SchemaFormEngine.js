import { Separator } from "../components/Separator.js";
import { SchemaEngineContextKey } from "./engine/context.js";
import { getFormComponentRegistry } from "./registry.js";
import { SchemaFormFieldNode } from "./SchemaFormFieldNode.js";
import { isRecord, normalizeAttrs, readEventValue } from "./utils.js";
import { defineComponent, h, inject, onBeforeUnmount, onMounted, provide, ref, shallowRef } from "vue";
import { FormStateStore, buildGroupedMessage, createValidationEngine, evaluateCondition, normalizeSchema } from "@verbb/plugin-kit-forms";
//#region src/forms/SchemaFormEngine.ts
var normalizeServerErrors = (rawErrors) => {
	const normalized = {};
	if (!rawErrors) return normalized;
	const appendMessages = (path, messages) => {
		if (!path) return;
		const nextMessages = messages.filter((message) => message !== void 0 && message !== null && message !== "").map((message) => String(message));
		if (!nextMessages.length) return;
		if (!normalized[path]) normalized[path] = [];
		normalized[path].push(...nextMessages);
	};
	const collectErrors = (node, path) => {
		if (Array.isArray(node)) {
			if (node.length === 0) return;
			if (node.every((entry) => typeof entry === "string")) {
				appendMessages(path, node);
				return;
			}
			if (!path) {
				node.forEach((entry) => collectErrors(entry, path));
				return;
			}
			node.forEach((entry, index) => {
				collectErrors(entry, `${path}.${index}`);
			});
			return;
		}
		if (!isRecord(node)) return;
		Object.entries(node).forEach(([key, value]) => {
			collectErrors(value, path ? `${path}.${key}` : key);
		});
	};
	if (Array.isArray(rawErrors)) {
		collectErrors(rawErrors, "");
		return normalized;
	}
	if (isRecord(rawErrors) && "errors" in rawErrors) {
		collectErrors(rawErrors.errors, "");
		return normalized;
	}
	collectErrors(rawErrors, "");
	return normalized;
};
var createEngineFieldComponent = (formRef) => defineComponent({
	name: "SchemaEngineField",
	props: { name: {
		type: String,
		required: true
	} },
	setup(props, { slots }) {
		const version = ref(0);
		let unsubscribe;
		onMounted(() => {
			unsubscribe = formRef.value?.store.subscribe(() => {
				version.value += 1;
			});
		});
		onBeforeUnmount(() => {
			unsubscribe?.();
		});
		return () => {
			const form = formRef.value;
			if (!form) return null;
			version.value;
			const fieldApi = {
				state: { value: form.getFieldValue(props.name) },
				handleChange: (valueOrEvent) => {
					form.setFieldValue(props.name, readEventValue(valueOrEvent));
				},
				handleBlur: () => {
					form.store.setTouched(props.name, true);
				},
				errors: form.getErrorMapFields()[props.name] || []
			};
			return slots.default?.(fieldApi);
		};
	}
});
var buildConditionData = (form, field, values) => {
	const scopePath = typeof field._scopePath === "string" ? field._scopePath : "";
	const scopedValues = scopePath ? form.getFieldValue(scopePath) : null;
	const scopedObject = isRecord(scopedValues) ? scopedValues : {};
	const conditionContext = form.getConditionContext?.(values, field);
	const normalizedConditionContext = isRecord(conditionContext) ? conditionContext : {};
	const fieldData = isRecord(field._data) ? field._data : {};
	return {
		...values,
		...scopedObject,
		...fieldData,
		...normalizedConditionContext
	};
};
var renderSchemaItem = (schemaItem, index, form) => {
	return h(SchemaItem, {
		key: typeof schemaItem._id === "string" ? schemaItem._id : `schema-item-${index}`,
		field: schemaItem,
		form
	}, { default: () => h(SchemaRenderer, { schema: schemaItem }) });
};
var renderFormField = (schema, form) => {
	const { $field, ...props } = schema.$field ? {
		$field: schema.$field,
		...schema
	} : {
		$field: schema.type,
		...schema
	};
	return h(SchemaFormFieldNode, {
		fieldType: String($field ?? ""),
		schema,
		field: { ...props },
		form
	}, { default: () => props.children ? h(SchemaRenderer, { schema: props.children }) : null });
};
var renderHtmlElement = (schema) => {
	const { $el, children, attrs = {} } = schema;
	const normalizedAttrs = normalizeAttrs(isRecord(attrs) ? attrs : {});
	if (typeof $el !== "string" || !$el) return null;
	if ($el === "hr") return h(Separator, normalizedAttrs);
	return h($el, normalizedAttrs, children ? () => h(SchemaRenderer, { schema: children }) : void 0);
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
	return h(Component, componentProps, { default: () => children ? h(SchemaRenderer, { schema: children }) : null });
};
var SchemaItem = defineComponent({
	name: "SchemaItem",
	props: {
		field: {
			type: Object,
			required: true
		},
		form: {
			type: Object,
			required: true
		}
	},
	setup(props, { slots }) {
		const shouldShow = ref(true);
		const resolveVisibility = (values) => {
			if (!props.field.if) return true;
			return Boolean(evaluateCondition(props.field.if, buildConditionData(props.form, props.field, values)));
		};
		const update = () => {
			shouldShow.value = resolveVisibility(props.form.store.state.values);
		};
		update();
		onBeforeUnmount(props.form.store.subscribe(update));
		return () => {
			if (!shouldShow.value) return props.field.hideOnIf ? h("div", { style: { display: "none" } }, slots.default?.()) : null;
			return slots.default?.();
		};
	}
});
var SchemaRenderer = defineComponent({
	name: "SchemaRenderer",
	props: { schema: {
		type: null,
		required: true
	} },
	setup(props) {
		const form = provideAwareForm();
		return () => {
			const schema = props.schema;
			if (typeof schema === "string") return schema;
			if (Array.isArray(schema)) return schema.map((schemaItem, index) => {
				if (typeof schemaItem === "string") return schemaItem;
				if (!isRecord(schemaItem)) return null;
				return renderSchemaItem(schemaItem, index, form);
			});
			if (schema.$field || schema.$cmp === "Field") return renderFormField(schema, form);
			if (schema.$el) return renderHtmlElement(schema);
			if (schema.$cmp) return renderFormComponent(schema);
			console.warn("Unknown schema item:", schema);
			return null;
		};
	}
});
var provideAwareForm = () => {
	const form = inject(SchemaEngineContextKey, null);
	if (!form) throw new Error("SchemaRenderer must be used within SchemaFormEngine.");
	return form;
};
var useSchemaFormEngine = ({ schemaIndex = null, defaultValues = {}, errors, onChange, getConditionContext, parentForm, parentPath }) => {
	if (!schemaIndex) throw new Error("SchemaFormEngine requires a compiled schemaIndex.");
	const index = {
		...schemaIndex,
		schema: normalizeSchema(schemaIndex.schema)
	};
	const store = new FormStateStore(defaultValues);
	const validationEngine = createValidationEngine(index, { conditionDataResolver: getConditionContext });
	const labelMap = /* @__PURE__ */ new Map();
	const nestedForms = /* @__PURE__ */ new Map();
	const formRef = shallowRef(null);
	const Field = createEngineFieldComponent(formRef);
	index.fieldEntries.forEach((entry) => {
		if (entry.path) {
			const label = String(entry.field?.label || entry.field?.name || entry.path);
			labelMap.set(entry.path, label);
		}
	});
	let onSubmitHandler = null;
	let onErrorHandler = null;
	let onSuccessHandler = null;
	let onChangeHandler = onChange ? (value) => {
		if (formRef.value) onChange(value, formRef.value);
	} : null;
	const validateNestedForms = () => {
		const nestedErrors = {};
		nestedForms.forEach((api, path) => {
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
		const childKeys = Object.keys(currentErrors).filter((key) => key.startsWith(`${path}.`));
		if (!childKeys.length) return rootErrors;
		const parentLabel = labelMap.get(path);
		const groupedMessages = [];
		childKeys.forEach((key) => {
			const wildcardPath = key.replace(/\.\d+(?=\.|$)/g, ".*");
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
			onErrorHandler?.(mergedErrors);
			return;
		}
		store.clearErrors();
		await onSubmitHandler?.(store.state.values);
		if (parentForm && parentPath) parentForm.setFieldValue(parentPath, store.state.values);
		onSuccessHandler?.(store.state.values);
	};
	const form = {
		schema: index.schema,
		store,
		index,
		Field,
		getFieldValue: (path) => store.getValue(path),
		setFieldValue: (path, value) => store.setValue(path, value),
		getErrorMapFields: () => store.state.errors || {},
		SchemaRenderer,
		handleSubmit,
		onChange: (handler) => {
			onChangeHandler = handler;
		},
		onSubmit: (handler) => {
			onSubmitHandler = handler;
		},
		onError: (handler) => {
			onErrorHandler = handler;
		},
		onSuccess: (handler) => {
			onSuccessHandler = handler;
		},
		registerNestedForm: (path, api) => {
			nestedForms.set(path, api);
		},
		unregisterNestedForm: (path) => {
			nestedForms.delete(path);
		},
		getGroupedErrorsForPath,
		getConditionContext: (values, field) => getConditionContext?.(values, field) || {}
	};
	formRef.value = form;
	onBeforeUnmount(store.subscribe(() => {
		onChangeHandler?.(store.state.values);
	}));
	const normalized = normalizeServerErrors(errors);
	if (Object.keys(normalized).length) store.setErrors(normalized);
	if (parentForm && parentPath) {
		const nestedApi = {
			path: parentPath,
			validate: () => {
				const result = validationEngine.validate(store.state.values);
				const fieldErrors = result?.fields || {};
				if (Object.keys(fieldErrors).length) store.setErrors(fieldErrors);
				else store.clearErrors();
				return result;
			},
			getValues: () => store.state.values
		};
		parentForm.registerNestedForm(parentPath, nestedApi);
		onBeforeUnmount(() => {
			parentForm.unregisterNestedForm(parentPath);
		});
	}
	return form;
};
var SchemaFormEngine = defineComponent({
	name: "SchemaFormEngine",
	props: {
		form: {
			type: Object,
			required: true
		},
		class: {
			type: null,
			default: void 0
		},
		withoutForm: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { expose }) {
		expose(props.form);
		provide(SchemaEngineContextKey, props.form);
		return () => {
			const content = h(SchemaRenderer, { schema: props.form.schema });
			if (props.withoutForm) return h("div", { class: props.class }, content);
			return h("form", {
				class: props.class,
				onSubmit: (event) => {
					event.preventDefault();
					event.stopPropagation();
					props.form.handleSubmit();
				}
			}, [content, h("button", {
				type: "submit",
				tabindex: -1,
				"aria-hidden": "true",
				class: "sr-only"
			})]);
		};
	}
});
//#endregion
export { SchemaFormEngine, useSchemaFormEngine };

//# sourceMappingURL=SchemaFormEngine.js.map