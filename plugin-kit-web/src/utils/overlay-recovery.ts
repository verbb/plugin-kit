/**
 * Production overlay recovery — detects and clears stuck pk-dialog / popup /
 * scroll-lock states that leave the page scrollable but unclickable.
 *
 * Dev tooling with richer diagnostics lives in plugin-kit-playground `lit-debug.ts`.
 */

import { getDismissibleStackSnapshot } from '../a11y/dismissible-stack.js';
import { forceClearScrollLock, getScrollLockDepth } from '../a11y/scroll-lock.js';

export type OverlayFreezeKind = 'healthy' | 'stuck-overlay' | 'inconclusive';

export type OverlayFreezeClassification = {
    kind: OverlayFreezeKind;
    /** One-line verdict for the lab / freeze doctor. */
    summary: string;
    signals: string[];
};

export type OverlayDiagnostic = {
    openDialogCount: number;
    popoverOpenCount: number;
    covererCount: number;
    portalCount: number;
    scrollLocked: boolean;
    scrollLockDepth: number;
    inertCount: number;
    centerStack: string[];
    /** Human-readable lines suitable for support bundles. */
    report: string;
};

export type OverlayRecoveryResult = {
    actions: string[];
    diagnostic: OverlayDiagnostic;
};

const deepAllElements = (roots: Array<Document | ShadowRoot>): Element[] => {
    const out: Element[] = [];

    const walk = (root: Document | ShadowRoot) => {
        for (const el of root.querySelectorAll('*')) {
            out.push(el);

            if (el.shadowRoot) {
                walk(el.shadowRoot);
            }
        }
    };

    for (const root of roots) {
        walk(root);
    }

    return out;
};

const collectSearchRoots = (): Array<Document | ShadowRoot> => {
    const roots: Array<Document | ShadowRoot> = [document];

    for (const host of document.querySelectorAll('[data-navigation-shadow-root], [data-navigation-shadow-style]')) {
        if (host.shadowRoot) {
            roots.push(host.shadowRoot);
        }
    }

    // Generic fallback for other Plugin Kit shadow hosts.
    for (const host of document.querySelectorAll('[data-pk-shadow-root]')) {
        if (host.shadowRoot) {
            roots.push(host.shadowRoot);
        }
    }

    return roots;
};

const describeElement = (el: Element): string => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    let label = el.nodeName.toLowerCase();

    if (el.id) {
        label += `#${el.id}`;
    }

    if (typeof el.className === 'string' && el.className) {
        label += `.${el.className.split(' ').slice(0, 2).join('.')}`;
    }

    return `${label} [${Math.round(r.width)}×${Math.round(r.height)} @${Math.round(r.left)},${Math.round(r.top)} pe=${cs.pointerEvents} pos=${cs.position} z=${cs.zIndex}]`;
};

