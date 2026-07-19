export type FieldStateMatrixItem = {
    label: string;
    focus?: boolean;
    invalid?: boolean;
    disabled?: boolean;
};

export type CheckboxStateMatrixItem = FieldStateMatrixItem & {
    checked?: boolean;
};

export type RadioStateMatrixItem = FieldStateMatrixItem & {
    checked?: boolean;
};

export type LightswitchStateMatrixItem = FieldStateMatrixItem & {
    on?: boolean;
};

export const checkboxPlaygroundComparison = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Checkbox states vs Craft CP.',
    },
    groupSpacing: {
        title: 'Group Spacing',
        description: 'Grouped checkboxes — label alignment and vertical spacing.',
    },
} as const;

export const radioPlaygroundComparison = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Radio states vs Craft CP.',
    },
} as const;

export const lightswitchPlaygroundComparison = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Switch states vs Craft CP.',
    },
    sizeMatrix: {
        title: 'Size matrix',
        description: 'Handle spacing and label alignment across sizes.',
    },
} as const;

export const checkboxUncheckedStates: FieldStateMatrixItem[] = [
    { label: 'Default' },
    { label: 'Focus', focus: true },
    { label: 'Invalid', invalid: true },
    { label: 'Invalid Focus', invalid: true, focus: true },
    { label: 'Disabled', disabled: true },
];

export const checkboxCheckedStates: CheckboxStateMatrixItem[] = [
    { label: 'Checked', checked: true },
    { label: 'Checked Focus', checked: true, focus: true },
    { label: 'Checked Invalid', checked: true, invalid: true },
    { label: 'Checked Invalid Focus', checked: true, invalid: true, focus: true },
    { label: 'Checked Disabled', checked: true, disabled: true },
];

export const radioUncheckedStates: RadioStateMatrixItem[] = [
    { label: 'Default' },
    { label: 'Focus', focus: true },
    { label: 'Invalid', invalid: true },
    { label: 'Invalid Focus', invalid: true, focus: true },
    { label: 'Disabled', disabled: true },
];

export const radioCheckedStates: RadioStateMatrixItem[] = [
    { label: 'Checked', checked: true },
    { label: 'Checked Focus', checked: true, focus: true },
    { label: 'Checked Invalid', checked: true, invalid: true },
    { label: 'Checked Invalid Focus', checked: true, invalid: true, focus: true },
    { label: 'Checked Disabled', checked: true, disabled: true },
];

export const lightswitchUncheckedStates: FieldStateMatrixItem[] = [
    { label: 'Default' },
    { label: 'Focus', focus: true },
    { label: 'Invalid', invalid: true },
    { label: 'Invalid Focus', invalid: true, focus: true },
    { label: 'Disabled', disabled: true },
];

export const lightswitchCheckedStates: LightswitchStateMatrixItem[] = [
    { label: 'Checked', on: true },
    { label: 'Checked Focus', on: true, focus: true },
    { label: 'Checked Invalid', on: true, invalid: true },
    { label: 'Checked Invalid Focus', on: true, invalid: true, focus: true },
    { label: 'Checked Disabled', on: true, disabled: true },
];

export const lightswitchMatrixSizes = [
    { label: 'Extra extra small', size: 'xxs' as const },
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
];

export const inputMatrixSizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
] as const;

export const inputPlaygroundComparison = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Field states vs Craft CP.',
    },
} as const;

export type InputStateMatrixItem = FieldStateMatrixItem & {
    placeholder: string;
};

export const inputFieldStates: InputStateMatrixItem[] = [
    { label: 'Default', placeholder: 'Default' },
    { label: 'Focus', placeholder: 'Focus', focus: true },
    { label: 'Invalid', placeholder: 'Invalid', invalid: true },
    { label: 'Invalid Focus', placeholder: 'Invalid Focus', invalid: true, focus: true },
    { label: 'Disabled', placeholder: 'Disabled', disabled: true },
];

export const selectPlaygroundComparison = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Closed trigger states vs Craft `.select`.',
    },
} as const;

/** Same closed-state matrix as inputs — placeholder labels read as the closed trigger value. */
export const selectFieldStates = inputFieldStates;

export const textareaPlaygroundComparison = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Field states vs Craft CP.',
    },
} as const;

export type TextareaStateMatrixItem = FieldStateMatrixItem & {
    placeholder: string;
};

