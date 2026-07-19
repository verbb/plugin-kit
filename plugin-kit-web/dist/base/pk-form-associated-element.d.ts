import { PropertyValues } from 'lit';
import { PkValidator } from '../validators/index.js';
import { PkElement } from './pk-element.js';
/**
 * Form-associated custom element base —  `FormAssociatedElement` pattern.
 */
export declare abstract class PkFormAssociatedElement extends PkElement {
    static formAssociated: boolean;
    static get validators(): PkValidator[];
    static get observedAttributes(): string[];
    protected readonly internals: ElementInternals;
    /** Shadow native control for `MirrorValidator`. */
    input?: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    /** Events that must all fire before `:user-invalid` applies — override per component. */
    assumeInteractionOn: string[];
    validators: PkValidator[];
    name: string | null;
    disabled: boolean;
    required: boolean;
    customError: string | null;
    valueHasChanged: boolean;
    hasInteracted: boolean;
    private emittedEvents;
    private hostAriaMirror?;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    firstUpdated(_changed: PropertyValues): void;
    /** Focusable native control that receives mirrored field-shell ARIA. */
    protected getAriaMirrorTarget(): HTMLElement | null;
    /** Standalone label/instructions wiring when no external field shell is present. */
    protected syncStandaloneAria(): void;
    protected connectHostAriaMirror(): void;
    protected syncHostAriaMirror(): void;
    formResetCallback(): void;
    formDisabledCallback(isDisabled: boolean): void;
    formStateRestoreCallback(state: string | File | FormData | null, _reason?: 'restore' | 'autocomplete'): void;
    set form(value: string);
    get form(): HTMLFormElement | null;
    get labels(): NodeList;
    get validity(): ValidityState;
    get willValidate(): boolean;
    get validationMessage(): string;
    getForm(): HTMLFormElement | null;
    checkValidity(): boolean;
    reportValidity(): boolean;
    resetValidity(): void;
    setCustomValidity(message: string): void;
    protected get validationTarget(): HTMLElement | undefined;
    protected get allValidators(): PkValidator[];
    protected setFormValue(value: string | File | FormData | null, state?: string | File | FormData | null): void;
    protected setValue(value: string | File | FormData | null, state?: string | File | FormData | null): void;
    protected updateValidity(): void;
    protected syncCustomStates(): void;
    protected setState(name: string, active: boolean): void;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(_state: string | File | FormData | null): void;
    private emitInvalid;
    private handleInteraction;
}
//# sourceMappingURL=pk-form-associated-element.d.ts.map