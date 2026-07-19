/** Reads the legacy `hint` attribute when `instructions` is empty. */
export function readLegacyInstructions(element: HTMLElement, instructions: string): string {
    if (instructions) {
        return instructions;
    }

    return element.getAttribute('hint') ?? '';
}

/** Whether a named slot (or legacy alias) has content. */
export function hasInstructionContent(
    hasSlot: (name: string, flag?: boolean) => boolean,
    instructions: string,
    withInstructions = false,
): boolean {
    return Boolean(instructions)
        || hasSlot('instructions', withInstructions)
        || hasSlot('hint');
}
