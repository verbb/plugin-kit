/**
 * Nested overlays lab — reproduces menu → dialog → select chains.
 *
 * Scenarios load on demand so we never call registerAll() or mount every overlay
 * at once (that was hanging the tab on entry).
 */
import type { PkComponentTag } from '../../../../plugin-kit-web/src/component-registry.ts';
import type { PkDialog } from '../../../../plugin-kit-web/src/components/dialog/pk-dialog.js';
import type { PkDropdownMenu } from '../../../../plugin-kit-web/src/components/dropdown-menu/pk-dropdown-menu.js';
import type { PkSelect } from '../../../../plugin-kit-web/src/components/select/pk-select.js';
import type { Root } from 'react-dom/client';
import { formatHandoffSnapshot, snapshotMenuHandoff } from './handoff-snapshot.ts';
import { installDevDiagnostics } from './lit-debug.ts';
import { createOverlayLabTrace, type OverlayLabTraceHandle } from './overlay-lab-trace.ts';

export type NestedOverlaysLabHandle = {
    teardown: () => void;
};

type ScenarioId =
    | 'lit-menu-dialog'
    | 'lit-select-dialog'
    | 'lit-menu-dialog-select'
    | 'lit-dialog-select'
    | 'lit-submenu'
    | 'lit-menu-dialog-immediate'
    | 'react-copy-safe'
    | 'react-copy-risky';

type ScenarioMeta = {
    id: ScenarioId;
    title: string;
    badge: 'lit' | 'react' | 'warn';
    description: string;
    warning?: string;
    tags: readonly PkComponentTag[];
};

const SCENARIOS: ScenarioMeta[] = [
    {
        id: 'lit-menu-dialog',
        title: 'Menu → dialog (safe)',
        badge: 'lit',
        description: 'Menu closes; dialog opens on pk-after-hide.',
        tags: ['pk-button', 'pk-dialog', 'pk-dropdown-menu', 'pk-dropdown-item'],
    },
    {
        id: 'lit-select-dialog',
        title: 'Select → dialog (safe)',
        badge: 'lit',
        description: 'Listbox closes on pk-after-hide; dialog opens on the next frame.',
        tags: ['pk-dialog', 'pk-select', 'pk-option'],
    },
    {
        id: 'lit-menu-dialog-select',
        title: 'Menu → dialog → select',
        badge: 'lit',
        description: 'Full Navigation chain with select inside the dialog.',
        tags: ['pk-button', 'pk-dialog', 'pk-dropdown-menu', 'pk-dropdown-item', 'pk-select', 'pk-option'],
    },
    {
        id: 'lit-dialog-select',
        title: 'Dialog → select',
        badge: 'lit',
        description: 'Floating select popup inside a native modal.',
        tags: ['pk-button', 'pk-dialog', 'pk-select', 'pk-option'],
    },
    {
        id: 'lit-submenu',
        title: 'Submenu baseline',
        badge: 'lit',
        description: 'Nested floating popups only — no dialog.',
        tags: ['pk-button', 'pk-dropdown-menu', 'pk-dropdown-item'],
    },
    {
        id: 'lit-menu-dialog-immediate',
        title: 'Menu → dialog (immediate)',
        badge: 'warn',
        description: 'Opens dialog in the same turn as menu select — may hang the tab.',
        warning: 'This reproduces the Navigation freeze. Run only when you are ready to recover the tab.',
        tags: ['pk-button', 'pk-dialog', 'pk-dropdown-menu', 'pk-dropdown-item'],
    },
    {
        id: 'react-copy-safe',
        title: 'React copy-to-site (safe)',
        badge: 'react',
        description: 'React open state driven by pk-after-hide handoff + declarative open.',
        tags: ['pk-button', 'pk-dialog', 'pk-dropdown-menu', 'pk-dropdown-item', 'pk-dropdown-separator', 'pk-select', 'pk-option'],
    },
    {
        id: 'react-copy-risky',
        title: 'React immediate open',
        badge: 'warn',
        description: 'React sets dialog open without whenClosed() — may hang the tab.',
        warning: 'May trigger RESULT_CODE_HUNG — use to reproduce Navigation races only.',
        tags: ['pk-button', 'pk-dialog', 'pk-dropdown-menu', 'pk-dropdown-item'],
    },
];