/** Inspect open overlays and pointer blockers across document + known shadow roots. */
export const diagnoseOverlayBlockers = (): OverlayDiagnostic => {
    const all = deepAllElements(collectSearchRoots());
    const lines: string[] = [];

    const openDialogs = all.filter(
        (el): el is HTMLDialogElement => el instanceof HTMLDialogElement && el.open,
    );
    lines.push(`open <dialog>s: ${openDialogs.length}`);

    for (const dialog of openDialogs) {
        const host = (dialog.getRootNode() as ShadowRoot)?.host;
        lines.push(
            `  • ${describeElement(dialog)}${dialog.matches(':modal') ? ' [MODAL]' : ''}${host ? ` in <${host.nodeName.toLowerCase()}>` : ''}`,
        );

        if (dialog.parentElement?.classList.contains('closing') || dialog.classList.contains('closing')) {
            lines.push('    ⚠ has .closing (opacity:0 but still modal → invisible blocker)');
        }
    }

    const coverers = all.filter((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();

        return (
            (cs.position === 'fixed' || cs.position === 'absolute') &&
            cs.pointerEvents !== 'none' &&
            r.width >= window.innerWidth * 0.9 &&
            r.height >= window.innerHeight * 0.9
        );
    });
    lines.push(`full-viewport pointer-capturing overlays: ${coverers.length}`);

    for (const coverer of coverers.slice(0, 10)) {
        lines.push(`  • ${describeElement(coverer)}`);
    }

    const portals = all.filter((el) => typeof el.className === 'string' && /portal/.test(el.className));
    lines.push(`portal elements: ${portals.length}`);

    for (const portal of portals.slice(0, 6)) {
        lines.push(`  • ${describeElement(portal)}`);
    }

    const scrollLocked = document.documentElement.classList.contains('pk-scroll-lock');
    const scrollLockDepth = getScrollLockDepth();
    lines.push(`html.pk-scroll-lock: ${scrollLocked} (ref-count: ${scrollLockDepth})`);

    if (scrollLocked && scrollLockDepth === 0) {
        lines.push('  ⚠ stale scroll-lock class — no overlay holds the lock ref-count');
    }

    const inertCount = all.filter((el) => el.hasAttribute('inert')).length;
    lines.push(`inert elements: ${inertCount}`);

    const dismissStack = getDismissibleStackSnapshot();
    lines.push(`dismissible stack (${dismissStack.length}): ${dismissStack.join(' → ') || '(empty)'}`);

    const openMenus = [...document.querySelectorAll('pk-dropdown-menu')].filter(
        (el) => (el as HTMLElement & { open?: boolean }).open,
    );
    lines.push(`pk-dropdown-menu open: ${openMenus.length}`);
    for (const menu of openMenus.slice(0, 4)) {
        const host = menu as HTMLElement & { open?: boolean; closing?: boolean };
        lines.push(`  • #${menu.id || '(no id)'} open=${host.open} closing=${Boolean(host.closing)}`);
    }

    const allMenus = [...document.querySelectorAll('pk-dropdown-menu')];
    const closingMenus = allMenus.filter((el) => (el as HTMLElement & { closing?: boolean }).closing);
    if (closingMenus.length > 0) {
        lines.push(`pk-dropdown-menu closing: ${closingMenus.length}`);
        for (const menu of closingMenus.slice(0, 4)) {
            const host = menu as HTMLElement & { open?: boolean; closing?: boolean };
            lines.push(`  • #${menu.id || '(no id)'} open=${Boolean(host.open)} closing=${Boolean(host.closing)}`);
        }
    }

    const pkDialogs = [...document.querySelectorAll('pk-dialog')];
    const openPkDialogs = pkDialogs.filter((el) => (el as HTMLElement & { open?: boolean }).open);
    lines.push(`pk-dialog open: ${openPkDialogs.length}`);
    for (const dialogHost of pkDialogs.slice(0, 6)) {
        const host = dialogHost as HTMLElement & { open?: boolean; closing?: boolean };
        const native = dialogHost.shadowRoot?.querySelector('dialog');
        const nativeOpen = Boolean(native?.open);
        const nativeModal = native instanceof HTMLDialogElement && native.matches(':modal');

        if (host.open || nativeOpen || nativeModal) {
            lines.push(
                `  • #${dialogHost.id || '(no id)'} host.open=${Boolean(host.open)} native.open=${nativeOpen} :modal=${nativeModal} closing=${Boolean(host.closing)}`,
            );
        }

        if (native?.classList.contains('closing')) {
            lines.push('    ⚠ native dialog has .closing (invisible modal blocker)');
        }
    }

    const shadowDialogs = all.filter(
        (el): el is HTMLDialogElement => el instanceof HTMLDialogElement,
    );
    const modalButNotReported = shadowDialogs.filter(
        (dialog) => dialog.open && dialog.matches(':modal'),
    );
    if (modalButNotReported.length > openDialogs.length) {
        lines.push(`⚠ extra :modal dialogs in shadow roots: ${modalButNotReported.length}`);
        for (const dialog of modalButNotReported.slice(0, 4)) {
            lines.push(`  • ${describeElement(dialog)}${dialog.classList.contains('closing') ? ' [.closing]' : ''}`);
        }
    }

    const popoverOpen = all.filter((el) => {
        try {
            return el.matches(':popover-open');
        } catch {
            return false;
        }
    });
    lines.push(`:popover-open elements: ${popoverOpen.length}`);
    for (const pop of popoverOpen.slice(0, 6)) {
        lines.push(`  • ${describeElement(pop)}`);
    }

    const popoverHosts = all.filter((el) => el.hasAttribute('popover'));
    lines.push(`[popover] elements (total): ${popoverHosts.length}`);
    for (const pop of popoverHosts.slice(0, 8)) {
        let openFlag = '?';

        try {
            openFlag = pop.matches(':popover-open') ? 'open' : 'closed';
        } catch {
            /* noop */
        }

        lines.push(`  • ${describeElement(pop)} (${openFlag})`);
    }

    for (const dialog of openDialogs) {
        const host = (dialog.getRootNode() as ShadowRoot)?.host as HTMLElement | undefined;
        const hostOpen = host && 'open' in host ? (host as HTMLElement & { open?: boolean }).open : undefined;

        if (host && hostOpen === false) {
            lines.push(`  ⚠ native dialog.open but <${host.localName}> host.open=false (desync)`);
        }
    }

    const centerStack = document
        .elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        .slice(0, 8)
        .map((node) => {
            if (node instanceof HTMLDialogElement) {
                return `dialog${node.open ? '[open]' : ''}`;
            }

            return node.nodeName.toLowerCase();
        });
    lines.push(`center element stack: ${centerStack.join(' > ')}`);

    const topHit = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    if (topHit instanceof HTMLDialogElement && topHit.open) {
        lines.push('  ⚠ center click hits an open native <dialog> (modal blocker likely)');
    }

    // Sample hit targets — catches top-layer / pointer-events blockers our DOM walk misses.
    const sampleY = Math.round(window.innerHeight * 0.4);
    const sampleXs = [0.2, 0.5, 0.8].map((f) => Math.round(window.innerWidth * f));
    lines.push('pointer hit samples (40% viewport height):');
    for (const x of sampleXs) {
        const hit = document.elementFromPoint(x, sampleY);
        const stack = document.elementsFromPoint(x, sampleY).slice(0, 4).map((node) => {
            if (node instanceof HTMLDialogElement) {
                return `dialog${node.open ? '[open]' : ''}`;
            }

            return node.nodeName.toLowerCase();
        });
        const pe = hit instanceof Element ? getComputedStyle(hit).pointerEvents : 'n/a';
        lines.push(`  • @${x},${sampleY}: ${stack.join(' > ')} (pe=${pe})`);
    }

    const rootPe = getComputedStyle(document.documentElement).pointerEvents;
    const bodyPe = getComputedStyle(document.body).pointerEvents;
    lines.push(`html/body pointer-events: ${rootPe} / ${bodyPe}`);

    return {
        openDialogCount: openDialogs.length,
        popoverOpenCount: popoverOpen.length,
        covererCount: coverers.length,
        portalCount: portals.length,
        scrollLocked,
        scrollLockDepth,
        inertCount,
        centerStack,
        report: lines.join('\n'),
    };
};

