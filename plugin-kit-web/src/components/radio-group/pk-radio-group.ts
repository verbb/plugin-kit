import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { formControlStyles } from '../../base/form-control.styles.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { hasInstructionContent, readLegacyInstructions } from '../../internal/field-labels.js';
import { RequiredValidator } from '../../validators/index.js';
import type { PkRadio } from './pk-radio.js';
import { pkRadioGroupStyles } from './pk-radio-group.styles.js';

export type PkRadioGroupOrientation = 'horizontal' | 'vertical';

/**
 * Radio group —  pattern: light-DOM `pk-radio` children, shared value + validation.
 *
 * @slot label - Group label
 * @slot instructions - Instructions text
 * @slot hint - Alias for `instructions`
 * @slot - `pk-radio` items
 *
 * @csspart form-control - Form control wrapper
 * @csspart label - Label text
 * @csspart radios - Radio items container
 * @csspart instructions - Instructions text
 */
@customElement('pk-radio-group')
export class PkRadioGroup extends PkFormAssociatedElement {
    static override shadowRootOptions: ShadowRootInit = {
        mode: 'open',
        delegatesFocus: true,
    };

    static override styles = [formControlStyles, pkRadioGroupStyles];

    static override get validators() {
        return [...super.validators, RequiredValidator()];
    }

    override assumeInteractionOn = ['change'];

    private readonly hasSlotController = new HasSlotController(this, 'instructions', 'hint', 'label');

    private _value: string | null = null;

    get value(): string {
        if (this.valueHasChanged) {
            return this._value ?? '';
        }

        return this._value ?? this.defaultValue ?? '';
    }

    set value(val: string | null) {
        this._value = val == null ? null : String(val);
        this.valueHasChanged = true;
    }

    /** Default value — reflected as the `value` attribute. */
    @property({ attribute: 'value', reflect: true })
    defaultValue = '';

    @property({ reflect: true })
    orientation: PkRadioGroupOrientation = 'vertical';

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property()
    label = '';

    @property()
    instructions = '';

    @property({ attribute: 'aria-label' })
    override ariaLabel: string | null = null;

    @query('slot:not([name])')
    private defaultSlot!: HTMLSlotElement;

    @state()
    private items: PkRadio[] = [];

    protected override syncFormValue(): void {
        this.setFormValue(this.value || null);
    }

    protected override resetToDefaultValue(): void {
        this._value = null;
        this.applySelection();
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (typeof state === 'string') {
            this.value = state;
            this.applySelection();
        }
    }

    protected override get validationTarget(): HTMLElement | undefined {
        return this.getAllRadios().find((item) => !item.disabled) ?? this.getAllRadios()[0];
    }

    override connectedCallback(): void {
        this.instructions = readLegacyInstructions(this, this.instructions);
        super.connectedCallback();
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('click', this.handleRadioClick);
    }

    override disconnectedCallback(): void {
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('click', this.handleRadioClick);
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('value') || changed.has('disabled') || changed.has('invalid') || changed.has('name')) {
            this.applySelection();
        }

