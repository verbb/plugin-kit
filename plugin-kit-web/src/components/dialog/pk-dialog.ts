import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../a11y/dismissible-stack.js';
import { lockBodyScrolling, unlockBodyScrolling } from '../../a11y/scroll-lock.js';
import { PkElement } from '../../base/pk-element.js';
import { xmark, renderIconHtml } from '../../icons/index.js';
import {
    PkAfterHideEvent,
    PkAfterShowEvent,
    PkHideEvent,
    PkShowEvent,
    type PkOverlaySource,
} from '../../events/overlay-lifecycle.js';
import { animateWithClass } from '../../utils/animate-with-class.js';
import { observeCraftHostModal, isCraftHostModalOpen, type CraftHostModalObserver } from '../../utils/craft-host-modal.js';
import { pkDialogStyles } from './pk-dialog.styles.js';

const CLOSE_ICON = renderIconHtml(xmark);

/**
 * Modal dialog — literal  `pk-dialog` lifecycle with Plugin Kit styling.
 *
 * Craft CP Garnish modals (asset/element selectors) are not top-layer. While one
 * is open, this dialog temporarily uses `show()` instead of `showModal()` so the
 * Craft UI can stack above — same interop intent as v1 Base UI dialog + `.modal`.
 *
 * @slot trigger - Opens the dialog (optional — use `open` for declarative control)
 * @slot header - Custom header region (replaces the built-in `label` header)
 * @slot label - Dialog title
 * @slot footer - Dialog footer actions
 * @slot - Dialog body
 *
 * @csspart panel - Native dialog element
 * @csspart header - Header region
 * @csspart body - Body region
 * @csspart footer - Footer region
 */
@customElement('pk-dialog')
export class PkDialog extends PkElement {
    static override styles = pkDialogStyles;

    @property({ type: Boolean, reflect: true })
    open = false;

    @property()
    label = '';

    /** Optional subtitle under the title in the built-in header (v1 DialogDescription). */
    @property()
    description = '';

    /** Maps to  `light-dismiss` (inverted). */
    @property({ attribute: 'disable-pointer-dismissal', type: Boolean, reflect: true })
    disablePointerDismissal = false;

    @property({ attribute: 'without-header', type: Boolean, reflect: true })
    withoutHeader = false;

    /**
     * Opt out of the default 1rem body padding applied when the built-in header is shown.
     * Use for flush layouts (sidebars, full-bleed pickers) that own their own inset.
     */
    @property({ attribute: 'without-body-padding', type: Boolean, reflect: true })
    withoutBodyPadding = false;

    @property({ reflect: true })
    size: 'default' | 'wide' = 'default';

    @query('dialog')
    private dialogElement!: HTMLDialogElement;

    @state()
    private triggerElement: HTMLElement | null = null;

    private previouslyFocused: HTMLElement | null = null;

    /** True while demoted from `showModal` so a Craft Garnish modal can stack above. */
    private yieldingToHostModal = false;

    private hostModalObserver: CraftHostModalObserver | null = null;

    /** Inline box captured before yield — cleared on restore. */
    private yieldBox: { top: number; left: number; width: number; height: number } | null = null;

    /** Light-DOM `slot="header"` only — ignore built-in header fallback inside the shadow slot. */
    private hasCustomHeaderSlot(): boolean {
        return this.querySelector(':scope > [slot="header"]') !== null;
    }

    private handleDocumentKeyDown = (event: KeyboardEvent): void => {
        // Craft modal owns Escape while we have yielded the top layer.
        if (this.yieldingToHostModal) {
            return;
        }

        if (event.key === 'Escape' && this.open && isTopDismissible(this)) {
            event.preventDefault();
            event.stopPropagation();
            void this.requestClose('escape');
        }
    };

    /** Pin modeless dialog to the viewport box it had under `showModal`. */
    private applyYieldPosition(box: { top: number; left: number; width: number; height: number }): void {
        const el = this.dialogElement;
        el.style.position = 'fixed';
        el.style.top = `${box.top}px`;
        el.style.left = `${box.left}px`;
        el.style.width = `${box.width}px`;
        el.style.height = `${box.height}px`;
        el.style.margin = '0';
        el.style.maxHeight = 'none';
        // Below typical Garnish.Modal z-index (≥100); keeps page chrome from covering us.
        el.style.zIndex = '99';
        el.toggleAttribute('data-yielding', true);
    }

    private clearYieldPosition(): void {
        const el = this.dialogElement;
        if (!el) {
            return;
        }

        el.style.position = '';
        el.style.top = '';
        el.style.left = '';
        el.style.width = '';
        el.style.height = '';
        el.style.margin = '';
        el.style.maxHeight = '';
        el.style.zIndex = '';
        el.removeAttribute('data-yielding');
        this.yieldBox = null;
    }

