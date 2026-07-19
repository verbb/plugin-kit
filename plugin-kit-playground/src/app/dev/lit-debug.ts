/**
 * Dev-only Lit debugging tools — for hunting infinite update loops / "senseless
 * crashing" without manually bisecting.
 *
 * Enable on any dev page by adding `?litmon=1` to the URL (see main.ts / fouce.ts),
 * or call `installLitUpdateMonitor()` yourself.
 *
 * What it does:
 *  - Counts real Lit updates (`performUpdate`) per component tag each second.
 *  - Flags any tag exceeding a threshold (default 60 updates/s) as a runaway loop.
 *  - On the next `requestUpdate` for a flagged tag, logs a stack trace so you can
 *    see exactly what keeps scheduling updates (a property set in `updated()`, an
 *    event handler, a ResizeObserver, a Tiptap transaction, …).
 *  - Optionally streams Lit's own debug render events (`emitLitDebugLogEvents`).
 *
 * Because it patches `ReactiveElement.prototype`, it observes every Lit component
 * on the page — including nested ones inside shadow roots that DevTools can't
 * easily reach, and it keeps working even when the tab is too busy to open DevTools
 * (findings go to the console, which the Vite dev server also mirrors to its log).
 */
import { ReactiveElement } from 'lit';

export type LitMonitorOptions = {
    /** Updates within `windowMs` before a tag is flagged as a runaway loop. */
    threshold?: number;
    windowMs?: number;
    /** Also stream Lit's built-in render/commit debug events. Very verbose. */
    litDebugEvents?: boolean;
    /** When false, skip the floating error badge/overlay (workshop uses the debug dock). */
    floatingOverlay?: boolean;
};

export type DebugEventSink = (label: string, detail: string) => void;

const debugSinks = new Set<DebugEventSink>();

/** Workshop debug dock subscribes here for the same stream as the error overlay. */
export function subscribeDebugSink(sink: DebugEventSink): () => void {
    debugSinks.add(sink);
    return () => debugSinks.delete(sink);
}

function emitDebugEvent(label: string, detail: string): void {
    for (const sink of debugSinks) {
        try {
            sink(label, detail);
        } catch {
            /* never break dev tooling */
        }
    }
}

let devDiagnosticsInstalled = false;
let litMonitorInstalled = false;

/**
 * Lightweight dev tooling — freeze doctor + error sink, no Lit prototype patching.
 * Does NOT hook console.error (that can flood the main thread during overlay work).
 */
export function installDevDiagnostics(): void {
    if (devDiagnosticsInstalled) {
        return;
    }

    devDiagnosticsInstalled = true;
    installErrorOverlay(false, { hookConsoleError: false });
    installFreezeDoctor();
}

export function installLitUpdateMonitor(options: LitMonitorOptions = {}): void {
    installDevDiagnostics();

    if (litMonitorInstalled) {
        return;
    }

    litMonitorInstalled = true;

    const threshold = options.threshold ?? 60;
    const windowMs = options.windowMs ?? 1000;

    const proto = ReactiveElement.prototype as unknown as {
        performUpdate: (this: ReactiveElement) => void;
        requestUpdate: (this: ReactiveElement, ...args: unknown[]) => void;
    };

    const counts = new Map<string, number>();
    const totals = new Map<string, number>();
    const intervalByElement = new WeakMap<ReactiveElement, number>();
    const flaggedElements = new WeakSet<ReactiveElement>();
    const tracedElements = new WeakSet<ReactiveElement>();
    const activeThisInterval = new Set<ReactiveElement>();

    const tagOf = (el: ReactiveElement) => el.localName || el.constructor.name;

    const originalPerform = proto.performUpdate;
    proto.performUpdate = function (this: ReactiveElement) {
        const tag = tagOf(this);
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
        totals.set(tag, (totals.get(tag) ?? 0) + 1);
        intervalByElement.set(this, (intervalByElement.get(this) ?? 0) + 1);
        activeThisInterval.add(this);
        return originalPerform.call(this);
    };

    const originalRequest = proto.requestUpdate;
    proto.requestUpdate = function (this: ReactiveElement, ...args: unknown[]) {
        const tag = tagOf(this);
        if (flaggedElements.has(this) && !tracedElements.has(this)) {
            tracedElements.add(this);
            console.groupCollapsed(`%c[lit-monitor] stack for runaway <${tag}>.requestUpdate()`, 'color:#f87171;font-weight:bold');
            console.trace('requestUpdate called from:');
            console.groupEnd();
        }
        return originalRequest.apply(this, args as []);
    };

    window.setInterval(() => {
        for (const [tag, n] of counts) {
            if (n >= threshold) {
                console.info(
                    `[lit-monitor] <${tag}> had ${n} updates across all instances in the last ${windowMs}ms (not necessarily a loop — see per-instance flags below).`,
                );
            }
        }

        for (const el of activeThisInterval) {
            const n = intervalByElement.get(el) ?? 0;

            if (n >= threshold && !flaggedElements.has(el)) {
                flaggedElements.add(el);
                const tag = tagOf(el);
                console.error(
                    `[lit-monitor] <${tag}> updated ~${Math.round((n / windowMs) * 1000)}×/s (${totals.get(tag) ?? n} tag total) — likely an infinite update loop on this instance. The next requestUpdate for it will log a stack trace.`,
                    el,
                );
            }

            intervalByElement.delete(el);
        }

        counts.clear();
        activeThisInterval.clear();
    }, windowMs);

    if (options.litDebugEvents) {
        (globalThis as { emitLitDebugLogEvents?: boolean }).emitLitDebugLogEvents = true;
        window.addEventListener('lit-debug', (e) => console.debug('[lit-debug]', (e as CustomEvent).detail));
    }

    // Call `__litMon.report()` from the console at any time for a ranked table.
    (globalThis as Record<string, unknown>).__litMon = {
        data: () =>
            [...totals.entries()]
                .sort((a, b) => b[1] - a[1])
                .map(([tag, updates]) => ({ tag, updates })),
        report: () =>
            console.table(
                [...totals.entries()]
                    .sort((a, b) => b[1] - a[1])
                    .map(([tag, updates]) => ({ tag, updates })),
            ),
        reset: () => {
            counts.clear();
            totals.clear();
        },
    };

    if (options.floatingOverlay !== false) {
        enableFloatingErrorBadge();
    }

    enableConsoleErrorHook();

    console.info(
        `%c[lit-monitor] active — flags any component exceeding ${threshold} updates/${windowMs}ms. Run __litMon.report() for a ranked table.\n` +
        `%c[freeze-doctor] if the page freezes (can scroll, can't click), press Ctrl/Cmd+Shift+U to diagnose + unstick overlays.`,
        'color:#22c55e', 'color:#f59e0b',
    );
}

