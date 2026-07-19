import { defineAsyncComponent, defineComponent, h, type Component } from 'vue';
import {
    componentRegistry,
    VUE_ADAPTER_IDS,
    VUE_FULL_PREVIEW_IDS,
} from '@verbb/plugin-kit-playground';

import type { SurfacePreviewDefinition } from './types.js';
import BasicPreviewPage from './shared/BasicPreviewPage.vue';

const PlaceholderPreview = defineAsyncComponent(() => import('./previews/PlaceholderPreview.vue'));

const dedicatedPreviewLoaders: Record<string, ReturnType<typeof defineAsyncComponent>> = {
    button: defineAsyncComponent(() => import('./previews/ButtonPreview.vue')),
    'button-group': defineAsyncComponent(() => import('./previews/ButtonGroupPreview.vue')),
    calendar: defineAsyncComponent(() => import('./previews/CalendarPreview.vue')),
    checkbox: defineAsyncComponent(() => import('./previews/CheckboxPreview.vue')),
    'checkbox-select': defineAsyncComponent(() => import('./previews/CheckboxSelectPreview.vue')),
    'code-editor': defineAsyncComponent(() => import('./previews/CodeEditorPreview.vue')),
    'color-input': defineAsyncComponent(() => import('./previews/ColorInputPreview.vue')),
    combobox: defineAsyncComponent(() => import('./previews/ComboboxPreview.vue')),
    'copy-button': defineAsyncComponent(() => import('./previews/CopyButtonPreview.vue')),
    'date-picker': defineAsyncComponent(() => import('./previews/DatePickerPreview.vue')),
    dialog: defineAsyncComponent(() => import('./previews/DialogPreview.vue')),
    'dropdown-menu': defineAsyncComponent(() => import('./previews/DropdownMenuPreview.vue')),
    field: defineAsyncComponent(() => import('./previews/FieldPreview.vue')),
    icon: defineAsyncComponent(() => import('./previews/IconPreview.vue')),
    input: defineAsyncComponent(() => import('./previews/InputPreview.vue')),
    lightswitch: defineAsyncComponent(() => import('./previews/LightswitchPreview.vue')),
    popover: defineAsyncComponent(() => import('./previews/PopoverPreview.vue')),
    'radio-group': defineAsyncComponent(() => import('./previews/RadioGroupPreview.vue')),
    'scroll-area': defineAsyncComponent(() => import('./previews/ScrollAreaPreview.vue')),
    select: defineAsyncComponent(() => import('./previews/SelectPreview.vue')),
    separator: defineAsyncComponent(() => import('./previews/SeparatorPreview.vue')),
    spinner: defineAsyncComponent(() => import('./previews/SpinnerPreview.vue')),
    status: defineAsyncComponent(() => import('./previews/StatusPreview.vue')),
    tabs: defineAsyncComponent(() => import('./previews/TabsPreview.vue')),
    textarea: defineAsyncComponent(() => import('./previews/TextareaPreview.vue')),
    'time-picker': defineAsyncComponent(() => import('./previews/TimePickerPreview.vue')),
    'tiptap-content': defineAsyncComponent(() => import('./previews/TiptapContentPreview.vue')),
    'tiptap-editor': defineAsyncComponent(() => import('./previews/TiptapEditorPreview.vue')),
    'tiptap-input': defineAsyncComponent(() => import('./previews/TiptapInputPreview.vue')),
    toggle: defineAsyncComponent(() => import('./previews/TogglePreview.vue')),
    'toggle-group': defineAsyncComponent(() => import('./previews/ToggleGroupPreview.vue')),
    tooltip: defineAsyncComponent(() => import('./previews/TooltipPreview.vue')),
};

function createBasicVuePreview(entry: (typeof componentRegistry)[number]): SurfacePreviewDefinition {
    const BasicPreview = defineComponent({
        name: `BasicVuePreview_${entry.id}`,
        setup() {
            return () => h(BasicPreviewPage, { entry });
        },
    });

    return {
        id: entry.id,
        title: entry.title,
        component: BasicPreview,
    };
}

export const surfacePreviews: SurfacePreviewDefinition[] = componentRegistry.map((entry) => {
    const dedicated = dedicatedPreviewLoaders[entry.id];

    if (dedicated) {
        return {
            id: entry.id,
            title: entry.title,
            component: dedicated,
        };
    }

    if (VUE_ADAPTER_IDS.has(entry.id)) {
        return createBasicVuePreview(entry);
    }

    return {
        id: entry.id,
        title: entry.title,
        component: PlaceholderPreview,
    };
});

export const placeholderPreview: Component = PlaceholderPreview;

export function getSurfacePreview(id: string): SurfacePreviewDefinition | undefined {
    return surfacePreviews.find((preview) => preview.id === id);
}

/** @deprecated Prefer `getSurfacePreview` — kept for coverage tooling. */
export const VUE_PREVIEW_IDS = new Set([
    ...VUE_FULL_PREVIEW_IDS,
    ...componentRegistry
        .filter((entry) => VUE_ADAPTER_IDS.has(entry.id) && !VUE_FULL_PREVIEW_IDS.has(entry.id))
        .map((entry) => entry.id),
]);
