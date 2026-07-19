export function createPageHero(meta: {
    eyebrow: string;
    title: string;
    description: string;
}): HTMLElement {
    const hero = document.createElement('div');
    hero.className = 'pg-page__hero';
    hero.innerHTML = `
        <div class="pg-page__eyebrow"></div>
        <h1 class="pg-page__title"></h1>
        <p class="pg-page__lead"></p>
    `;
    hero.querySelector('.pg-page__eyebrow')!.textContent = meta.eyebrow;
    hero.querySelector('.pg-page__title')!.textContent = meta.title;
    hero.querySelector('.pg-page__lead')!.textContent = meta.description;
    return hero;
}

export function createSection(title: string, description: string): HTMLElement {
    const section = document.createElement('section');
    section.className = 'pg-section';
    section.innerHTML = `
        <div class="pg-section__intro">
            <h2 class="pg-section__title"></h2>
            <p class="pg-section__description"></p>
        </div>
    `;
    section.querySelector('.pg-section__title')!.textContent = title;
    section.querySelector('.pg-section__description')!.textContent = description;
    return section;
}

export function createCard(overflowVisible = false): HTMLElement {
    const card = document.createElement('div');
    card.className = overflowVisible ? 'pg-card pg-card--overflow-visible' : 'pg-card';
    card.innerHTML = '<div class="pg-card__inner"></div>';
    return card;
}

export function getCardInner(card: HTMLElement): HTMLElement {
    return card.querySelector('.pg-card__inner')!;
}

export function createPkButton(options: {
    label?: string;
    variant?: string;
    size?: string;
    state?: 'hover' | 'focus-visible' | 'active';
    disabled?: boolean;
    loading?: boolean;
    spinnerVariant?: string;
    spinnerTone?: string;
    startSlot?: string;
    endSlot?: string;
    ariaLabel?: string;
    withCaret?: boolean;
}): HTMLElement {
    const button = document.createElement('pk-button');

    if (options.variant) {
        button.setAttribute('variant', options.variant);
    }

    if (options.withCaret) {
        button.setAttribute('with-caret', '');
    }

    if (options.size && options.size !== 'default') {
        button.setAttribute('size', options.size);
    }

    if (options.state) {
        button.dataset.state = options.state;
    }

    if (options.disabled) {
        button.setAttribute('disabled', '');
    }

    if (options.loading) {
        button.setAttribute('loading', '');
    }

    if (options.spinnerVariant) {
        button.setAttribute('spinner-variant', options.spinnerVariant);
    }

    if (options.spinnerTone) {
        button.setAttribute('spinner-tone', options.spinnerTone);
    }

    if (options.ariaLabel) {
        button.setAttribute('aria-label', options.ariaLabel);
    }

    if (options.startSlot) {
        const template = document.createElement('template');
        template.innerHTML = options.startSlot.trim();
        const icon = template.content.firstElementChild;

        if (icon) {
            icon.setAttribute('slot', 'start');
            icon.setAttribute('aria-hidden', 'true');
            button.append(icon);
        }
    }

    if (options.label) {
        button.append(options.label);
    }

    if (options.endSlot) {
        const template = document.createElement('template');
        template.innerHTML = options.endSlot.trim();
        const icon = template.content.firstElementChild;

        if (icon) {
            icon.setAttribute('slot', 'end');
            icon.setAttribute('aria-hidden', 'true');
            button.append(icon);
        }
    }

    return button;
}

export function createPkCheckbox(options: {
    id?: string;
    label?: string;
    hint?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    state?: 'focus-visible';
    ariaLabel?: string;
    name?: string;
}): HTMLElement {
    const checkbox = document.createElement('pk-checkbox');

    if (options.id) {
        checkbox.id = options.id;
    }

    if (options.checked) {
        checkbox.setAttribute('checked', '');
    }

    if (options.indeterminate) {
        checkbox.setAttribute('indeterminate', '');
    }

    if (options.disabled) {
        checkbox.setAttribute('disabled', '');
    }

    if (options.invalid) {
        checkbox.setAttribute('invalid', '');
    }

    if (options.state) {
        checkbox.dataset.state = options.state;
    }

    if (options.name) {
        checkbox.setAttribute('name', options.name);
    }

    if (options.ariaLabel && !options.label) {
        checkbox.setAttribute('aria-label', options.ariaLabel);
    }

    if (options.label) {
        checkbox.append(options.label);
    }

    if (options.hint) {
        checkbox.setAttribute('hint', options.hint);
    }

    return checkbox;
}

