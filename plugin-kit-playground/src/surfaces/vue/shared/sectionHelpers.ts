import { defineComponent, h, type Component, type VNodeChild } from 'vue';

export function slugify(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
}

export const codeBlockStyle = {
    margin: '12px 0 0',
    padding: '12px 14px',
    background: '#0f172a',
    color: '#e2e8f0',
    borderRadius: '8px',
    fontSize: '12.5px',
    lineHeight: 1.6,
    overflow: 'auto',
} as const;

export function gridStyle(minWidth: number): Record<string, string> {
    return {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
        gap: '12px',
        width: '100%',
    };
}

export const DemoValueReadout = defineComponent({
    name: 'DemoValueReadout',
    props: {
        value: { type: String, required: true },
        prefix: { type: String, default: 'Value' },
    },
    setup(props) {
        return () => h(
            'div',
            {
                class: 'pg-demo-output',
                style: { fontSize: '11px', color: 'var(--pk-color-gray-500)' },
            },
            [`${props.prefix}: `, h('code', props.value || '(empty)')],
        );
    },
});

export const CodeBlock = defineComponent({
    name: 'CodeBlock',
    props: {
        code: { type: String, required: true },
    },
    setup(props) {
        return () => h('pre', { style: codeBlockStyle }, h('code', props.code));
    },
});

export const ComparisonRow = defineComponent({
    name: 'ComparisonRow',
    props: {
        heading: { type: String, required: true },
        layout: { type: String as () => 'row' | 'stack', default: 'row' },
    },
    setup(props, { slots }) {
        return () => h('div', { class: 'cmp-row' }, [
            h('h3', { class: 'cmp-row-heading' }, props.heading),
            h(
                'div',
                {
                    class: props.layout === 'stack'
                        ? 'cmp-row-items cmp-row-items--state-matrix'
                        : 'cmp-row-items',
                },
                slots.default?.(),
            ),
        ]);
    },
});

export const StateMatrixCell = defineComponent({
    name: 'StateMatrixCell',
    props: {
        label: { type: String, default: undefined },
    },
    setup(props, { slots }) {
        return () => h('div', { class: 'cmp-state-cell' }, [
            slots.default?.(),
            props.label ? h('span', { class: 'cmp-state-cell__label' }, props.label) : null,
        ]);
    },
});

export function sectionComponent(name: string, render: () => VNodeChild): Component {
    return defineComponent({
        name,
        setup: () => render,
    });
}
