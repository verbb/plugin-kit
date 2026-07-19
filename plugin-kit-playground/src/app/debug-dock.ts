import {
    installDevDiagnostics,
    installLitUpdateMonitor,
    subscribeDebugSink,
} from './dev/lit-debug.js';

type LitMonRow = { tag: string; updates: number };

export type DebugDockHandle = {
    teardown: () => void;
};

export function createDebugDock(container: HTMLElement): DebugDockHandle {
    container.replaceChildren();

    const header = document.createElement('div');
    header.className = 'pg-debug-dock__header';
    header.innerHTML = `
        <h2 class="pg-debug-dock__title">Debug</h2>
        <p class="pg-debug-dock__lead">Lit monitor, errors, freeze doctor (Ctrl/Cmd+Shift+U)</p>
    `;

    const monitorSection = document.createElement('section');
    monitorSection.className = 'pg-debug-dock__section';
    monitorSection.innerHTML = `
        <div class="pg-debug-dock__section-head">
            <h3>Lit updates</h3>
            <button type="button" class="pg-debug-dock__btn" data-action="reset-mon">Reset</button>
        </div>
        <div class="pg-debug-dock__table" data-lit-table>Starting monitor…</div>
    `;

    const errorsSection = document.createElement('section');
    errorsSection.className = 'pg-debug-dock__section pg-debug-dock__section--errors';
    errorsSection.innerHTML = `
        <div class="pg-debug-dock__section-head">
            <h3>Errors &amp; warnings</h3>
            <button type="button" class="pg-debug-dock__btn" data-action="copy-errors">Copy</button>
        </div>
        <div class="pg-debug-dock__log" data-error-log></div>
    `;

    container.append(header, monitorSection, errorsSection);

    const litTable = container.querySelector<HTMLElement>('[data-lit-table]')!;
    const errorLog = container.querySelector<HTMLElement>('[data-error-log]')!;
    const errorEntries: string[] = [];

    // Lit prototype patching is deferred until the dock is opened — see shell.ts.
    installDevDiagnostics();

    const renderLitTable = () => {
        const api = (globalThis as { __litMon?: { data: () => LitMonRow[] } }).__litMon;

        if (!api) {
            litTable.textContent = 'Monitor not ready yet…';
            return;
        }

        const rows = api.data();

        if (rows.length === 0) {
            litTable.textContent = 'No Lit updates recorded yet.';
            return;
        }

        litTable.replaceChildren();

        for (const row of rows.slice(0, 12)) {
            const line = document.createElement('div');
            line.className = 'pg-debug-dock__row';
            line.innerHTML = `<code>&lt;${row.tag}&gt;</code><span>${row.updates}</span>`;
            litTable.append(line);
        }
    };

    const litTimer = window.setInterval(renderLitTable, 1000);
    renderLitTable();

    const appendError = (label: string, detail: string) => {
        const text = `${label}\n${detail}`;
        errorEntries.unshift(text);

        if (errorEntries.length > 40) {
            errorEntries.length = 40;
        }

        if (errorRenderTimer !== 0) {
            return;
        }

        errorRenderTimer = window.setTimeout(() => {
            errorRenderTimer = 0;
            errorLog.replaceChildren();

            for (const entry of errorEntries) {
                const item = document.createElement('pre');
                item.className = 'pg-debug-dock__error';
                item.textContent = entry;
                errorLog.append(item);
            }
        }, 100);
    };

    let errorRenderTimer = 0;

    const unsubscribe = subscribeDebugSink(appendError);

    container.querySelector<HTMLButtonElement>('[data-action="reset-mon"]')?.addEventListener('click', () => {
        (globalThis as { __litMon?: { reset: () => void } }).__litMon?.reset();
        renderLitTable();
    });

    container.querySelector<HTMLButtonElement>('[data-action="copy-errors"]')?.addEventListener('click', () => {
        void navigator.clipboard?.writeText(errorEntries.join('\n\n---\n\n'));
    });

    return {
        teardown: () => {
            window.clearInterval(litTimer);
            unsubscribe();
            container.replaceChildren();
        },
    };
}
