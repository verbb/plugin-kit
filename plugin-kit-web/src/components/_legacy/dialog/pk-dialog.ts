import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { createFocusTrap, getFocusableElements } from '../../a11y/focus.js';
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
import { pkDialogStyles } from './pk-dialog.styles.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { forceHideOpenPopovers } from '../../utils/top-layer.js';

const CLOSE_ICON = renderIconHtml(xmark);

/**
 * Modal dialog —  `pk-dialog` API (Craft visuals).
 *
 * @slot trigger - Opens the dialog (optional — use `open` for declarative control)
 * @slot header - Custom header region (replaces the built-in `label` header)
 * @slot label - Dialog title
 * @slot footer - Dialog footer actions
 * @slot - Dialog body
 *
 * Initial focus follows : add `autofocus` to a control in the dialog body,
 * otherwise the panel receives focus on open.
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

    /**
     * When set, clicking the backdrop does not close the dialog.
     * Matches Base UI `disablePointerDismissal` (default: backdrop dismiss enabled).
     */
    @property({ attribute: 'disable-pointer-dismissal', type: Boolean, reflect: true })
    disablePointerDismissal = false;

    @property({ attribute: 'without-header', type: Boolean, reflect: true })
    withoutHeader = false;

    /** Wider panel for field-editor style dialogs. */
    @property({ reflect: true })
    size: 'default' | 'wide' = 'default';

    @query('dialog')
    private dialogElement!: HTMLDialogElement;

    @state()
    private triggerElement: HTMLElement | null = null;

    @state()
    private closing = false;

    private focusTrapCleanup?: () => void;
    private previouslyFocused?: HTMLElement | null;
    private initialFocusFrame = 0;
    private readonly hasHeaderSlot = new HasSlotController(this, 'header');

    /** Distinguishes `open` writes from show()/hide() vs declarative/React property sets. */
    private openChangedByApi = false;

    /** Prevents updated() → show() re-entrancy while a show() pass is in flight. */
    private showInProgress = false;

    /** Prevents updated() → hide() re-entrancy while a hide() pass is in flight. */
    private hideInProgress = false;

    /** Guards finishClose() against close-event re-entry. */
    private finishingClose = false;

    override updated(changed: PropertyValues): void {
        super.updated(changed);

        if (!changed.has('open') || this.openChangedByApi || this.showInProgress || this.hideInProgress) {
            return;
        }

        const nativeOpen = Boolean(this.dialogElement?.open);

        if (this.open && !nativeOpen && !this.closing) {
            void this.show('api');
        } else if (!this.open && nativeOpen) {
            void this.hide('api');
        }
    }

    override disconnectedCallback(): void {
        this.cancelInitialFocus();
        this.teardownOverlay();
        super.disconnectedCallback();
    }

    async show(_source: PkOverlaySource = 'api'): Promise<void> {
        this.closing = false;

        if (this.dialogElement?.open) {
            this.openChangedByApi = true;
            this.open = true;
            this.openChangedByApi = false;
            return;
        }

        if (this.showInProgress) {
            return;
        }

        this.showInProgress = true;

        try {
            const showEvent = new PkShowEvent();

            if (!this.dispatchEvent(showEvent)) {
                this.openChangedByApi = true;
                this.open = false;
                this.openChangedByApi = false;
                return;
            }

            this.previouslyFocused = document.activeElement as HTMLElement | null;

            this.openChangedByApi = true;
            this.open = true;

            if (!this.dialogElement) {
                await this.updateComplete;
            }

            if (!this.dialogElement) {
                throw new Error('[pk-dialog] dialog element missing');
            }

            if (!this.open) {
                return;
            }

            // Popover should already be demoted on pk-after-hide; clear any stale top-layer entry
            // synchronously so showModal() cannot hang (Chrome + nested shadow popovers).
            forceHideOpenPopovers();

            lockBodyScrolling(this);
            this.dialogElement.showModal();
            this.setupOverlay();
            this.dispatchEvent(new PkAfterShowEvent());
        } catch (error) {
            if (this.dialogElement?.open) {
                try {
                    this.dialogElement.close();
                } catch {
                    /* noop */
                }
            }

            this.openChangedByApi = true;
            this.open = false;
            unlockBodyScrolling(this);
            throw error;
        } finally {
            this.openChangedByApi = false;
            this.showInProgress = false;
        }
    }

    async hide(source: PkOverlaySource = 'unknown'): Promise<void> {
        // A second dismiss while exit animation runs must still reach a closed state.
        if (this.closing || this.hideInProgress) {
            if (this.dialogElement?.open) {
                this.closing = false;
                this.hideInProgress = false;
            } else {
                return;
            }
        }

        if (!this.dialogElement?.open) {
            // Do not abort an in-flight show() — spurious hide() during menu→dialog handoff was
            // clearing `open` before showModal(), leaving the page stuck with no dialog.
            if (this.showInProgress) {
                return;
            }

            this.finishClose();
            return;
        }

        const hideEvent = new PkHideEvent(source);

        if (!this.dispatchEvent(hideEvent)) {
            return;
        }

        this.hideInProgress = true;

        try {
            this.closing = true;
            await this.waitForExitAnimation();

            if (this.dialogElement.open) {
                this.dialogElement.close();
            } else {
                this.finishClose();
            }

            // When open, native `close` → onDialogClose → finishClose().
        } finally {
            this.hideInProgress = false;
        }
    }

    closeDialog(): void {
        void this.hide('close-button');
    }

    /**
     * Recovery hook — clears hung show()/hide() or invisible modal state from overlay races.
     * Safe when diagnostics show no open overlays but clicks still fail.
     */
    forceOverlayReset(): void {
        this.showInProgress = false;
        this.hideInProgress = false;
        this.openChangedByApi = true;
        this.closing = false;
        this.open = false;
        this.openChangedByApi = false;

        if (this.dialogElement?.open) {
            try {
                this.dialogElement.close();
            } catch {
                /* noop */
            }
        }

        this.dialogElement?.classList.remove('closing');
        unlockBodyScrolling(this);
        this.teardownOverlay();
    }

    private onTriggerSlotChange(event: Event): void {
        const slot = event.target as HTMLSlotElement;
        const [trigger] = slot.assignedElements({ flatten: true }) as HTMLElement[];

        if (this.triggerElement) {
            this.triggerElement.removeEventListener('click', this.onTriggerClick);
        }

        this.triggerElement = trigger ?? null;

        if (this.triggerElement) {
            this.triggerElement.addEventListener('click', this.onTriggerClick);
        }
    }

    private onTriggerClick = (event: Event): void => {
        event.preventDefault();
        void this.show('api');
    };

    private handleDialogClick = (event: Event): void => {
        const closeViaPath = event.composedPath().some(
            (node): node is Element =>
                node instanceof Element && node.matches('[data-dialog="close"], [data-dialog-close]'),
        );

        if (closeViaPath) {
            event.preventDefault();
            void this.hide('close-button');
            return;
        }

        if (!this.disablePointerDismissal && event.target === this.dialogElement) {
            void this.hide('pointer-dismiss');
        }
    };

    private waitForExitAnimation(): Promise<void> {
        const dialog = this.dialogElement;

        return new Promise((resolve) => {
            let settled = false;

            const finish = (): void => {
                if (settled) {
                    return;
                }

                settled = true;
                dialog.removeEventListener('transitionend', onTransitionEnd);
                window.clearTimeout(fallback);
                resolve();
            };

            const onTransitionEnd = (event: TransitionEvent): void => {
                if (event.target === dialog && event.propertyName === 'opacity') {
                    finish();
                }
            };

            dialog.addEventListener('transitionend', onTransitionEnd);
            const fallback = window.setTimeout(finish, 200);
        });
    }

    private onDialogClose = (): void => {
        this.finishClose();
    };

    /** Teardown overlay state — called from `hide()` and the native `close` event. */
    private finishClose(): void {
        if (this.finishingClose) {
            return;
        }

        const nativeOpen = Boolean(this.dialogElement?.open);

        if (!this.open && !this.focusTrapCleanup && !nativeOpen) {
            this.closing = false;
            return;
        }

        this.finishingClose = true;

        try {
            this.closing = false;
            this.openChangedByApi = true;
            this.open = false;
            this.openChangedByApi = false;
            this.teardownOverlay();

            this.dispatchEvent(new PkAfterHideEvent());

            const restoreFocus = this.previouslyFocused;
            this.previouslyFocused = null;

            // Defer focus restore — sync focus during close was causing focus-trap / show races.
            if (restoreFocus?.isConnected) {
                requestAnimationFrame(() => {
                    restoreFocus.focus({ preventScroll: true });
                });
            }

            this.dispatchEvent(new CustomEvent('pk-open-change', {
                detail: { open: false },
                bubbles: true,
                composed: true,
            }));
        } finally {
            this.finishingClose = false;
        }
    }

    private setupOverlay(): void {
        this.focusTrapCleanup = createFocusTrap({
            root: this.dialogElement,
            onEscape: () => void this.hide('escape'),
        });

        this.setInitialFocus();

        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: true },
            bubbles: true,
            composed: true,
        }));
    }

    /**
     * Matches  `pk-dialog` — focus `[autofocus]` in light DOM, else the panel.
     *      */
    private setInitialFocus(): void {
        this.cancelInitialFocus();

        this.initialFocusFrame = window.requestAnimationFrame(() => {
            const elementToFocus = this.querySelector<HTMLElement>('[autofocus]');

            if (elementToFocus) {
                const innerControl = elementToFocus.shadowRoot?.querySelector<HTMLElement>(
                    'input, textarea, select, button',
                );

                (innerControl ?? elementToFocus).focus();
                return;
            }

            const focusable = getFocusableElements(this.dialogElement);

            if (focusable[0]) {
                focusable[0].focus();
            }
        });
    }

    private cancelInitialFocus(): void {
        window.cancelAnimationFrame(this.initialFocusFrame);
        this.initialFocusFrame = 0;
    }

    private teardownOverlay(): void {
        this.cancelInitialFocus();
        unlockBodyScrolling(this);
        this.focusTrapCleanup?.();
        this.focusTrapCleanup = undefined;
    }

    override render() {
        const showBuiltInHeader = !this.hasHeaderSlot.test('header')
            && !this.withoutHeader
            && Boolean(this.label);
        const padBody = showBuiltInHeader;

        return html`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <dialog
                part="panel"
                class=${classMap({
                    dialog: true,
                    closing: this.closing,
                    'dialog--wide': this.size === 'wide',
                })}
                tabindex="-1"
                @click=${this.handleDialogClick}
                @close=${this.onDialogClose}
                @cancel=${(event: Event) => {
                    event.preventDefault();
                    void this.hide('escape');
                }}
            >
                <slot name="header">
                    ${showBuiltInHeader
                        ? html`
                            <header part="header" class="header">
                                <h2 part="title" class="title">
                                    <slot name="label">${this.label}</slot>
                                </h2>
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
                <footer part="footer" class="footer">
                    <slot name="footer"></slot>
                </footer>
            </dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-dialog': PkDialog;
    }
}
