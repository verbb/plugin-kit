/**
 * Dismissible stack — adapted from  internal/dismissible-stack.ts.
 * Ensures only the topmost overlay handles Escape.
 */
const dismissibleStack: object[] = [];

export function registerDismissible(key: object): void {
    dismissibleStack.push(key);
}

export function unregisterDismissible(key: object): void {
    for (let index = dismissibleStack.length - 1; index >= 0; index -= 1) {
        if (dismissibleStack[index] === key) {
            dismissibleStack.splice(index, 1);
            break;
        }
    }
}

export function isTopDismissible(key: object): boolean {
    return dismissibleStack.length > 0 && dismissibleStack[dismissibleStack.length - 1] === key;
}

/** Dev/diagnostic — ordered stack of dismissible overlay hosts (bottom → top). */
export function getDismissibleStackSnapshot(): string[] {
    return dismissibleStack.map((key) => {
        if (key instanceof HTMLElement) {
            const id = key.id ? `#${key.id}` : '';
            return `<${key.localName}${id}>`;
        }

        return key.constructor?.name ?? 'object';
    });
}