export const textareaFieldStates: TextareaStateMatrixItem[] = [
    { label: 'Default', placeholder: 'Default' },
    { label: 'Focus', placeholder: 'Focus', focus: true },
    { label: 'Invalid', placeholder: 'Invalid', invalid: true },
    { label: 'Invalid Focus', placeholder: 'Invalid Focus', invalid: true, focus: true },
    { label: 'Disabled', placeholder: 'Disabled', disabled: true },
];

export const buttonGroupPlaygroundComparison = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Craft CP toolbar patterns — `.btngroup`, view toggles, preview/share.',
    },
} as const;

export type CraftButtonGroupButton = {
    text?: string;
    variant?: 'submit' | 'hairline-dark';
    menubtn?: boolean;
    addIcon?: boolean;
    ariaLabel?: string;
    icon?: string;
    pressed?: boolean;
    active?: boolean;
    title?: string;
    className?: string;
    tag?: 'button' | 'a';
    href?: string;
    previewBtn?: boolean;
    viewBtn?: boolean;
};

export type CraftBtngroupOptions = {
    class?: string | string[];
    tag?: 'div' | 'section';
    ariaLabel?: string;
    attrs?: Record<string, string>;
};

function craftButtonMarkup(button: CraftButtonGroupButton): string {
    const tag = button.tag ?? 'button';
    const typeAttr = tag === 'button' ? ' type="button"' : '';
    const hrefAttr = button.href ? ` href="${button.href}"` : '';
    const targetAttr = tag === 'a' ? ' target="_blank"' : '';
    const classes = [
        'btn',
        button.previewBtn ? 'preview-btn' : '',
        button.viewBtn ? 'view-btn' : '',
        button.variant === 'submit' ? 'submit' : '',
        button.variant === 'hairline-dark' ? 'hairline-dark' : '',
        button.menubtn ? 'menubtn' : '',
        button.addIcon ? 'add icon' : '',
        button.active ? 'active' : '',
        button.className ?? '',
    ].filter(Boolean).join(' ');
    const attrs = [
        button.icon ? ` data-icon="${button.icon}"` : '',
        button.ariaLabel ? ` aria-label="${button.ariaLabel}"` : '',
        button.title ? ` title="${button.title}"` : '',
        button.pressed !== undefined ? ` aria-pressed="${button.pressed ? 'true' : 'false'}"` : '',
        button.menubtn ? ' data-disclosure-trigger=""' : '',
    ].join('');
    const content = button.previewBtn
        ? `<span class="label">${button.text ?? 'Preview'}</span>`
        : (button.text ?? '');

    return `<${tag}${typeAttr}${hrefAttr}${targetAttr} class="${classes}"${attrs}>${content}</${tag}>`;
}

/** Craft CP `.btngroup` — flush toolbars, exclusive toggles, and split actions. */
export function craftBtngroupMarkup(
    buttons: CraftButtonGroupButton[],
    options: CraftBtngroupOptions = {},
): string {
    const tag = options.tag ?? 'div';
    const classes = options.class
        ? (Array.isArray(options.class) ? options.class : [options.class])
        : ['btngroup'];
    const classAttr = classes.join(' ');
    const ariaLabel = options.ariaLabel ? ` aria-label="${options.ariaLabel}"` : '';
    const extraAttrs = options.attrs
        ? Object.entries(options.attrs).map(([key, value]) => ` ${key}="${value}"`).join('')
        : '';
    const markup = buttons.map((button) => craftButtonMarkup(button)).join('');

    return `<${tag} class="${classAttr}"${ariaLabel}${extraAttrs}>${markup}</${tag}>`;
}

/** Craft CP split control — label action + `.menubtn` chevron trigger. */
export function craftContextMenuMarkup(
    primary: { text: string; variant?: 'submit' | 'hairline-dark' },
    trigger: { ariaLabel: string; variant?: 'submit' | 'hairline-dark' },
): string {
    const variant = primary.variant ?? 'submit';
    const baseClass = ['btn', variant === 'submit' ? 'submit' : '', variant === 'hairline-dark' ? 'hairline-dark' : '']
        .filter(Boolean)
        .join(' ');
    const triggerClass = `${baseClass} menubtn`;

    return `<div class="context-menu-container"><button type="button" class="${baseClass}">${primary.text}</button><button type="button" class="${triggerClass}" aria-label="${trigger.ariaLabel}" data-disclosure-trigger=""></button></div>`;
}

