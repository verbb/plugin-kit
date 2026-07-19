import {
    computed,
    defineComponent,
    h,
    inject,
    onBeforeUnmount,
    provide,
    ref,
    type Ref,
    type InjectionKey,
    type PropType,
    type Component,
} from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { Icon, Tab, TabPanel, Tabs } from '../../components/index.js';
import { SchemaEngineContextKey, type SchemaFormComponentProps } from '../engine/context.js';
import { schemaSubtreeHasErrors } from './schemaErrors.js';

const ModalTabsErrorsContext: InjectionKey<Ref<Record<string, boolean>>> = Symbol('ModalTabsErrorsContext');

export const useModalTabsErrors = (): Ref<Record<string, boolean>> => {
    return inject(ModalTabsErrorsContext, ref({}));
};

/**
 * Schema `$cmp: 'ModalTabs'` wraps stock `Tabs variant="modal"` and keeps tab
 * error markers in sync with the shared SchemaForm store.
 */
export const ModalTabs = Object.assign(defineComponent({
    name: 'SchemaModalTabs',
    props: {
        schemaNode: { type: Object as PropType<SchemaFormComponentProps['schemaNode']>, default: undefined },
        class: { type: null as unknown as PropType<unknown>, default: undefined },
        value: { type: String, default: undefined },
        defaultValue: { type: String, default: '' },
    },
    setup(props, { attrs, slots }) {
        const form = inject(SchemaEngineContextKey, null);
        const tabErrors = ref<Record<string, boolean>>({});
        const uncontrolledValue = ref(props.value ?? props.defaultValue ?? '');
        const isControlled = computed(() => props.value !== undefined && props.value !== null);
        const resolvedValue = computed(() => (isControlled.value ? String(props.value) : uncontrolledValue.value));

        const getTabErrors = (): Record<string, boolean> => {
            const errors: Record<string, boolean> = {};
            const children = props.schemaNode?.children;

            if (!children || !form?.getErrorMapFields) {
                return errors;
            }

            const formErrors = form.getErrorMapFields() || {};
            const values = Array.isArray(children) ? children : Object.values(children as Record<string, unknown>);

            values.forEach((item) => {
                if (typeof item !== 'object' || item === null || Array.isArray(item)) {
                    return;
                }

                const childNode = item as SchemaNode;
                const value = typeof childNode.props?.value === 'string' ? childNode.props.value : '';
                if (childNode.$cmp === 'ModalTabsContent' && value) {
                    errors[value] = schemaSubtreeHasErrors(formErrors, childNode.children || []);
                }
            });

            return errors;
        };

        const updateTabErrors = () => {
            tabErrors.value = getTabErrors();
        };

        updateTabErrors();
        const unsubscribe = form?.store?.subscribe(updateTabErrors);
        if (unsubscribe) {
            onBeforeUnmount(unsubscribe);
        }

        provide(ModalTabsErrorsContext, tabErrors);

        return () => {
            return h(
                Tabs as Component,
                {
                    ...attrs,
                    variant: 'modal',
                    value: resolvedValue.value,
                    class: ['h-full min-h-0', props.class],
                    onPkChange: (event: Event) => {
                        event.stopPropagation();
                        const next = (event as CustomEvent<{ value?: string }>).detail?.value;
                        if (typeof next !== 'string' || !next || isControlled.value) {
                            return;
                        }
                        uncontrolledValue.value = next;
                    },
                },
                { default: () => slots.default?.() },
            );
        };
    },
}), { usesSchemaNode: true as const });

export const ModalTabsList = defineComponent({
    name: 'SchemaModalTabsList',
    setup(_props, { slots }) {
        return () => slots.default?.();
    },
});

export const ModalTabsTrigger = defineComponent({
    name: 'SchemaModalTabsTrigger',
    props: {
        value: { type: String, default: undefined },
        class: { type: null as unknown as PropType<unknown>, default: undefined },
    },
    setup(props, { attrs, slots }) {
        const tabErrors = useModalTabsErrors();

        return () => {
            const hasErrors = Boolean(props.value && tabErrors.value[props.value]);

            return h(
                Tab as Component,
                {
                    ...attrs,
                    value: props.value,
                    'data-has-errors': hasErrors ? 'true' : undefined,
                    class: [hasErrors ? 'text-[var(--pk-color-rose-600,#e11d48)]' : undefined, props.class],
                    slot: 'nav',
                },
                {
                    default: () => [
                        ...(slots.default?.() ?? []),
                        hasErrors ? h(Icon as Component, { icon: 'triangle-exclamation', class: 'block size-3' }) : null,
                    ],
                },
            );
        };
    },
});

export const ModalTabsContent = defineComponent({
    name: 'SchemaModalTabsContent',
    props: {
        class: { type: null as unknown as PropType<unknown>, default: undefined },
        value: { type: String, default: undefined },
    },
    setup(props, { attrs, slots }) {
        return () => h(
            TabPanel as Component,
            {
                ...attrs,
                value: props.value,
                class: props.class,
            },
            {
                default: () => h('div', { class: 'grid grid-cols-1 gap-4' }, slots.default?.()),
            },
        );
    },
});
