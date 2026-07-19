import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkScrollAreaStyles } from './pk-scroll-area.styles.js';

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
@customElement('pk-scroll-area')
export class PkScrollArea extends PkElement {
    static override styles = pkScrollAreaStyles;

    @property({ reflect: true })
    orientation: PkScrollAreaOrientation = 'vertical';

    @property({ reflect: true })
    size: PkScrollAreaSize = 'default';

    @property({ attribute: 'without-shadow', type: Boolean, reflect: true })
    withoutShadow = false;

    @property({ attribute: 'without-scrollbar', type: Boolean, reflect: true })
    withoutScrollbar = false;

    /** Readonly reference to the internal scroll container. */
    @query('.viewport')
    content!: HTMLDivElement;

    @query('.scrollbar')
    private scrollbarElement?: HTMLDivElement;

    @query('.thumb')
    private thumbElement?: HTMLDivElement;

    @state()
    private hovering = false;

    @state()
    private scrolling = false;

    @state()
    private canScroll = false;

    private scrollTimeout = 0;
    private resizeObserver?: ResizeObserver;

    override connectedCallback(): void {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(() => this.updateScroll());
    }

    override disconnectedCallback(): void {
        this.resizeObserver?.disconnect();
        window.clearTimeout(this.scrollTimeout);
        super.disconnectedCallback();
    }

    override firstUpdated(): void {
        this.resizeObserver?.observe(this.content);
        this.updateScroll();
    }

    /** Scrolls the internal viewport. */
    scrollContentTo(options?: ScrollToOptions): void {
        this.content.scrollTo(options ?? {});
    }

    private handleScroll(): void {
        this.scrolling = true;
        window.clearTimeout(this.scrollTimeout);
        this.scrollTimeout = window.setTimeout(() => {
            this.scrolling = false;
        }, 800);

        this.updateScroll();
        this.dispatchEvent(new CustomEvent('pk-scroll', { bubbles: true, composed: true }));
    }

    private handleSlotChange(): void {
        this.updateScroll();
    }

    private handlePointerEnter(): void {
        this.hovering = true;
    }

    private handlePointerLeave(): void {
        this.hovering = false;
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Home') {
            event.preventDefault();
            this.content.scrollTo({
                left: this.orientation === 'horizontal' ? 0 : undefined,
                top: this.orientation === 'vertical' ? 0 : undefined,
            });
        }