/**
 * Quick verdict: is the tab "broken" (hung) or "stuck" (overlay state)?
 * Run while the page feels frozen — if this returns, the main thread is still alive.
 */
export const classifyOverlayFreeze = (): OverlayFreezeClassification => {
    const diagnostic = diagnoseOverlayBlockers();
    const signals: string[] = [];

    if (diagnostic.openDialogCount > 0) {
        signals.push(`${diagnostic.openDialogCount} native modal dialog(s) still open`);
    }

    if (diagnostic.popoverOpenCount > 0) {
        signals.push(`${diagnostic.popoverOpenCount} :popover-open element(s) (menu/select in browser top layer)`);
    }

    if (diagnostic.report.includes(':modal=true') || diagnostic.report.includes('[MODAL]')) {
        signals.push('native :modal dialog detected in shadow root');
    }

    if (diagnostic.report.includes('⚠ extra :modal dialogs')) {
        signals.push('orphaned modal dialog(s) in shadow roots');
    }

    if (diagnostic.report.includes('pk-dropdown-menu closing:')) {
        signals.push('menu stuck in closing state');
    }

    if (diagnostic.scrollLocked) {
        signals.push('html.pk-scroll-lock is set');
    }

    if (diagnostic.scrollLockDepth > 0) {
        signals.push(`scroll-lock ref-count: ${diagnostic.scrollLockDepth}`);
    }

    if (diagnostic.scrollLocked && diagnostic.scrollLockDepth === 0) {
        signals.push('stale scroll-lock (class without ref-count)');
    }

    if (diagnostic.covererCount > 0) {
        signals.push(`${diagnostic.covererCount} full-viewport pointer capturer(s)`);
    }

    if (diagnostic.centerStack.some((tag) => tag.startsWith('dialog'))) {
        signals.push('center click hits dialog — modal backdrop class of bug');
    }

    const report = diagnostic.report;
    if (report.includes('dialog[open]') || report.includes('dialog[open][MODAL]')) {
        signals.push('pointer samples hit an open dialog');
    }

    if (report.includes('html/body pointer-events: none')) {
        signals.push('html or body has pointer-events: none');
    }

    if (diagnostic.inertCount > 0) {
        signals.push(`${diagnostic.inertCount} inert element(s)`);
    }

    if (signals.length === 0) {
        return {
            kind: 'healthy',
            summary: 'No overlay blockers detected. If Chrome shows "Page Unresponsive", that is a main-thread hang (not overlay state) — check scenario trace heartbeat + Performance recording.',
            signals,
        };
    }

    return {
        kind: 'stuck-overlay',
        summary: 'Likely stuck overlay state — not a full tab crash. Recover / Ctrl+Cmd+Shift+U should help; check DevTools #top-layer for ::backdrop.',
        signals,
    };
};

