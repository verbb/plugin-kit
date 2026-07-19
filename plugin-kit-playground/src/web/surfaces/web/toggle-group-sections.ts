import {
    playgroundIconAlignCenter,
    playgroundIconAlignLeft,
    playgroundIconAlignRight,
    playgroundIconBold,
    playgroundIconItalic,
    playgroundIconUnderline,
} from '../../../catalog/data/icons.js';
import { toggleGroupPlaygroundSections } from '../../../catalog/data/meta-toggle-group.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkToggleGroup } from '../../dom.js';

const formatIcons = {
    bold: playgroundIconBold,
    italic: playgroundIconItalic,
    underline: playgroundIconUnderline,
} as const;

const alignIcons = {
    left: playgroundIconAlignLeft,
    center: playgroundIconAlignCenter,
    right: playgroundIconAlignRight,
} as const;

function mapFormatItems(
    items: ReadonlyArray<{ value: string; ariaLabel?: string; label?: string }>,
) {
    return items.map((item) => {
        const formatKey = item.value.replace(/^(sm-|md-|lg-|outline-)/, '') as keyof typeof formatIcons;

        return {
            value: item.value,
            label: item.label,
            ariaLabel: item.ariaLabel,
            icon: formatIcons[formatKey] ?? formatIcons.bold,
        };
    });
}

function mapAlignItems(
    items: ReadonlyArray<{ value: string; ariaLabel: string }>,
) {
    return items.map((item) => {
        const alignKey = item.value.replace(/^(h-|v-)/, '') as keyof typeof alignIcons;

        return {
            value: item.value,
            ariaLabel: item.ariaLabel,
            icon: alignIcons[alignKey] ?? playgroundIconAlignLeft,
        };
    });
}

const {
    basicUsage,
    variants,
    sizes,
    orientation,
    spacing,
    selection,
} = toggleGroupPlaygroundSections;

/** Web component previews — one function per section id from toggleGroupPlaygroundSpec. */
export const toggleGroupWebSectionRenderers: PlaygroundSectionRendererMap = {
    basicUsage(preview) {
        preview.append(createPkToggleGroup({
            id: 'pg-toggle-group-basic',
            variant: 'outline',
            spacing: 0,
            items: mapAlignItems(basicUsage.items),
            defaultValue: ['center'],
        }));
    },

    variants(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';

        stack.append(
            createPkToggleGroup({
                id: 'pg-toggle-group-default',
                variant: 'default',
                spacing: 0,
                items: mapFormatItems(variants.defaultItems),
            }),
            createPkToggleGroup({
                id: 'pg-toggle-group-outline',
                variant: 'outline',
                spacing: 0,
                items: mapFormatItems(variants.outlineItems),
            }),
        );

        preview.append(stack);
    },

    sizes(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';

        for (const size of ['sm', 'default', 'lg'] as const) {
            stack.append(createPkToggleGroup({
                id: `pg-toggle-group-size-${size}`,
                spacing: 0,
                size: size === 'default' ? undefined : size,
                items: mapFormatItems(sizes.items.map((item) => ({
                    ...item,
                    value: `${size}-${item.value}`,
                }))),
            }));
        }

        preview.append(stack);
    },

    orientation(preview) {
        const row = document.createElement('div');
        row.className = 'pg-card__inner--row pg-toggle-group-orientation';

        row.append(
            createPkToggleGroup({
                id: 'pg-toggle-group-horizontal',
                variant: 'outline',
                spacing: 0,
                items: mapAlignItems(orientation.horizontalItems),
                defaultValue: ['h-center'],
            }),
            createPkToggleGroup({
                id: 'pg-toggle-group-vertical',
                variant: 'outline',
                orientation: 'vertical',
                spacing: 0,
                items: mapAlignItems(orientation.verticalItems),
                defaultValue: ['v-center'],
            }),
        );

        preview.append(row);
    },

    spacing(preview) {
        preview.append(createPkToggleGroup({
            id: 'pg-toggle-group-spacing',
            variant: 'outline',
            spacing: 2,
            items: mapAlignItems(spacing.items),
            defaultValue: ['center'],
        }));
    },

    selection(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';

        stack.append(
            createPkToggleGroup({
                id: 'pg-toggle-group-single',
                items: selection.singleItems,
                defaultValue: ['left'],
            }),
            createPkToggleGroup({
                id: 'pg-toggle-group-multiple',
                items: selection.multipleItems,
                multiple: true,
                defaultValue: ['bold'],
            }),
        );

        preview.append(stack);
    },
};
