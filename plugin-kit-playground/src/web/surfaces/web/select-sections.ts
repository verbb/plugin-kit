import {
    buildCraftSelectComparisonHtml,
    createComparisonLayout,
    createInputStateCell,
    createStateMatrixRow,
    selectFieldStates,
} from '../../../catalog/data/comparison.js';
import {
    selectFruitItems,
    selectLargeFruitItems,
    selectPlaygroundSections,
    selectStatusInputItems,
    selectStatusItems,
} from '../../../catalog/data/meta-select.js';
import { playgroundIconFlag, playgroundIconHouse } from '../../../catalog/data/icons.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkStatus } from '../../dom.js';

type SelectOptions = {
    placeholder?: string;
    value?: string;
    multiple?: boolean;
    clearable?: boolean;
    size?: string;
    width?: 'full';
    invalid?: boolean;
    disabled?: boolean;
    state?: 'focus-visible';
    style?: Partial<CSSStyleDeclaration>;
};

function appendOptions(
    select: HTMLElement,
    items: ReadonlyArray<{ value: string; label: string }>,
): void {
    for (const { value, label } of items) {
        const option = document.createElement('pk-option');
        option.value = value;
        option.textContent = label;
        select.append(option);
    }
}

function appendSelectSlotIcon(select: HTMLElement, iconHtml: string, slot: 'start' | 'end'): void {
    const template = document.createElement('template');
    template.innerHTML = iconHtml.trim();
    const icon = template.content.firstElementChild;

    if (icon) {
        icon.setAttribute('slot', slot);
        icon.setAttribute('aria-hidden', 'true');
        select.append(icon);
    }
}

function createSelect(
    items: ReadonlyArray<{ value: string; label: string }>,
    options: SelectOptions = {},
): HTMLElement {
    const select = document.createElement('pk-select');

    if (options.multiple) {
        select.setAttribute('multiple', '');
    }

    if (options.clearable) {
        select.setAttribute('clearable', '');
    }

    if (options.placeholder) {
        select.placeholder = options.placeholder;
    }

    appendOptions(select, items);

    if (options.value) {
        select.value = options.value;
    }

    if (options.size && options.size !== 'default') {
        select.setAttribute('size', options.size);
    }

    if (options.width) {
        select.setAttribute('width', options.width);
    }

    if (options.invalid) {
        select.setAttribute('invalid', '');
    }

    if (options.disabled) {
        select.setAttribute('disabled', '');
    }

    if (options.state) {
        select.dataset.state = options.state;
    }

    if (options.style) {
        Object.assign(select.style, options.style);
    }

    return select;
}

function createDecoratedSelect(label: string, options: SelectOptions = {}): HTMLElement {
    const select = createSelect([{ value: 'demo', label }], {
        ...options,
        value: 'demo',
    });

    appendSelectSlotIcon(select, playgroundIconHouse, 'start');
    appendSelectSlotIcon(select, playgroundIconFlag, 'end');

    return select;
}

function createStatusSelect(
    items: ReadonlyArray<{ value: string; label: string; status: string }>,
    options: SelectOptions = {},
): HTMLElement {
    const select = createSelect([], options);

    for (const { value, label, status } of items) {
        const option = document.createElement('pk-option');
        option.value = value;

        const indicator = createPkStatus({ status, ariaLabel: label });
        indicator.setAttribute('slot', 'start');
        option.append(indicator, document.createTextNode(label));
        select.append(option);
    }

    if (options.value) {
        select.value = options.value;
    }

    return select;
}

function createGroupedSelect(): HTMLElement {
    const select = document.createElement('pk-select');
    select.placeholder = 'Select produce';

    const groups = [
        {
            label: 'Fruits',
            options: selectFruitItems,
        },
        {
            label: 'Vegetables',
            options: [
                { value: 'carrot', label: 'Carrot' },
                { value: 'broccoli', label: 'Broccoli' },
                { value: 'spinach', label: 'Spinach' },
            ],
        },
    ];

    for (const [index, group] of groups.entries()) {
        if (index > 0) {
            select.append(document.createElement('pk-separator'));
        }

        const optionGroup = document.createElement('pk-option-group');
        optionGroup.label = group.label;

        for (const { value, label } of group.options) {
            const option = document.createElement('pk-option');
            option.value = value;
            option.textContent = label;
            optionGroup.append(option);
        }

        select.append(optionGroup);
    }

    return select;
}

function createLabelRow(control: HTMLElement, label: string): HTMLElement {
    const row = document.createElement('div');
    row.className = 'pg-select-size-row';
    const text = document.createElement('div');
    text.className = 'pg-select-size-row__label';
    text.textContent = label;
    row.append(text, control);
    return row;
}

/** Web component previews — one function per section id from selectPlaygroundSpec. */
export const selectWebSectionRenderers: PlaygroundSectionRendererMap = {
    craftComparison(preview) {
        const pkRows = document.createElement('div');
        pkRows.className = 'cmp-rows';

        pkRows.append(
            createStateMatrixRow(
                'Field states',
                selectFieldStates.map(({ label, placeholder, invalid, disabled, focus }) => createInputStateCell(
                    createSelect(selectStatusItems, {
                        placeholder,
                        invalid,
                        disabled,
                        width: 'full',
                        state: focus ? 'focus-visible' : undefined,
                        style: { width: '9rem' },
                    }),
                    label,
                )),
                'stack',
            ),
        );

        const craftRows = document.createElement('div');
        craftRows.innerHTML = buildCraftSelectComparisonHtml();

        preview.append(createComparisonLayout(pkRows, craftRows));
    },

    basicUsage(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createSelect(selectFruitItems, { placeholder: 'Select a fruit' }));
    },

    sizes(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack pg-demo-narrow';
        stack.append(
            ...selectPlaygroundSections.sizes.items.map(({ label, size }) => createLabelRow(
                createSelect(selectFruitItems, { value: 'apple', size }),
                label,
            )),
        );
        preview.append(stack);
    },

    widths(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack pg-demo-narrow';
        const fixedWrap = document.createElement('div');
        fixedWrap.className = 'pg-select-width-fixed';
        fixedWrap.append(createSelect(selectFruitItems, {
            value: 'apple',
            width: 'full',
        }));
        const fullWrap = document.createElement('div');
        fullWrap.className = 'pg-select-width-full';
        fullWrap.append(createSelect(selectFruitItems, {
            value: 'banana',
            width: 'full',
        }));
        stack.append(fixedWrap, fullWrap);
        preview.append(stack);
    },

    grouped(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createGroupedSelect());
    },

    longList(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createSelect(selectLargeFruitItems, {
            placeholder: 'Select a fruit',
            value: 'apple',
        }));
    },

    decorations(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack pg-demo-narrow';
        stack.append(
            ...selectPlaygroundSections.decorations.items.map(({ label, size }) => createLabelRow(
                createDecoratedSelect(label, { size }),
                label,
            )),
        );
        preview.append(stack);
    },

    statusInput(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createStatusSelect(selectStatusInputItems, {
            placeholder: 'Select status',
            value: 'testing',
        }));
    },

    multiple(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createSelect(selectStatusItems, {
            multiple: true,
            placeholder: 'Choose statuses…',
        }));
    },

    clearable(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createSelect(selectStatusItems, {
            placeholder: 'Choose status…',
            clearable: true,
        }));
    },
};
