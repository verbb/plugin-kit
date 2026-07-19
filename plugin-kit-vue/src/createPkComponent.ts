import { assignSlotNodes, type Slots } from '@lit-labs/vue-utils/wrapper-utils.js';
import { defineComponent, h } from 'vue';

/**
 * Minimal Vue facade over a registered `<pk-*>` custom element.
 * Props and listeners pass through; default slot children are distributed with slot attributes.
 */
export function createPkComponent(options: { name: string; tagName: string }) {
    return defineComponent({
        name: options.name,
        inheritAttrs: false,
        setup(_props, { attrs, slots }) {
            return () => h(
                options.tagName,
                attrs,
                assignSlotNodes(slots as Slots),
            );
        },
    });
}

/** Turn `pk-date-picker` → `PkDatePicker` for consistent facade names. */
export function pkTagToComponentName(tagName: string): string {
    const slug = tagName.startsWith('pk-') ? tagName.slice(3) : tagName;

    return `Pk${slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')}`;
}

/** Batch-create pass-through facades for a tag → export name map. */
export function createPkComponentFamily(family: Record<string, string>) {
    const components: Record<string, ReturnType<typeof createPkComponent>> = {};

    for (const [exportName, tagName] of Object.entries(family)) {
        components[exportName] = createPkComponent({
            name: pkTagToComponentName(tagName),
            tagName,
        });
    }

    return components;
}