        if (event.key === 'End') {
            event.preventDefault();
            this.content.scrollTo({
                left: this.orientation === 'horizontal' ? this.content.scrollWidth : undefined,
                top: this.orientation === 'vertical' ? this.content.scrollHeight : undefined,
            });
        }
    }

    private updateScroll(): void {
        const content = this.content;

        if (!content) {
            return;
        }

        if (this.orientation === 'horizontal') {
            const clientWidth = Math.ceil(content.clientWidth);
            const scrollLeft = Math.abs(Math.ceil(content.scrollLeft));
            const scrollWidth = Math.ceil(content.scrollWidth);
            const maxScroll = scrollWidth - clientWidth;

            this.canScroll = maxScroll > 0;

            if (!this.withoutShadow) {
                const startShadowOpacity = maxScroll > 0 ? Math.min(1, scrollLeft / (maxScroll * 0.05)) : 0;
                const endShadowOpacity = maxScroll > 0 ? Math.min(1, (maxScroll - scrollLeft) / (maxScroll * 0.05)) : 0;
                this.style.setProperty('--pk-start-shadow-opacity', String(startShadowOpacity || 0));
                this.style.setProperty('--pk-end-shadow-opacity', String(endShadowOpacity || 0));
            }
        } else {
            const clientHeight = Math.ceil(content.clientHeight);
            const scrollTop = Math.abs(Math.ceil(content.scrollTop));
            const scrollHeight = Math.ceil(content.scrollHeight);
            const maxScroll = scrollHeight - clientHeight;

            this.canScroll = maxScroll > 0;

            if (!this.withoutShadow) {
                const startShadowOpacity = maxScroll > 0 ? Math.min(1, scrollTop / (maxScroll * 0.05)) : 0;
                const endShadowOpacity = maxScroll > 0 ? Math.min(1, (maxScroll - scrollTop) / (maxScroll * 0.05)) : 0;
                this.style.setProperty('--pk-start-shadow-opacity', String(startShadowOpacity || 0));
                this.style.setProperty('--pk-end-shadow-opacity', String(endShadowOpacity || 0));
            }
        }

        this.updateThumb();
    }

    private updateThumb(): void {
        if (this.withoutScrollbar || !this.thumbElement || !this.scrollbarElement) {
            return;
        }

        const content = this.content;

        if (this.orientation === 'horizontal') {
            const { scrollLeft, scrollWidth, clientWidth } = content;

            if (scrollWidth <= clientWidth) {
                this.scrollbarElement.style.display = 'none';
                return;
            }

            this.scrollbarElement.style.display = 'flex';
            const trackWidth = this.scrollbarElement.clientWidth;
            const thumbRatio = clientWidth / scrollWidth;
            const thumbWidth = Math.max(trackWidth * thumbRatio, 24);
            const maxScroll = scrollWidth - clientWidth;
            const scrollRatio = maxScroll > 0 ? scrollLeft / maxScroll : 0;
            const thumbLeft = scrollRatio * (trackWidth - thumbWidth);

            this.thumbElement.style.width = `${thumbWidth}px`;
            this.thumbElement.style.height = '';
            this.thumbElement.style.transform = `translateX(${thumbLeft}px)`;
            return;
        }

        const { scrollTop, scrollHeight, clientHeight } = content;

        if (scrollHeight <= clientHeight) {
            this.scrollbarElement.style.display = 'none';
            return;
        }

        this.scrollbarElement.style.display = 'flex';

        const trackHeight = this.scrollbarElement.clientHeight;
        const thumbRatio = clientHeight / scrollHeight;
        const thumbHeight = Math.max(trackHeight * thumbRatio, 24);
        const maxScroll = scrollHeight - clientHeight;
        const scrollRatio = maxScroll > 0 ? scrollTop / maxScroll : 0;
        const thumbTop = scrollRatio * (trackHeight - thumbHeight);

        this.thumbElement.style.height = `${thumbHeight}px`;
        this.thumbElement.style.width = '';
        this.thumbElement.style.transform = `translateY(${thumbTop}px)`;
    }

    override render() {
        const isVertical = this.orientation === 'vertical';

        return html`
            <div
                part="base"
                class="root pk-scroll-area"
                @pointerenter=${this.handlePointerEnter}
                @pointerleave=${this.handlePointerLeave}
            >
                ${this.withoutShadow
                    ? nothing
                    : html`
                        <div part="start-shadow" class="start-shadow" aria-hidden="true"></div>
                        <div part="end-shadow" class="end-shadow" aria-hidden="true"></div>
                    `}
                <div
                    part="viewport"
                    class="viewport pk-scroll-area__viewport"
                    tabindex=${this.canScroll ? '0' : nothing}
                    @scroll=${this.handleScroll}
                    @keydown=${this.handleKeyDown}
                >
                    <div
                        part="content"
                        class="content pk-scroll-area__content"
                        @slotchange=${this.handleSlotChange}
                    >
                        <slot></slot>
                    </div>
                </div>
                ${this.withoutScrollbar
                    ? nothing
                    : html`
                        <div
                            part="scrollbar"
                            class=${classMap({
                                scrollbar: true,
                                'pk-scroll-area__scrollbar': true,
                                [`pk-scroll-area__scrollbar--size-${this.size}`]: true,
                            })}
                            data-orientation=${this.orientation}
                            ?data-hovering=${this.hovering}
                            ?data-scrolling=${this.scrolling}
                        >
                            <div part="thumb" class="thumb pk-scroll-area__thumb"></div>
                        </div>
                    `}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-scroll-area': PkScrollArea;
    }
}
