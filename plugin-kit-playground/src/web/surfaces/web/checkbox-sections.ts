import {
    buildCraftCheckboxComparisonHtml,
    checkboxCheckedStates,
    checkboxUncheckedStates,
    createComparisonLayout,
    createComparisonMatrixItem,
    createStateMatrixRow,
} from '../../../catalog/data/comparison.js';
import { checkboxPlaygroundSections } from '../../../catalog/data/meta-checkbox.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkCheckbox } from '../../dom.js';

function createCheckboxMount(
    id: string,
    options: {
        labelText?: string;
        checked?: boolean;
        indeterminate?: boolean;
        disabled?: boolean;
        invalid?: boolean;
        focus?: boolean;
        ariaLabel?: string;
    },
): HTMLElement {
    return createPkCheckbox({
        id,
        label: options.labelText,
        checked: options.checked,
        indeterminate: options.indeterminate,
        disabled: options.disabled,
        invalid: options.invalid,
        state: options.focus ? 'focus-visible' : undefined,
        ariaLabel: options.ariaLabel,
    });
}

function createComparisonCheckbox(
    id: string,
    label: string,
    options: {
        checked?: boolean;
        disabled?: boolean;
        invalid?: boolean;
        focus?: boolean;
    } = {},
): HTMLElement {
    return createComparisonMatrixItem(
        createCheckboxMount(id, options),
        label,
    );
}

function slugify(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
}

/** Web component previews — one function per section id from checkboxPlaygroundSpec. */
export const checkboxWebSectionRenderers: PlaygroundSectionRendererMap = {
    craftComparison(preview) {
        const pkRows = document.createElement('div');
        pkRows.className = 'cmp-rows';

        pkRows.append(
            createStateMatrixRow(
                'Unchecked',
                checkboxUncheckedStates.map(({ label, invalid, disabled, focus }) => createComparisonCheckbox(
                    `pg-checkbox-unchecked-${slugify(label)}`,
                    label,
                    { invalid, disabled, focus },
                )),
            ),
            createStateMatrixRow(
                'Checked',
                checkboxCheckedStates.map(({ label, checked, invalid, disabled, focus }) => createComparisonCheckbox(
                    `pg-checkbox-checked-${slugify(label)}`,
                    label,
                    { checked, invalid, disabled, focus },
                )),
            ),
        );

        const craftRows = document.createElement('div');
        craftRows.innerHTML = buildCraftCheckboxComparisonHtml();

        preview.append(createComparisonLayout(pkRows, craftRows));
    },

    groupSpacing(preview) {
        preview.className = 'pg-card__inner pg-checkbox-groups';

        for (const { legend, items } of [
            {
                legend: 'Notifications',
                items: [
                    { id: 'pg-cb-notify-updates', label: 'Product updates', checked: true },
                    { id: 'pg-cb-notify-security', label: 'Security alerts', checked: true },
                    { id: 'pg-cb-notify-marketing', label: 'Marketing tips' },
                ],
            },
            {
                legend: 'Preferences',
                items: [
                    { id: 'pg-cb-pref-compact', label: 'Compact mode' },
                    { id: 'pg-cb-pref-autosave', label: 'Auto-save', checked: true },
                    { id: 'pg-cb-pref-offline', label: 'Offline access', disabled: true },
                ],
            },
        ]) {
            const fieldset = document.createElement('fieldset');
            fieldset.className = 'pg-checkbox-group';

            const legendEl = document.createElement('legend');
            legendEl.className = 'pg-checkbox-group__legend';
            legendEl.textContent = legend;
            fieldset.append(legendEl);

            for (const item of items) {
                fieldset.append(createCheckboxMount(item.id, {
                    labelText: item.label,
                    checked: item.checked,
                    disabled: item.disabled,
                }));
            }

            preview.append(fieldset);
        }
    },

    basicUsage(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createCheckboxMount('checkbox-basic', {
            ariaLabel: checkboxPlaygroundSections.basicUsage.ariaLabel,
        }));
    },

    checked(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createCheckboxMount('checkbox-checked', {
            ariaLabel: checkboxPlaygroundSections.checked.ariaLabel,
            checked: true,
        }));
    },

    disabled(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createCheckboxMount('checkbox-disabled', {
            ariaLabel: checkboxPlaygroundSections.disabled.ariaLabel,
            checked: true,
            disabled: true,
        }));
    },

    hint(preview) {
        preview.classList.add('pg-demo-narrow');
        const { label, hint } = checkboxPlaygroundSections.hint;
        preview.append(createPkCheckbox({
            id: 'checkbox-hint',
            label,
            hint,
        }));
    },
};
