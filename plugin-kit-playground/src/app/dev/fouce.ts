/**
 * FOUCE Lab — a deterministic harness for observing/debugging FOUCE.
 *
 * Does NOT register components up front — renders real `pk-*` markup (genuinely
 * undefined) and only imports modules after a delay you control via `?delay=`.
 */
import '../../../../plugin-kit-web/src/tokens/tokens.css';
import '../../../../plugin-kit-web/src/styles/utilities/fouce.css';

import { PK_COMPONENT_TAGS } from '../../../../plugin-kit-web/src/component-registry.ts';
import { FOUCE_COLLAPSE_TAGS } from '../../../../plugin-kit-web/src/utilities/fouce-strategy.ts';

type FouceStrategy = 'reserve' | 'collapse' | 'trigger';

export type FouceLabOptions = {
    /** Defaults to `location.search` — pass a copy when embedding in the workshop router. */
    search?: URLSearchParams;
    /** When true, auto-install the Lit update monitor (workshop enables this by default). */
    litmon?: boolean;
};

export type FouceLabHandle = {
    teardown: () => void;
};

const componentLoaders: Array<{ tag: string; strategy: FouceStrategy; load: () => Promise<unknown> }> = [
    { tag: 'pk-input', strategy: 'reserve', load: () => import('../../../../plugin-kit-web/src/components/input/pk-input.ts') },
    { tag: 'pk-button', strategy: 'reserve', load: () => import('../../../../plugin-kit-web/src/components/button/pk-button.ts') },
    {
        tag: 'pk-select',
        strategy: 'reserve',
        load: () => Promise.all([
            import('../../../../plugin-kit-web/src/components/select/pk-select.ts'),
            import('../../../../plugin-kit-web/src/components/select/pk-option.ts'),
        ]),
    },
    { tag: 'pk-field', strategy: 'reserve', load: () => import('../../../../plugin-kit-web/src/components/field/pk-field.ts') },
    {
        tag: 'pk-dropdown-menu',
        strategy: 'trigger',
        load: () => Promise.all([
            import('../../../../plugin-kit-web/src/components/button/pk-button.ts'),
            import('../../../../plugin-kit-web/src/components/dropdown-menu/pk-dropdown-menu.ts'),
            import('../../../../plugin-kit-web/src/components/dropdown-menu/pk-dropdown-item.ts'),
        ]),
    },
    {
        tag: 'pk-popover',
        strategy: 'trigger',
        load: () => Promise.all([
            import('../../../../plugin-kit-web/src/components/button/pk-button.ts'),
            import('../../../../plugin-kit-web/src/components/popover/pk-popover.ts'),
        ]),
    },
    {
        tag: 'pk-tooltip',
        strategy: 'trigger',
        load: () => Promise.all([
            import('../../../../plugin-kit-web/src/components/button/pk-button.ts'),
            import('../../../../plugin-kit-web/src/components/tooltip/pk-tooltip.ts'),
        ]),
    },
    { tag: 'pk-dialog', strategy: 'collapse', load: () => import('../../../../plugin-kit-web/src/components/dialog/pk-dialog.ts') },
    { tag: 'pk-popup', strategy: 'collapse', load: () => import('../../../../plugin-kit-web/src/components/popup/pk-popup.ts') },
    {
        tag: 'pk-tiptap-editor',
        strategy: 'reserve',
        load: () => Promise.all([
            import('../../../../plugin-kit-web/src/components/button/pk-button.ts'),
            import('../../../../plugin-kit-web/src/components/dialog/pk-dialog.ts'),
            import('../../../../plugin-kit-web/src/components/tiptap/pk-tiptap-editor.ts'),
        ]),
    },
];

