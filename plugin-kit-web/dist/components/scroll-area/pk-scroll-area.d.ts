import { PkElement } from '../../base/pk-element.js';
export type PkScrollAreaSize = 'xs' | 'sm' | 'default';
export type PkScrollAreaOrientation = 'horizontal' | 'vertical';
/**
 * Scrollable region —  scroller pattern with optional custom thumb + edge shadows.
 *
 * @slot - Scrollable content
 *
 * @event pk-scroll - Emitted when the viewport scrolls.
 *
 * @csspart base - Root container
 * @csspart content - Scrollable content wrapper
 * @csspart viewport - Scroll viewport (alias for content)
 * @csspart start-shadow - Leading edge shadow
 * @csspart end-shadow - Trailing edge shadow
 * @csspart scrollbar - Custom scrollbar track
 * @csspart thumb - Custom scrollbar thumb
 */
export declare class PkScrollArea extends PkElement {
    static styles: import('lit').CSSResult;
    orientation: PkScrollAreaOrientation;
    size: PkScrollAreaSize;
    withoutShadow: boolean;
    withoutScrollbar: boolean;
    /** Readonly reference to the internal scroll container. */
    content: HTMLDivElement;
    private scrollbarElement?;
    private thumbElement?;
    private hovering;
    private scrolling;
    private canScroll;
    private scrollTimeout;
    private resizeObserver?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    /** Scrolls the internal viewport. */
    scrollContentTo(options?: ScrollToOptions): void;
    private handleScroll;
    private handleSlotChange;
    private handlePointerEnter;
    private handlePointerLeave;
    private handleKeyDown;
    private updateScroll;
    private updateThumb;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-scroll-area': PkScrollArea;
    }
}
//# sourceMappingURL=pk-scroll-area.d.ts.map