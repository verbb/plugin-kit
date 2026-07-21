/**
 * Dual-host stress lab — Craft-like vs Tailwind-like page metrics.
 *
 * Slotted light-DOM labels inherit type rhythm through the host / flat tree.
 * When a shadow row uses font:inherit without pinning line-height, Craft CP
 * (tight) and Tailwind (comfortable) hosts produce different item heights
 * for the same size tokens.
 *
 * Overlay caveat: only the component hosts may carry Craft/Tailwind metrics.
 * Lab chrome (pane titles, section labels, captions) must stay outside those
 * hosts — otherwise overlay ghosts from chrome line-height, not the components.
 */
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import '@verbb/plugin-kit-web/components/select/pk-select.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tabs.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js';
import '@verbb/plugin-kit-web/components/dialog/pk-dialog.js';

import type { PkDropdownMenu } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import type { PkSelect } from '@verbb/plugin-kit-web/components/select/pk-select.js';

type HostKind = 'craft' | 'tailwind';
type MenuSize = 'sm' | 'default';

const MENU_SIZES: readonly MenuSize[] = ['sm', 'default'];

function icon(name: string): HTMLElement {
    const el = document.createElement('pk-icon');
    el.setAttribute('icon', name);
    el.setAttribute('slot', 'start');
    el.setAttribute('aria-hidden', 'true');
    return el;
}

function dropdownItem(label: string, options: {
    value?: string;
    destructive?: boolean;
    icon?: string;
} = {}): HTMLElement {
    const item = document.createElement('pk-dropdown-item');
    if (options.value) item.setAttribute('value', options.value);
    if (options.destructive) item.setAttribute('destructive', '');
    if (options.icon) item.append(icon(options.icon));
    // Bare text node — the inheritance case that Craft CP vs Tailwind stresses.
    item.append(label);
    return item;
}

function menuItems(): HTMLElement[] {
    const label = document.createElement('pk-dropdown-label');
    label.textContent = 'Actions';
    return [
        label,
        dropdownItem('Edit', { value: 'edit', icon: 'pen' }),
        dropdownItem('Copy', { value: 'copy', icon: 'copy' }),
        dropdownItem('Duplicate', { value: 'duplicate', icon: 'copy' }),
        document.createElement('pk-dropdown-separator'),
        dropdownItem('Delete', { value: 'delete', icon: 'xmark', destructive: true }),
    ];
}

/** Hyper type-picker analogue — text-only items, no leading icons. */
function typePickerItems(): HTMLElement[] {
    return [
        dropdownItem('Category', { value: 'category' }),
        dropdownItem('Email', { value: 'email' }),
        dropdownItem('Entry', { value: 'entry' }),
        dropdownItem('URL', { value: 'url' }),
    ];
}

function buildMenu(size: MenuSize, open: boolean): HTMLElement {
    const menu = document.createElement('pk-dropdown-menu') as PkDropdownMenu;
    menu.setAttribute('size', size);
    menu.setAttribute('placement', 'bottom-start');
    menu.dataset.hostLabMenu = 'icon';

    const trigger = document.createElement('pk-button');
    trigger.setAttribute('slot', 'trigger');
    trigger.setAttribute('size', size === 'default' ? 'sm' : size);
    trigger.setAttribute('variant', 'ghost');
    trigger.setAttribute('aria-label', `${size} menu`);
    const triggerIcon = document.createElement('pk-icon');
    triggerIcon.setAttribute('icon', 'ellipsis');
    triggerIcon.setAttribute('slot', 'start');
    trigger.append(triggerIcon);

    menu.append(trigger, ...menuItems());

    if (open) {
        menu.open = true;
    }

    return menu;
}

/**
 * Hyper link-type picker shape: plain text `<button slot="trigger">` + text-only items.
 * Item inheritance is the same as icon menus — this case stops agents assuming ellipsis-only.
 */