/** Craft CP index “New entry” split button — `.btngroup.submit` with `.add.icon` + `.menubtn`. */
export function craftNewEntryBtngroupMarkup(): string {
    return craftBtngroupMarkup([
        { text: 'New entry', variant: 'submit', addIcon: true },
        {
            menubtn: true,
            variant: 'submit',
            className: 'btngroup-btn-last',
            ariaLabel: 'New entry, choose a section',
        },
    ], {
        class: ['btngroup', 'submit'],
        attrs: { 'data-wrapper': '' },
    });
}

/** Craft CP element index view mode picker — `.btngroup--exclusive` icon toggles. */
export const buttonGroupViewModeIcons = {
    table: 'list',
    /** Craft CP has no FA twin for cards view — Plugin Kit uses `grip`. */
    cards: 'grip',
} as const;

/** Craft CP element index view mode picker — `.btngroup--exclusive` icon toggles. */
export function craftViewModeBtngroupMarkup(): string {
    return craftBtngroupMarkup([
        {
            icon: 'list',
            active: true,
            pressed: true,
            title: 'Display in a table',
            ariaLabel: 'Display in a table',
        },
        {
            icon: 'element-cards',
            pressed: false,
            title: 'Display as cards',
            ariaLabel: 'Display as cards',
        },
    ], {
        tag: 'section',
        class: ['btngroup', 'btngroup--exclusive'],
        ariaLabel: 'View',
    });
}

/** Craft CP element editor preview toolbar — `.preview-btn-container.btngroup`. */
export function craftPreviewViewBtngroupMarkup(): string {
    return craftBtngroupMarkup([
        { previewBtn: true, text: 'Preview' },
        {
            tag: 'a',
            href: '#',
            viewBtn: true,
            text: 'View',
            ariaLabel: 'View',
        },
    ], {
        class: ['preview-btn-container', 'btngroup'],
    });
}

/** Craft CP element toolbar — Edit + Preview + `.menubtn` chevron. */
export function craftEditPreviewMenubtnMarkup(): string {
    return craftBtngroupMarkup([
        { text: 'Edit', variant: 'submit', icon: 'edit' },
        { text: 'Preview', variant: 'submit', icon: 'view' },
        {
            menubtn: true,
            variant: 'submit',
            ariaLabel: 'More actions',
        },
    ]);
}

export function buildCraftButtonGroupComparisonHtml(): string {
    return `<div class="cmp-rows">
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Edit + Preview + menubtn</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${craftEditPreviewMenubtnMarkup()}
            </div>
        </div>
        <div class="cmp-row">
            <h3 class="cmp-row-heading">New entry + menubtn</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${craftNewEntryBtngroupMarkup()}
            </div>
        </div>
        <div class="cmp-row">
            <h3 class="cmp-row-heading">View mode (exclusive)</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${craftViewModeBtngroupMarkup()}
            </div>
        </div>
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Preview + View</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${craftPreviewViewBtngroupMarkup()}
            </div>
        </div>
    </div>`;
}

export function createButtonGroupComparisonRow(heading: string, group: HTMLElement): HTMLElement {
    const row = document.createElement('div');
    row.className = 'cmp-row';

    const title = document.createElement('h3');
    title.className = 'cmp-row-heading';
    title.textContent = heading;

    const items = document.createElement('div');
    items.className = 'cmp-row-items cmp-row-items--stack';
    items.append(group);

    row.append(title, items);
    return row;
}

export function createComparisonLayout(pkContent: HTMLElement, craftContent: HTMLElement): HTMLElement {
    const layout = document.createElement('div');
    layout.className = 'cmp-layout';

    const pkColumn = document.createElement('div');
    pkColumn.className = 'cmp-column';
    pkColumn.innerHTML = '<span class="cmp-column-title">Plugin Kit</span>';
    pkColumn.append(pkContent);

    const craftColumn = document.createElement('div');
    craftColumn.className = 'cmp-column';
    craftColumn.innerHTML = '<span class="cmp-column-title">Craft</span>';
    craftColumn.append(craftContent);

    layout.append(pkColumn, craftColumn);
    return layout;
}

