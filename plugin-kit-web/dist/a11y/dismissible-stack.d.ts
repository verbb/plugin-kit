export declare function registerDismissible(key: object): void;
export declare function unregisterDismissible(key: object): void;
export declare function isTopDismissible(key: object): boolean;
/** Overlays registered after `key`, bottom → top. Empty when `key` is not on the stack. */
export declare function getDismissiblesAbove(key: object): object[];
/** Dev/diagnostic — ordered stack of dismissible overlay hosts (bottom → top). */
export declare function getDismissibleStackSnapshot(): string[];
//# sourceMappingURL=dismissible-stack.d.ts.map