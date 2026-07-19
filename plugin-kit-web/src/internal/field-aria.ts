export type SyncFieldAriaOptions = {
    control: HTMLElement;
    labelId: string;
    instructionsId: string;
    errorsId: string;
    warningId: string;
    tipId: string;
    controlId: string;
    hasLabel: boolean;
    hasInstructions: boolean;
    hasErrors: boolean;
    hasWarning: boolean;
    hasTip: boolean;
    hasRequired?: boolean;
    invalid?: boolean;
};

/** Wires label/instructions/errors/warning/tip ids to a slotted field control. */
export function syncFieldAria({
    control,
    labelId,
    instructionsId,
    errorsId,
    warningId,
    tipId,
    controlId,
    hasLabel,
    hasInstructions,
    hasErrors,
    hasWarning,
    hasTip,
    hasRequired = false,
    invalid = false,
}: SyncFieldAriaOptions): void {
    if (!control.id) {
        control.id = controlId;
    }

    if (hasLabel) {
        control.setAttribute('aria-labelledby', labelId);
    } else {
        control.removeAttribute('aria-labelledby');
    }

    const describedBy = [
        hasInstructions ? instructionsId : '',
        hasErrors ? errorsId : '',
        hasWarning ? warningId : '',
        hasTip ? tipId : '',
    ].filter(Boolean);

    if (describedBy.length > 0) {
        control.setAttribute('aria-describedby', describedBy.join(' '));
    } else {
        control.removeAttribute('aria-describedby');
    }

    if (hasRequired) {
        control.setAttribute('aria-required', 'true');
    } else {
        control.removeAttribute('aria-required');
    }

    // Kit controls (pk-input, etc.) paint error chrome from reflected `invalid`.
    // v1 Input used Tailwind `aria-invalid:border-*` — aria alone is not enough now.
    const isInvalid = Boolean(invalid || hasErrors);

    if (isInvalid) {
        control.setAttribute('aria-invalid', 'true');
        control.setAttribute('aria-errormessage', errorsId);
    } else {
        control.removeAttribute('aria-invalid');
        control.removeAttribute('aria-errormessage');
    }

    syncControlInvalidState(control, isInvalid);
}

/** Prefer the Lit `invalid` property when present; otherwise toggle the attribute. */
function syncControlInvalidState(control: HTMLElement, isInvalid: boolean): void {
    if ('invalid' in control) {
        (control as HTMLElement & { invalid: boolean }).invalid = isInvalid;
        return;
    }

    control.toggleAttribute('invalid', isInvalid);
}