export function mountNestedOverlaysLab(root: HTMLElement): NestedOverlaysLabHandle {
    // Freeze doctor only — defer Lit performUpdate patching until debug dock opens.
    installDevDiagnostics();

    const styles: HTMLStyleElement[] = [];
    let activeScenarioId: ScenarioId | null = null;
    let activeTeardown: (() => void) | null = null;
    let reactHandle: { root: Root; unmount: () => void } | null = null;
    let registeredTags = new Set<PkComponentTag>();
    const trace: OverlayLabTraceHandle = createOverlayLabTrace();

    root.replaceChildren();
    root.classList.add('overlay-lab-root');
    document.title = 'Plugin Kit — Nested overlays lab';

    injectStyles();
    renderShell();

    return {
        teardown: () => {
            stopScenario();
            trace.teardown();
            for (const style of styles) {
                style.remove();
            }
            root.replaceChildren();
            root.classList.remove('overlay-lab-root');
        },
    };

    function injectStyles(): void {
        const style = document.createElement('style');
        style.textContent = `
        .overlay-lab-root { font: 14px/1.5 -apple-system, system-ui, sans-serif; color: #1e293b; background: #f8fafc; min-height: 100%; }
        .overlay-lab-root .lab-hero { padding: 24px 24px 0; max-width: 960px; }
        .overlay-lab-root .lab-hero__eyebrow { margin: 0 0 6px; font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #64748b; }
        .overlay-lab-root .lab-hero__title { margin: 0 0 8px; font-size: 28px; font-weight: 700; color: #0f172a; }
        .overlay-lab-root .lab-hero__lead { margin: 0; max-width: 62ch; color: #475569; }
        .overlay-lab-root .lab-checklist { margin: 16px 0 0; padding-left: 1.2rem; color: #475569; }
        .overlay-lab-root .lab-checklist li { margin: 4px 0; }
        .overlay-lab-root .lab-main { padding: 20px 24px 48px; display: grid; gap: 20px; max-width: 960px; }
        .overlay-lab-root .lab-scenario { border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; background: #fff; }
        .overlay-lab-root .lab-scenario.is-active { border-color: #0369a1; box-shadow: 0 0 0 1px #0369a1; }
        .overlay-lab-root .lab-scenario__head { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-bottom: 8px; }
        .overlay-lab-root .lab-scenario__title { margin: 0; font-size: 15px; font-weight: 600; color: #0f172a; }
        .overlay-lab-root .lab-scenario__desc { margin: 0 0 12px; font-size: 13px; color: #64748b; }
        .overlay-lab-root .lab-scenario__warn { margin: 0 0 12px; font-size: 12px; color: #b45309; }
        .overlay-lab-root .lab-scenario__badge { border-radius: 999px; padding: 2px 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .03em; }
        .overlay-lab-root .lab-scenario__badge--lit { background: #ecfdf5; color: #047857; }
        .overlay-lab-root .lab-scenario__badge--react { background: #eff6ff; color: #1d4ed8; }
        .overlay-lab-root .lab-scenario__badge--warn { background: #fef2f2; color: #b91c1c; }
        .overlay-lab-root .lab-scenario__actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .overlay-lab-root .lab-btn { appearance: none; border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 8px; padding: 6px 12px; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
        .overlay-lab-root .lab-btn:hover { background: #f8fafc; }
        .overlay-lab-root .lab-btn--primary { background: #0369a1; border-color: #0369a1; color: #fff; }
        .overlay-lab-root .lab-btn--primary:hover { background: #0284c7; }
        .overlay-lab-root .lab-btn--ghost { background: transparent; }
        .overlay-lab-root .lab-scenario__mount { margin-top: 16px; padding-top: 16px; border-top: 1px dashed #e2e8f0; }
        .overlay-lab-root .lab-scenario__mount[hidden] { display: none; }
        .overlay-lab-root .lab-cell__log { margin-top: 10px; font: 11px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace; color: #334155; white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word; max-width: 100%; min-width: 0; }
        .overlay-lab-root .overlay-lab-react__row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; margin-bottom: 8px; }
        .overlay-lab-root .overlay-lab-react__row-label { font-size: 12px; font-weight: 600; color: #64748b; }
        .overlay-lab-root .overlay-lab-react__hint { margin: 0; font-size: 12px; color: #64748b; }
        .overlay-lab-root .overlay-lab-react__hint--warn { color: #b45309; }
        .overlay-lab-root .lab-inspector { border: 1px solid #cbd5e1; border-radius: 10px; padding: 14px 16px; background: #0f172a; color: #e2e8f0; font: 11px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace; }
        .overlay-lab-root .lab-inspector h3 { margin: 0 0 8px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; }
        .overlay-lab-root .lab-inspector pre { margin: 0; white-space: pre-wrap; word-break: break-word; max-height: 220px; overflow: auto; }
        .overlay-lab-root .lab-inspector__actions { display: flex; gap: 8px; margin-top: 10px; }
        .overlay-lab-root .lab-inspector__hint { margin: 0 0 10px; font: 12px/1.45 -apple-system, system-ui, sans-serif; color: #94a3b8; }
        .overlay-lab-root .lab-trace { border: 1px solid #cbd5e1; border-radius: 10px; padding: 14px 16px; background: #fff; color: #0f172a; max-width: 100%; min-width: 0; overflow: hidden; }
        .overlay-lab-root .lab-trace h3 { margin: 0 0 8px; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .05em; font-family: -apple-system, system-ui, sans-serif; }
        .overlay-lab-root .lab-trace__hint { margin: 0 0 10px; font: 12px/1.45 -apple-system, system-ui, sans-serif; color: #64748b; }
        .overlay-lab-root .lab-trace__heartbeat { font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; margin-bottom: 8px; color: #047857; }
        .overlay-lab-root .lab-trace__heartbeat--stale { color: #b91c1c; font-weight: 700; }
        .overlay-lab-root .lab-trace__log { margin: 0 0 10px; font: 11px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace; white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word; max-width: 100%; min-width: 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; }
        .overlay-lab-root .lab-trace__longtasks { margin: 0; font: 11px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace; white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word; max-width: 100%; min-width: 0; color: #64748b; }
        .overlay-lab-root .lab-crash-banner { margin: 12px 0 0; padding: 12px 14px; border-radius: 8px; background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; font-size: 13px; }
        .overlay-lab-root .lab-crash-banner pre { margin: 8px 0 0; font: 11px/1.45 ui-monospace, Menlo, monospace; white-space: pre-wrap; word-break: break-word; background: #fff; padding: 8px; border-radius: 6px; }
    `;
        document.head.append(style);
        styles.push(style);
    }

    function renderShell(): void {
        const hero = document.createElement('header');
        hero.className = 'lab-hero';
        hero.innerHTML = `
            <p class="lab-hero__eyebrow">Dev tools</p>
            <h1 class="lab-hero__title">Nested overlays lab</h1>
            <p class="lab-hero__lead">
                Scenarios load one at a time on demand. After reproducing a freeze, scroll the page and
                <strong>screenshot the scenario trace</strong> at the bottom — it logs handoff state synchronously
                before <code>dialog.show()</code>. Reload restores the last handoff snapshot in the trace panel.
            </p>
            <ul class="lab-checklist">
                <li><strong>Lit updates stay low</strong> → not a render loop; look for invisible modal blockers or long tasks.</li>
                <li><strong>Heartbeat goes stale</strong> → true main-thread hang; capture a Performance recording.</li>
                <li>Escape should close one layer at a time (menu, then dialog, then select popup).</li>
                <li>Scroll lock should release when every overlay closes.</li>
            </ul>
        `;

        const main = document.createElement('div');
        main.className = 'lab-main';

        for (const scenario of SCENARIOS) {
            main.append(renderScenarioCard(scenario));
        }

        main.append(renderDiagnostics(), trace.createPanel());

        root.append(hero, main);

        renderCrashRecoveryBanner(trace);
    }

    function renderCrashRecoveryBanner(tracePanel: OverlayLabTraceHandle): void {
        const key = 'overlay-lab-last-handoff';

        try {
            const raw = sessionStorage.getItem(key);

            if (!raw) {
                return;
            }

            tracePanel.log('previous session handoff (reload)', raw);
        } catch {
            /* private mode / storage blocked */
        }
    }

    function renderScenarioCard(scenario: ScenarioMeta): HTMLElement {
        const card = document.createElement('section');
        card.className = 'lab-scenario';
        card.dataset.scenarioId = scenario.id;

        const badgeClass = `lab-scenario__badge--${scenario.badge}`;

        card.innerHTML = `
            <div class="lab-scenario__head">
                <h2 class="lab-scenario__title">${scenario.title}</h2>
                <span class="lab-scenario__badge ${badgeClass}">${scenario.badge}</span>
            </div>
            <p class="lab-scenario__desc">${scenario.description}</p>
            ${scenario.warning ? `<p class="lab-scenario__warn">${scenario.warning}</p>` : ''}
            <div class="lab-scenario__actions">
                <button type="button" class="lab-btn lab-btn--primary" data-run-scenario>Run scenario</button>
                <button type="button" class="lab-btn lab-btn--ghost" data-stop-scenario hidden>Stop</button>
            </div>
            <div class="lab-scenario__mount" data-scenario-mount hidden></div>
        `;

        card.querySelector('[data-run-scenario]')!.addEventListener('click', () => {
            void runScenario(scenario.id);
        });

        card.querySelector('[data-stop-scenario]')!.addEventListener('click', () => {
            stopScenario();
        });

        return card;
    }

    function renderDiagnostics(): HTMLElement {
        const box = document.createElement('aside');
        box.className = 'lab-inspector';
        box.innerHTML = `
            <h3>Overlay inspector</h3>
            <p class="lab-inspector__hint">Loaded on demand — walks shadow roots only when you click Refresh.</p>
            <pre data-overlay-report>Click Refresh to inspect open overlays.</pre>
            <div class="lab-inspector__actions">
                <button type="button" class="lab-btn" data-overlay-refresh>Refresh</button>
                <button type="button" class="lab-btn" data-overlay-recover>Recover</button>
            </div>
        `;

        box.querySelector('[data-overlay-refresh]')!.addEventListener('click', () => {
            void refreshDiagnostics(box);
        });

        box.querySelector('[data-overlay-recover]')!.addEventListener('click', () => {
            void recoverDiagnostics(box);
        });

        return box;
    }

    async function refreshDiagnostics(box: HTMLElement): Promise<void> {
        const reportEl = box.querySelector('[data-overlay-report]')!;
        reportEl.textContent = 'Inspecting…';

        const { diagnoseOverlayBlockers, classifyOverlayFreeze } = await import(
            '../../../../plugin-kit-web/src/utils/overlay-recovery.ts'
        );
        const verdict = classifyOverlayFreeze();
        const diagnostic = diagnoseOverlayBlockers();
        reportEl.textContent = [
            `VERDICT: ${verdict.kind.toUpperCase()} — ${verdict.summary}`,
            verdict.signals.length ? `signals: ${verdict.signals.join('; ')}` : '',
            '',
            diagnostic.report,
        ].filter(Boolean).join('\n');
    }

    async function recoverDiagnostics(box: HTMLElement): Promise<void> {
        const reportEl = box.querySelector('[data-overlay-report]')!;
        const { recoverOverlays } = await import('../../../../plugin-kit-web/src/utils/overlay-recovery.ts');
        const result = recoverOverlays();
        reportEl.textContent = `${result.actions.join('\n')}\n\n${result.diagnostic.report}`;
    }

    async function ensureTags(tags: readonly PkComponentTag[]): Promise<void> {
        const missing = tags.filter((tag) => !registeredTags.has(tag));

        if (missing.length === 0) {
            return;
        }

        // Static loaders only — avoid the deleted full-map registerComponents graph.
        const loaders: Partial<Record<PkComponentTag, () => Promise<unknown>>> = {
            'pk-button': () => import('../../../../plugin-kit-web/src/components/button/pk-button.ts'),
            'pk-dialog': () => import('../../../../plugin-kit-web/src/components/dialog/pk-dialog.ts'),
            'pk-dropdown-menu': () => import('../../../../plugin-kit-web/src/components/dropdown-menu/pk-dropdown-menu.ts'),
            'pk-dropdown-item': () => import('../../../../plugin-kit-web/src/components/dropdown-menu/pk-dropdown-item.ts'),
            'pk-dropdown-separator': () => import('../../../../plugin-kit-web/src/components/dropdown-menu/pk-dropdown-separator.ts'),
            'pk-select': () => import('../../../../plugin-kit-web/src/components/select/pk-select.ts'),
            'pk-option': () => import('../../../../plugin-kit-web/src/components/select/pk-option.ts'),
        };

        await Promise.all(missing.map(async (tag) => {
            const load = loaders[tag];

            if (!load) {
                throw new Error(`nested-overlays: no loader for ${tag}`);
            }

            await load();
            registeredTags.add(tag);
            await customElements.whenDefined(tag);
        }));
    }

    async function runScenario(id: ScenarioId): Promise<void> {
        const scenario = SCENARIOS.find((entry) => entry.id === id);

        if (!scenario) {
            return;
        }

        if (scenario.badge === 'warn') {
            const ok = window.confirm(`Run "${scenario.title}"?\n\n${scenario.warning ?? 'This may hang the tab.'}`);

            if (!ok) {
                return;
            }
        }

        stopScenario();
        activeScenarioId = id;

        const card = root.querySelector<HTMLElement>(`[data-scenario-id="${id}"]`);
        const mount = card?.querySelector<HTMLElement>('[data-scenario-mount]');
        const runBtn = card?.querySelector<HTMLElement>('[data-run-scenario]');
        const stopBtn = card?.querySelector<HTMLElement>('[data-stop-scenario]');

        if (!card || !mount) {
            return;
        }

        card.classList.add('is-active');
        mount.hidden = false;
        runBtn!.hidden = true;
        stopBtn!.hidden = false;
        mount.replaceChildren();
        mount.textContent = 'Loading scenario…';

        await ensureTags(scenario.tags);

        if (activeScenarioId !== id) {
            return;
        }

        mount.replaceChildren();

        trace.attach(mount);

        if (id.startsWith('react-')) {
            activeTeardown = await mountReactScenario(id, mount);
            return;
        }

        activeTeardown = mountLitScenario(id, mount);
    }

    function stopScenario(): void {
        activeTeardown?.();
        activeTeardown = null;
        trace.detach();
        reactHandle?.unmount();
        reactHandle = null;
        activeScenarioId = null;

        for (const card of root.querySelectorAll<HTMLElement>('.lab-scenario')) {
            card.classList.remove('is-active');
            card.querySelector<HTMLElement>('[data-scenario-mount]')!.hidden = true;
            card.querySelector<HTMLElement>('[data-scenario-mount]')!.replaceChildren();
            card.querySelector<HTMLElement>('[data-run-scenario]')!.hidden = false;
            card.querySelector<HTMLElement>('[data-stop-scenario]')!.hidden = true;
        }
    }

    function mountLitScenario(id: ScenarioId, mount: HTMLElement): () => void {
        switch (id) {
            case 'lit-menu-dialog':
                return mountLitMenuDialog(mount, 'lab-lit-menu-dialog', false, false);
            case 'lit-select-dialog':
                return mountLitSelectDialog(mount);
            case 'lit-menu-dialog-select':
                return mountLitMenuDialog(mount, 'lab-lit-menu-dialog-select', true, false);
            case 'lit-menu-dialog-immediate':
                return mountLitMenuDialog(mount, 'lab-lit-menu-dialog-immediate', false, true);
            case 'lit-dialog-select':
                return mountLitDialogSelect(mount);
            case 'lit-submenu':
                return mountLitSubmenu(mount);
            default:
                return () => {};
        }
    }

    async function mountReactScenario(id: ScenarioId, mount: HTMLElement): Promise<() => void> {
        const { mountNestedOverlaysReactDemo } = await import('./nested-overlays-react.tsx');
        const variant = id === 'react-copy-risky' ? 'risky' : 'safe';
        reactHandle = await mountNestedOverlaysReactDemo(mount, variant);

        return () => {
            reactHandle?.unmount();
            reactHandle = null;
        };
    }

    function mountLitMenuDialog(
        mount: HTMLElement,
        baseId: string,
        withSelect: boolean,
        immediate: boolean,
    ): () => void {
        const log = document.createElement('div');
        log.className = 'lab-cell__log';
        log.dataset.logFor = baseId;

        mount.innerHTML = `
            <pk-dropdown-menu id="${baseId}">
                <pk-button slot="trigger" with-caret>Actions</pk-button>
                <pk-dropdown-item value="copy">Copy to site…</pk-dropdown-item>
            </pk-dropdown-menu>
        `;

        mount.append(buildLitCopyDialog(`${baseId}-dialog`, withSelect), log);

        const menu = mount.querySelector<PkDropdownMenu>(`#${baseId}`)!;
        const dialog = mount.querySelector<PkDialog>(`#${baseId}-dialog`)!;
        let openDialogInFlight = false;
        let copyPending = false;

        const openDialog = () => {
            if (openDialogInFlight) {
                trace.log('openDialog skipped (already in flight)');
                return;
            }

            openDialogInFlight = true;

            const handoff = formatHandoffSnapshot(snapshotMenuHandoff(menu, dialog));
            appendLog(log, `handoff: ${handoff}`);
            trace.log('handoff snapshot (sync)', handoff);

            appendLog(log, immediate ? 'opening dialog immediately (risky)' : 'menu closed — opening dialog');
            trace.log(immediate ? 'openDialog (risky)' : 'openDialog (safe) start');

            const runShow = (): void => {
                trace.log('defer: fired');
                trace.log('dialog.show() start');

                void (async () => {
                    try {
                        await dialog.show('api');
                        trace.log('dialog.show() resolved');
                    } catch (error) {
                        trace.log('dialog.show() rejected', error instanceof Error ? error.message : String(error));
                    } finally {
                        openDialogInFlight = false;
                    }
                })();
            };

            if (immediate) {
                trace.log('defer: sync (risky — same turn as menu select)');
                runShow();
                return;
            }

            trace.log('defer: setTimeout(0) scheduled');
            window.setTimeout(runShow, 0);
        };

        const onMenuSelect = (event: Event) => {
            const detail = (event as CustomEvent<{ value?: string }>).detail;

            if (detail?.value !== 'copy') {
                return;
            }

            if (copyPending || openDialogInFlight) {
                return;
            }

            copyPending = true;
            appendLog(log, 'pk-select (copy — waiting for pk-after-hide)');
            trace.log('handler: pk-select (copy pending)');
        };

        const onAfterHide = () => {
            if (!copyPending) {
                return;
            }

            copyPending = false;

            const handoff = formatHandoffSnapshot(snapshotMenuHandoff(menu, dialog));
            appendLog(log, `handoff: ${handoff}`);
            trace.log('handoff snapshot (sync)', handoff);

            appendLog(log, 'pk-after-hide — opening dialog');
            trace.log('handler: pk-after-hide');
            openDialog();
        };

        // Risky path: capture the raw item event before the menu begins closing.
        const onItemSelectCapture = (event: Event) => {
            const target = event.target;

            if (!(target instanceof HTMLElement) || target.localName !== 'pk-dropdown-item') {
                return;
            }

            const detail = (event as CustomEvent<{ value?: string }>).detail;

            if (detail.value !== 'copy') {
                return;
            }

            openDialog();
        };

        if (immediate) {
            menu.addEventListener('pk-select', onItemSelectCapture, true);

            return () => {
                menu.removeEventListener('pk-select', onItemSelectCapture, true);
            };
        }

        menu.addEventListener('pk-select', onMenuSelect);
        menu.addEventListener('pk-after-hide', onAfterHide);

        return () => {
            menu.removeEventListener('pk-select', onMenuSelect);
            menu.removeEventListener('pk-after-hide', onAfterHide);
        };
    }

    function mountLitSelectDialog(mount: HTMLElement): () => void {
        const baseId = 'lab-lit-select-dialog';
        const log = document.createElement('div');
        log.className = 'lab-cell__log';
        log.dataset.logFor = baseId;

        mount.innerHTML = `
            <pk-select id="${baseId}-select" placeholder="Choose action…">
                <pk-option value="noop">Do nothing</pk-option>
                <pk-option value="dialog">Open dialog…</pk-option>
            </pk-select>
        `;

        mount.append(buildLitSelectDialog(`${baseId}-dialog`), log);

        const select = mount.querySelector<PkSelect>(`#${baseId}-select`)!;
        const dialog = mount.querySelector<PkDialog>(`#${baseId}-dialog`)!;
        let openDialogAfterHide = false;
        let openDialogInFlight = false;

        const openDialog = () => {
            if (openDialogInFlight) {
                trace.log('openDialog skipped (already in flight)');
                return;
            }

            openDialogInFlight = true;
            appendLog(log, 'select closed — opening dialog');
            trace.log('openDialog (select safe) start');
            trace.log('defer: setTimeout(0) scheduled');

            window.setTimeout(() => {
                trace.log('defer: fired');
                trace.log('dialog.show() start');

                void (async () => {
                    try {
                        await dialog.show('api');
                        trace.log('dialog.show() resolved');
                    } catch (error) {
                        trace.log('dialog.show() rejected', error instanceof Error ? error.message : String(error));
                    } finally {
                        openDialogInFlight = false;
                    }
                })();
            }, 0);
        };

        const onChange = () => {
            if (select.value !== 'dialog') {
                return;
            }

            openDialogAfterHide = true;
            appendLog(log, 'change: dialog pending on pk-after-hide');
            trace.log('handler: change (dialog pending)');
        };

        const onAfterHide = () => {
            if (!openDialogAfterHide) {
                return;
            }

            openDialogAfterHide = false;
            appendLog(log, 'pk-after-hide — opening dialog');
            trace.log('handler: select pk-after-hide');
            openDialog();
        };

        select.addEventListener('change', onChange);
        select.addEventListener('pk-after-hide', onAfterHide);

        return () => {
            select.removeEventListener('change', onChange);
            select.removeEventListener('pk-after-hide', onAfterHide);
        };
    }

    function mountLitDialogSelect(mount: HTMLElement): () => void {
        mount.innerHTML = `
            <pk-dialog id="lab-lit-dialog-select" label="Pick a site">
                <pk-button slot="trigger" variant="primary">Open dialog</pk-button>
                <pk-select placeholder="Choose a site…">
                    <pk-option value="craft">Craft demo</pk-option>
                    <pk-option value="commerce">Commerce</pk-option>
                </pk-select>
                <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
                <pk-button slot="footer" variant="primary" data-dialog-close>Save</pk-button>
            </pk-dialog>
        `;

        return () => {};
    }

    function mountLitSubmenu(mount: HTMLElement): () => void {
        mount.innerHTML = `
            <pk-dropdown-menu>
                <pk-button slot="trigger">Account</pk-button>
                <pk-dropdown-item value="profile">Profile</pk-dropdown-item>
                <pk-dropdown-item value="invite">
                    Invite users
                    <pk-dropdown-item slot="submenu" value="email">Email</pk-dropdown-item>
                    <pk-dropdown-item slot="submenu" value="message">Message</pk-dropdown-item>
                </pk-dropdown-item>
            </pk-dropdown-menu>
        `;

        return () => {};
    }

    function buildLitSelectDialog(dialogId: string): HTMLElement {
        const wrap = document.createElement('div');

        wrap.innerHTML = `<pk-dialog id="${dialogId}" label="From select">
                <div class="pk-dialog__body">
                    <p style="margin:0;font-size:13px;color:#64748b">Dialog opened after the select listbox closed.</p>
                </div>
                <pk-button slot="footer" data-dialog-close>Close</pk-button>
            </pk-dialog>`;

        return wrap.firstElementChild as HTMLElement;
    }

    function buildLitCopyDialog(dialogId: string, withSelect: boolean): HTMLElement {
        const wrap = document.createElement('div');

        wrap.innerHTML = withSelect
            ? `<pk-dialog id="${dialogId}" label="Copy to site" size="wide">
                    <div class="pk-dialog__body" style="display:grid;gap:12px">
                        <label style="display:grid;gap:6px;font-size:13px">
                            Target site
                            <pk-select placeholder="Choose a site…">
                                <pk-option value="craft">Craft demo</pk-option>
                                <pk-option value="commerce">Commerce</pk-option>
                                <pk-option value="blog">Blog</pk-option>
                            </pk-select>
                        </label>
                    </div>
                    <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
                    <pk-button slot="footer" variant="primary" data-dialog-close>Copy</pk-button>
                </pk-dialog>`
            : `<pk-dialog id="${dialogId}" label="Copy to site" size="wide">
                    <div class="pk-dialog__body">
                        <p style="margin:0;font-size:13px;color:#64748b">Confirm copy to another site.</p>
                    </div>
                    <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
                    <pk-button slot="footer" variant="primary" data-dialog-close>Copy</pk-button>
                </pk-dialog>`;

        return wrap.firstElementChild as HTMLElement;
    }

    function appendLog(target: HTMLElement, message: string): void {
        const stamp = new Date().toLocaleTimeString();
        target.textContent = `${target.textContent ? `${target.textContent}\n` : ''}[${stamp}] ${message}`;
    }
}