export function mountFouceLab(root: HTMLElement, options: FouceLabOptions = {}): FouceLabHandle {
    const params = options.search ?? new URLSearchParams(location.search);
    const start = performance.now();
    const timers: number[] = [];
    const styles: HTMLStyleElement[] = [];

    const delayParam = params.get('delay') ?? '800';
    const isNever = delayParam === 'never';
    const delayMs = isNever ? Infinity : Number(delayParam) || 0;
    const xray = params.get('xray') === '1';
    const cloak = params.get('cloak') === '1';
    const strategyParam = params.get('strategy') ?? 'all';
    const onlyTags = new Set((params.get('only') ?? '').split(',').map((t) => t.trim()).filter(Boolean));

    const collapseTags = new Set(FOUCE_COLLAPSE_TAGS);
    const reserveSelector = PK_COMPONENT_TAGS.filter((t) => !collapseTags.has(t)).join(',');

    const shouldInclude = (tag: string, strategy: FouceStrategy): boolean => {
        if (onlyTags.size > 0 && !onlyTags.has(tag)) return false;
        return strategyParam === 'all' || strategyParam === strategy;
    };

    root.replaceChildren();
    root.classList.add('fouce-lab-root');

    if (options.litmon ?? params.has('litmon')) {
        void import('./lit-debug.js').then(({ installLitUpdateMonitor }) => installLitUpdateMonitor());
    }

    document.title = `FOUCE Lab — ${isNever ? 'never register' : `${delayMs}ms`}`;

    injectChrome();
    renderControls();
    renderDemo();
    startRegistration();
    startInspector();

    return {
        teardown: () => {
            for (const id of timers) {
                window.clearInterval(id);
                window.clearTimeout(id);
            }
            for (const style of styles) style.remove();
            root.replaceChildren();
            root.classList.remove('fouce-lab-root');
            if (xray) document.documentElement.classList.remove('fouce-xray');
        },
    };

    function injectChrome(): void {
        const style = document.createElement('style');
        style.textContent = `
        .fouce-lab-root { margin: 0; font: 14px/1.5 -apple-system, system-ui, sans-serif; color: #1e293b; background: #f8fafc; min-height: 100%; }
        .fouce-lab-root .lab-bar { position: sticky; top: 0; z-index: 10; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
            padding: 12px 16px; background: #fff; border-bottom: 1px solid #e2e8f0; }
        .fouce-lab-root .lab-bar strong { margin-right: 4px; }
        .fouce-lab-root .lab-btn { appearance: none; border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 8px;
            padding: 5px 10px; font: inherit; cursor: pointer; }
        .fouce-lab-root .lab-btn:hover { background: #f1f5f9; }
        .fouce-lab-root .lab-btn[aria-pressed="true"] { background: #2563eb; border-color: #2563eb; color: #fff; }
        .fouce-lab-root .lab-bar--toggles { top: 53px; }
        .fouce-lab-root .lab-chip { display: inline-flex; align-items: center; gap: 6px; }
        .fouce-lab-root .lab-chip::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #b45309; }
        .fouce-lab-root .lab-chip[data-s="collapse"]::before { background: #7c3aed; }
        .fouce-lab-root .lab-chip[data-s="trigger"]::before { background: #0891b2; }
        .fouce-lab-root .lab-chip[aria-pressed="false"] { opacity: .45; }
        .fouce-lab-root .lab-sep { width: 1px; align-self: stretch; background: #e2e8f0; margin: 0 4px; }
        .fouce-lab-root .lab-main { padding: 20px; display: grid; gap: 24px; max-width: 900px; }
        .fouce-lab-root .lab-group > h2 { margin: 0 0 4px; font-size: 13px; text-transform: uppercase; letter-spacing: .04em; color: #64748b; }
        .fouce-lab-root .lab-group > p { margin: 0 0 12px; color: #64748b; }
        .fouce-lab-root .lab-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
        .fouce-lab-root .lab-cell { border: 1px dashed #cbd5e1; border-radius: 10px; padding: 12px; background: #fff; }
        .fouce-lab-root .lab-cell__tag { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 8px; font-size: 12px; }
        .fouce-lab-root .lab-cell__tag code { color: #0f172a; }
        .fouce-lab-root .lab-cell__strategy { color: #b45309; font-weight: 600; }
        .fouce-lab-root .lab-cell__strategy[data-s="collapse"] { color: #7c3aed; }
        .fouce-lab-root .lab-cell__strategy[data-s="trigger"] { color: #0891b2; }
        .fouce-lab-root .lab-cloak-region { border: 2px solid #7c3aed; border-radius: 10px; padding: 16px; background: #faf5ff; }
        .fouce-lab-root .lab-inspector { position: sticky; bottom: 16px; z-index: 20; width: min(260px, 100%); margin: 16px; background: #0f172a; color: #e2e8f0;
            border-radius: 12px; padding: 14px 16px; font: 12px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; box-shadow: 0 10px 30px rgba(0,0,0,.25); }
        .fouce-lab-root .lab-inspector h3 { margin: 0 0 8px; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; }
        .fouce-lab-root .lab-inspector dl { display: grid; grid-template-columns: auto 1fr; gap: 2px 10px; margin: 0; }
        .fouce-lab-root .lab-inspector dt { color: #94a3b8; } .fouce-lab-root .lab-inspector dd { margin: 0; text-align: right; }
        .fouce-lab-root .lab-inspector .lab-tags { margin-top: 8px; color: #fbbf24; word-break: break-all; }
        .fouce-lab-root .lab-inspector .lab-state--done { color: #4ade80; } .fouce-lab-root .lab-inspector .lab-state--wait { color: #fbbf24; } .fouce-lab-root .lab-inspector .lab-state--never { color: #f87171; }
        ${xray ? `
        .fouce-xray .fouce-lab-root :is(${reserveSelector}):not(:defined) {
            visibility: visible !important;
            animation: none !important;
            outline: 2px dashed #f59e0b !important;
            outline-offset: 1px;
            background: rgba(245, 158, 11, .14) !important;
        }` : ''}
    `;
        document.head.append(style);
        styles.push(style);
        if (xray) document.documentElement.classList.add('fouce-xray');
    }

    function renderControls(): void {
        const bar = document.createElement('div');
        bar.className = 'lab-bar';

        const setParam = (key: string, value: string) => {
            const next = new URLSearchParams(location.search);
            next.set(key, value);
            location.search = next.toString();
        };
        const toggleParam = (key: string, on: boolean) => {
            const next = new URLSearchParams(location.search);
            on ? next.set(key, '1') : next.delete(key);
            location.search = next.toString();
        };

        const delayBtn = (label: string, value: string) => {
            const b = document.createElement('button');
            b.className = 'lab-btn';
            b.textContent = label;
            b.setAttribute('aria-pressed', String(delayParam === value));
            b.addEventListener('click', () => setParam('delay', value));
            return b;
        };

        bar.append(el('strong', 'Register after:'));
        bar.append(delayBtn('0ms', '0'), delayBtn('800ms', '800'), delayBtn('3s (see 2s cap)', '3000'), delayBtn('Never', 'never'));
        bar.append(sep());

        bar.append(el('strong', 'Isolate:'));
        bar.append(
            isolateBtn('All', 'strategy', 'all'),
            isolateBtn('Reserve', 'strategy', 'reserve'),
            isolateBtn('Trigger', 'strategy', 'trigger'),
            isolateBtn('Collapse', 'strategy', 'collapse'),
        );
        if (onlyTags.size > 0) {
            const clearOnly = document.createElement('button');
            clearOnly.className = 'lab-btn';
            clearOnly.textContent = `Clear only=${[...onlyTags].join(',')}`;
            clearOnly.addEventListener('click', () => {
                const next = new URLSearchParams(location.search);
                next.delete('only');
                location.search = next.toString();
            });
            bar.append(clearOnly);
        }
        bar.append(sep());

        const xrayBtn = document.createElement('button');
        xrayBtn.className = 'lab-btn';
        xrayBtn.textContent = 'X-ray reserved boxes';
        xrayBtn.setAttribute('aria-pressed', String(xray));
        xrayBtn.addEventListener('click', () => toggleParam('xray', !xray));

        const cloakBtn = document.createElement('button');
        cloakBtn.className = 'lab-btn';
        cloakBtn.textContent = 'Cloak region';
        cloakBtn.setAttribute('aria-pressed', String(cloak));
        cloakBtn.addEventListener('click', () => toggleParam('cloak', !cloak));

        const reload = document.createElement('button');
        reload.className = 'lab-btn';
        reload.textContent = '↻ Re-run';
        reload.addEventListener('click', () => location.reload());

        bar.append(xrayBtn, cloakBtn, sep(), reload);
        root.append(bar);

        renderComponentToggles();
    }

    function renderComponentToggles(): void {
        const bar = document.createElement('div');
        bar.className = 'lab-bar lab-bar--toggles';
        bar.append(el('strong', 'Components:'));

        const setOnly = (tags: Set<string>) => {
            const next = new URLSearchParams(location.search);
            tags.size > 0 ? next.set('only', [...tags].join(',')) : next.delete('only');
            location.search = next.toString();
        };

        for (const { tag, strategy } of componentLoaders) {
            const chip = document.createElement('button');
            chip.className = 'lab-btn lab-chip';
            chip.dataset.s = strategy;
            chip.textContent = tag.replace(/^pk-/, '');
            const active = onlyTags.size === 0 || onlyTags.has(tag);
            chip.setAttribute('aria-pressed', String(active));
            chip.title = `${tag} (${strategy})`;
            chip.addEventListener('click', () => {
                const next = new Set(onlyTags);
                if (next.size === 0) {
                    next.add(tag);
                } else if (next.has(tag)) {
                    next.delete(tag);
                } else {
                    next.add(tag);
                }
                setOnly(next);
            });
            bar.append(chip);
        }

        const allBtn = document.createElement('button');
        allBtn.className = 'lab-btn';
        allBtn.textContent = 'Show all';
        allBtn.addEventListener('click', () => setOnly(new Set()));
        bar.append(sep(), allBtn);

        root.append(bar);
    }

    function isolateBtn(label: string, key: string, value: string): HTMLButtonElement {
        const b = document.createElement('button');
        b.className = 'lab-btn';
        b.textContent = label;
        b.setAttribute('aria-pressed', String((params.get(key) ?? 'all') === value));
        b.addEventListener('click', () => {
            const next = new URLSearchParams(location.search);
            value === 'all' ? next.delete(key) : next.set(key, value);
            location.search = next.toString();
        });
        return b;
    }

    function renderDemo(): void {
        const main = document.createElement('div');
        main.className = 'lab-main';

        main.append(
            group(
                'Reserve (in-flow controls)',
                'visibility: hidden — space is kept so the page does not jump; not focusable until upgraded. Reveals on register, or after 2s regardless.',
                grid([
                    cell('pk-input', 'reserve', `<pk-input placeholder="e.g. https://example.test" value="https://hyper-react.test"></pk-input>`),
                    cell('pk-button', 'reserve', `<pk-button variant="primary">Save</pk-button>`),
                    cell(
                        'pk-select',
                        'reserve',
                        `<pk-select placeholder="Choose…"><pk-option value="a">Option A</pk-option><pk-option value="b">Option B</pk-option></pk-select>`,
                        'Host reserves space, but the default-slot option list is collapsed (display:none, no 2s cap) so options never dump as raw text.',
                    ),
                    cell('pk-field', 'reserve', `<pk-field label="Link"><pk-input slot="input" placeholder="URL"></pk-input></pk-field>`),
                ]),
            ),
            group(
                'Trigger + overlay',
                'Host reserves the trigger (slot="trigger"), but the overlay panel content (default slot) is collapsed — so we never reserve space for menu items / panels that are only shown on interaction. With X-ray on, only the trigger footprint appears.',
                grid([
                    cell(
                        'pk-dropdown-menu',
                        'trigger',
                        `<pk-dropdown-menu><pk-button slot="trigger">URL ▾</pk-button><pk-dropdown-item>Entry</pk-dropdown-item><pk-dropdown-item>Asset</pk-dropdown-item><pk-dropdown-item>Custom</pk-dropdown-item></pk-dropdown-menu>`,
                        'Mirrors the Hyper field trigger — items must NOT reserve space.',
                    ),
                    cell(
                        'pk-popover',
                        'trigger',
                        `<pk-popover><pk-button slot="trigger">Open popover</pk-button><div>Panel content that should not reserve space.</div></pk-popover>`,
                    ),
                    cell(
                        'pk-tooltip',
                        'trigger',
                        `<pk-tooltip><pk-button slot="trigger">Hover me</pk-button><span>Tooltip text that should not reserve space.</span></pk-tooltip>`,
                        'Slotted element content is collapsed. Raw text-node content can only be visibility-hidden (space still reserved) — prefer the content attribute or wrap it.',
                    ),
                ]),
            ),
            group(
                'Collapse (out-of-flow overlays)',
                'display: none — no reserved box, and slotted content cannot dump into the flow before upgrade. With X-ray on, these show nothing (correct: zero footprint).',
                grid([
                    cell('pk-dialog', 'collapse', `<pk-dialog label="Example"><p>Dialog body that must NOT flash in the page flow.</p></pk-dialog>`),
                    cell('pk-popup', 'collapse', `<pk-popup><span slot="anchor">anchor</span><div>popup content</div></pk-popup>`),
                ]),
            ),
            group(
                'Rich text (Tiptap)',
                'Heavy editor for stress-testing update loops. Open the debug dock and watch update rates while typing.',
                grid([
                    cell(
                        'pk-tiptap-editor',
                        'reserve',
                        `<pk-tiptap-editor buttons="bold,italic,link" placeholder="Write something…"></pk-tiptap-editor>`,
                        'Standalone editor. Type and toggle formatting while the monitor runs.',
                    ),
                    cell(
                        'pk-tiptap-editor',
                        'reserve',
                        `<pk-dialog label="Edit content" size="wide">
                        <pk-button slot="trigger" variant="primary">Edit content ▾</pk-button>
                        <pk-tiptap-editor buttons="bold,italic,link" placeholder="Write in the modal…"></pk-tiptap-editor>
                    </pk-dialog>`,
                        'Editor inside pk-dialog — the field-editor scenario. Click to open, then use the link button.',
                    ),
                ]),
            ),
        );

        if (cloak) {
            const region = document.createElement('div');
            region.className = 'lab-cloak-region pk-cloak';
            region.innerHTML = `
            <p style="margin:0 0 12px;color:#7c3aed;font-weight:600">.pk-cloak region — hidden as a whole until all descendants upgrade</p>
            <p style="margin:0 0 12px">This native text is inside the cloak and is also hidden during the window.</p>
            <pk-button>Cloaked button</pk-button>
            <pk-input placeholder="Cloaked input"></pk-input>
        `;
            main.append(group('Cloak wrapper', 'Add class="pk-cloak" to any wrapper to hide a whole region until every pk descendant is defined.', region));
        }

        root.append(main);
    }

    function startRegistration(): void {
        if (!Number.isFinite(delayMs)) return;
        const id = window.setTimeout(async () => {
            const results = await Promise.allSettled(componentLoaders
                .filter(({ tag, strategy }) => shouldInclude(tag, strategy))
                .map(({ load }) => load()));
            for (const r of results) {
                if (r.status === 'rejected') console.error('[fouce-lab] failed to register a component:', r.reason);
            }
        }, delayMs);
        timers.push(id);
    }

    function startInspector(): void {
        const box = document.createElement('div');
        box.className = 'lab-inspector';
        box.innerHTML = `<h3>FOUCE inspector</h3>
        <dl>
            <dt>scenario</dt><dd>${isNever ? 'never' : `${delayMs}ms`}</dd>
            <dt>filter</dt><dd>${onlyTags.size > 0 ? [...onlyTags].join(',') : strategyParam}</dd>
            <dt>elapsed</dt><dd data-elapsed>0ms</dd>
            <dt>undefined</dt><dd data-count>–</dd>
            <dt>state</dt><dd data-state>–</dd>
        </dl>
        <div class="lab-tags" data-taglist></div>`;
        root.append(box);

        const elapsedEl = box.querySelector('[data-elapsed]')!;
        const countEl = box.querySelector('[data-count]')!;
        const stateEl = box.querySelector('[data-state]')!;
        const tagsEl = box.querySelector('[data-taglist]')!;

        const MAX_POLL_MS = 10_000;
        const id = window.setInterval(() => {
            const elapsed = Math.round(performance.now() - start);
            const undefinedEls = [...root.querySelectorAll(':not(:defined)')]
                .map((e) => e.localName)
                .filter((t) => t.startsWith('pk-'));
            const unique = [...new Set(undefinedEls)];

            elapsedEl.textContent = `${elapsed}ms`;
            countEl.textContent = String(undefinedEls.length);
            tagsEl.textContent = unique.join('  ');

            const revealed = elapsed >= 2000;
            if (unique.length === 0) {
                stateEl.textContent = 'all defined ✓';
                stateEl.className = 'lab-state--done';
                window.clearInterval(id);
                return;
            }
            if (isNever) {
                stateEl.textContent = revealed ? 'undefined, 2s-revealed' : 'waiting (hidden)';
                stateEl.className = revealed ? 'lab-state--never' : 'lab-state--wait';
            } else {
                stateEl.textContent = revealed ? 'past 2s cap (visible+undefined)' : `registering in ${Math.max(0, delayMs - elapsed)}ms`;
                stateEl.className = 'lab-state--wait';
            }
            if (elapsed > MAX_POLL_MS) window.clearInterval(id);
        }, 100);
        timers.push(id);
    }

    function el(tag: string, text: string): HTMLElement {
        const e = document.createElement(tag);
        e.textContent = text;
        return e;
    }

    function sep(): HTMLElement {
        const s = document.createElement('div');
        s.className = 'lab-sep';
        return s;
    }

    function group(title: string, desc: string, ...children: (Node | string)[]): HTMLElement {
        const g = document.createElement('section');
        g.className = 'lab-group';
        g.append(el('h2', title), el('p', desc));
        for (const c of children) g.append(c as Node);
        return g;
    }

    function grid(cells: Array<HTMLElement | null>): HTMLElement {
        const g = document.createElement('div');
        g.className = 'lab-grid';
        g.append(...cells.filter((c): c is HTMLElement => c !== null));
        return g;
    }

    function cell(tag: string, strategy: FouceStrategy, markup: string, note?: string): HTMLElement | null {
        if (!shouldInclude(tag, strategy)) return null;

        const c = document.createElement('div');
        c.className = 'lab-cell';
        c.innerHTML = `<div class="lab-cell__tag"><code>&lt;${tag}&gt;</code><span class="lab-cell__strategy" data-s="${strategy}">${strategy}</span></div>${markup}${note ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8">${note}</p>` : ''}`;
        return c;
    }
}
