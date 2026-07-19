export type AllDefinedOptions = {
    /**
     * Accepts a custom element tag name and returns `true` if the element should be awaited.
     * Tag names are always lowercase.
     */
    match?: (tagName: string) => boolean;
    /** Additional tag names to await that may not be in the DOM yet. */
    additionalElements?: string | string[];
    /** Root to search within. Defaults to `document`. Shadow roots are not traversed. */
    root?: Document | ShadowRoot;
};
/**
 * Waits for custom elements on the page to be registered before resolving.
 * By default, waits for all undefined `pk-*` elements.
 */
export declare function allDefined(options?: AllDefinedOptions): Promise<void>;
//# sourceMappingURL=defined.d.ts.map