export function createStateMatrixRow(
    heading: string,
    cells: HTMLElement[],
    layout: 'matrix' | 'stack' = 'matrix',
): HTMLElement {
    const row = document.createElement('div');
    row.className = 'cmp-row';

    const title = document.createElement('h3');
    title.className = 'cmp-row-heading';
    title.textContent = heading;

    const items = document.createElement('div');
    items.className = layout === 'stack'
        ? 'cmp-row-items cmp-row-items--stack'
        : 'cmp-row-items cmp-row-items--state-matrix';
    items.append(...cells);

    row.append(title, items);
    return row;
}

export function createComparisonMatrixItem(
    control: HTMLElement,
    label: string,
): HTMLElement {
    if (
        control.classList.contains('pk-checkbox')
        || control.tagName === 'PK-CHECKBOX'
        || control.tagName === 'PK-RADIO'
    ) {
        control.append(document.createTextNode(label));
    } else {
        const row = document.createElement('div');
        row.className = 'cmp-craft-ls-row';

        const controlWrap = document.createElement('div');
        controlWrap.className = 'cmp-craft-ls-control';
        controlWrap.append(control);

        const text = document.createElement('span');
        text.className = 'cmp-craft-ls-label';
        text.textContent = label;

        row.append(controlWrap, text);
        control = row;
    }

    const cell = document.createElement('div');
    cell.className = 'cmp-state-cell';
    cell.append(control);
    return cell;
}

export function createInputStateCell(control: HTMLElement, label: string): HTMLElement {
    const row = document.createElement('div');
    row.className = 'cmp-craft-ls-row';

    const labelEl = document.createElement('span');
    labelEl.className = 'cmp-craft-ls-label';
    labelEl.textContent = label;

    const controlWrap = document.createElement('div');
    controlWrap.className = 'cmp-craft-ls-control';
    controlWrap.append(control);

    row.append(labelEl, controlWrap);
    return row;
}

/** @deprecated Use createComparisonMatrixItem */
export function createStateMatrixCell(control: HTMLElement, label: string): HTMLElement {
    return createComparisonMatrixItem(control, label);
}

export function craftCheckboxControl(options: {
    id: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    invalid?: boolean;
}): string {
    const labelId = `${options.id}-label`;
    const checkedAttr = options.checked ? ' checked' : '';
    const disabledAttr = options.disabled ? ' disabled' : '';
    const input = `<input type="checkbox" id="${options.id}" class="checkbox" aria-labelledby="${labelId}"${checkedAttr}${disabledAttr}>`;
    const lab = `<label for="${options.id}" id="${labelId}">${options.label}</label>`;
    const core = `${input}${lab}`;

    if (options.invalid) {
        return `<div class="field checkboxfield has-errors"><div class="input">${core}</div></div>`;
    }

    return core;
}

export function craftCheckboxStack(
    prefix: string,
    items: Array<{ label: string; checked?: boolean; disabled?: boolean; invalid?: boolean }>,
): string {
    return items
        .map((item, index) => {
            const control = craftCheckboxControl({
                id: `${prefix}-${index}`,
                ...item,
            });

            return `<div class="cmp-state-cell"><div class="cmp-craft-ls-control">${control}</div></div>`;
        })
        .join('');
}

export function craftLightswitchMarkup(options: {
    id: string;
    on?: boolean;
    disabled?: boolean;
    invalid?: boolean;
}): string {
    const classes = ['lightswitch', options.on && 'on', options.disabled && 'noteditable'].filter(Boolean).join(' ');
    const pressed = options.on ? 'true' : 'false';
    const disabledAttr = options.disabled ? ' disabled' : '';
    const inner = '<div class="lightswitch-container"><div class="handle"></div></div>';
    const button = `<button type="button" id="${options.id}" class="${classes}" role="switch" aria-checked="${pressed}"${disabledAttr}>${inner}</button>`;

    if (options.invalid) {
        return `<div class="field lightswitch-field has-errors"><div class="input">${button}</div></div>`;
    }

    return button;
}

export function craftLightswitchStack(
    prefix: string,
    items: Array<{ label: string; on?: boolean; disabled?: boolean; invalid?: boolean }>,
): string {
    return items
        .map(({ label, on, disabled, invalid }, index) => {
            const control = craftLightswitchMarkup({ id: `${prefix}-${index}`, on, disabled, invalid });
            return `<div class="cmp-state-cell"><div class="cmp-craft-ls-row"><div class="cmp-craft-ls-control">${control}</div><span class="cmp-craft-ls-label">${label}</span></div></div>`;
        })
        .join('');
}

