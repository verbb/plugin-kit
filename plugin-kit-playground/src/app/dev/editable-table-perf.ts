import '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';

import type {
    PkEditableTable,
    PkEditableTableColumn,
    PkEditableTableRow,
} from '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';

import {
    buildCountryRows,
    buildDerivedScalingRows,
    buildTypingBenchmarkRows,
    countryTableColumns,
    derivedScalingColumns,
    typingBenchmarkColumns,
} from '../../catalog/data/editable-table-perf-fixtures.js';
import { createCard, createPageHero, createSection, getCardInner } from '../../web/dom.js';

type PerfStats = {
    rows: number;
    columns: number;
    mountMs: number;
};

function formatStats(stats: PerfStats): string {
    return `${stats.rows} rows × ${stats.columns} cols · mount ${stats.mountMs.toFixed(1)} ms`;
}

function bindControlledTable(
    table: PkEditableTable,
    columns: PkEditableTableColumn[],
    rows: PkEditableTableRow[],
    options: {
        addRowLabel?: string;
        allowReorder?: boolean;
        allowDelete?: boolean;
        allowAdd?: boolean;
    } = {},
): void {
    table.columns = columns;
    table.rows = rows.map((row) => ({ ...row }));
    table.addRowLabel = options.addRowLabel ?? 'Add row';

    if (options.allowReorder !== undefined) {
        table.allowReorder = options.allowReorder;
    }
    if (options.allowDelete !== undefined) {
        table.allowDelete = options.allowDelete;
    }
    if (options.allowAdd !== undefined) {
        table.allowAdd = options.allowAdd;
    }

    table.addEventListener('pk-change', ((event: CustomEvent<{ rows: PkEditableTableRow[] }>) => {
        table.rows = event.detail.rows;
    }) as EventListener);
}

async function mountTimedTable(
    host: HTMLElement,
    columns: PkEditableTableColumn[],
    rows: PkEditableTableRow[],
    options: Parameters<typeof bindControlledTable>[3] = {},
): Promise<PerfStats> {
    const statsEl = document.createElement('p');
    statsEl.className = 'pg-perf-stats';
    statsEl.textContent = 'Mounting…';
    host.append(statsEl);

    const card = createCard(false);
    const inner = getCardInner(card);
    host.append(card);

    const table = document.createElement('pk-editable-table') as PkEditableTable;
    const started = performance.now();
    bindControlledTable(table, columns, rows, options);
    inner.append(table);
    await table.updateComplete;
    // Let the browser paint once so mountMs includes first layout of cell controls.
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const mountMs = performance.now() - started;

    const stats = {
        rows: rows.length,
        columns: columns.length,
        mountMs,
    };
    statsEl.textContent = formatStats(stats);
    return stats;
}

function appendSection(
    host: HTMLElement,
    title: string,
    description: string,
): HTMLElement {
    const section = createSection(title, description);
    const preview = document.createElement('div');
    preview.className = 'pg-section__preview';
    section.append(preview);
    host.append(section);
    return preview;
}

/**
 * Isolated EditableTable performance lab — load + DnD stress harness.
 * Native HTML5 drag is current; dnd-kit parity is a follow-up once this page
 * gives a baseline for jank / mount cost.
 */
export function mountEditableTablePerfLab(root: HTMLElement): { teardown: () => void } {
    root.replaceChildren();

    const page = document.createElement('div');
    page.className = 'pg-page';
    page.append(createPageHero({
        eyebrow: 'Dev tools',
        title: 'Editable Table performance',
        description:
            'Playground-only stress harness for large-row mount cost and drag reorder. '
            + 'Not part of the component docs. Reorder uses deferred @dnd-kit/dom Sortable '
            + '(AutoScroller off) — compare mount times with reorder on vs off.',
    }));

    const sections = document.createElement('div');
    sections.className = 'pg-sections';
    page.append(sections);
    root.append(page);

    const countryRows = buildCountryRows();

    const loadPreview = appendSection(
        sections,
        'Large dataset load',
        `Countries-scale table (${countryRows.length} rows). Watch mount time below, then type in a cell `
        + 'and toggle Enabled — the goal is responsive editing after a heavy first paint.',
    );

    const dndPreview = appendSection(
        sections,
        'Drag-and-drop stress',
        `Same ${countryRows.length}-row dataset with reorder on. Drag grips after they activate `
        + '(deferred hydration). Watch for drop lag or dropped frames — this is the dnd-kit harness.',
    );

    const typingPreview = appendSection(
        sections,
        'Typing benchmark (100 × 8)',
        'v1 visual-test shape: dense text grid. Type in the first row and confirm cell updates stay cheap '
        + 'when many sibling rows are mounted.',
    );

    const derivedPreview = appendSection(
        sections,
        'Derived handle scaling (100 rows)',
        'Empty handle cells should keep auto-filling from Label while typing — regression check for '
        + 'generated-column identity after controlled pk-change loops.',
    );

    let cancelled = false;

    void (async () => {
        await mountTimedTable(loadPreview, countryTableColumns, countryRows, {
            allowReorder: false,
            allowDelete: true,
            allowAdd: true,
            addRowLabel: 'Add country',
        });
        if (cancelled) return;

        await mountTimedTable(dndPreview, countryTableColumns, countryRows, {
            allowReorder: true,
            allowDelete: true,
            allowAdd: true,
            addRowLabel: 'Add country',
        });
        if (cancelled) return;

        await mountTimedTable(typingPreview, typingBenchmarkColumns, buildTypingBenchmarkRows(100), {
            allowReorder: false,
            allowDelete: true,
            allowAdd: true,
        });
        if (cancelled) return;

        await mountTimedTable(derivedPreview, derivedScalingColumns, buildDerivedScalingRows(100), {
            allowReorder: false,
            allowDelete: true,
            allowAdd: true,
        });
    })();

    return {
        teardown() {
            cancelled = true;
            root.replaceChildren();
        },
    };
}
