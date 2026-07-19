/**
 * Scenario trace for the nested overlays lab — distinguishes:
 * - invisible overlay blockers (heartbeat keeps ticking, clicks fail)
 * - true main-thread hangs (heartbeat stops)
 * - long tasks / slow handlers (PerformanceObserver)
 */

export type OverlayLabTraceHandle = {
    log: (label: string, detail?: string) => void;
    /** Attach capture listeners on a scenario mount subtree. */
    attach: (scope: HTMLElement) => void;
    detach: () => void;
    createPanel: () => HTMLElement;
    copyReport: () => Promise<string>;
    teardown: () => void;
};

type TraceEntry = {
    ms: number;
    label: string;
    detail?: string;
};

const OVERLAY_EVENTS = [
    'pk-select',
    'pk-show',
    'pk-after-show',
    'pk-hide',
    'pk-after-hide',
    'pk-open-change',
] as const;

const TRACE_STORAGE_KEY = 'overlay-lab-trace-entries';
const HANDOFF_STORAGE_KEY = 'overlay-lab-last-handoff';
const AUTOMATION_SNAPSHOT_KEY = 'overlay-lab-automation-snapshot';
const POINTER_PROBE_LIMIT = 24;
const pointerProbe: string[] = [];

function formatPointerTarget(target: EventTarget | null): string {
    if (!(target instanceof Element)) {
        return String(target);
    }

    const tag = target.localName || target.tagName.toLowerCase();
    const id = target.id ? `#${target.id}` : '';
    return `<${tag}${id}>`;
}

function installPointerProbe(): () => void {
    const record = (event: PointerEvent): void => {
        pointerProbe.push(
            `[${(performance.now() % 100_000).toFixed(0)}ms] ${event.type} ${formatPointerTarget(event.target)} pe=${event.pointerType} defaultPrevented=${event.defaultPrevented}`,
        );

        if (pointerProbe.length > POINTER_PROBE_LIMIT) {
            pointerProbe.shift();
        }
    };

    document.addEventListener('pointerdown', record, true);
    document.addEventListener('pointerup', record, true);

    return () => {
        document.removeEventListener('pointerdown', record, true);
        document.removeEventListener('pointerup', record, true);
        pointerProbe.length = 0;
    };
}