export function buildCraftCheckboxComparisonHtml(): string {
    return `<div class="cmp-rows">
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Unchecked</h3>
            <div class="cmp-row-items cmp-row-items--state-matrix">
                ${craftCheckboxStack('craft-cb-unchecked', checkboxUncheckedStates)}
            </div>
        </div>
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Checked</h3>
            <div class="cmp-row-items cmp-row-items--state-matrix">
                ${craftCheckboxStack('craft-cb-checked', checkboxCheckedStates)}
            </div>
        </div>
    </div>`;
}

export function craftRadioControl(options: {
    name: string;
    id: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    invalid?: boolean;
}): string {
    const labelId = `${options.id}-label`;
    const checkedAttr = options.checked ? ' checked' : '';
    const disabledAttr = options.disabled ? ' disabled' : '';
    const input = `<input type="radio" name="${options.name}" id="${options.id}" class="radio" aria-labelledby="${labelId}"${checkedAttr}${disabledAttr}>`;
    const lab = `<label for="${options.id}" id="${labelId}">${options.label}</label>`;
    const core = `${input}${lab}`;

    if (options.invalid) {
        return `<div class="field lightswitchfield has-errors"><div class="input">${core}</div></div>`;
    }

    return core;
}

export function craftRadioStack(
    prefix: string,
    items: Array<{ label: string; checked?: boolean; disabled?: boolean; invalid?: boolean }>,
): string {
    return items
        .map((item, index) => {
            const control = craftRadioControl({
                name: `${prefix}-group`,
                id: `${prefix}-${index}`,
                ...item,
            });

            return `<div class="cmp-state-cell"><div class="cmp-craft-ls-control">${control}</div></div>`;
        })
        .join('');
}

export function buildCraftRadioComparisonHtml(): string {
    return `<div class="cmp-rows">
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Unchecked</h3>
            <div class="cmp-row-items cmp-row-items--state-matrix">
                ${craftRadioStack('craft-radio-unchecked', radioUncheckedStates)}
            </div>
        </div>
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Checked</h3>
            <div class="cmp-row-items cmp-row-items--state-matrix">
                ${craftRadioStack('craft-radio-checked', radioCheckedStates)}
            </div>
        </div>
    </div>`;
}

export function buildCraftLightswitchComparisonHtml(): string {
    return `<div class="cmp-rows">
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Unchecked</h3>
            <div class="cmp-row-items cmp-row-items--state-matrix">
                ${craftLightswitchStack('craft-ls-unchecked', lightswitchUncheckedStates)}
            </div>
        </div>
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Checked</h3>
            <div class="cmp-row-items cmp-row-items--state-matrix">
                ${craftLightswitchStack('craft-ls-checked', lightswitchCheckedStates)}
            </div>
        </div>
    </div>`;
}

export function craftInputMarkup(options: {
    placeholder: string;
    invalid?: boolean;
    disabled?: boolean;
}): string {
    const classes = ['text', options.invalid ? 'error' : ''].filter(Boolean).join(' ');
    const disabledAttr = options.disabled ? ' disabled' : '';
    const invalidAttr = options.invalid ? ' aria-invalid="true"' : '';

    return `<div class="field" style="margin: 0; width: 9rem;"><input class="${classes}" type="text" placeholder="${options.placeholder}"${disabledAttr}${invalidAttr}></div>`;
}

export function buildCraftInputComparisonHtml(): string {
    return `<div class="cmp-rows">
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Field states</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${inputFieldStates.map(({ label, placeholder, invalid, disabled }) => `
                    <div class="cmp-craft-ls-row">
                        <span class="cmp-craft-ls-label">${label}</span>
                        <div class="cmp-craft-ls-control">${craftInputMarkup({ placeholder, invalid, disabled })}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;
}

export function craftSelectMarkup(options: {
    placeholder: string;
    invalid?: boolean;
    disabled?: boolean;
}): string {
    const fieldClass = options.invalid ? 'field has-errors' : 'field';
    const disabledAttr = options.disabled ? ' disabled' : '';

    return `<div class="${fieldClass}" style="margin: 0; width: 9rem;"><div class="select"><select${disabledAttr}><option>${options.placeholder}</option><option value="draft">Draft</option><option value="published">Published</option></select></div></div>`;
}

