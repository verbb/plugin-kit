//#region src/a11y/dismissible-stack.ts
/**
* Dismissible stack — adapted from  internal/dismissible-stack.ts.
* Ensures only the topmost overlay handles Escape.
*/
var dismissibleStack = [];
function registerDismissible(key) {
	dismissibleStack.push(key);
}
function unregisterDismissible(key) {
	for (let index = dismissibleStack.length - 1; index >= 0; index -= 1) if (dismissibleStack[index] === key) {
		dismissibleStack.splice(index, 1);
		break;
	}
}
function isTopDismissible(key) {
	return dismissibleStack.length > 0 && dismissibleStack[dismissibleStack.length - 1] === key;
}
/** Overlays registered after `key`, bottom → top. Empty when `key` is not on the stack. */
function getDismissiblesAbove(key) {
	const index = dismissibleStack.lastIndexOf(key);
	return index === -1 ? [] : dismissibleStack.slice(index + 1);
}
/** Dev/diagnostic — ordered stack of dismissible overlay hosts (bottom → top). */
function getDismissibleStackSnapshot() {
	return dismissibleStack.map((key) => {
		if (key instanceof HTMLElement) {
			const id = key.id ? `#${key.id}` : "";
			return `<${key.localName}${id}>`;
		}
		return key.constructor?.name ?? "object";
	});
}
//#endregion
export { unregisterDismissible as a, registerDismissible as i, getDismissiblesAbove as n, isTopDismissible as r, getDismissibleStackSnapshot as t };

//# sourceMappingURL=dismissible-stack-D_0W3Azi.js.map