export function createPkRadio(options: {
    value?: string;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    focus?: boolean;
}): HTMLElement {
    const radio = document.createElement('pk-radio');

    if (options.value) {
        radio.setAttribute('value', options.value);
    }

    if (options.checked) {
        radio.setAttribute('checked', '');
    }

    if (options.disabled) {
        radio.setAttribute('disabled', '');
    }

    if (options.invalid) {
        radio.setAttribute('invalid', '');
    }

    if (options.focus) {
        radio.setAttribute('data-focus-visible', '');
    }

    if (options.label) {
        radio.append(options.label);
    }

    return radio;
}

export function createPkRadioGroup(options: {
    id?: string;
    name?: string;
    value?: string;
    label?: string;
    instructions?: string;
    orientation?: 'horizontal' | 'vertical';
    invalid?: boolean;
    disabled?: boolean;
    items: Array<{
        value: string;
        label?: string;
        content?: HTMLElement;
        disabled?: boolean;
    }>;
}): HTMLElement {
    const group = document.createElement('pk-radio-group');

    if (options.id) {
        group.id = options.id;
    }

    if (options.name) {
        group.setAttribute('name', options.name);
    }

    if (options.value) {
        group.setAttribute('value', options.value);
    }

    if (options.label) {
        group.label = options.label;
    }

    if (options.instructions) {
        group.instructions = options.instructions;
    }

    if (options.orientation === 'horizontal') {
        group.setAttribute('orientation', 'horizontal');
    }

    if (options.invalid) {
        group.setAttribute('invalid', '');
    }

    if (options.disabled) {
        group.setAttribute('disabled', '');
    }

    for (const item of options.items) {
        const radio = createPkRadio({
            value: item.value,
            label: item.label,
            disabled: item.disabled,
        });

        if (item.content) {
            radio.replaceChildren(item.content);
            radio.classList.add('pg-radio-rich');
        }

        group.append(radio);
    }

    return group;
}

export function createPkInput(options: {
    id?: string;
    placeholder?: string;
    value?: string;
    label?: string;
    instructions?: string;
    size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
    mono?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    autofocus?: boolean;
    state?: 'focus-visible';
    style?: Partial<CSSStyleDeclaration>;
}): HTMLElement {
    const input = document.createElement('pk-input');

    if (options.id) {
        input.id = options.id;
    }

    if (options.placeholder) {
        input.setAttribute('placeholder', options.placeholder);
    }

    if (options.value !== undefined) {
        input.setAttribute('value', options.value);
    }

    if (options.label) {
        input.setAttribute('label', options.label);
    }

    if (options.instructions) {
        input.setAttribute('instructions', options.instructions);
    }

    if (options.size && options.size !== 'default') {
        input.setAttribute('size', options.size);
    }

    if (options.mono) {
        input.setAttribute('mono', '');
    }

    if (options.readonly) {
        input.setAttribute('readonly', '');
    }

    if (options.disabled) {
        input.setAttribute('disabled', '');
    }

    if (options.invalid) {
        input.setAttribute('invalid', '');
    }

    if (options.autofocus) {
        input.setAttribute('autofocus', '');
    }

    if (options.state) {
        input.dataset.state = options.state;
    }

    if (options.style) {
        Object.assign(input.style, options.style);
    }

    return input;
}

export function createPkInputGroup(options?: {
    style?: Partial<CSSStyleDeclaration>;
}): HTMLElement {
    const group = document.createElement('pk-input-group');

    if (options?.style) {
        Object.assign(group.style, options.style);
    }

    return group;
}