/** Force-close overlays and clear scroll lock. Returns actions taken for logging. */
export const recoverOverlays = (): OverlayRecoveryResult => {
    const diagnostic = diagnoseOverlayBlockers();
    const actions: string[] = [];
    const all = deepAllElements(collectSearchRoots());

    for (const el of all) {
        if (el instanceof HTMLDialogElement && el.open) {
            try {
                el.close();
                actions.push(`closed ${el.nodeName.toLowerCase()}`);
            } catch {
                /* noop */
            }
        }

        if (el instanceof HTMLElement && 'hidePopover' in el && el.hasAttribute('popover')) {
            try {
                el.hidePopover();
                actions.push(`hidePopover ${el.localName}`);
            } catch {
                /* noop — already hidden */
            }
        }

        const tag = el.localName;

        if (tag === 'pk-dropdown-menu') {
            const menu = el as HTMLElement & { forceDismissCleanup?: () => void };

            if (typeof menu.forceDismissCleanup === 'function') {
                menu.forceDismissCleanup();
                actions.push('forceDismissCleanup <pk-dropdown-menu>');
            } else if ('open' in menu && (menu as HTMLElement & { open: boolean }).open) {
                (menu as HTMLElement & { open: boolean }).open = false;
                actions.push('closed <pk-dropdown-menu>');
            }
        }

        if (tag === 'pk-popover' || tag === 'pk-tooltip') {
            if ('open' in el && (el as HTMLElement & { open: boolean }).open) {
                (el as HTMLElement & { open: boolean }).open = false;
                actions.push(`closed <${tag}>`);
            }
        }

        if (tag === 'pk-popup' && 'active' in el) {
            const popup = el as HTMLElement & { active: boolean };

            if (popup.active) {
                popup.active = false;
                actions.push('deactivated <pk-popup>');
            }
        }

        if (tag === 'pk-dialog' && 'open' in el) {
            const dialogHost = el as HTMLElement & {
                open: boolean;
                hide?: () => Promise<void>;
                forceOverlayReset?: () => void;
            };

            if (typeof dialogHost.forceOverlayReset === 'function') {
                dialogHost.forceOverlayReset();
                actions.push('forceOverlayReset <pk-dialog>');
            } else if (dialogHost.open) {
                if (typeof dialogHost.hide === 'function') {
                    void dialogHost.hide();
                } else {
                    dialogHost.open = false;
                }

                actions.push('closed <pk-dialog>');
            }
        }
    }

    for (const el of all) {
        if (typeof el.className === 'string' && /portal/.test(el.className) && el.children.length === 0) {
            el.remove();
            actions.push('removed empty portal');
        }

        el.removeAttribute('inert');
    }

    forceClearScrollLock();
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    if (actions.length === 0) {
        actions.push('cleared scroll lock / inert (no open overlays found)');
    }

    return { actions, diagnostic };
};
