import {
    buildCraftRadioComparisonHtml,
    createComparisonLayout,
    createComparisonMatrixItem,
    createStateMatrixRow,
    radioCheckedStates,
    radioUncheckedStates,
} from '../../../catalog/data/comparison.js';
import { radioGroupPlaygroundSections } from '../../../catalog/data/meta-radio-group.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkRadio, createPkRadioGroup } from '../../dom.js';

function slugify(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
}

function createComparisonRadio(
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
        createPkRadio({
            value: id,
            checked: options.checked,
            disabled: options.disabled,
            invalid: options.invalid,
            focus: options.focus,
        }),
        label,
    );
}

function createRichRadioLabel(title: string, description: string): HTMLElement {
    const wrap = document.createElement('span');

    const titleEl = document.createElement('span');
    titleEl.style.fontWeight = '500';
    titleEl.textContent = title;

    const descriptionEl = document.createElement('span');
    descriptionEl.style.display = 'block';
    descriptionEl.style.color = 'var(--pk-color-slate-500)';
    descriptionEl.textContent = description;

    wrap.append(titleEl, descriptionEl);
    return wrap;
}

/** Web component previews — one function per section id from radioGroupPlaygroundSpec. */
export const radioGroupWebSectionRenderers: PlaygroundSectionRendererMap = {
    craftComparison(preview) {
        const pkRows = document.createElement('div');
        pkRows.className = 'cmp-rows';

        pkRows.append(
            createStateMatrixRow(
                'Unchecked',
                radioUncheckedStates.map(({ label, invalid, disabled, focus }) => createComparisonRadio(
                    `pg-radio-unchecked-${slugify(label)}`,
                    label,
                    { invalid, disabled, focus },
                )),
            ),
            createStateMatrixRow(
                'Checked',
                radioCheckedStates.map(({ label, checked, invalid, disabled, focus }) => createComparisonRadio(
                    `pg-radio-checked-${slugify(label)}`,
                    label,
                    { checked, invalid, disabled, focus },
                )),
            ),
        );

        const craftRows = document.createElement('div');
        craftRows.innerHTML = buildCraftRadioComparisonHtml();

        preview.append(createComparisonLayout(pkRows, craftRows));
    },

    basicUsage(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkRadioGroup({
            id: 'pg-radio-basic',
            name: 'pg-radio-frequency',
            value: 'daily',
            items: [
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
            ],
        }));
    },

    supportingDescriptions(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkRadioGroup({
            id: 'pg-radio-descriptions',
            name: 'pg-radio-visibility',
            value: 'team',
            items: [
                {
                    value: 'team',
                    content: createRichRadioLabel('Team', 'Visible to the whole team.'),
                },
                {
                    value: 'private',
                    content: createRichRadioLabel('Private', 'Only visible to you.'),
                },
            ],
        }));
    },

    disabledOptions(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkRadioGroup({
            id: 'pg-radio-disabled',
            name: 'pg-radio-plan',
            value: 'starter',
            items: [
                { value: 'starter', label: 'Starter' },
                { value: 'pro', label: 'Pro' },
                { value: 'enterprise', label: 'Enterprise', disabled: true },
            ],
        }));
    },

    layoutAndError(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.display = 'flex';
        preview.style.flexDirection = 'column';
        preview.style.gap = '1rem';

        const { errorMessage } = radioGroupPlaygroundSections.layoutAndError;

        preview.append(
            createPkRadioGroup({
                id: 'pg-radio-horizontal',
                name: 'pg-radio-layout',
                value: 'daily',
                orientation: 'horizontal',
                items: [
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' },
                ],
            }),
            (() => {
                const field = document.createElement('div');
                field.style.display = 'flex';
                field.style.flexDirection = 'column';
                field.style.gap = '0.5rem';

                field.append(createPkRadioGroup({
                    id: 'pg-radio-invalid',
                    name: 'pg-radio-channel',
                    value: 'email',
                    invalid: true,
                    items: [
                        { value: 'email', label: 'Email' },
                        { value: 'sms', label: 'SMS' },
                    ],
                }));

                const error = document.createElement('p');
                error.style.margin = '0';
                error.style.fontSize = '0.875rem';
                error.style.color = 'var(--pk-color-rose-600)';
                error.textContent = errorMessage;
                field.append(error);

                return field;
            })(),
        );
    },
};
