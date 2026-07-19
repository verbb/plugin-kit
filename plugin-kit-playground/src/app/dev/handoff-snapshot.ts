/**
 * Synchronous menu→dialog handoff diagnostics — logged before dialog.show() so a
 * main-thread hang still leaves evidence in the trace (no DevTools needed).
 */
import { collectOpenPopovers } from '../../../../plugin-kit-web/src/utils/top-layer.ts';

export type MenuHandoffSnapshot = {
    menuOpen: boolean;
    menuClosing: boolean;
    popupPositionMethod: string | null;
    popupHasPopoverAttr: boolean;
    popupPopoverOpen: boolean;
    openPopovers: number;
    dialogHostOpen: boolean;
    dialogNativeOpen: boolean;
};

export function snapshotMenuHandoff(
    menu: HTMLElement,
    dialog: HTMLElement | null,
): MenuHandoffSnapshot {
    const menuHost = menu as { open?: boolean; closing?: boolean };
    const pkPopup = menu.shadowRoot?.querySelector('pk-popup');
    const popupDiv = pkPopup?.shadowRoot?.querySelector('.popup');
    const popupEl = popupDiv instanceof HTMLElement ? popupDiv : null;

    let popupPopoverOpen = false;

    if (popupEl) {
        try {
            popupPopoverOpen = popupEl.matches(':popover-open');
        } catch {
            popupPopoverOpen = false;
        }
    }

    const nativeDialog = dialog?.shadowRoot?.querySelector('dialog');

    return {
        menuOpen: Boolean(menuHost.open),
        menuClosing: Boolean(menuHost.closing),
        popupPositionMethod: pkPopup?.getAttribute('position-method'),
        popupHasPopoverAttr: popupEl?.hasAttribute('popover') ?? false,
        popupPopoverOpen,
        openPopovers: collectOpenPopovers().length,
        dialogHostOpen: Boolean((dialog as { open?: boolean } | null)?.open),
        dialogNativeOpen: Boolean(nativeDialog?.open),
    };
}

export function formatHandoffSnapshot(snapshot: MenuHandoffSnapshot): string {
    const ok = !snapshot.menuOpen
        && !snapshot.menuClosing
        && !snapshot.popupPopoverOpen
        && snapshot.openPopovers === 0;

    return JSON.stringify({
        ...snapshot,
        handoffOk: ok,
        expect: 'Handoff — menu closed, popover demoted, then dialog macrotask',
    });
}