export function createPkInputGroupInput(options: {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    invalid?: boolean;
    type?: string;
} = {}): HTMLElement {
    const input = document.createElement('pk-input-group-input');

    if (options.placeholder) {
        input.setAttribute('placeholder', options.placeholder);
    }

    if (options.value !== undefined) {
        input.setAttribute('value', options.value);
    }

    if (options.type) {
        input.setAttribute('type', options.type);
    }

    if (options.disabled) {
        input.setAttribute('disabled', '');
    }

    if (options.invalid) {
        input.setAttribute('invalid', '');
    }

    return input;
}

export function createPkInputGroupTextarea(options: {
    placeholder?: string;
    value?: string;
    rows?: number;
} = {}): HTMLElement {
    const textarea = document.createElement('pk-input-group-textarea');

    if (options.placeholder) {
        textarea.setAttribute('placeholder', options.placeholder);
    }

    if (options.value !== undefined) {
        textarea.setAttribute('value', options.value);
    }

    if (options.rows) {
        textarea.setAttribute('rows', String(options.rows));
    }

    return textarea;
}

export function createPkInputGroupAddon(
    options: {
        align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
    } = {},
    ...children: Node[]
): HTMLElement {
    const addon = document.createElement('pk-input-group-addon');

    if (options.align && options.align !== 'inline-start') {
        addon.setAttribute('align', options.align);
    }

    addon.append(...children);
    return addon;
}

export function createPkInputGroupText(text: string): HTMLElement {
    const el = document.createElement('pk-input-group-text');
    el.textContent = text;
    return el;
}

export function createPkInputGroupButton(label: string): HTMLElement {
    const button = document.createElement('pk-input-group-button');
    button.textContent = label;
    return button;
}

export function createPkField(options: {
    label?: string;
    instructions?: string;
    required?: boolean;
    translatable?: boolean;
    warning?: string;
    tip?: string;
    errors?: string[];
    for?: string;
    headerEnd?: HTMLElement;
}, ...children: HTMLElement[]): HTMLElement {
    const field = document.createElement('pk-field');

    if (options.label) {
        field.setAttribute('label', options.label);
    }

    if (options.instructions) {
        field.setAttribute('instructions', options.instructions);
    }

    if (options.required) {
        field.setAttribute('required', '');
    }

    if (options.translatable) {
        field.setAttribute('translatable', '');
    }

    if (options.warning) {
        field.setAttribute('warning', options.warning);
    }

    if (options.tip) {
        field.setAttribute('tip', options.tip);
    }

    if (options.for) {
        field.setAttribute('for', options.for);
    }

    if (options.errors?.length) {
        (field as unknown as { errors: string[] }).errors = options.errors;
    }

    if (options.headerEnd) {
        options.headerEnd.setAttribute('slot', 'header-end');
        field.append(options.headerEnd);
    }

    field.append(...children);
    return field;
}

export function createPkTextarea(options: {
    id?: string;
    placeholder?: string;
    value?: string;
    size?: 'default' | 'sm';
    disabled?: boolean;
    invalid?: boolean;
    state?: 'focus-visible';
    maxLength?: number;
    style?: Partial<CSSStyleDeclaration>;
}): HTMLElement {
    const textarea = document.createElement('pk-textarea');

    if (options.id) {
        textarea.id = options.id;
    }

    if (options.placeholder) {
        textarea.setAttribute('placeholder', options.placeholder);
    }

    if (options.value !== undefined) {
        textarea.setAttribute('value', options.value);
    }

    if (options.size && options.size !== 'default') {
        textarea.setAttribute('size', options.size);
    }

    if (options.disabled) {
        textarea.setAttribute('disabled', '');
    }

    if (options.invalid) {
        textarea.setAttribute('invalid', '');
    }

    if (options.state) {
        textarea.dataset.state = options.state;
    }

    if (options.maxLength !== undefined) {
        textarea.setAttribute('max-length', String(options.maxLength));
    }

    if (options.style) {
        Object.assign(textarea.style, options.style);
    }

    return textarea;
}

