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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
};

export type CustomElementDecorator = {
    (cls: CustomElementClass): void;
    (
        target: CustomElementClass,
        context: ClassDecoratorContext<Constructor<HTMLElement>>,
    ): void;
};

export const customElement =
    (tagName: string): CustomElementDecorator =>
    (
        classOrTarget: CustomElementClass | Constructor<HTMLElement>,
        context?: ClassDecoratorContext<Constructor<HTMLElement>>,
    ) => {
        const define = (): void => {
            if (customElements.get(tagName)) {
                return;
            }

            customElements.define(tagName, classOrTarget as CustomElementConstructor);
        };

        if (context !== undefined) {
            context.addInitializer(define);
        } else {
            define();
        }
    };
