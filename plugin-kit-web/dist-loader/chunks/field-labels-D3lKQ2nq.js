//#region src/internal/field-labels.ts
/** Reads the legacy `hint` attribute when `instructions` is empty. */
function readLegacyInstructions(element, instructions) {
	if (instructions) return instructions;
	return element.getAttribute("hint") ?? "";
}
/** Whether a named slot (or legacy alias) has content. */
function hasInstructionContent(hasSlot, instructions, withInstructions = false) {
	return Boolean(instructions) || hasSlot("instructions", withInstructions) || hasSlot("hint");
}
//#endregion
export { readLegacyInstructions as n, hasInstructionContent as t };