export function createPkSeparator(options: {
    orientation?: 'horizontal' | 'vertical';
} = {}): HTMLElement {
    const separator = document.createElement('pk-separator');

    if (options.orientation && options.orientation !== 'horizontal') {
        separator.setAttribute('orientation', options.orientation);
    }

    return separator;
}

export function createPkStatus(options: {
    status?: string;
    ariaLabel?: string;
}): HTMLElement {
    const status = document.createElement('pk-status');

    if (options.status) {
        status.setAttribute('status', options.status);
    }

    if (options.ariaLabel) {
        status.setAttribute('aria-label', options.ariaLabel);
    } else if (options.status) {
        status.setAttribute('aria-label', options.status);
    }

    status.title = options.status ?? '';

    return status;
}

export function createPkToggle(options: {
    id?: string;
    label?: string;
    icon?: string;
    variant?: 'default' | 'outline';
    size?: 'default' | 'sm' | 'lg';
    pressed?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
}): HTMLElement {
    const toggle = document.createElement('pk-toggle');

    if (options.id) {
        toggle.id = options.id;
    }

    if (options.variant) {
        toggle.setAttribute('variant', options.variant);
    }

    if (options.size && options.size !== 'default') {
        toggle.setAttribute('size', options.size);
    }

    if (options.pressed) {
        toggle.setAttribute('pressed', '');
    }

    if (options.disabled) {
        toggle.setAttribute('disabled', '');
    }

    if (options.ariaLabel) {
        toggle.setAttribute('aria-label', options.ariaLabel);
    }

    if (options.icon) {
        const template = document.createElement('template');
        template.innerHTML = options.icon.trim();
        const icon = template.content.firstElementChild;

        if (icon) {
            icon.setAttribute('aria-hidden', 'true');
            toggle.append(icon);
        }
    }

    if (options.label) {
        toggle.append(options.label);
    }

    return toggle;
}

export function createPkToggleGroup(options: {
    id?: string;
    items: ReadonlyArray<{ value: string; label?: string; icon?: string; ariaLabel?: string }>;
    variant?: 'default' | 'outline';
    size?: 'default' | 'sm' | 'lg';
    orientation?: 'horizontal' | 'vertical';
    spacing?: number;
    multiple?: boolean;
    defaultValue?: string[];
}): HTMLElement {
    const group = document.createElement('pk-toggle-group');

    if (options.id) {
        group.id = options.id;
    }

    if (options.variant) {
        group.setAttribute('variant', options.variant);
    }

    if (options.size && options.size !== 'default') {
        group.setAttribute('size', options.size);
    }

    if (options.orientation && options.orientation !== 'horizontal') {
        group.setAttribute('orientation', options.orientation);
    }

    if (options.spacing !== undefined) {
        group.setAttribute('spacing', String(options.spacing));
    }

    if (options.multiple) {
        group.setAttribute('multiple', '');
    }

    if (options.defaultValue?.length) {
        (group as HTMLElement & { value: string[] }).value = [...options.defaultValue];
    }

    for (const item of options.items) {
        const toggle = createPkToggle({
            label: item.label,
            icon: item.icon,
            variant: options.variant,
            size: options.size,
            ariaLabel: item.ariaLabel ?? item.label,
            pressed: options.defaultValue?.includes(item.value),
        });
        toggle.setAttribute('data-value', item.value);
        group.append(toggle);
    }

    return group;
}

export function createPkTooltip(options: {
    id?: string;
    triggerLabel: string;
    triggerVariant?: string;
    content: string;
    placement?: string;
}): HTMLElement {
    const tooltip = document.createElement('pk-tooltip');

    if (options.id) {
        tooltip.id = options.id;
    }

    if (options.placement) {
        tooltip.setAttribute('placement', options.placement);
    }

    const trigger = createPkButton({
        label: options.triggerLabel,
        variant: options.triggerVariant ?? 'default',
    });
    trigger.setAttribute('slot', 'trigger');

    tooltip.append(trigger);
    tooltip.setAttribute('content', options.content);

    return tooltip;
}

