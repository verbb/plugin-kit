/**
 * Restore HTML “implicit submission” for FACE controls with a shadow native input.
 *
 * Native light-DOM text inputs inside a <form> submit on Enter via the default
 * submitter. Shadow inputs do not — the host must request submit on the schema
 * form (never Craft’s outer #main when nested under the CP form).
 *
 * Prefer `pk-implicit-submit` (handled by SchemaFormEngine → handleSubmit) over
 * `HTMLFormElement.requestSubmit()`, which will navigate if the wrong form is
 * targeted or if preventDefault never runs.
 *
 * Skip types that never implicit-submit, and modified Enter.
 */
const NON_IMPLICIT_SUBMIT_INPUT_TYPES = new Set([
    'button',
    'submit',
    'reset',
    'checkbox',
    'radio',
    'file',
    'image',
    'hidden',
]);

/** Dispatched on the schema <form>; SchemaFormEngine calls handleSubmit(). */
const PK_IMPLICIT_SUBMIT_EVENT = 'pk-implicit-submit';

type ImplicitSubmitHost = HTMLElement & {
    form: HTMLFormElement | null;
    disabled?: boolean;
    readonly?: boolean;
};

const shouldRequestFormSubmitOnEnter = (
    event: KeyboardEvent,
    inputType: string | null | undefined,
): boolean => {
    if (event.key !== 'Enter' || event.defaultPrevented || event.isComposing) {
        return false;
    }

    // Match typical form submit: plain Enter only (Shift+Enter stays for multiline UIs).
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return false;
    }

    const type = (inputType || 'text').toLowerCase();

    return !NON_IMPLICIT_SUBMIT_INPUT_TYPES.has(type);
};

/**
 * Resolve the form that should receive implicit submit.
 * Inside pk-dialog, prefer the SchemaFormEngine form in the dialog — not Craft’s
 * outer #main form (nested forms make FACE form owner ambiguous / wrong).
 */
const resolveSubmitForm = (host: ImplicitSubmitHost): HTMLFormElement | null => {
    const dialog = host.closest?.('pk-dialog');

    if (dialog) {
        const dialogForm = dialog.querySelector('form');

        if (dialogForm) {
            return dialogForm;
        }
    }

    const associated = host.form;

    // Never treat Craft’s CP shell form as an implicit-submit target from kit controls.
    if (associated && associated.id === 'main') {
        return host.closest?.('form') !== associated ? host.closest('form') : null;
    }

    return associated;
};

/**
 * Call from a shadow `<input>` keydown handler on a form-associated host.
 * Returns true when submit was requested.
 */
const requestAssociatedFormSubmitOnEnter = (
    host: ImplicitSubmitHost,
    event: KeyboardEvent,
    inputType?: string | null,
): boolean => {
    if (host.disabled || host.readonly) {
        return false;
    }

    if (!shouldRequestFormSubmitOnEnter(event, inputType)) {
        return false;
    }

    const form = resolveSubmitForm(host);

    if (!form || form.id === 'main') {
        return false;
    }

    // Stop Craft / other document listeners from treating Enter as CP form submit.
    event.preventDefault();
    event.stopPropagation();

    // SchemaFormEngine listens and runs handleSubmit() — no HTML navigation risk.
    form.dispatchEvent(new CustomEvent(PK_IMPLICIT_SUBMIT_EVENT, {
        bubbles: false,
        cancelable: true,
    }));

    return true;
};

export {
    PK_IMPLICIT_SUBMIT_EVENT,
    requestAssociatedFormSubmitOnEnter,
    shouldRequestFormSubmitOnEnter,
};