        super.updated(changed);
    }

    override formResetCallback(): void {
        this._value = null;
        super.formResetCallback();
        this.applySelection();
    }

    override focus(options?: FocusOptions): void {
        if (this.disabled) {
            return;
        }

        const radios = this.getEnabledItems();
        const checked = radios.find((radio) => radio.checked);
        const target = checked ?? radios[0];
        target?.focusControl(options);
    }

    private getAllRadios(): PkRadio[] {
        return [...this.querySelectorAll('pk-radio')];
    }

    private syncItems = (): void => {
        this.items = this.getAllRadios();
        this.applySelection();
    };

    private getEnabledItems(): PkRadio[] {
        return this.items.filter((item) => !item.disabled && !this.disabled);
    }

    private applySelection(): void {
        const radios = this.getAllRadios();
        this.items = radios;

        const enabled = this.getEnabledItems();
        const checkedRadio = enabled.find((item) => item.value === this.value);

        for (const item of radios) {
            const checked = item.value === this.value;
            // React sets CE booleans as properties, while hand-written HTML uses attributes.
            // Preserve item-level disabled state from either source, but do not let a prior
            // group-level disabled pass permanently mark every child disabled.
            const itemDisabled = item.hasAttribute('disabled') || (item.disabled && !item.forceDisabled);
            item.checked = checked;
            item.disabled = this.disabled || itemDisabled;
            item.invalid = this.invalid;
            item.required = this.required;
            item.forceDisabled = this.disabled;
        }

        if (this.disabled) {
            for (const item of radios) {
                item.tabIndex = -1;
            }
            return;
        }

        if (checkedRadio) {
            for (const item of enabled) {
                item.tabIndex = item.checked ? 0 : -1;
            }
        } else if (enabled.length > 0) {
            enabled.forEach((item, index) => {
                item.tabIndex = index === 0 ? 0 : -1;
            });
        }

        for (const item of radios.filter((radio) => radio.disabled)) {
            item.tabIndex = -1;
        }
    }

    private handleRadioClick = (event: Event): void => {
        const clickedRadio = (event.target as HTMLElement).closest('pk-radio') as PkRadio | null;

        if (!clickedRadio || clickedRadio.disabled || clickedRadio.forceDisabled || this.disabled) {
            return;
        }

        const oldValue = this.value;
        this.value = clickedRadio.value;
        this.applySelection();

        if (this.value !== oldValue) {
            this.emitValueChange();
        }
    };

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Home', 'End'].includes(event.key) || this.disabled) {
            return;
        }

        const radios = this.getEnabledItems();

        if (radios.length === 0) {
            return;
        }

        event.preventDefault();

        const oldValue = this.value;
        const checkedRadio = radios.find((radio) => radio.checked) ?? radios[0]!;
        let index = radios.indexOf(checkedRadio);

        if (event.key === ' ') {
            // Space selects focused radio without moving
        } else if (event.key === 'Home') {
            index = 0;
        } else if (event.key === 'End') {
            index = radios.length - 1;
        } else {
            const increment = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
            index += increment;

            if (index < 0) {
                index = radios.length - 1;
            }

            if (index >= radios.length) {
                index = 0;
            }
        }

        this.value = radios[index]!.value;
        this.applySelection();
        radios[index]!.focusControl();

        if (this.value !== oldValue) {
            this.emitValueChange();
        }
    };

    private emitValueChange(): void {
        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    override render() {
        const hasLabelSlot = this.hasSlotController.test('label');
        const hasInstructions = hasInstructionContent(
            (name, flag) => this.hasSlotController.test(name, flag),
            this.instructions,
        );
        const hasLabel = Boolean(this.label) || hasLabelSlot;

        return html`
            <div part="form-control" class="form-control">
                ${hasLabel
                    ? html`
                        <div part="label" class="form-control__label" id="label">
                            <slot name="label">${this.label}</slot>
                        </div>
                    `
                    : nothing}

                ${hasInstructions
                    ? html`
                        <div part="instructions" class="form-control__instructions" id="instructions">
                            <slot name="instructions">${this.instructions}</slot>
                            <slot name="hint"></slot>
                        </div>
                    `
                    : nothing}

                <div
                    part="radios"
                    class=${classMap({
                        group: true,
                        'pk-radio-group': true,
                        'group--horizontal': this.orientation === 'horizontal',
                        'pk-radio-group--horizontal': this.orientation === 'horizontal',
                    })}
                    role="radiogroup"
                    aria-labelledby=${hasLabel ? 'label' : nothing}
                    aria-label=${!hasLabel ? (this.ariaLabel ?? nothing) : nothing}
                    aria-describedby=${hasInstructions ? 'instructions' : nothing}
                    aria-invalid=${this.invalid ? 'true' : nothing}
                    aria-required=${this.required ? 'true' : nothing}
                >
                    <slot @slotchange=${this.syncItems}></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-radio-group': PkRadioGroup;
    }
}