export function createPkCopyButton(options: {
    value: string;
    variant?: string;
    from?: string;
    icon?: string;
}): HTMLElement {
    const button = document.createElement('pk-copy-button');
    button.setAttribute('value', options.value);

    if (options.variant) {
        button.setAttribute('variant', options.variant);
    }

    if (options.from) {
        button.setAttribute('from', options.from);
    }

    if (options.icon) {
        const template = document.createElement('template');
        template.innerHTML = options.icon.trim();
        const icon = template.content.firstElementChild;

        if (icon) {
            icon.setAttribute('slot', 'icon');
            icon.setAttribute('aria-hidden', 'true');
            button.append(icon);
        }
    }

    return button;
}

export function createPkLightswitch(options: {
    id?: string;
    checked?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    size?: 'default' | 'sm' | 'xs' | 'xxs';
    state?: 'focus-visible';
}, label?: string, instructions?: string): HTMLElement {
    const lightswitch = document.createElement('pk-lightswitch');

    if (options.id) {
        lightswitch.id = options.id;
    }

    if (options.checked) {
        lightswitch.setAttribute('checked', '');
    }

    if (options.disabled) {
        lightswitch.setAttribute('disabled', '');
    }

    if (options.invalid) {
        lightswitch.setAttribute('invalid', '');
    }

    if (options.size && options.size !== 'default') {
        lightswitch.setAttribute('size', options.size);
    }

    if (options.state) {
        lightswitch.dataset.state = options.state;
    }

    if (label) {
        lightswitch.textContent = label;
    }

    if (instructions) {
        lightswitch.setAttribute('instructions', instructions);
    }

    return lightswitch;
}

export function createPkSpinner(options: {
    variant?: string;
    size?: string;
    tone?: string;
    centered?: boolean;
} = {}): HTMLElement {
    const spinner = document.createElement('pk-spinner');

    if (options.variant && options.variant !== 'default') {
        spinner.setAttribute('variant', options.variant);
    }

    if (options.size && options.size !== 'sm') {
        spinner.setAttribute('size', options.size);
    }

    if (options.tone) {
        spinner.setAttribute('tone', options.tone);
    }

    if (options.centered) {
        spinner.setAttribute('centered', '');
    }

    return spinner;
}

function createMatrixRow(heading: string, items: HTMLElement[]): HTMLElement {
    const block = document.createElement('div');
    block.className = 'pg-matrix-block';

    const title = document.createElement('h3');
    title.className = 'cmp-row-heading';
    title.textContent = heading;
    block.append(title);

    const row = document.createElement('div');
    row.className = 'cmp-row-items';
    row.append(...items);
    block.append(row);

    return block;
}