/** Set by installErrorOverlay so other dev tools can write into the same panel. */
let overlayRecord: ((label: string, detail: string) => void) | null = null;

/**
 * On-page error overlay — surfaces uncaught errors / rejections even when the tab
 * is too busy to open DevTools (the classic "it just crashes and I can't inspect"
 * case). Dedupes repeated errors so a flooding loop can't blow up the DOM, and
 * offers a one-click copy so the full stack can be pasted back.
 */
let errorOverlayInstalled = false;
let consoleErrorHookInstalled = false;
let floatingBadgeEl: HTMLDivElement | null = null;

function enableConsoleErrorHook(): void {
    if (consoleErrorHookInstalled || !overlayRecord) {
        return;
    }

    consoleErrorHookInstalled = true;

    const originalConsoleError = console.error.bind(console);
    console.error = (...args: unknown[]) => {
        try {
            const errorArg = args.find((a): a is Error => a instanceof Error);
            const text = args
                .map((a) => (a instanceof Error ? (a.stack ?? a.message) : typeof a === 'string' ? a : safeStringify(a)))
                .join(' ');
            overlayRecord?.(
                'console.error: ' + (errorArg?.message ?? text.split('\n')[0] ?? ''),
                errorArg?.stack ?? text,
            );
        } catch {
            /* never let logging break logging */
        }
        originalConsoleError(...args);
    };
}

function enableFloatingErrorBadge(): void {
    if (floatingBadgeEl) {
        return;
    }

    floatingBadgeEl = document.createElement('div');
    floatingBadgeEl.textContent = 'litmon ●';
    floatingBadgeEl.title = 'Lit monitor + error overlay active. Errors will appear here.';
    floatingBadgeEl.style.cssText = [
        'position:fixed', 'z-index:2147483647', 'bottom:8px', 'right:8px',
        'background:#16a34a', 'color:#fff', 'border-radius:6px', 'padding:2px 8px',
        'font:11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace', 'opacity:0.7',
        'pointer-events:none', 'box-shadow:0 2px 8px rgba(0,0,0,.35)',
    ].join(';');
    const mountBadge = () => document.body?.append(floatingBadgeEl!);
    if (document.body) mountBadge();
    else window.addEventListener('DOMContentLoaded', mountBadge);
}

