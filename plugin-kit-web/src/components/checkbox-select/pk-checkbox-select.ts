import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import type { ComplexAttributeConverter, PropertyValues } from 'lit';

import { PkElement } from '../../base/pk-element.js';
// Side-effect import — option rows are created as `pk-checkbox` in the shadow tree.
import '../checkbox/pk-checkbox.js';
import type { PkCheckbox } from '../checkbox/pk-checkbox.js';
import { pkCheckboxSelectStyles } from './pk-checkbox-select.styles.js';

export const ALL_VALUE = '*' as const;

export type PkCheckboxSelectOption = {
    label: string;
    value: string;
};

export type PkCheckboxSelectValue = typeof ALL_VALUE | string[];

export type PkCheckboxSelectOrientation = 'horizontal' | 'vertical';

/** JSON array for Craft/Twig + docs HTML; property assignment still preferred in JS. */
const optionsConverter: ComplexAttributeConverter<PkCheckboxSelectOption[]> = {
    fromAttribute(value) {
        if (!value) {
            return [];
        }

        try {
            const parsed = JSON.parse(value);

            return Array.isArray(parsed)
                ? parsed
                    .filter((item): item is PkCheckboxSelectOption => Boolean(item && typeof item === 'object' && 'value' in item))
                    .map((item) => ({
                        label: String((item as PkCheckboxSelectOption).label ?? (item as PkCheckboxSelectOption).value),
                        value: String((item as PkCheckboxSelectOption).value),
                    }))
                : [];
        } catch {
            return [];
        }
    },
    toAttribute(value) {
        return JSON.stringify(value ?? []);
    },
};

/** `*` for all-selected, otherwise a JSON string array. */
const valueConverter: ComplexAttributeConverter<PkCheckboxSelectValue> = {
    fromAttribute(value) {
        if (value == null || value === '') {
            return [];
        }

        if (value === '*') {
            return ALL_VALUE;
        }

        try {
            const parsed = JSON.parse(value);

            if (parsed === '*') {
                return ALL_VALUE;
            }

            return Array.isArray(parsed) ? parsed.map(String) : [];
        } catch {
            return [];
        }
    },
    toAttribute(value) {
        return value === ALL_VALUE ? '*' : JSON.stringify(value ?? []);
    },
};

/**
 * Multi-select checkbox group — options via the `options` property/attribute (not slotted
 * checkboxes). Wrap in `pk-field` for label/instructions (mirrors React `CheckboxSelect` + `FieldLayout`).
 *
 * @fires pk-change - `{ value: string[] | '*' }`
 *
 * @csspart base - Checkbox options container
 */
@customElement('pk-checkbox-select')
export class PkCheckboxSelect extends PkElement {
    static override styles = pkCheckboxSelectStyles;

    @property({ attribute: 'options', converter: optionsConverter })
    options: PkCheckboxSelectOption[] = [];

    /** Selected values, or `*` when the All option is active. */
    @property({ attribute: 'value', converter: valueConverter })
    value: PkCheckboxSelectValue = [];
    @property({ type: Boolean, attribute: 'show-all-option' })
    showAllOption = false;

    @property({ attribute: 'all-label' })
    allLabel = 'All';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ reflect: true })
    orientation: PkCheckboxSelectOrientation = 'vertical';

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    @state()
    private optionElements: PkCheckbox[] = [];

    private allOptionElement: PkCheckbox | null = null;

    override connectedCallback(): void {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'group');
        }

        super.connectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('options') || changed.has('showAllOption')) {
            this.rebuildOptionElements();
            return;
        }

        if (changed.has('value') || changed.has('disabled')) {
            this.updateOptionStates();
        }
    }

    override firstUpdated(): void {
        this.rebuildOptionElements();
    }

    override focus(options?: FocusOptions): void {
        const first = this.optionElements.find((element) => !element.disabled);

        first?.focus(options);
    }

    private get isAllSelected(): boolean {
        return this.value === ALL_VALUE;
    }

    private get selectedValues(): string[] {
        if (this.isAllSelected) {
            return this.options.map((option) => option.value);
        }

        return Array.isArray(this.value) ? this.value : [];
    }

    private dispatchValueChange(): void {
        const detailValue = this.isAllSelected ? ALL_VALUE : [...this.selectedValues];

        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { value: detailValue },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private handleAllChange = (event: CustomEvent<{ checked: boolean }>): void => {
        event.stopPropagation();
        this.value = event.detail.checked ? ALL_VALUE : [];
        this.dispatchValueChange();
    };

    private handleItemChange = (optionValue: string, event: CustomEvent<{ checked: boolean }>): void => {
        event.stopPropagation();

        if (this.isAllSelected) {
            return;
        }

        const checked = event.detail.checked;
        const current = this.selectedValues;
        this.value = checked
            ? [...current, optionValue]
            : current.filter((value) => value !== optionValue);

        this.dispatchValueChange();
    };

    private rebuildOptionElements(): void {
        const container = this.shadowRoot?.querySelector('.options');

        if (!container) {
            return;
        }

        for (const element of this.optionElements) {
            element.remove();
        }

        this.optionElements = [];
        this.allOptionElement = null;

        if (this.showAllOption) {
            const allCheckbox = document.createElement('pk-checkbox') as PkCheckbox;
            allCheckbox.classList.add('all-option');
            allCheckbox.append(this.allLabel);
            allCheckbox.addEventListener('pk-change', this.handleAllChange as EventListener);

            container.append(allCheckbox);
            this.allOptionElement = allCheckbox;
            this.optionElements.push(allCheckbox);
        }

        for (const option of this.options) {
            const checkbox = document.createElement('pk-checkbox') as PkCheckbox;
            checkbox.checkboxValue = option.value;
            checkbox.append(option.label);
            checkbox.addEventListener('pk-change', (event) => {
                this.handleItemChange(option.value, event as CustomEvent<{ checked: boolean }>);
            });

            container.append(checkbox);
            this.optionElements.push(checkbox);
        }

        this.updateOptionStates();
    }

    private updateOptionStates(): void {
        if (this.allOptionElement) {
            this.allOptionElement.checked = this.isAllSelected;
            this.allOptionElement.disabled = this.disabled;
        }

        for (const option of this.options) {
            const checkbox = this.optionElements.find(
                (element) => element !== this.allOptionElement && element.checkboxValue === option.value,
            );

            if (!checkbox) {
                continue;
            }

            checkbox.checked = this.isAllSelected || this.selectedValues.includes(option.value);
            checkbox.disabled = this.disabled || this.isAllSelected;
        }
    }

    override render() {
        return html`
            <div
                part="base"
                class=${classMap({
                    options: true,
                    'options--horizontal': this.orientation === 'horizontal',
                })}
            ></div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-checkbox-select': PkCheckboxSelect;
    }
}
