import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
import { PkOverlaySource } from '../../events/overlay-lifecycle.js';
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
export declare class PkDialog extends PkElement {
    static styles: import('lit').CSSResult;
    open: boolean;
    label: string;
    /** Optional subtitle under the title in the built-in header (v1 DialogDescription). */
    description: string;
    /** Maps to  `light-dismiss` (inverted). */
    disablePointerDismissal: boolean;
    withoutHeader: boolean;
    /**
     * Opt out of the default 1rem body padding applied when the built-in header is shown.
     * Use for flush layouts (sidebars, full-bleed pickers) that own their own inset.
     */
    withoutBodyPadding: boolean;
    size: 'default' | 'wide';
    private dialogElement;
    private triggerElement;
    private previouslyFocused;
    /** True while demoted from `showModal` so a Craft Garnish modal can stack above. */
    private yieldingToHostModal;
    private hostModalObserver;
    /** Inline box captured before yield — cleared on restore. */
    private yieldBox;
    /** Light-DOM `slot="header"` only — ignore built-in header fallback inside the shadow slot. */
    private hasCustomHeaderSlot;
    private handleDocumentKeyDown;
    /** Pin modeless dialog to the viewport box it had under `showModal`. */
    private applyYieldPosition;
    private clearYieldPosition;
    /** Demote `showModal` → `show` so Craft Garnish can paint above (not inert/under). */
    private yieldToHostModal;
    /** Restore top-layer modal after Craft Garnish closes. */
    private restoreFromHostModal;
    private onHostModalPresenceChange;
    firstUpdated(): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    /** `handleOpenChange` — declarative `open` drives show/close. */
    private handleOpenChange;
    private showing;
    /** Shows the dialog —  `show()`. */
    show(_source?: PkOverlaySource): Promise<void>;
    hide(source?: PkOverlaySource): Promise<void>;
    closeDialog(): void;
    /** `requestClose()`. */
    requestClose(source?: PkOverlaySource | EventTarget): Promise<void>;
    /** Recovery hook — clears hung modal state from overlay races. */
    forceOverlayReset(): void;
    private addOpenListeners;
    private removeOpenListeners;
    private handleDialogCancel;
    private handleDialogClick;
    private handleDialogPointerDown;
    private syncHasTriggerAttribute;
    private onTriggerSlotChange;
    private onTriggerClick;
    /** Re-render when footer actions are added/removed so the chrome is not shown empty. */
    private onFooterSlotChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-dialog': PkDialog;
    }
}
//# sourceMappingURL=pk-dialog.d.ts.map