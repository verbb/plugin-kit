/** ARIA attributes mirrored from a field shell host onto the focusable native control. */
export declare const MIRRORED_ARIA_ATTRIBUTES: readonly ["aria-labelledby", "aria-describedby", "aria-invalid", "aria-errormessage", "aria-required", "aria-label"];
/** True when a parent `pk-field` (or similar) has wired external field chrome. */
export declare function hasExternalFieldAria(host: Element): boolean;
/** Copy mirrored ARIA attributes from `source` onto `target`. */
export declare function mirrorAriaAttributes(source: Element, target: Element): void;
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
export declare function syncStandaloneControlAria({ control, labelId, instructionsId, hasLabel, hasInstructions, required, invalid, }: StandaloneControlAriaOptions): void;
/** Observes host ARIA attribute changes and mirrors them to a focusable inner control. */
export declare class HostAriaMirror {
    private readonly host;
    private readonly getTarget;
    private readonly onSync?;
    private observer?;
    constructor(host: HTMLElement, getTarget: () => HTMLElement | null | undefined, onSync?: (() => void) | undefined);
    connect(): void;
    disconnect(): void;
    sync(): void;
}
/** Mirror host ARIA onto the first slotted input/textarea inside a group wrapper. */
export declare function mirrorHostAriaToSlottedControl(host: HTMLElement, slot: HTMLSlotElement): void;
//# sourceMappingURL=control-aria.d.ts.map