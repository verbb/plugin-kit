import type { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { HostAriaMirror } from '../internal/control-aria.js';
import { PkInvalidEvent } from '../events/pk-invalid.js';
import { CustomErrorValidator, type PkValidator } from '../validators/index.js';
import { PkElement } from './pk-element.js';

/**
 * Form-associated custom element base —  `FormAssociatedElement` pattern.
 */
export abstract class PkFormAssociatedElement extends PkElement {
    static formAssociated = true;

    static get validators(): PkValidator[] {
        return [CustomErrorValidator()];
    }

    static get observedAttributes(): string[] {
        const attrs = new Set(super.observedAttributes ?? []);

        for (const validator of this.validators) {
            for (const attr of validator.observedAttributes ?? []) {
                attrs.add(attr);
            }
        }

        return [...attrs];
    }

    protected readonly internals = this.attachInternals();

    /** Shadow native control for `MirrorValidator`. */
    input?: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    /** Events that must all fire before `:user-invalid` applies — override per component. */
    assumeInteractionOn: string[] = ['input'];

    validators: PkValidator[] = [];

    @property({ reflect: true })
    name: string | null = null;

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    required = false;

    @property({ attribute: 'custom-error', reflect: true })
    customError: string | null = null;

    @property({ attribute: false, state: true })
    valueHasChanged = false;

    @property({ attribute: false, state: true })
    hasInteracted = false;

    private emittedEvents: string[] = [];

    private hostAriaMirror?: HostAriaMirror;

    constructor() {
        super();
        this.addEventListener('invalid', this.emitInvalid as EventListener);
    }

    override connectedCallback(): void {
        super.connectedCallback();

        for (const eventName of this.assumeInteractionOn) {
            this.addEventListener(eventName, this.handleInteraction);
        }

        this.updateValidity();
    }

    override disconnectedCallback(): void {
        this.hostAriaMirror?.disconnect();
        this.hostAriaMirror = undefined;

        for (const eventName of this.assumeInteractionOn) {
            this.removeEventListener(eventName, this.handleInteraction);
        }

        this.removeEventListener('invalid', this.emitInvalid as EventListener);
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('customError')) {
            this.setCustomValidity(this.customError ?? '');
        }

        if (changed.has('disabled')) {
            // Do not toggleAttribute(`disabled`, this.disabled): when React/@lit/react
            // assigns `disabled = undefined`, force is undefined and toggleAttribute
            // *adds* the attribute (boolean presence → disabled=true → FACE
            // formDisabledCallback). Reflection on this Boolean property already syncs
            // the attribute; only Custom State API needs an explicit update here.
            this.setState('disabled', Boolean(this.disabled));
        }

        if (changed.has('value') || changed.has('disabled') || changed.has('required') || changed.has('name')) {
            this.syncFormValue();
        }

        this.updateValidity();
        super.updated(changed);
        this.syncHostAriaMirror();
    }

    override firstUpdated(_changed: PropertyValues): void {
        super.firstUpdated(_changed);
        this.connectHostAriaMirror();
    }

    /** Focusable native control that receives mirrored field-shell ARIA. */
    protected getAriaMirrorTarget(): HTMLElement | null {
        return this.input ?? null;
    }

    /** Standalone label/instructions wiring when no external field shell is present. */
    protected syncStandaloneAria(): void {}

    protected connectHostAriaMirror(): void {
        this.hostAriaMirror?.disconnect();
        this.hostAriaMirror = new HostAriaMirror(
            this,
            () => this.getAriaMirrorTarget(),
            () => this.syncStandaloneAria(),
        );
        this.hostAriaMirror.connect();
    }

    protected syncHostAriaMirror(): void {
        this.hostAriaMirror?.sync();
    }

    formResetCallback(): void {
        this.resetValidity();
        this.hasInteracted = false;
        this.valueHasChanged = false;
        this.emittedEvents = [];
        this.resetToDefaultValue();
        this.syncFormValue();
        this.updateValidity();
    }

    formDisabledCallback(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.updateValidity();
    }

    formStateRestoreCallback(state: string | File | FormData | null, _reason?: 'restore' | 'autocomplete'): void {
        this.restoreFormState(state);
        this.syncFormValue();
        this.updateValidity();
    }

    set form(value: string) {
        if (value) {
            this.setAttribute('form', value);
        } else {
            this.removeAttribute('form');
        }
    }

    get form(): HTMLFormElement | null {
        return this.internals.form;
    }

    get labels(): NodeList {
        return this.internals.labels;
    }

    get validity(): ValidityState {
        return this.internals.validity;
    }

    get willValidate(): boolean {
        return this.internals.willValidate;
    }

    get validationMessage(): string {
        return this.internals.validationMessage;
    }

    getForm(): HTMLFormElement | null {
        return this.internals.form;
    }

    checkValidity(): boolean {
        this.updateValidity();
        return this.internals.checkValidity();
    }

    reportValidity(): boolean {
        this.updateValidity();
        this.hasInteracted = true;
        return this.internals.reportValidity();
    }

    resetValidity(): void {
        this.setCustomValidity('');
        this.internals.setValidity({});
        this.syncCustomStates();
    }

    setCustomValidity(message: string): void {
        if (!message) {
            this.customError = null;
            this.internals.setValidity({});
            this.syncCustomStates();
            return;
        }

        this.customError = message;
        const anchor = this.validationTarget;

        if (anchor instanceof HTMLElement) {
            this.internals.setValidity({ customError: true }, message, anchor);
        } else {
            this.internals.setValidity({ customError: true }, message);
        }

        this.syncCustomStates();
    }

    protected get validationTarget(): HTMLElement | undefined {
        return this.input;
    }

    protected get allValidators(): PkValidator[] {
        const ctor = this.constructor as typeof PkFormAssociatedElement;
        return [...(ctor.validators ?? []), ...(this.validators ?? [])];
    }

    protected setFormValue(
        value: string | File | FormData | null,
        state?: string | File | FormData | null,
    ): void {
        this.internals.setFormValue(value, state ?? value);
    }

    protected setValue(
        value: string | File | FormData | null,
        state?: string | File | FormData | null,
    ): void {
        this.setFormValue(value, state ?? value);
    }

    protected updateValidity(): void {
        if (this.disabled || this.hasAttribute('disabled') || !this.willValidate) {
            this.internals.setValidity({});
            this.syncCustomStates();
            return;
        }

        const validators = this.allValidators;

        if (!validators.length) {
            return;
        }

        const flags: Partial<Record<keyof ValidityState, boolean>> = {
            customError: Boolean(this.customError),
        };

        let finalMessage = '';
        const anchor = this.validationTarget;

        for (const validator of validators) {
            const { isValid, message, invalidKeys } = validator.checkValidity(this);

            if (isValid) {
                continue;
            }

            if (!finalMessage) {
                finalMessage = message;
            }

            for (const key of invalidKeys) {
                flags[key] = true;
            }
        }

        if (!finalMessage) {
            finalMessage = this.validationMessage;
        }

        if (anchor instanceof HTMLElement) {
            this.internals.setValidity(flags, finalMessage, anchor);
        } else {
            this.internals.setValidity(flags, finalMessage);
        }

        this.syncCustomStates();
    }

    protected syncCustomStates(): void {
        const isValid = this.internals.validity.valid;

        this.setState('required', this.required);
        this.setState('optional', !this.required);
        this.setState('invalid', !isValid);
        this.setState('valid', isValid);
        this.setState('user-invalid', !isValid && this.hasInteracted);
        this.setState('user-valid', isValid && this.hasInteracted);
    }

    protected setState(name: string, active: boolean): void {
        const states = this.internals.states;

        if (!states) {
            return;
        }

        if (active) {
            states.add(name);
        } else {
            states.delete(name);
        }
    }

    protected syncFormValue(): void {}

    protected resetToDefaultValue(): void {}

    protected restoreFormState(_state: string | File | FormData | null): void {}

    private emitInvalid = (event: Event): void => {
        if (event.target !== this) {
            return;
        }

        this.hasInteracted = true;
        this.dispatchEvent(new PkInvalidEvent());
    };

    private handleInteraction = (event: Event): void => {
        if (!this.emittedEvents.includes(event.type)) {
            this.emittedEvents.push(event.type);
        }

        if (this.emittedEvents.length >= this.assumeInteractionOn.length) {
            this.hasInteracted = true;
            this.updateValidity();
        }
    };
}