function buildTextTriggerMenu(size: MenuSize, open: boolean): HTMLElement {
    const menu = document.createElement('pk-dropdown-menu') as PkDropdownMenu;
    menu.setAttribute('size', size);
    menu.setAttribute('placement', 'bottom-start');
    menu.dataset.hostLabMenu = 'text-trigger';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.slot = 'trigger';
    trigger.className = 'host-lab__text-trigger';
    trigger.textContent = 'URL';
    trigger.setAttribute('aria-label', 'Link type');

    menu.append(trigger, ...typePickerItems());

    if (open) {
        menu.open = true;
    }

    return menu;
}

function appendMenuWrap(
    row: HTMLElement,
    options: {
        size: MenuSize;
        kind: HostKind;
        hostClass: string;
        variant: 'icon' | 'text-trigger' | 'ancestor-noise';
        caption: string;
        openMenus: boolean;
        build: (size: MenuSize, open: boolean) => HTMLElement;
    },
): void {
    const wrap = document.createElement('div');
    wrap.className = 'host-lab__menu-wrap';
    wrap.dataset.size = options.size;
    wrap.dataset.variant = options.variant;

    const caption = document.createElement('p');
    caption.className = 'host-lab__caption';
    caption.textContent = options.caption;

    const hostInner = document.createElement('div');
    hostInner.className = options.hostClass;
    hostInner.dataset.host = options.kind;

    const menu = options.build(options.size, options.openMenus);

    if (options.variant === 'ancestor-noise') {
        // Simulates Hyper header chrome that set line-height: normal on a menu ancestor.
        const noise = document.createElement('div');
        noise.className = 'host-lab__ancestor-noise';
        noise.append(menu);
        hostInner.append(noise);
    } else {
        hostInner.append(menu);
    }

    wrap.append(caption, hostInner);
    row.append(wrap);
}

function buildButtons(): HTMLElement {
    const row = document.createElement('div');
    row.className = 'host-lab__row';

    for (const size of MENU_SIZES) {
        const labelOnly = document.createElement('pk-button');
        labelOnly.setAttribute('size', size);
        labelOnly.textContent = `Label ${size}`;

        const withIcon = document.createElement('pk-button');
        withIcon.setAttribute('size', size);
        withIcon.append(icon('pen'), `Icon ${size}`);

        const iconOnly = document.createElement('pk-button');
        iconOnly.setAttribute('size', size);
        iconOnly.setAttribute('variant', 'ghost');
        iconOnly.setAttribute('aria-label', 'More');
        const onlyIcon = document.createElement('pk-icon');
        onlyIcon.setAttribute('icon', 'ellipsis');
        onlyIcon.setAttribute('slot', 'start');
        iconOnly.append(onlyIcon);

        row.append(labelOnly, withIcon, iconOnly);
    }

    return row;
}

function buildSelect(size: MenuSize): HTMLElement {
    const select = document.createElement('pk-select') as PkSelect;
    select.setAttribute('size', size);
    select.setAttribute('placeholder', `Select (${size})`);
    select.dataset.hostLabSelect = size;

    for (const [value, label] of [
        ['draft', 'Draft'],
        ['live', 'Live'],
        ['archived', 'Archived'],
    ] as const) {
        const option = document.createElement('pk-option');
        option.setAttribute('value', value);
        option.textContent = label;
        select.append(option);
    }

    return select;
}

function buildTabs(): HTMLElement {
    const tabs = document.createElement('pk-tabs');
    tabs.setAttribute('value', 'content');

    for (const [value, label] of [
        ['content', 'Content'],
        ['settings', 'Settings'],
        ['advanced', 'Advanced'],
    ] as const) {
        const tab = document.createElement('pk-tab');
        tab.setAttribute('slot', 'nav');
        tab.setAttribute('value', value);
        tab.textContent = label;
        tabs.append(tab);

        const panel = document.createElement('pk-tab-panel');
        panel.setAttribute('value', value);
        panel.textContent = `${label} panel`;
        tabs.append(panel);
    }

    return tabs;
}

function buildDialogTrigger(): HTMLElement {
    const dialog = document.createElement('pk-dialog');
    dialog.setAttribute('label', 'Dialog title');
    dialog.setAttribute('description', 'Description copy from attributes (shadow).');

    const trigger = document.createElement('pk-button');
    trigger.setAttribute('slot', 'trigger');
    trigger.setAttribute('size', 'sm');
    trigger.textContent = 'Open dialog';

    const body = document.createElement('p');
    body.textContent = 'Slotted body text — inherits from dialog body chrome.';
    dialog.append(trigger, body);
    return dialog;
}