function createCraftStateMatrix(
    createButton: typeof createPkButton,
    buttonMatrixVariants: Array<{ label: string; variant: string; craftClassName?: string }>,
    buttonMatrixStates: Array<{ label: string; state?: 'hover' | 'focus-visible' | 'active'; disabled?: boolean }>,
): HTMLElement {
    const layout = document.createElement('div');
    layout.className = 'cmp-layout';

    const pkColumn = document.createElement('div');
    pkColumn.className = 'cmp-column';

    const pkTitle = document.createElement('span');
    pkTitle.className = 'cmp-column-title';
    pkTitle.textContent = 'Plugin Kit';
    pkColumn.append(pkTitle);

    const pkRows = document.createElement('div');
    pkRows.className = 'cmp-rows';

    for (const { label, variant } of buttonMatrixVariants) {
        const row = document.createElement('div');
        row.className = 'cmp-row';

        const heading = document.createElement('h3');
        heading.className = 'cmp-row-heading';
        heading.textContent = label;
        row.append(heading);

        const items = document.createElement('div');
        items.className = 'cmp-row-items';

        for (const matrixState of buttonMatrixStates) {
            items.append(createButton({
                label: matrixState.label,
                variant,
                state: matrixState.state,
                disabled: matrixState.disabled,
            }));
        }

        row.append(items);
        pkRows.append(row);
    }

    pkColumn.append(pkRows);

    const craftColumn = document.createElement('div');
    craftColumn.className = 'cmp-column cmp-craft-column';

    const craftTitle = document.createElement('span');
    craftTitle.className = 'cmp-column-title';
    craftTitle.textContent = 'Craft';
    craftColumn.append(craftTitle);

    const craftRows = document.createElement('div');
    craftRows.className = 'cmp-rows';

    for (const { label, craftClassName } of buttonMatrixVariants) {
        const row = document.createElement('div');
        row.className = 'cmp-row';

        const heading = document.createElement('h3');
        heading.className = 'cmp-row-heading';
        heading.textContent = label;
        row.append(heading);

        const items = document.createElement('div');
        items.className = 'cmp-row-items';

        for (const matrixState of buttonMatrixStates) {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = matrixState.label;

            if (craftClassName) {
                button.className = craftClassName;

                if (matrixState.state === 'active') {
                    button.classList.add('active');
                }
            } else if (matrixState.state === 'active') {
                button.className = 'active';
            }

            if (matrixState.disabled) {
                button.disabled = true;

                if (craftClassName) {
                    button.classList.add('disabled');
                } else {
                    button.className = 'disabled';
                }
            }

            items.append(button);
        }

        row.append(items);
        craftRows.append(row);
    }

    craftColumn.append(craftRows);
    layout.append(pkColumn, craftColumn);

    return layout;
}

export function createPkDropdownLabel(text: string): HTMLElement {
    const label = document.createElement('pk-dropdown-label');
    label.textContent = text;
    return label;
}

export function createPkDropdownSeparator(): HTMLElement {
    return document.createElement('pk-dropdown-separator');
}

export function createPkDropdownItem(
    options: {
        label?: string;
        value?: string;
        type?: 'normal' | 'checkbox' | 'radio';
        checked?: boolean;
        destructive?: boolean;
        disabled?: boolean;
        shortcut?: string;
        radioGroup?: string;
        prefixIcon?: string;
    } = {},
    ...submenuChildren: HTMLElement[]
): HTMLElement {
    const item = document.createElement('pk-dropdown-item');

    if (options.value) {
        item.setAttribute('value', options.value);
    }

    if (options.type && options.type !== 'normal') {
        item.setAttribute('type', options.type);
    }

    if (options.checked) {
        item.setAttribute('checked', '');
    }

    if (options.destructive) {
        item.setAttribute('destructive', '');
    }

    if (options.disabled) {
        item.setAttribute('disabled', '');
    }

    if (options.radioGroup) {
        item.setAttribute('radio-group', options.radioGroup);
    }

    if (options.label) {
        item.append(options.label);
    }

    if (options.prefixIcon) {
        const template = document.createElement('template');
        template.innerHTML = options.prefixIcon.trim();
        const icon = template.content.firstElementChild;

        if (icon) {
            icon.setAttribute('slot', 'prefix');
            icon.setAttribute('aria-hidden', 'true');
            item.append(icon);
        }
    }

    if (options.shortcut) {
        const shortcut = document.createElement('span');
        shortcut.slot = 'details';
        shortcut.textContent = options.shortcut;
        item.append(shortcut);
    }

    for (const child of submenuChildren) {
        child.setAttribute('slot', 'submenu');
        item.append(child);
    }

    return item;
}

export function createPkDropdownMenu(
    trigger: HTMLElement,
    ...content: HTMLElement[]
): HTMLElement {
    const menu = document.createElement('pk-dropdown-menu');
    trigger.setAttribute('slot', 'trigger');
    menu.append(trigger, ...content);
    return menu;
}

export { createMatrixRow, createCraftStateMatrix };
