import { buttonLoadingSpinnerSections } from '../../../catalog/data/meta-button.js';
import {
    spinnerButtonVariants,
    spinnerMatrixSizes,
    spinnerMatrixTones,
} from '../../../catalog/data/meta-spinner.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkButton, createPkSpinner } from '../../dom.js';

/** Web component previews — one function per section id from spinnerPlaygroundSpec. */
export const spinnerWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        preview.append(createPkSpinner());
    },

    colors(preview) {
        const row = document.createElement('div');
        row.className = 'cmp-row-items';

        for (const { tone } of spinnerMatrixTones) {
            row.append(createPkSpinner({ tone }));
        }

        preview.append(row);
    },

    buttonVariants(preview) {
        const row = document.createElement('div');
        row.className = 'cmp-row-items';

        for (const { label, variant } of spinnerButtonVariants) {
            row.append(createPkButton({ label, variant, loading: true }));
        }

        preview.append(row);
    },

    sizes(preview) {
        const row = document.createElement('div');
        row.className = 'cmp-row-items pg-spinner-size-row';

        for (const { label, size } of spinnerMatrixSizes) {
            const item = document.createElement('div');
            item.className = 'pg-spinner-size-item';
            item.append(
                createPkSpinner({ size }),
                Object.assign(document.createElement('span'), {
                    className: 'pg-spinner-size-label',
                    textContent: label,
                }),
            );
            row.append(item);
        }

        preview.append(row);
    },

    buttonLoadingOverrides(preview) {
        for (const sectionDef of buttonLoadingSpinnerSections) {
            const row = document.createElement('div');
            row.className = 'cmp-row-items';

            for (const buttonOptions of sectionDef.buttons) {
                row.append(createPkButton({
                    label: buttonOptions.label,
                    variant: buttonOptions.variant,
                    loading: true,
                    spinnerVariant: 'spinnerVariant' in buttonOptions ? buttonOptions.spinnerVariant : undefined,
                    spinnerTone: 'spinnerTone' in buttonOptions ? buttonOptions.spinnerTone : undefined,
                }));
            }

            const heading = document.createElement('h3');
            heading.className = 'cmp-row-heading';
            heading.textContent = sectionDef.title;
            preview.append(heading, row);
        }
    },
};
