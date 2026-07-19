import {
    buildCraftCheckboxSelectComparisonHtml,
    checkboxSelectComparisonOptions,
    createButtonGroupComparisonRow,
    createComparisonLayout,
} from '../../../catalog/data/comparison.js';
import { checkboxSelectPlaygroundSections } from '../../../catalog/data/meta-checkbox-select.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkField } from '../../dom.js';

const DEMO_OPTIONS = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];

type CheckboxSelectElement = HTMLElement & {
    options: Array<{ label: string; value: string }>;
    value: string | string[];
};

function createPkCheckboxSelect(options: {
    showAllOption?: boolean;
    allLabel?: string;
    options?: Array<{ label: string; value: string }>;
    value?: string | string[];
}): CheckboxSelectElement {
    const select = document.createElement('pk-checkbox-select') as CheckboxSelectElement;

    if (options.showAllOption) {
        select.setAttribute('show-all-option', '');
    }

    if (options.allLabel) {
        select.setAttribute('all-label', options.allLabel);
    }

    select.options = options.options ?? DEMO_OPTIONS;
    select.value = options.value ?? [];

    return select;
}

/** Web component previews — one function per section id from checkboxSelectPlaygroundSpec. */
export const checkboxSelectWebSectionRenderers: PlaygroundSectionRendererMap = {
    craftComparison(preview) {
        const pkRows = document.createElement('div');
        pkRows.className = 'cmp-rows';

        pkRows.append(
            createButtonGroupComparisonRow(
                'With “All” option',
                createPkCheckboxSelect({
                    showAllOption: true,
                    allLabel: 'All users',
                    options: [...checkboxSelectComparisonOptions],
                    value: [],
                }),
            ),
            createButtonGroupComparisonRow(
                'All selected',
                createPkCheckboxSelect({
                    showAllOption: true,
                    allLabel: 'All users',
                    options: [...checkboxSelectComparisonOptions],
                    value: '*',
                }),
            ),
            createButtonGroupComparisonRow(
                'Selected values',
                createPkCheckboxSelect({
                    options: [...checkboxSelectComparisonOptions],
                    value: ['admins', 'editors'],
                }),
            ),
        );

        const craftRows = document.createElement('div');
        craftRows.innerHTML = buildCraftCheckboxSelectComparisonHtml();

        preview.append(createComparisonLayout(pkRows, craftRows));
    },

    basic(preview) {
        preview.append(createPkCheckboxSelect({ value: ['contact'] }));
    },

    withAll(preview) {
        const select = createPkCheckboxSelect({
            showAllOption: true,
            value: '*',
        });

        const output = document.createElement('p');
        output.className = 'pg-demo-output';
        output.style.marginTop = '0.75rem';
        output.style.fontSize = '0.875rem';
        output.style.color = 'var(--pk-color-gray-500)';

        const syncOutput = (): void => {
            output.textContent = `Value: ${JSON.stringify(select.value)}`;
        };

        select.addEventListener('pk-change', (event) => {
            const { value } = (event as CustomEvent<{ value: string | string[] }>).detail;
            select.value = value;
            syncOutput();
        });

        syncOutput();
        preview.append(select, output);
    },

    withLabel(preview) {
        const { fieldLabel, fieldInstructions } = checkboxSelectPlaygroundSections.withLabel;
        const select = createPkCheckboxSelect({
            value: ['contact', 'newsletter'],
        });
        preview.append(createPkField({
            label: fieldLabel,
            instructions: fieldInstructions,
        }, select));
    },
};
