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
export declare function syncFieldAria({ control, labelId, instructionsId, errorsId, warningId, tipId, controlId, hasLabel, hasInstructions, hasErrors, hasWarning, hasTip, hasRequired, invalid, }: SyncFieldAriaOptions): void;
//# sourceMappingURL=field-aria.d.ts.map