function installErrorOverlay(
    enabled = true,
    options: { hookConsoleError?: boolean } = {},
): void {
    if (errorOverlayInstalled) {
        if (options.hookConsoleError) {
            enableConsoleErrorHook();
        }

        if (enabled) {
            enableFloatingErrorBadge();
        }

        return;
    }

    errorOverlayInstalled = true;

    const hookConsoleError = options.hookConsoleError ?? false;

    const seen = new Map<string, number>();
    let panel: HTMLElement | null = null;
    let list: HTMLElement | null = null;
    let badge: HTMLDivElement | null = null;

    const flashBadge = (color: string) => {
        const el = floatingBadgeEl ?? badge;
        if (!el) return;
        el.style.background = color;
        el.style.opacity = '1';
    };

    const ensurePanel = (): HTMLElement => {
        if (panel) return panel;

        panel = document.createElement('div');
        panel.style.cssText = [
            'position:fixed', 'z-index:2147483647', 'top:8px', 'right:8px',
            'max-width:min(560px,90vw)', 'max-height:60vh', 'overflow:auto',
            'background:#1b1b1f', 'color:#f4f4f5', 'border:1px solid #f87171',
            'border-radius:8px', 'padding:10px 12px', 'font:12px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace',
            'box-shadow:0 12px 40px rgba(0,0,0,.5)', 'white-space:pre-wrap', 'word-break:break-word',
        ].join(';');

        const header = document.createElement('div');
        header.style.cssText = 'display:flex;gap:8px;align-items:center;margin-bottom:8px;font-weight:bold;color:#f87171';
        const title = document.createElement('span');
        title.textContent = 'Uncaught errors (dev)';
        title.style.flex = '1';

        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.style.cssText = 'background:#3f3f46;color:#fff;border:0;border-radius:4px;padding:2px 8px;cursor:pointer;font:inherit';
        copyBtn.addEventListener('click', () => {
            void navigator.clipboard?.writeText(list?.textContent ?? '');
            copyBtn.textContent = 'Copied';
            window.setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1200);
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Dismiss';
        closeBtn.style.cssText = copyBtn.style.cssText;
        closeBtn.addEventListener('click', () => { panel?.remove(); panel = null; list = null; seen.clear(); });

        header.append(title, copyBtn, closeBtn);
        list = document.createElement('div');
        panel.append(header, list);
        document.body.append(panel);
        return panel;
    };

    const record = (label: string, detail: string): void => {
        const key = label + '\n' + detail.split('\n').slice(0, 3).join('\n');
        const count = (seen.get(key) ?? 0) + 1;
        seen.set(key, count);

        emitDebugEvent(label, detail);

        if (!enabled) return;

        ensurePanel();
        flashBadge('#dc2626');

        let entry = list!.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`);
        if (!entry) {
            entry = document.createElement('div');
            entry.dataset.key = key;
            entry.style.cssText = 'padding:6px 0;border-top:1px solid #3f3f46';
            list!.append(entry);
        }

        entry.textContent = `${label}${count > 1 ? ` ×${count}` : ''}\n${detail}`;
    };

    overlayRecord = record;

    if (enabled) {
        enableFloatingErrorBadge();
    }

    window.addEventListener('error', (event) => {
        const err = event.error as Error | undefined;
        record('Error: ' + (event.message || err?.message || 'unknown'), err?.stack ?? `${event.filename}:${event.lineno}:${event.colno}`);
    });

    window.addEventListener('unhandledrejection', (event) => {
        const reason = event.reason as (Error | undefined);
        record('Unhandled rejection: ' + (reason?.message ?? String(event.reason)), reason?.stack ?? '');
    });

    // console.error hook is deferred — see enableConsoleErrorHook().
    if (hookConsoleError) {
        enableConsoleErrorHook();
    }
}

function safeStringify(value: unknown): string {
    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}

/**
 * "Freeze doctor" — for the case where the page is not JS-frozen (you can still
 * scroll) but every click is swallowed: almost always an invisible modal/backdrop
 * or a leftover full-viewport overlay left capturing pointer events.
 *
 * Keydown listeners still fire while a modal is open, so Ctrl/Cmd+Shift+U will
 * work even when nothing is clickable. It dumps the exact culprit into the copy
 * panel and then force-unsticks (closes open dialogs, removes portals, unlocks
 * scroll) so you never have to kill the tab.
 */
let freezeDoctorInstalled = false;

function installFreezeDoctor(): void {
    if (freezeDoctorInstalled) return;
    freezeDoctorInstalled = true;

    window.addEventListener(
        'keydown',
        (event) => {
            const combo = (event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'U' || event.key === 'u');
            if (!combo) return;
            event.preventDefault();
            event.stopPropagation();

            void import('../../../../plugin-kit-web/src/utils/overlay-recovery.ts').then(
                ({ classifyOverlayFreeze, recoverOverlays }) => {
                    const verdict = classifyOverlayFreeze();
                    const result = recoverOverlays();
                    const full = [
                        `VERDICT: ${verdict.kind.toUpperCase()} — ${verdict.summary}`,
                        verdict.signals.length ? `signals: ${verdict.signals.join('; ')}` : '',
                        '',
                        result.diagnostic.report,
                        '',
                        `— recover ran: ${result.actions.join(', ')}`,
                        '',
                        'Tip: if DevTools #top-layer shows ::backdrop but open dialogs: 0, check :popover-open and stale pk-scroll-lock.',
                    ].filter(Boolean).join('\n');
                    overlayRecord?.('Freeze doctor (Ctrl/Cmd+Shift+U)', full);
                    console.warn('[freeze-doctor]\n' + full);
                },
            );
        },
        true,
    );
}