export function createOverlayLabTrace(): OverlayLabTraceHandle {
    const entries: TraceEntry[] = [];
    const longTasks: string[] = [];
    const t0 = performance.now();
    let scope: HTMLElement | null = null;
    let heartbeatTimer = 0;
    let heartbeatAgeMs = 0;
    let panelEl: HTMLElement | null = null;
    let heartbeatEl: HTMLElement | null = null;
    let traceEl: HTMLElement | null = null;
    let longTaskEl: HTMLElement | null = null;
    let longTaskObserver: PerformanceObserver | null = null;
    const removePointerProbe = installPointerProbe();

    const formatMs = (ms: number): string => `${ms.toFixed(0)}ms`;

    const buildAutomationSnapshot = (): Record<string, unknown> => {
        const mount = document.querySelector('.lab-scenario.is-active [data-scenario-mount]');
        const menu = mount?.querySelector('pk-dropdown-menu') ?? document.querySelector('pk-dropdown-menu#lab-lit-menu-dialog');
        const select = mount?.querySelector('pk-select') ?? document.querySelector('pk-select#lab-lit-select-dialog-select');
        const dialog =
            mount?.querySelector('pk-dialog')
            ?? document.querySelector('#lab-lit-menu-dialog-dialog')
            ?? document.querySelector('#lab-lit-select-dialog-dialog');
        const pkPopup = menu?.shadowRoot?.querySelector('pk-popup');
        const popupDiv = pkPopup?.shadowRoot?.querySelector('.popup');
        const native = dialog?.shadowRoot?.querySelector('dialog');
        const scenarioId = document.querySelector('.lab-scenario.is-active')?.getAttribute('data-scenario-id') ?? null;
        const traceText = entries
            .map((entry) => {
                const line = `[${formatMs(entry.ms)}] ${entry.label}`;

                return entry.detail ? `${line} | ${entry.detail}` : line;
            })
            .join('\n');

        return {
            capturedAt: new Date().toISOString(),
            scenarioId,
            heartbeat: heartbeatEl?.textContent ?? null,
            dialogNativeOpen: Boolean(native?.open),
            dialogHostOpen: Boolean((dialog as { open?: boolean } | null)?.open),
            menuOpen: menu ? Boolean((menu as { open?: boolean }).open) : undefined,
            selectOpen: select ? Boolean((select as { open?: boolean }).open) : undefined,
            popupHasPopoverAttr: popupDiv?.hasAttribute('popover') ?? null,
            popupPositionMethod: pkPopup?.getAttribute('position-method') ?? null,
            handoff: sessionStorage.getItem(HANDOFF_STORAGE_KEY),
            lastLabel: entries.at(-1)?.label ?? null,
            lastDetail: entries.at(-1)?.detail ?? null,
            traceText,
            entries: entries.slice(-80),
        };
    };

    const persistTrace = (): void => {
        try {
            sessionStorage.setItem(
                TRACE_STORAGE_KEY,
                JSON.stringify(entries.slice(-80)),
            );
            sessionStorage.setItem(
                AUTOMATION_SNAPSHOT_KEY,
                JSON.stringify(buildAutomationSnapshot()),
            );
        } catch {
            /* private mode / quota */
        }
    };

    const log = (label: string, detail?: string): void => {
        entries.push({ ms: performance.now() - t0, label, detail });
        persistTrace();

        if (label.includes('handoff') || label.includes('pre dialog.show()')) {
            try {
                sessionStorage.setItem(HANDOFF_STORAGE_KEY, detail ?? label);
            } catch {
                /* noop */
            }
        }

        renderTrace();
    };

    const renderTrace = (): void => {
        if (!traceEl) {
            return;
        }

        if (entries.length === 0) {
            traceEl.textContent = '(no events yet — run a scenario and interact)';
            return;
        }

        traceEl.textContent = entries
            .map((entry) => {
                const line = `[${formatMs(entry.ms)}] ${entry.label}`;

                return entry.detail ? `${line} | ${entry.detail}` : line;
            })
            .join('\n');
    };

    const renderLongTasks = (): void => {
        if (!longTaskEl) {
            return;
        }

        longTaskEl.textContent = longTasks.length
            ? longTasks.join('\n')
            : '(none >50ms yet)';
    };

    const renderHeartbeat = (): void => {
        if (!heartbeatEl) {
            return;
        }

        const stale = heartbeatAgeMs > 1500;
        heartbeatEl.textContent = stale
            ? `⚠ STALE ${formatMs(heartbeatAgeMs)} — main thread may be hung`
            : `✓ alive (${formatMs(heartbeatAgeMs)} ago)`;
        heartbeatEl.classList.toggle('lab-trace__heartbeat--stale', stale);
    };

    const onOverlayEvent = (event: Event): void => {
        if (!scope || !scope.contains(event.target as Node)) {
            return;
        }

        const target = event.target instanceof HTMLElement
            ? `<${event.target.localName}${event.target.id ? `#${event.target.id}` : ''}>`
            : String(event.target);

        const detail = event instanceof CustomEvent
            ? JSON.stringify(event.detail ?? {})
            : undefined;

        log(`event ${event.type} @ ${target}`, detail);
    };

    const attach = (nextScope: HTMLElement): void => {
        detach();
        scope = nextScope;

        for (const type of OVERLAY_EVENTS) {
            scope.addEventListener(type, onOverlayEvent, true);
        }

        log('trace attached', scope.id || scope.className || scope.localName);
    };

    const detach = (): void => {
        if (!scope) {
            return;
        }

        for (const type of OVERLAY_EVENTS) {
            scope.removeEventListener(type, onOverlayEvent, true);
        }

        log('trace detached');
        scope = null;
    };

    const copyReport = async (): Promise<string> => {
        const { diagnoseOverlayBlockers } = await import(
            '../../../../plugin-kit-web/src/utils/overlay-recovery.ts'
        );

        const overlay = diagnoseOverlayBlockers().report;
        const litMon = (globalThis as { __litMon?: { data: () => { tag: string; updates: number }[] } }).__litMon;
        const litRows = litMon?.data().slice(0, 12) ?? [];

        return [
            '=== Nested overlays lab trace ===',
            `captured: ${new Date().toISOString()}`,
            `heartbeat: ${heartbeatEl?.textContent ?? 'n/a'}`,
            '',
            '--- timeline ---',
            entries.map((e) => `[${formatMs(e.ms)}] ${e.label}${e.detail ? ` | ${e.detail}` : ''}`).join('\n') || '(empty)',
            '',
            '--- long tasks (>50ms) ---',
            longTasks.join('\n') || '(none)',
            '',
            '--- lit monitor ---',
            litRows.map((r) => `<${r.tag}> ${r.updates}`).join('\n') || '(not installed)',
            '',
            '--- pointer probe (last clicks at document capture) ---',
            pointerProbe.join('\n') || '(no pointer events captured yet — click anywhere while frozen)',
            '',
            '--- overlay snapshot ---',
            overlay,
        ].join('\n');
    };

    const createPanel = (): HTMLElement => {
        panelEl = document.createElement('aside');
        panelEl.className = 'lab-trace';
        panelEl.innerHTML = `
            <h3>Scenario trace</h3>
            <p class="lab-trace__hint">
                Plain page output — scroll the page and screenshot. Long JSON lines wrap within the panel
                (nothing clipped horizontally). Handoff snapshots log synchronously before <code>dialog.show()</code>.
                Heartbeat going stale means Chrome may show "Page Unresponsive".
            </p>
            <div class="lab-trace__heartbeat" data-heartbeat>starting…</div>
            <pre class="lab-trace__log" data-trace-log></pre>
            <p class="lab-trace__hint">Long tasks (&gt;50ms)</p>
            <pre class="lab-trace__longtasks" data-long-tasks></pre>
        `;

        heartbeatEl = panelEl.querySelector('[data-heartbeat]');
        traceEl = panelEl.querySelector('[data-trace-log]');
        longTaskEl = panelEl.querySelector('[data-long-tasks]');

        renderTrace();
        renderLongTasks();
        renderHeartbeat();

        return panelEl;
    };

    let lastTick = performance.now();

    heartbeatTimer = window.setInterval(() => {
        const now = performance.now();
        const gap = now - lastTick;
        heartbeatAgeMs = gap;
        lastTick = now;

        // When the main thread unblocks after a hang, gap >> interval. Log context
        // so we have something even when DevTools Performance can't load the trace.
        if (gap > 2000) {
            const lastEvents = entries.slice(-6).map((e) => `[${formatMs(e.ms)}] ${e.label}`).join('\n');
            log(`⚠ MAIN THREAD STALL ${gap.toFixed(0)}ms`, lastEvents || '(no trace events yet)');

            void copyReport().then((text) => {
                try {
                    sessionStorage.setItem('overlay-lab-stall-report', text);
                } catch {
                    /* noop */
                }
            });
        }

        renderHeartbeat();
    }, 500);

    if ('PerformanceObserver' in globalThis) {
        try {
            longTaskObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    longTasks.push(`[${formatMs(entry.startTime - t0)}] longtask ${entry.duration.toFixed(0)}ms`);
                }

                renderLongTasks();
            });
            longTaskObserver.observe({ type: 'longtask', buffered: true });
        } catch {
            /* longtask not supported */
        }
    }

    (globalThis as {
        __overlayLabTrace?: { log: typeof log; copyReport: typeof copyReport };
        __overlayLabSnapshot?: () => ReturnType<typeof buildAutomationSnapshot>;
    }).__overlayLabTrace = {
        log,
        copyReport,
    };
    (globalThis as { __overlayLabSnapshot?: () => ReturnType<typeof buildAutomationSnapshot> }).__overlayLabSnapshot =
        buildAutomationSnapshot;

    log('trace ready');

    try {
        const restored = sessionStorage.getItem(TRACE_STORAGE_KEY);

        if (restored) {
            const parsed = JSON.parse(restored) as TraceEntry[];

            if (Array.isArray(parsed) && parsed.length) {
                entries.push(...parsed.slice(-20));
                log('restored prior trace (last session)', `${parsed.length} entries`);
            }
        }
    } catch {
        /* corrupt storage */
    }

    return {
        log,
        attach,
        detach,
        createPanel,
        copyReport,
        teardown: () => {
            detach();
            removePointerProbe();
            window.clearInterval(heartbeatTimer);
            longTaskObserver?.disconnect();
            delete (globalThis as { __overlayLabTrace?: unknown }).__overlayLabTrace;
            delete (globalThis as { __overlayLabSnapshot?: unknown }).__overlayLabSnapshot;
        },
    };
}
