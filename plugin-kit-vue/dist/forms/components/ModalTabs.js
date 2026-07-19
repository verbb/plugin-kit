import { Icon } from "../../components/Icon.js";
import { Tab, TabPanel, Tabs } from "../../components/Tabs.js";
import { SchemaEngineContextKey } from "../engine/context.js";
import { schemaSubtreeHasErrors } from "./schemaErrors.js";
import { computed, defineComponent, h, inject, onBeforeUnmount, provide, ref } from "vue";
//#region src/forms/components/ModalTabs.ts
var ModalTabsErrorsContext = Symbol("ModalTabsErrorsContext");
var useModalTabsErrors = () => {
	return inject(ModalTabsErrorsContext, ref({}));
};
/**
* Schema `$cmp: 'ModalTabs'` wraps stock `Tabs variant="modal"` and keeps tab
* error markers in sync with the shared SchemaForm store.
*/
var ModalTabs = Object.assign(defineComponent({
	name: "SchemaModalTabs",
	props: {
		schemaNode: {
			type: Object,
			default: void 0
		},
		class: {
			type: null,
			default: void 0
		},
		value: {
			type: String,
			default: void 0
		},
		defaultValue: {
			type: String,
			default: ""
		}
	},
	setup(props, { attrs, slots }) {
		const form = inject(SchemaEngineContextKey, null);
		const tabErrors = ref({});
		const uncontrolledValue = ref(props.value ?? props.defaultValue ?? "");
		const isControlled = computed(() => props.value !== void 0 && props.value !== null);
		const resolvedValue = computed(() => isControlled.value ? String(props.value) : uncontrolledValue.value);
		const getTabErrors = () => {
			const errors = {};
			const children = props.schemaNode?.children;
			if (!children || !form?.getErrorMapFields) return errors;
			const formErrors = form.getErrorMapFields() || {};
			(Array.isArray(children) ? children : Object.values(children)).forEach((item) => {
				if (typeof item !== "object" || item === null || Array.isArray(item)) return;
				const childNode = item;
				const value = typeof childNode.props?.value === "string" ? childNode.props.value : "";
				if (childNode.$cmp === "ModalTabsContent" && value) errors[value] = schemaSubtreeHasErrors(formErrors, childNode.children || []);
			});
			return errors;
		};
		const updateTabErrors = () => {
			tabErrors.value = getTabErrors();
		};
		updateTabErrors();
		const unsubscribe = form?.store?.subscribe(updateTabErrors);
		if (unsubscribe) onBeforeUnmount(unsubscribe);
		provide(ModalTabsErrorsContext, tabErrors);
		return () => {
			return h(Tabs, {
				...attrs,
				variant: "modal",
				value: resolvedValue.value,
				class: ["h-full min-h-0", props.class],
				onPkChange: (event) => {
					event.stopPropagation();
					const next = event.detail?.value;
					if (typeof next !== "string" || !next || isControlled.value) return;
					uncontrolledValue.value = next;
				}
			}, { default: () => slots.default?.() });
		};
	}
}), { usesSchemaNode: true });
var ModalTabsList = defineComponent({
	name: "SchemaModalTabsList",
	setup(_props, { slots }) {
		return () => slots.default?.();
	}
});
var ModalTabsTrigger = defineComponent({
	name: "SchemaModalTabsTrigger",
	props: {
		value: {
			type: String,
			default: void 0
		},
		class: {
			type: null,
			default: void 0
		}
	},
	setup(props, { attrs, slots }) {
		const tabErrors = useModalTabsErrors();
		return () => {
			const hasErrors = Boolean(props.value && tabErrors.value[props.value]);
			return h(Tab, {
				...attrs,
				value: props.value,
				"data-has-errors": hasErrors ? "true" : void 0,
				class: [hasErrors ? "text-[var(--pk-color-rose-600,#e11d48)]" : void 0, props.class],
				slot: "nav"
			}, { default: () => [...slots.default?.() ?? [], hasErrors ? h(Icon, {
				icon: "triangle-exclamation",
				class: "block size-3"
			}) : null] });
		};
	}
});
var ModalTabsContent = defineComponent({
	name: "SchemaModalTabsContent",
	props: {
		class: {
			type: null,
			default: void 0
		},
		value: {
			type: String,
			default: void 0
		}
	},
	setup(props, { attrs, slots }) {
		return () => h(TabPanel, {
			...attrs,
			value: props.value,
			class: props.class
		}, { default: () => h("div", { class: "grid grid-cols-1 gap-4" }, slots.default?.()) });
	}
});
//#endregion
export { ModalTabs, ModalTabsContent, ModalTabsList, ModalTabsTrigger, useModalTabsErrors };

//# sourceMappingURL=ModalTabs.js.map