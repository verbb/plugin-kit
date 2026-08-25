/**
 * Lit's `@customElement` always calls `customElements.define`. On Craft CP pages
 * that load multiple Plugin Kit consumers (each with its own bundled copy of the
 * same tag), the second define throws NotSupportedError and aborts the rest of
 * that register bundle. Skip redefine — first registrant wins.
 *
 * Drop-in replacement for `customElement` from `lit/decorators.js` /
 * `@lit/reactive-element/decorators/custom-element.js`.
 */
type CustomElementClass = Omit<typeof HTMLElement, 'new'>;
type Constructor<T> = {
    new (...args: any[]): T;
};
export type CustomElementDecorator = {
    (cls: CustomElementClass): void;
    (target: CustomElementClass, context: ClassDecoratorContext<Constructor<HTMLElement>>): void;
};
export declare const customElement: (tagName: string) => CustomElementDecorator;
export {};
//# sourceMappingURL=safe-custom-element.d.ts.map