/**
 * Gallery chrome (titles/captions) stays outside the host-metrics wrapper so
 * overlay compares components only — not lab typography inheriting 1.2 vs 1.5.
 */
function appendHostScopedBlock(
    gallery: HTMLElement,
    title: string,
    hostClass: string,
    fill: (scope: HTMLElement) => void,
): void {
    const block = document.createElement('div');
    block.className = 'host-lab__block';

    const heading = document.createElement('h3');
    heading.className = 'host-lab__block-title';
    heading.textContent = title;
    block.append(heading);

    const scope = document.createElement('div');
    scope.className = `host-lab__scope ${hostClass}`;
    fill(scope);
    block.append(scope);
    gallery.append(block);
}

function buildGallery(kind: HostKind, hostClass: string, openMenus: boolean): HTMLElement {
    const gallery = document.createElement('div');
    gallery.className = 'host-lab__gallery';
    gallery.dataset.host = kind;

    const menuBlock = document.createElement('div');
    menuBlock.className = 'host-lab__block';
    const menuTitle = document.createElement('h3');
    menuTitle.className = 'host-lab__block-title';
    menuTitle.textContent = 'Dropdown menus (popup — measure these)';
    menuBlock.append(menuTitle);

    const menuRow = document.createElement('div');
    menuRow.className = 'host-lab__menu-row';

    // Ellipsis + icon items (Formie field-actions / Hyper block ⋯).
    for (const size of MENU_SIZES) {
        appendMenuWrap(menuRow, {
            size,
            kind,
            hostClass,
            variant: 'icon',
            caption: `ellipsis · size="${size}"`,
            openMenus,
            build: buildMenu,
        });
    }

    // Text trigger + text-only items (Hyper link-type picker).
    appendMenuWrap(menuRow, {
        size: 'sm',
        kind,
        hostClass,
        variant: 'text-trigger',
        caption: 'text trigger · size="sm"',
        openMenus,
        build: buildTextTriggerMenu,
    });

    // Craft-only: ancestor with line-height: normal (Hyper header chrome noise).
    // Item heights must still match the unwrapped ellipsis sm menu under the same host.
    if (kind === 'craft') {
        appendMenuWrap(menuRow, {
            size: 'sm',
            kind,
            hostClass,
            variant: 'ancestor-noise',
            caption: 'ancestor noise · lh:normal',
            openMenus,
            build: buildMenu,
        });
    }

    menuBlock.append(menuRow);
    gallery.append(menuBlock);

    appendHostScopedBlock(gallery, 'Buttons', hostClass, (scope) => {
        scope.append(buildButtons());
    });

    appendHostScopedBlock(gallery, 'Select (popup — measure these)', hostClass, (scope) => {
        const selectRow = document.createElement('div');
        selectRow.className = 'host-lab__row';
        for (const size of MENU_SIZES) {
            const wrap = document.createElement('div');
            wrap.className = 'host-lab__select-wrap';
            wrap.dataset.size = size;

            const caption = document.createElement('p');
            caption.className = 'host-lab__caption';
            caption.textContent = `size="${size}"`;

            wrap.append(caption, buildSelect(size));
            selectRow.append(wrap);
        }
        scope.append(selectRow);
    });

    appendHostScopedBlock(gallery, 'Tabs', hostClass, (scope) => {
        scope.append(buildTabs());
    });

    appendHostScopedBlock(gallery, 'Dialog', hostClass, (scope) => {
        scope.append(buildDialogTrigger());
    });

    return gallery;
}

type MenuVariant = 'icon' | 'text-trigger' | 'ancestor-noise';

type ItemMetric = {
    source: 'menu' | 'select';
    variant?: MenuVariant;
    host: HostKind;
    size: string;
    label: string;
    height: number;
    fontSize: string;
    lineHeight: string;
};

