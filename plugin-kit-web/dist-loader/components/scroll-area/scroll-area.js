import { c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/scroll-area/pk-scroll-area.styles.ts
var pkScrollAreaStyles = i`
    @layer pk-component {
        :host {
            --pk-shadow-color: var(--pk-color-white);
            --pk-shadow-size: 2rem;
            --pk-start-shadow-opacity: 0;
            --pk-end-shadow-opacity: 0;

            display: block;
            position: relative;
            max-width: 100%;
            overflow: hidden;
            isolation: isolate;
            font-family: var(--pk-font-family);
        }

        :host([orientation='vertical']) {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .root {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 100%;
        }

        .viewport {
            z-index: 1;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            outline: none;
            scroll-behavior: smooth;
            scrollbar-width: none;
        }

        .viewport::-webkit-scrollbar {
            display: none;
        }

        .viewport:focus-visible {
            box-shadow: 0 0 0 3px color-mix(in oklab, var(--pk-color-sky-600) 50%, transparent);
        }

        :host([orientation='horizontal']) .viewport {
            overflow-x: auto;
            overflow-y: hidden;
        }

        :host([orientation='vertical']) .viewport {
            flex: 1 1 auto;
            min-height: 0;
            overflow-x: hidden;
            overflow-y: auto;
        }

        .content {
            min-height: 100%;
        }

        :host([orientation='horizontal']) .content {
            width: max-content;
            min-height: 100%;
        }

        .start-shadow,
        .end-shadow {
            z-index: 2;
            position: absolute;
            pointer-events: none;
        }

        .start-shadow {
            opacity: var(--pk-start-shadow-opacity);
        }

        .end-shadow {
            opacity: var(--pk-end-shadow-opacity);
        }

        :host([orientation='horizontal']) .start-shadow,
        :host([orientation='horizontal']) .end-shadow {
            top: 0;
            bottom: 0;
            width: var(--pk-shadow-size);
        }

        :host([orientation='horizontal']) .start-shadow {
            left: 0;
            background: linear-gradient(to right, var(--pk-shadow-color), transparent 100%);
        }

        :host([orientation='horizontal']) .end-shadow {
            right: 0;
            background: linear-gradient(to left, var(--pk-shadow-color), transparent 100%);
        }

        :host([orientation='vertical']) .start-shadow,
        :host([orientation='vertical']) .end-shadow {
            left: 0;
            right: 0;
            height: var(--pk-shadow-size);
        }

        :host([orientation='vertical']) .start-shadow {
            top: 0;
            background: linear-gradient(to bottom, var(--pk-shadow-color), transparent 100%);
        }

        :host([orientation='vertical']) .end-shadow {
            bottom: 0;
            background: linear-gradient(to top, var(--pk-shadow-color), transparent 100%);
        }

        .scrollbar {
            /* Cross-axis thickness — size variants override via --pk-scroll-thumb-size. */
            --pk-scroll-thumb-size: 8px;

            z-index: 3;
            position: absolute;
            touch-action: none;
            user-select: none;
            border-radius: 9999px;
            /* Track stays subtle; thumb carries the Craft gray affordance. */
            background: color-mix(in oklab, var(--pk-color-gray-200) 70%, transparent);
            opacity: 0;
            transition: opacity 0.15s ease;
        }

        .scrollbar.pk-scroll-area__scrollbar--size-xs {
            --pk-scroll-thumb-size: 6px;
        }

        .scrollbar.pk-scroll-area__scrollbar--size-sm {
            --pk-scroll-thumb-size: 7px;
        }

        .scrollbar.pk-scroll-area__scrollbar--size-default {
            --pk-scroll-thumb-size: 8px;
        }

        /* Inset from the clipped host edge so the rounded thumb is fully visible. */
        .scrollbar[data-orientation='vertical'] {
            top: 4px;
            right: 3px;
            bottom: 4px;
            width: var(--pk-scroll-thumb-size);
            height: auto;
        }

        .scrollbar[data-orientation='horizontal'] {
            left: 4px;
            right: 4px;
            bottom: 3px;
            width: auto;
            height: var(--pk-scroll-thumb-size);
        }

        .scrollbar[data-hovering],
        .scrollbar[data-scrolling] {
            opacity: 1;
        }

        .thumb {
            position: absolute;
            border-radius: 9999px;
            background: var(--pk-color-gray-350);
            transition: background 0.12s ease;
        }

        /* Min size is along the scroll axis only — never force cross-axis past the track. */
        .scrollbar[data-orientation='vertical'] .thumb {
            left: 0;
            right: 0;
            width: auto;
            min-height: 24px;
        }

        .scrollbar[data-orientation='horizontal'] .thumb {
            top: 0;
            bottom: 0;
            height: auto;
            min-width: 24px;
        }

        .thumb:hover {
            background: var(--pk-color-gray-500);
        }
    }
`;
//#endregion
//#region src/components/scroll-area/pk-scroll-area.ts
var PkScrollArea = class PkScrollArea extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.orientation = "vertical";
		this.size = "default";
		this.withoutShadow = false;
		this.withoutScrollbar = false;
		this.hovering = false;
		this.scrolling = false;
		this.canScroll = false;
		this.scrollTimeout = 0;
	}
	static {
		this.styles = pkScrollAreaStyles;
	}
	connectedCallback() {
		super.connectedCallback();
		this.resizeObserver = new ResizeObserver(() => this.updateScroll());
	}
	disconnectedCallback() {
		this.resizeObserver?.disconnect();
		window.clearTimeout(this.scrollTimeout);
		super.disconnectedCallback();
	}
	firstUpdated() {
		this.resizeObserver?.observe(this.content);
		this.updateScroll();
	}
	/** Scrolls the internal viewport. */
	scrollContentTo(options) {
		this.content.scrollTo(options ?? {});
	}
	handleScroll() {
		this.scrolling = true;
		window.clearTimeout(this.scrollTimeout);
		this.scrollTimeout = window.setTimeout(() => {
			this.scrolling = false;
		}, 800);
		this.updateScroll();
		this.dispatchEvent(new CustomEvent("pk-scroll", {
			bubbles: true,
			composed: true
		}));
	}
	handleSlotChange() {
		this.updateScroll();
	}
	handlePointerEnter() {
		this.hovering = true;
	}
	handlePointerLeave() {
		this.hovering = false;
	}
	handleKeyDown(event) {
		if (event.key === "Home") {
			event.preventDefault();
			this.content.scrollTo({
				left: this.orientation === "horizontal" ? 0 : void 0,
				top: this.orientation === "vertical" ? 0 : void 0
			});
		}
		if (event.key === "End") {
			event.preventDefault();
			this.content.scrollTo({
				left: this.orientation === "horizontal" ? this.content.scrollWidth : void 0,
				top: this.orientation === "vertical" ? this.content.scrollHeight : void 0
			});
		}
	}
	updateScroll() {
		const content = this.content;
		if (!content) return;
		if (this.orientation === "horizontal") {
			const clientWidth = Math.ceil(content.clientWidth);
			const scrollLeft = Math.abs(Math.ceil(content.scrollLeft));
			const maxScroll = Math.ceil(content.scrollWidth) - clientWidth;
			this.canScroll = maxScroll > 0;
			if (!this.withoutShadow) {
				const startShadowOpacity = maxScroll > 0 ? Math.min(1, scrollLeft / (maxScroll * .05)) : 0;
				const endShadowOpacity = maxScroll > 0 ? Math.min(1, (maxScroll - scrollLeft) / (maxScroll * .05)) : 0;
				this.style.setProperty("--pk-start-shadow-opacity", String(startShadowOpacity || 0));
				this.style.setProperty("--pk-end-shadow-opacity", String(endShadowOpacity || 0));
			}
		} else {
			const clientHeight = Math.ceil(content.clientHeight);
			const scrollTop = Math.abs(Math.ceil(content.scrollTop));
			const maxScroll = Math.ceil(content.scrollHeight) - clientHeight;
			this.canScroll = maxScroll > 0;
			if (!this.withoutShadow) {
				const startShadowOpacity = maxScroll > 0 ? Math.min(1, scrollTop / (maxScroll * .05)) : 0;
				const endShadowOpacity = maxScroll > 0 ? Math.min(1, (maxScroll - scrollTop) / (maxScroll * .05)) : 0;
				this.style.setProperty("--pk-start-shadow-opacity", String(startShadowOpacity || 0));
				this.style.setProperty("--pk-end-shadow-opacity", String(endShadowOpacity || 0));
			}
		}
		this.updateThumb();
	}
	updateThumb() {
		if (this.withoutScrollbar || !this.thumbElement || !this.scrollbarElement) return;
		const content = this.content;
		if (this.orientation === "horizontal") {
			const { scrollLeft, scrollWidth, clientWidth } = content;
			if (scrollWidth <= clientWidth) {
				this.scrollbarElement.style.display = "none";
				return;
			}
			this.scrollbarElement.style.display = "flex";
			const trackWidth = this.scrollbarElement.clientWidth;
			const thumbRatio = clientWidth / scrollWidth;
			const thumbWidth = Math.max(trackWidth * thumbRatio, 24);
			const maxScroll = scrollWidth - clientWidth;
			const thumbLeft = (maxScroll > 0 ? scrollLeft / maxScroll : 0) * (trackWidth - thumbWidth);
			this.thumbElement.style.width = `${thumbWidth}px`;
			this.thumbElement.style.height = "";
			this.thumbElement.style.transform = `translateX(${thumbLeft}px)`;
			return;
		}
		const { scrollTop, scrollHeight, clientHeight } = content;
		if (scrollHeight <= clientHeight) {
			this.scrollbarElement.style.display = "none";
			return;
		}
		this.scrollbarElement.style.display = "flex";
		const trackHeight = this.scrollbarElement.clientHeight;
		const thumbRatio = clientHeight / scrollHeight;
		const thumbHeight = Math.max(trackHeight * thumbRatio, 24);
		const maxScroll = scrollHeight - clientHeight;
		const thumbTop = (maxScroll > 0 ? scrollTop / maxScroll : 0) * (trackHeight - thumbHeight);
		this.thumbElement.style.height = `${thumbHeight}px`;
		this.thumbElement.style.width = "";
		this.thumbElement.style.transform = `translateY(${thumbTop}px)`;
	}
	render() {
		this.orientation;
		return b`
            <div
                part="base"
                class="root pk-scroll-area"
                @pointerenter=${this.handlePointerEnter}
                @pointerleave=${this.handlePointerLeave}
            >
                ${this.withoutShadow ? A : b`
                        <div part="start-shadow" class="start-shadow" aria-hidden="true"></div>
                        <div part="end-shadow" class="end-shadow" aria-hidden="true"></div>
                    `}
                <div
                    part="viewport"
                    class="viewport pk-scroll-area__viewport"
                    tabindex=${this.canScroll ? "0" : A}
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
                ${this.withoutScrollbar ? A : b`
                        <div
                            part="scrollbar"
                            class=${e({
			scrollbar: true,
			"pk-scroll-area__scrollbar": true,
			[`pk-scroll-area__scrollbar--size-${this.size}`]: true
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
};
__decorate([n({ reflect: true })], PkScrollArea.prototype, "orientation", void 0);
__decorate([n({ reflect: true })], PkScrollArea.prototype, "size", void 0);
__decorate([n({
	attribute: "without-shadow",
	type: Boolean,
	reflect: true
})], PkScrollArea.prototype, "withoutShadow", void 0);
__decorate([n({
	attribute: "without-scrollbar",
	type: Boolean,
	reflect: true
})], PkScrollArea.prototype, "withoutScrollbar", void 0);
__decorate([e$1(".viewport")], PkScrollArea.prototype, "content", void 0);
__decorate([e$1(".scrollbar")], PkScrollArea.prototype, "scrollbarElement", void 0);
__decorate([e$1(".thumb")], PkScrollArea.prototype, "thumbElement", void 0);
__decorate([r()], PkScrollArea.prototype, "hovering", void 0);
__decorate([r()], PkScrollArea.prototype, "scrolling", void 0);
__decorate([r()], PkScrollArea.prototype, "canScroll", void 0);
PkScrollArea = __decorate([t("pk-scroll-area")], PkScrollArea);
//#endregion
export { PkScrollArea };
