import { LitElement } from 'lit';
export type PkElementErrorDetail = {
    tagName: string;
    message: string;
    stack?: string;
};
declare global {
    interface GlobalEventHandlersEventMap {
        'pk-error': CustomEvent<PkElementErrorDetail>;
    }
}
/**
 * Base class for Plugin Kit web components.
 * Open shadow root; Lit adopts constructable stylesheets where supported.
 *
 * `performUpdate` is wrapped so a single control failure degrades inline instead of
 * taking down the whole CP surface (React error boundaries do not see Lit throws).
 */
export declare class PkElement extends LitElement {
    static shadowRootOptions: ShadowRootInit;
    /** When set, subclasses should skip normal render — base shows a minimal error shell. */
    protected pkRenderFailed: boolean;
    connectedCallback(): void;
    createRenderRoot(): HTMLElement | DocumentFragment;
    performUpdate(): void;
    protected handleRenderFailure(error: unknown): void;
}
//# sourceMappingURL=pk-element.d.ts.map