export function buildCraftSelectComparisonHtml(): string {
    return `<div class="cmp-rows">
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Field states</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${selectFieldStates.map(({ label, placeholder, invalid, disabled }) => `
                    <div class="cmp-craft-ls-row">
                        <span class="cmp-craft-ls-label">${label}</span>
                        <div class="cmp-craft-ls-control">${craftSelectMarkup({ placeholder, invalid, disabled })}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;
}

export function craftTextareaMarkup(options: {
    placeholder: string;
    invalid?: boolean;
    disabled?: boolean;
}): string {
    const classes = ['text', options.invalid ? 'error' : ''].filter(Boolean).join(' ');
    const disabledAttr = options.disabled ? ' disabled' : '';
    const invalidAttr = options.invalid ? ' aria-invalid="true"' : '';

    return `<div class="field" style="margin: 0; width: 9rem;"><textarea class="${classes}" placeholder="${options.placeholder}"${disabledAttr}${invalidAttr}></textarea></div>`;
}

export function buildCraftTextareaComparisonHtml(): string {
    return `<div class="cmp-rows">
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Field states</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${textareaFieldStates.map(({ label, placeholder, invalid, disabled }) => `
                    <div class="cmp-craft-ls-row">
                        <span class="cmp-craft-ls-label">${label}</span>
                        <div class="cmp-craft-ls-control">${craftTextareaMarkup({ placeholder, invalid, disabled })}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;
}

export const checkboxSelectComparisonOptions = [
    { label: 'Admins', value: 'admins' },
    { label: 'Editors', value: 'editors' },
    { label: 'Authors', value: 'authors' },
] as const;

export const checkboxSelectPlaygroundComparison = {
    craftComparison: {
        title: 'Craft Comparison',
        description: 'Craft `.checkbox-select` fieldset with “All” row.',
    },
} as const;

export function craftCheckboxSelectMarkup(options: {
    id: string;
    name?: string;
    allLabel?: string;
    showAllOption?: boolean;
    allSelected?: boolean;
    selectedValues?: string[];
}): string {
    const fieldName = options.name ?? 'require2fa';
    const allSelected = Boolean(options.allSelected);
    const selectedValues = new Set(options.selectedValues ?? []);

    const allRow = options.showAllOption
        ? `<div>
            <input type="hidden" name="${fieldName}" value="">
            <input type="checkbox" id="${options.id}-all" class="checkbox-select-item all checkbox" name="${fieldName}" value="all"${allSelected ? ' checked' : ''}>
            <label id="${options.id}-all-label" for="${options.id}-all"><b>${options.allLabel ?? 'All users'}</b></label>
        </div>`
        : '';

    const items = checkboxSelectComparisonOptions
        .map((item, index) => {
            const itemId = `${options.id}-${index}`;
            const isChecked = allSelected || selectedValues.has(item.value);
            const isDisabled = allSelected;
            const checkedAttr = isChecked ? ' checked' : '';
            const disabledAttr = isDisabled ? ' disabled' : '';

            return `<div class="checkbox-select-item">
                <input type="checkbox" id="${itemId}" class="checkbox" name="${fieldName}[]" value="${item.value}"${checkedAttr}${disabledAttr}>
                <label id="${itemId}-label" for="${itemId}">${item.label}</label>
            </div>`;
        })
        .join('');

    return `<fieldset id="${options.id}" class="checkbox-select">${allRow}${items}</fieldset>`;
}

export function buildCraftCheckboxSelectComparisonHtml(): string {
    return `<div class="cmp-rows">
        <div class="cmp-row">
            <h3 class="cmp-row-heading">With “All” option</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${craftCheckboxSelectMarkup({
        id: 'craft-cs-all-option',
        showAllOption: true,
        allLabel: 'All users',
    })}
            </div>
        </div>
        <div class="cmp-row">
            <h3 class="cmp-row-heading">All selected</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${craftCheckboxSelectMarkup({
        id: 'craft-cs-all-selected',
        showAllOption: true,
        allLabel: 'All users',
        allSelected: true,
    })}
            </div>
        </div>
        <div class="cmp-row">
            <h3 class="cmp-row-heading">Selected values</h3>
            <div class="cmp-row-items cmp-row-items--stack">
                ${craftCheckboxSelectMarkup({
        id: 'craft-cs-selected',
        selectedValues: ['admins', 'editors'],
    })}
            </div>
        </div>
    </div>`;
}