    /** Demote `showModal` → `show` so Craft Garnish can paint above (not inert/under). */
    private yieldToHostModal(): void {
        if (this.yieldingToHostModal || !this.open || !this.dialogElement?.open) {
            return;
        }

        // Capture centered modal box before leaving the top layer — `show()` is
        // in-flow and would otherwise jump to the host's layout position.
        const rect = this.dialogElement.getBoundingClientRect();
        this.yieldBox = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        };
        this.yieldingToHostModal = true;

        try {
            this.dialogElement.close();
            this.dialogElement.show();
            this.applyYieldPosition(this.yieldBox);
        } catch {
            this.yieldingToHostModal = false;
            this.clearYieldPosition();
        }
    }

    /** Restore top-layer modal after Craft Garnish closes. */
    private restoreFromHostModal(): void {
        if (!this.yieldingToHostModal) {
            return;
        }

        this.yieldingToHostModal = false;
        this.clearYieldPosition();

        if (!this.open || !this.dialogElement) {
            return;
        }

        try {
            if (this.dialogElement.open) {
                this.dialogElement.close();
            }
            this.dialogElement.showModal();
        } catch {
            /* noop — next open cycle will recover */
        }
    }

    private onHostModalPresenceChange = (hostModalOpen: boolean): void => {
        if (hostModalOpen) {
            this.yieldToHostModal();
        } else {
            this.restoreFromHostModal();
        }
    };

    override firstUpdated(): void {
        // Mount-with-open (React `{open && <Dialog open>}` / `<Dialog open>`) must
        // use show() so the enter animation runs. A bare showModal() here used to
        // open instantly, then updated()→show() no-op'd because dialogElement.open
        // was already true — page-settings (always mounted, open toggled) still
        // animated because it only went through show().
        if (this.open) {
            void this.show();
        }
    }

    override disconnectedCallback(): void {
        unlockBodyScrolling(this);
        this.removeOpenListeners();
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        super.updated(changed);

        if (!changed.has('open') || !this.hasUpdated) {
            return;
        }

        this.handleOpenChange();
    }

    /** `handleOpenChange` — declarative `open` drives show/close. */
    private handleOpenChange(): void {
        if (this.open && !this.dialogElement.open) {
            void this.show();
        } else if (!this.open && this.dialogElement.open) {
            this.open = true;
            void this.requestClose('api');
        }
    }

    private showing = false;

    /** Shows the dialog —  `show()`. */
    async show(_source: PkOverlaySource = 'api'): Promise<void> {
        if (this.showing || this.dialogElement?.open) {
            return;
        }

        this.showing = true;

        try {
            const showEvent = new PkShowEvent();

            if (!this.dispatchEvent(showEvent)) {
                this.open = false;
                return;
            }

            this.addOpenListeners();
            this.previouslyFocused = document.activeElement as HTMLElement | null;
            this.open = true;
            this.dialogElement.showModal();
            lockBodyScrolling(this);

            requestAnimationFrame(() => {
                const elementToFocus = this.querySelector<HTMLElement>('[autofocus]');

                if (elementToFocus) {
                    const innerControl = elementToFocus.shadowRoot?.querySelector<HTMLElement>(
                        'input, textarea, select, button',
                    );

                    (innerControl ?? elementToFocus).focus({ preventScroll: true });
                    return;
                }

                this.dialogElement.focus({ preventScroll: true });
            });

            await animateWithClass(this.dialogElement, 'show');

            this.dispatchEvent(new CustomEvent('pk-open-change', {
                detail: { open: true },
                bubbles: true,
                composed: true,
            }));
            this.dispatchEvent(new PkAfterShowEvent());
        } finally {
            this.showing = false;
        }
    }

    async hide(source: PkOverlaySource = 'unknown'): Promise<void> {
        await this.requestClose(source);
    }

    closeDialog(): void {
        void this.requestClose('close-button');
    }

    /** `requestClose()`. */
    async requestClose(source: PkOverlaySource | EventTarget = 'unknown'): Promise<void> {
        const overlaySource: PkOverlaySource = typeof source === 'string'
            ? source
            : 'close-button';

        const hideEvent = new PkHideEvent(overlaySource);

        if (!this.dispatchEvent(hideEvent)) {
            this.open = true;
            await animateWithClass(this.dialogElement, 'pulse');
            return;
        }

        this.removeOpenListeners();
        await animateWithClass(this.dialogElement, 'hide');
        this.open = false;
        this.dialogElement.close();
        unlockBodyScrolling(this);

        const restoreFocus = this.previouslyFocused;
        this.previouslyFocused = null;

        if (restoreFocus?.isConnected) {
            window.setTimeout(() => {
                restoreFocus.focus({ preventScroll: true });
            }, 0);
        }

        this.dispatchEvent(new PkAfterHideEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: false },
            bubbles: true,
            composed: true,
        }));
    }

    /** Recovery hook — clears hung modal state from overlay races. */
    forceOverlayReset(): void {
        this.open = false;
        this.yieldingToHostModal = false;
        this.clearYieldPosition();
        this.removeOpenListeners();

        if (this.dialogElement?.open) {
            try {
                this.dialogElement.close();
            } catch {
                /* noop */
            }
        }

        this.dialogElement?.classList.remove('hide', 'show', 'pulse');
        unlockBodyScrolling(this);
    }

    private addOpenListeners(): void {
        document.addEventListener('keydown', this.handleDocumentKeyDown);
        registerDismissible(this);
        this.hostModalObserver?.disconnect();
        this.hostModalObserver = observeCraftHostModal(this.onHostModalPresenceChange);
        // Craft modal may already be open when this dialog mounts (rare).
        this.onHostModalPresenceChange(isCraftHostModalOpen());
    }

    private removeOpenListeners(): void {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
        unregisterDismissible(this);
        this.hostModalObserver?.disconnect();
        this.hostModalObserver = null;
        this.yieldingToHostModal = false;
        this.clearYieldPosition();
    }

    private handleDialogCancel = (event: Event): void => {
        event.preventDefault();

        if (!this.dialogElement.classList.contains('hide') && isTopDismissible(this)) {
            void this.requestClose('escape');
        }
    };

    private handleDialogClick = (event: Event): void => {
        const closeViaPath = event.composedPath().some(
            (node): node is Element =>
                node instanceof Element && node.matches('[data-dialog="close"], [data-dialog-close]'),
        );

        if (closeViaPath) {
            event.stopPropagation();
            void this.requestClose('close-button');
        }
    };

    private handleDialogPointerDown = async (event: Event): Promise<void> => {
        if (event.target !== this.dialogElement) {
            return;
        }

        if (!this.disablePointerDismissal) {
            void this.requestClose('pointer-dismiss');
            return;
        }

        await animateWithClass(this.dialogElement, 'pulse');
    };

    private syncHasTriggerAttribute(): void {
        // Drives :host(:not([data-has-trigger])) zero-footprint layout (see styles).
        this.toggleAttribute('data-has-trigger', Boolean(this.triggerElement));
    }

    private onTriggerSlotChange(event: Event): void {
        const slot = event.target as HTMLSlotElement;
        const [trigger] = slot.assignedElements({ flatten: true }) as HTMLElement[];

        if (this.triggerElement) {
            this.triggerElement.removeEventListener('click', this.onTriggerClick);
        }

        this.triggerElement = trigger ?? null;
        this.syncHasTriggerAttribute();

        if (this.triggerElement) {
            this.triggerElement.addEventListener('click', this.onTriggerClick);
        }
    }

    private onTriggerClick = (event: Event): void => {
        event.preventDefault();
        this.open = true;
    };

    /** Re-render when footer actions are added/removed so the chrome is not shown empty. */
    private onFooterSlotChange = (): void => {
        this.requestUpdate();
    };

    override render() {
        const showBuiltInHeader = !this.hasCustomHeaderSlot()
            && !this.withoutHeader
            && Boolean(this.label);
        const padBody = showBuiltInHeader && !this.withoutBodyPadding;
        const hasFooter = this.querySelector(':scope > [slot="footer"]') !== null;

        return html`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <dialog
                part="panel"
                class=${classMap({
                    dialog: true,
                    open: this.open,
                    'dialog--wide': this.size === 'wide',
                })}
                tabindex="-1"
                @cancel=${this.handleDialogCancel}
                @click=${this.handleDialogClick}
                @pointerdown=${this.handleDialogPointerDown}
            >
                <slot name="header">
                    ${showBuiltInHeader
                        ? html`
                            <header part="header" class="header">
                                <h2 part="title" class="title">
                                    <slot name="label">${this.label}</slot>
                                </h2>
                                ${this.description
                                    ? html`
                                        <p part="description" class="description">
                                            <slot name="description">${this.description}</slot>
                                        </p>
                                    `
                                    : html`<slot name="description" hidden></slot>`}
                                <button type="button" class="close" data-dialog="close" aria-label="Close">
                                    <span class="close-icon" aria-hidden="true">${unsafeSVG(CLOSE_ICON)}</span>
                                </button>
                            </header>
                        `
                        : nothing}
                </slot>
                <div
                    part="body"
                    class=${classMap({
                        body: true,
                        'body--padded': padBody,
                    })}
                >
                    <slot></slot>
                </div>
                ${hasFooter
                    ? html`
                        <footer part="footer" class="footer">
                            <slot name="footer" @slotchange=${this.onFooterSlotChange}></slot>
                        </footer>
                    `
                    : html`<slot name="footer" @slotchange=${this.onFooterSlotChange} hidden></slot>`}
            </dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-dialog': PkDialog;
    }
}
