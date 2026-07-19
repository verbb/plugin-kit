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
export { unregisterDismissible as i, isTopDismissible as n, registerDismissible as r, getDismissibleStackSnapshot as t };

//# sourceMappingURL=dismissible-stack-XQUMfKO3.js.map