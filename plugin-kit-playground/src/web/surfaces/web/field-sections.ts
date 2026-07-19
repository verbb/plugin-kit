import { fieldPlaygroundSections } from '../../../catalog/data/meta-field.js';
import { playgroundIconAdd } from '../../../catalog/data/icons.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkButton, createPkField, createPkInput } from '../../dom.js';

const {
    standaloneLabels,
    errorsAndWarnings,
    translatable,
    tip,
    inlineCode,
    headerEnd,
} = fieldPlaygroundSections;

/** Web component previews — one function per section id from fieldPlaygroundSpec. */
export const fieldWebSectionRenderers: PlaygroundSectionRendererMap = {
    standaloneLabels(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkInput({
            label: standaloneLabels.label,
            instructions: standaloneLabels.instructions,
            placeholder: standaloneLabels.placeholder,
        }));
    },

    errorsAndWarnings(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkField(
            {
                label: errorsAndWarnings.label,
                instructions: errorsAndWarnings.instructions,
                required: true,
                errors: [errorsAndWarnings.error],
                warning: errorsAndWarnings.warning,
            },
            createPkInput({ placeholder: errorsAndWarnings.placeholder, invalid: true }),
        ));
    },

    translatable(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkField(
            {
                label: translatable.label,
                instructions: translatable.instructions,
                required: true,
                translatable: true,
            },
            createPkInput({ placeholder: translatable.placeholder }),
        ));
    },

    tip(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkField(
            {
                label: tip.label,
                instructions: tip.instructions,
                required: true,
                tip: tip.tip,
            },
            createPkInput({
                placeholder: tip.placeholder,
                value: tip.value,
                mono: true,
            }),
        ));
    },

    inlineCode(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkField(
            {
                label: inlineCode.label,
                instructions: inlineCode.instructions,
                required: true,
                tip: inlineCode.tip,
                warning: inlineCode.warning,
                errors: [inlineCode.error],
            },
            createPkInput({ placeholder: inlineCode.placeholder, invalid: true }),
        ));
    },

    headerEnd(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkField(
            {
                label: headerEnd.label,
                instructions: headerEnd.instructions,
                headerEnd: createPkButton({
                    label: headerEnd.action,
                    size: 'sm',
                    startSlot: playgroundIconAdd,
                }),
            },
            Object.assign(document.createElement('div'), {
                className: 'pg-field-header-end-demo',
                textContent: 'Option rows would render here.',
            }),
        ));
    },
};