function itemLabel(item: Element): string {
    return (item.textContent ?? '').trim().replace(/\s+/g, ' ');
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function collectMenuItemMetrics(
    menu: PkDropdownMenu,
    meta: { source: 'menu'; variant: MenuVariant; host: HostKind; size: string },
): ItemMetric[] {
    const metrics: ItemMetric[] = [];
    for (const item of menu.querySelectorAll(':scope > pk-dropdown-item')) {
        const label = itemLabel(item);
        if (!label || label === 'Actions') continue;
        const style = getComputedStyle(item);
        metrics.push({
            ...meta,
            label,
            height: Math.round(item.getBoundingClientRect().height * 100) / 100,
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
        });
    }
    return metrics;
}

/**
 * Open each host×size popup in turn, measure slotted rows while open, then close.
 * Covers dropdown menus (icon / text-trigger / ancestor-noise) and selects.
 */
async function measurePopupItems(
    root: HTMLElement,
    onProgress?: (message: string) => void,
): Promise<ItemMetric[]> {
    const metrics: ItemMetric[] = [];
    const allMenus = () => [...root.querySelectorAll('pk-dropdown-menu')] as PkDropdownMenu[];
    const allSelects = () => [...root.querySelectorAll('pk-select')] as PkSelect[];

    const closeAll = async () => {
        for (const menu of allMenus()) {
            if (menu.open) menu.open = false;
        }
        for (const select of allSelects()) {
            const sel = select as PkSelect & { closing?: boolean };
            // Await hide fully — racing a short timeout left `closing` true, so
            // the next show() no-oped and option rows never laid out.
            if (sel.open || sel.closing) {
                await Promise.race([select.hide(), sleep(2000)]);
            }
            const settle = Date.now() + 1000;
            while ((sel.open || sel.closing) && Date.now() < settle) {
                await sleep(40);
            }
        }
        await sleep(100);
    };

    /** Wait until the open listbox has laid out option rows (popover top-layer). */
    async function waitForOptionLayout(select: PkSelect): Promise<void> {
        const deadline = Date.now() + 2500;
        while (Date.now() < deadline) {
            if (select.open) {
                const option = select.querySelector(':scope > pk-option');
                if (option && option.getBoundingClientRect().height > 0) {
                    return;
                }
            }
            await sleep(50);
        }
    }

    await closeAll();

    type MenuCase = { variant: MenuVariant; size: MenuSize; hosts: HostKind[] };
    const menuCases: MenuCase[] = [
        { variant: 'icon', size: 'sm', hosts: ['craft', 'tailwind'] },
        { variant: 'icon', size: 'default', hosts: ['craft', 'tailwind'] },
        { variant: 'text-trigger', size: 'sm', hosts: ['craft', 'tailwind'] },
        // Ancestor noise is Craft-only — compare to craft icon sm (same size tokens).
        { variant: 'ancestor-noise', size: 'sm', hosts: ['craft'] },
    ];

    for (const { variant, size, hosts } of menuCases) {
        for (const host of hosts) {
            const hostClass = host === 'craft' ? 'pk-host-craft' : 'pk-host-tailwind';
            onProgress?.(`menu · ${variant} · ${host} · size=${size} — opening`);
            const menu = root.querySelector<PkDropdownMenu>(
                `.host-lab__menu-wrap[data-variant="${variant}"][data-size="${size}"] .${hostClass} pk-dropdown-menu`,
            );
            if (!menu) {
                throw new Error(`No menu for ${variant} / ${host} size=${size}`);
            }

            await closeAll();
            menu.open = true;
            await sleep(200);

            if (!menu.open) {
                throw new Error(`Menu failed to open for ${variant} / ${host} size=${size}`);
            }

            onProgress?.(`menu · ${variant} · ${host} · size=${size} — measuring`);
            metrics.push(...collectMenuItemMetrics(menu, {
                source: 'menu',
                variant,
                host,
                size,
            }));

            onProgress?.(`menu · ${variant} · ${host} · size=${size} — closing`);
            await closeAll();
        }
    }

    // --- Selects (pk-option rows in the open listbox) ---
    for (const host of ['craft', 'tailwind'] as const) {
        const hostClass = host === 'craft' ? 'pk-host-craft' : 'pk-host-tailwind';
        for (const size of MENU_SIZES) {
            onProgress?.(`select · ${host} · size=${size} — opening`);
            const select = root.querySelector<PkSelect>(
                `.${hostClass} .host-lab__select-wrap[data-size="${size}"] > pk-select`,
            );
            if (!select) {
                throw new Error(`No select for ${host} size=${size}`);
            }

            await closeAll();
            await select.show();
            await waitForOptionLayout(select);

            // One retry if hide settle raced and show() no-oped while closing.
            if (!select.open || !(select.querySelector(':scope > pk-option')?.getBoundingClientRect().height)) {
                await closeAll();
                await select.show();
                await waitForOptionLayout(select);
            }

            if (!select.open) {
                throw new Error(`Select failed to open for ${host} size=${size}`);
            }

            onProgress?.(`select · ${host} · size=${size} — measuring`);
            for (const option of select.querySelectorAll(':scope > pk-option')) {
                const label = itemLabel(option);
                if (!label) continue;
                const style = getComputedStyle(option);
                const height = Math.round(option.getBoundingClientRect().height * 100) / 100;
                if (height <= 0) {
                    throw new Error(`Select option "${label}" has no layout for ${host} size=${size}`);
                }
                metrics.push({
                    source: 'select',
                    host,
                    size,
                    label,
                    height,
                    fontSize: style.fontSize,
                    lineHeight: style.lineHeight,
                });
            }

            onProgress?.(`select · ${host} · size=${size} — closing`);
            await closeAll();
        }
    }

    return metrics;
}

function renderMetricsSection(
    title: string,
    metrics: ItemMetric[],
    keyFn: (m: ItemMetric) => string = (m) => `${m.size}::${m.label}`,
): string[] {
    const keys = new Map<string, {
        craft?: number;
        tailwind?: number;
        craftFs?: string;
        twFs?: string;
        craftLh?: string;
        twLh?: string;
    }>();

    for (const m of metrics) {
        const key = keyFn(m);
        const row = keys.get(key) ?? {};
        row[m.host] = m.height;
        if (m.host === 'craft') {
            row.craftFs = m.fontSize;
            row.craftLh = m.lineHeight;
        } else {
            row.twFs = m.fontSize;
            row.twLh = m.lineHeight;
        }
        keys.set(key, row);
    }

    const lines = [
        title,
        'size / item'.padEnd(28)
        + 'craft'.padStart(8)
        + 'tailwind'.padStart(10)
        + 'Δh'.padStart(8)
        + '  font/lh',
    ];
    for (const [key, row] of keys) {
        const craft = row.craft ?? NaN;
        const tw = row.tailwind ?? NaN;
        const delta = Number.isFinite(craft) && Number.isFinite(tw) ? Math.abs(craft - tw) : NaN;
        // Single-host rows (ancestor-noise): flag only if craft height is missing.
        const flag = Number.isFinite(tw)
            ? (delta > 0.5 ? ' ⚠' : ' ✓')
            : (Number.isFinite(craft) ? ' ✓' : ' ⚠');
        const typeNote = Number.isFinite(tw)
            ? `  ${row.craftFs}/${row.craftLh} vs ${row.twFs}/${row.twLh}`
            : `  ${row.craftFs}/${row.craftLh}`;
        lines.push(
            key.padEnd(28)
            + (Number.isFinite(craft) ? String(craft) : '—').padStart(8)
            + (Number.isFinite(tw) ? String(tw) : '—').padStart(10)
            + (Number.isFinite(delta) ? delta.toFixed(2) : '—').padStart(8)
            + flag
            + typeNote,
        );
    }

    return lines;
}

/** Prove ancestor-noise sm rows match unwrapped craft icon sm rows. */
function renderAncestorNoiseCheck(metrics: ItemMetric[]): string[] {
    const icon = metrics.filter((m) => m.source === 'menu' && m.variant === 'icon' && m.host === 'craft' && m.size === 'sm');
    const noise = metrics.filter((m) => m.source === 'menu' && m.variant === 'ancestor-noise' && m.host === 'craft');
    const lines = [
        'ancestor-noise vs craft icon sm (must match — :host wins over lh:normal)',
        'item'.padEnd(28) + 'icon'.padStart(8) + 'noise'.padStart(10) + 'Δh'.padStart(8),
    ];

    for (const n of noise) {
        const baseline = icon.find((i) => i.label === n.label);
        const baseH = baseline?.height ?? NaN;
        const delta = Number.isFinite(baseH) ? Math.abs(baseH - n.height) : NaN;
        const flag = delta > 0.5 ? ' ⚠' : ' ✓';
        lines.push(
            n.label.padEnd(28)
            + (Number.isFinite(baseH) ? String(baseH) : '—').padStart(8)
            + String(n.height).padStart(10)
            + (Number.isFinite(delta) ? delta.toFixed(2) : '—').padStart(8)
            + flag,
        );
    }

    return lines;
}

function renderMetricsTable(metrics: ItemMetric[]): string {
    const iconMenus = metrics.filter((m) => m.source === 'menu' && m.variant === 'icon');
    const textTrigger = metrics.filter((m) => m.source === 'menu' && m.variant === 'text-trigger');
    const selects = metrics.filter((m) => m.source === 'select');

    return [
        ...renderMetricsSection('dropdown-menu · ellipsis + icons', iconMenus),
        '',
        ...renderMetricsSection('dropdown-menu · text trigger (Hyper type picker)', textTrigger),
        '',
        ...renderAncestorNoiseCheck(metrics),
        '',
        ...renderMetricsSection('select / pk-option', selects),
    ].join('\n');
}

function injectStyles(): HTMLStyleElement {
    const style = document.createElement('style');
    style.textContent = `
        .host-lab {
            padding: 24px 28px 48px;
            max-width: 1200px;
            /* Lab chrome baseline — never inherit Craft/Tailwind stress metrics. */
            font-family: system-ui, sans-serif;
            font-size: 14px;
            line-height: 1.4;
            color: #334155;
        }

        .host-lab__hero {
            margin-bottom: 20px;
        }

        .host-lab__eyebrow {
            margin: 0 0 4px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #6b7c8f;
        }

        .host-lab__title {
            margin: 0 0 8px;
            font-size: 22px;
            font-weight: 650;
            color: #1f2937;
        }

        .host-lab__lead {
            margin: 0 0 12px;
            max-width: 68ch;
            font-size: 14px;
            line-height: 1.5;
            color: #4b5563;
        }

        .host-lab__controls {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .host-lab__controls button {
            appearance: none;
            border: 1px solid #c5d0db;
            border-radius: 6px;
            background: #fff;
            padding: 6px 12px;
            font: inherit;
            font-size: 13px;
            line-height: 1.3;
            cursor: pointer;
            color: #334155;
        }

        .host-lab__controls button[aria-pressed='true'] {
            border-color: #3b82f6;
            background: #eff6ff;
            color: #1d4ed8;
        }

        .host-lab__controls button:disabled {
            opacity: 0.55;
            cursor: wait;
        }

        .host-lab__split {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            align-items: start;
        }

        /*
         * Overlay stacks galleries only. Pane heads are hidden (different titles
         * would ghost). Host scopes get a tint so aligned = blended, drift = double.
         */
        .host-lab__split.is-overlay {
            display: grid;
            grid-template-columns: 1fr;
            position: relative;
            min-height: 420px;
        }

        .host-lab__split.is-overlay .host-lab__pane {
            grid-column: 1;
            grid-row: 1;
            background: transparent;
            border-color: transparent;
            overflow: visible;
        }

        .host-lab__split.is-overlay .host-lab__pane-head {
            visibility: hidden;
            /* Keep identical reserved height so both galleries share an origin. */
            height: 52px;
            pointer-events: none;
        }

        .host-lab__split.is-overlay .host-lab__pane--craft .host-lab__scope,
        .host-lab__split.is-overlay .host-lab__pane--craft .pk-host-craft {
            outline: 1px solid rgb(239 68 68 / 0.35);
            background: rgb(254 242 242 / 0.25);
        }

        .host-lab__split.is-overlay .host-lab__pane--tailwind .host-lab__scope,
        .host-lab__split.is-overlay .host-lab__pane--tailwind .pk-host-tailwind {
            outline: 1px solid rgb(59 130 246 / 0.35);
            background: rgb(239 246 255 / 0.25);
        }

        .host-lab__split.is-overlay .host-lab__pane--craft {
            opacity: 0.7;
            z-index: 1;
        }

        .host-lab__split.is-overlay .host-lab__pane--tailwind {
            opacity: 0.7;
            z-index: 2;
            pointer-events: none;
        }

        .host-lab__overlay-banner {
            display: none;
            margin-bottom: 10px;
            padding: 8px 12px;
            border-radius: 8px;
            background: #0f172a;
            color: #e2e8f0;
            font-size: 12px;
            line-height: 1.4;
        }

        .host-lab__split.is-overlay + .host-lab__overlay-banner,
        .host-lab__overlay-banner.is-visible {
            display: block;
        }

        .host-lab__pane {
            border: 1px solid #d7e0ea;
            border-radius: 10px;
            overflow: hidden;
            background: #fff;
        }

        .host-lab__pane-head {
            box-sizing: border-box;
            padding: 10px 14px;
            border-bottom: 1px solid #e5edf5;
            background: #f7fafc;
            /* Explicit — never inherit from a stressed host ancestor. */
            font-size: 13px;
            line-height: 1.3;
        }

        .host-lab__pane-head h2 {
            margin: 0;
            font-size: 13px;
            font-weight: 650;
            line-height: 1.3;
            color: #334155;
        }

        .host-lab__pane-head p {
            margin: 2px 0 0;
            font-size: 12px;
            line-height: 1.3;
            color: #64748b;
        }

        /* Only these wrappers carry Craft / Tailwind stress metrics. */
        .pk-host-craft,
        .host-lab__scope.pk-host-craft {
            font-family: system-ui, sans-serif;
            font-size: 14px;
            line-height: 1.2;
            color: #3f4d5a;
        }

        .pk-host-tailwind,
        .host-lab__scope.pk-host-tailwind {
            font-family: system-ui, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #3f4d5a;
        }

        .host-lab__gallery {
            display: flex;
            flex-direction: column;
            gap: 18px;
            padding: 14px;
        }

        .host-lab__block-title {
            margin: 0 0 8px;
            font-size: 12px;
            font-weight: 650;
            line-height: 1.3;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            color: #64748b;
        }

        .host-lab__caption {
            margin: 0 0 6px;
            font-size: 11px;
            line-height: 1.3;
            color: #94a3b8;
        }

        .host-lab__row,
        .host-lab__menu-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: flex-start;
        }

        .host-lab__menu-wrap {
            min-width: 160px;
        }

        .host-lab__select-wrap {
            min-width: 140px;
        }

        /* Hyper type-picker style trigger — not a pk-button. */
        .host-lab__text-trigger {
            appearance: none;
            margin: 0;
            padding: 4px 8px;
            border: 1px solid #c5d0db;
            border-radius: 4px;
            background: #fff;
            font: inherit;
            font-size: 13px;
            line-height: 1.3;
            color: #3f4d5a;
            cursor: pointer;
        }

        /*
         * Simulates Hyper header chrome that set line-height: normal / small
         * font-size on a menu ancestor. Item :host pins must still win.
         */
        .host-lab__ancestor-noise {
            font-size: 12px;
            line-height: normal;
        }

        .host-lab__metrics {
            margin-top: 16px;
            padding: 12px 14px;
            border-radius: 8px;
            background: #0f172a;
            color: #e2e8f0;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 12px;
            line-height: 1.45;
            white-space: pre;
            overflow: auto;
        }

        .host-lab__metrics[hidden] {
            display: none;
        }

        @media (max-width: 900px) {
            .host-lab__split:not(.is-overlay) {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.append(style);
    return style;
}

/**
 * Craft-vs-Tailwind dual-host mockup for slotted light-DOM type metrics.
 */
export function mountSlottedHostLab(root: HTMLElement): { teardown: () => void } {
    root.replaceChildren();
    document.title = 'Plugin Kit — Slotted host metrics';

    const style = injectStyles();
    let openMenus = false;
    let overlay = false;
    let measuring = false;

    const page = document.createElement('div');
    page.className = 'host-lab';

    page.innerHTML = `
        <div class="host-lab__hero">
            <p class="host-lab__eyebrow">Dev tools</p>
            <h1 class="host-lab__title">Slotted host metrics</h1>
            <p class="host-lab__lead">
                Same components under Craft-like (tight) and Tailwind-like (comfortable)
                page metrics. Lab chrome stays outside the host wrappers so overlay
                only ghosts when the components themselves diverge. Measure opens real
                popups in turn: ellipsis menus, a text-trigger type picker (Hyper
                analogue), Craft ancestor noise (line-height: normal), and selects.
            </p>
            <div class="host-lab__controls">
                <button type="button" data-action="toggle-open" aria-pressed="false">Menus open</button>
                <button type="button" data-action="toggle-overlay" aria-pressed="false">Overlay mode</button>
                <button type="button" data-action="measure">Measure popups</button>
            </div>
        </div>
        <div class="host-lab__overlay-banner" data-overlay-banner>
            Overlay: Craft tinted red, Tailwind blue. Pane titles are hidden so they
            cannot shift the stack. Double-vision on menu rows = real mismatch.
        </div>
        <div class="host-lab__split" data-split></div>
        <pre class="host-lab__metrics" data-metrics hidden></pre>
    `;

    const split = page.querySelector<HTMLElement>('[data-split]')!;
    const banner = page.querySelector<HTMLElement>('[data-overlay-banner]')!;
    const metricsEl = page.querySelector<HTMLPreElement>('[data-metrics]')!;
    const openBtn = page.querySelector<HTMLButtonElement>('[data-action="toggle-open"]')!;
    const overlayBtn = page.querySelector<HTMLButtonElement>('[data-action="toggle-overlay"]')!;
    const measureBtn = page.querySelector<HTMLButtonElement>('[data-action="measure"]')!;

    const syncOverlayChrome = () => {
        split.classList.toggle('is-overlay', overlay);
        banner.classList.toggle('is-visible', overlay);
    };

    const renderPanes = () => {
        split.replaceChildren();
        syncOverlayChrome();

        const craftPane = document.createElement('div');
        craftPane.className = 'host-lab__pane host-lab__pane--craft';
        craftPane.innerHTML = `
            <div class="host-lab__pane-head">
                <h2>Host A — Craft-like</h2>
                <p>font-size: 14px · line-height: 1.2</p>
            </div>
        `;
        craftPane.append(buildGallery('craft', 'pk-host-craft', openMenus));

        const twPane = document.createElement('div');
        twPane.className = 'host-lab__pane host-lab__pane--tailwind';
        twPane.innerHTML = `
            <div class="host-lab__pane-head">
                <h2>Host B — Tailwind-like</h2>
                <p>font-size: 16px · line-height: 1.5</p>
            </div>
        `;
        twPane.append(buildGallery('tailwind', 'pk-host-tailwind', openMenus));

        split.append(craftPane, twPane);
        metricsEl.hidden = true;
    };

    openBtn.addEventListener('click', () => {
        openMenus = !openMenus;
        openBtn.setAttribute('aria-pressed', String(openMenus));
        openBtn.textContent = openMenus ? 'Menus open' : 'Menus closed';
        renderPanes();
    });

    overlayBtn.addEventListener('click', () => {
        overlay = !overlay;
        overlayBtn.setAttribute('aria-pressed', String(overlay));
        syncOverlayChrome();
    });

    measureBtn.addEventListener('click', async () => {
        if (measuring) return;
        measuring = true;
        measureBtn.disabled = true;
        measureBtn.textContent = 'Measuring…';
        metricsEl.hidden = false;
        metricsEl.textContent = 'Opening popups under each host…';

        try {
            const metrics = await measurePopupItems(page, (message) => {
                metricsEl.textContent = message;
            });
            metricsEl.textContent = renderMetricsTable(metrics);
            console.table(metrics);
        } catch (error) {
            metricsEl.textContent = `Measure failed: ${error instanceof Error ? error.message : String(error)}`;
            console.error(error);
        } finally {
            measuring = false;
            measureBtn.disabled = false;
            measureBtn.textContent = 'Measure popups';
        }
    });

    renderPanes();
    root.append(page);

    return {
        teardown: () => {
            style.remove();
            root.replaceChildren();
        },
    };
}
