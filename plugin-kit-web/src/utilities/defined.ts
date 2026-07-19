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
export async function allDefined(options: AllDefinedOptions = {}): Promise<void> {
    const opts = {
        match: (tagName: string) => tagName.startsWith('pk-'),
        additionalElements: [] as string[],
        root: document,
        ...options,
    };

    const additionalElements = Array.isArray(opts.additionalElements)
        ? opts.additionalElements
        : [opts.additionalElements];

    const undefinedElements = [...opts.root.querySelectorAll(':not(:defined)')]
        .map((el) => el.localName)
        .filter((tag, index, arr) => arr.indexOf(tag) === index)
        .filter((tag) => opts.match(tag));

    const tagsToAwait = [...undefinedElements, ...additionalElements];
    await Promise.all(tagsToAwait.map((tag) => customElements.whenDefined(tag)));
    await new Promise(requestAnimationFrame);
}
