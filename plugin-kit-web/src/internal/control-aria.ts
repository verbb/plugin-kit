/** ARIA attributes mirrored from a field shell host onto the focusable native control. */
export const MIRRORED_ARIA_ATTRIBUTES = [
    'aria-labelledby',
    'aria-describedby',
    'aria-invalid',
    'aria-errormessage',
    'aria-required',
    'aria-label',
] as const;

/** True when a parent `pk-field` (or similar) has wired external field chrome. */
export function hasExternalFieldAria(host: Element): boolean {
    return host.hasAttribute('aria-labelledby')
        || host.hasAttribute('aria-describedby')
        || host.hasAttribute('aria-errormessage');
}

/** Copy mirrored ARIA attributes from `source` onto `target`. */
export function mirrorAriaAttributes(source: Element, target: Element): void {
    for (const name of MIRRORED_ARIA_ATTRIBUTES) {
        const value = source.getAttribute(name);

        if (value !== null) {
            target.setAttribute(name, value);
        } else {
            target.removeAttribute(name);
        }
    }
}

export type StandaloneControlAriaOptions = {
    control: HTMLElement;
    labelId?: string;
    instructionsId?: string;
    hasLabel: boolean;
    hasInstructions: boolean;
    required?: boolean;
    invalid?: boolean;
};

/** Wire label/instructions/required/invalid for standalone controls ( internal layout). */
export function syncStandaloneControlAria({
    control,
    labelId,
    instructionsId,
    hasLabel,
    hasInstructions,
    required = false,
    invalid = false,
}: StandaloneControlAriaOptions): void {
    if (hasLabel && labelId) {
        control.setAttribute('aria-labelledby', labelId);
    } else {
        control.removeAttribute('aria-labelledby');
    }

    if (hasInstructions && instructionsId) {
        control.setAttribute('aria-describedby', instructionsId);
    } else {
        control.removeAttribute('aria-describedby');
    }

    if (required) {
        control.setAttribute('aria-required', 'true');
    } else {
        control.removeAttribute('aria-required');
    }

    if (invalid) {
        control.setAttribute('aria-invalid', 'true');
    } else {
        control.removeAttribute('aria-invalid');
    }

    control.removeAttribute('aria-errormessage');
}

/** Observes host ARIA attribute changes and mirrors them to a focusable inner control. */
export class HostAriaMirror {
    private observer?: MutationObserver;

    constructor(
        private readonly host: HTMLElement,
        private readonly getTarget: () => HTMLElement | null | undefined,
        private readonly onSync?: () => void,
    ) {}

    connect(): void {
        this.sync();

        this.observer = new MutationObserver(() => {
            this.sync();
        });

        this.observer.observe(this.host, {
            attributes: true,
            attributeFilter: [...MIRRORED_ARIA_ATTRIBUTES],
        });
    }

    disconnect(): void {
        this.observer?.disconnect();
        this.observer = undefined;
    }

    sync(): void {
        if (!hasExternalFieldAria(this.host)) {
            this.onSync?.();
            return;
        }

        const target = this.getTarget();

        if (!target) {
            return;
        }

        mirrorAriaAttributes(this.host, target);
    }
}

/** Mirror host ARIA onto the first slotted input/textarea inside a group wrapper. */
export function mirrorHostAriaToSlottedControl(host: HTMLElement, slot: HTMLSlotElement): void {
    if (!hasExternalFieldAria(host)) {
        return;
    }

    const [control] = slot.assignedElements({ flatten: true }).filter((element) => {
        if (!(element instanceof HTMLElement)) {
            return false;
        }

        if (element.matches('pk-input-group-input, pk-input-group-textarea')) {
            return true;
        }

        return element.querySelector('input, textarea, select') instanceof HTMLElement;
    });

    if (!(control instanceof HTMLElement)) {
        return;
    }

    const target = control.matches('pk-input-group-input, pk-input-group-textarea')
        ? control.shadowRoot?.querySelector('input, textarea') ?? control.querySelector('input, textarea')
        : control.querySelector('input, textarea, select, button[aria-haspopup]');

    if (target instanceof HTMLElement) {
        mirrorAriaAttributes(host, target);
    }
}
