/**
 * Plugin Kit nested overlay repros — menu → dialog and select → dialog (safe paths).
 *
 * Reads trace from sessionStorage (written synchronously on each log line) so a
 * main-thread hang after the last milestone still leaves evidence.
 *
 * Usage:
 *   npm run test:nested-overlays              # headless Chromium, both chains
 *   npm run test:nested-overlays:headed       # visible browser window
 *   npm run test:nested-overlays:chrome       # installed Google Chrome
 *
 * Env:
 *   PLAYGROUND_URL  default http://localhost:5175/tools/nested-overlays
 *   SCENARIO        comma-separated: menu-dialog, select-dialog (default both)
 *   ITERATIONS      default 1 per scenario
 *   POST_CLICK_MS   default 3000 — Node-side wait after trigger (not in-page)
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTIFACT_DIR = path.join(__dirname, '../test-results/nested-overlays');

const LAB_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:5175/tools/nested-overlays';
const ITERATIONS = Number(process.env.ITERATIONS ?? 1);
const POST_CLICK_MS = Number(process.env.POST_CLICK_MS ?? 3000);
const EVAL_TIMEOUT = Number(process.env.EVAL_TIMEOUT ?? 4000);

/** Ordered milestones — last match in trace = stall point. */
const MILESTONES = [
    'trace attached',
    'event pk-hide',
    'handler: pk-select (copy pending)',
    'handler: pk-after-hide',
    'handler: change (dialog pending)',
    'handler: select pk-after-hide',
    'handoff snapshot (sync)',
    'defer: setTimeout(0) scheduled',
    'defer: fired',
    'dialog.show() start',
    'dialog.show() resolved',
];

/** @type {Array<{ id: string; labId: string; prepare: (page: import('playwright').Page) => Promise<void>; trigger: (page: import('playwright').Page) => Promise<{ ok: boolean; reason?: string }> }>} */
const SCENARIOS = [
    {
        id: 'menu-dialog',
        labId: 'lit-menu-dialog',
        async prepare(page) {
            await page.goto(LAB_URL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
            await page.locator('[data-scenario-id="lit-menu-dialog"] [data-run-scenario]').click({ timeout: 10_000 });
            await page.waitForSelector('pk-dropdown-menu#lab-lit-menu-dialog', { timeout: 15_000 });
            await page.locator('#lab-lit-menu-dialog').getByRole('button', { name: 'Actions' }).click({ timeout: 10_000 });
            await page.waitForFunction(() => {
                const menu = document.querySelector('pk-dropdown-menu#lab-lit-menu-dialog');

                return menu?.open === true;
            }, { timeout: 15_000 });
            // Wait for showMenu lifecycle to finish — copy during showMenu was freezing headless Chromium.
            await page.waitForFunction(() => {
                const entries = JSON.parse(sessionStorage.getItem('overlay-lab-trace-entries') ?? '[]');

                return entries.some((entry) => entry.label?.includes('pk-after-show'));
            }, { timeout: 15_000 });
            await sleep(200);
        },
        async trigger(page) {
            const item = page.locator('pk-dropdown-menu#lab-lit-menu-dialog pk-dropdown-item[value="copy"]');

            try {
                await item.evaluate((el) => {
                    el.shadowRoot?.querySelector('button')?.click();
                });
                return { ok: true };
            } catch (error) {
                return {
                    ok: false,
                    reason: error instanceof Error ? error.message.slice(0, 120) : String(error),
                };
            }
        },
    },
    {
        id: 'select-dialog',
        labId: 'lit-select-dialog',
        async prepare(page) {
            await page.goto(LAB_URL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
            await page.locator('[data-scenario-id="lit-select-dialog"] [data-run-scenario]').click({ timeout: 10_000 });
            await page.waitForSelector('pk-select#lab-lit-select-dialog-select', { timeout: 15_000 });
            await page.locator('#lab-lit-select-dialog-select').click({ timeout: 10_000 });
            await page.waitForFunction(() => {
                const select = document.querySelector('pk-select#lab-lit-select-dialog-select');

                return select?.open === true;
            }, { timeout: 15_000 });
            await sleep(200);
        },
        async trigger(page) {
            const option = page.locator('#lab-lit-select-dialog-select pk-option[value="dialog"]');

            try {
                await option.evaluate((el) => {
                    el.shadowRoot?.querySelector('button')?.click();
                });
                return { ok: true };
            } catch (error) {
                return {
                    ok: false,
                    reason: error instanceof Error ? error.message.slice(0, 120) : String(error),
                };
            }
        },
    },
];

const SCENARIO_FILTER = (process.env.SCENARIO ?? 'menu-dialog,select-dialog')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function analyzeTraceText(traceText, entries = []) {
    const phaseText = entries
        .filter((e) => e.label?.includes('pk-close-phase') || e.detail?.includes('phase'))
        .map((e) => e.detail ?? '')
        .join('\n');
    const haystack = `${traceText}\n${phaseText}`;
    const reached = MILESTONES.filter((m) => haystack.includes(m));

    return {
        lastMilestone: reached.at(-1) ?? '(none)',
        reachedCount: reached.length,
        reached,
    };
}

async function safeEvaluate(page, fn, label) {
    try {
        return await Promise.race([
            page.evaluate(fn),
            sleep(EVAL_TIMEOUT).then(() => {
                throw new Error('timeout');
            }),
        ]);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        return { __evalError: `${label}: ${message.slice(0, 200)}` };
    }
}

async function readStorageViaCdp(page, origin, timeoutMs = 3000) {
    return Promise.race([
        (async () => {
            try {
                const client = await page.context().newCDPSession(page);
                await client.send('DOMStorage.enable');
                const { entries } = await client.send('DOMStorage.getDOMStorageItems', {
                    storageId: {
                        securityOrigin: origin,
                        isLocalStorage: false,
                    },
                });

                const map = Object.fromEntries(entries);

                return {
                    automation: map['overlay-lab-automation-snapshot']
                        ? JSON.parse(map['overlay-lab-automation-snapshot'])
                        : null,
                    traceEntries: map['overlay-lab-trace-entries']
                        ? JSON.parse(map['overlay-lab-trace-entries'])
                        : null,
                    handoff: map['overlay-lab-last-handoff'] ?? null,
                };
            } catch (error) {
                return {
                    cdpError: error instanceof Error ? error.message.slice(0, 200) : String(error),
                };
            }
        })(),
        sleep(timeoutMs).then(() => ({ cdpError: 'cdp timeout' })),
    ]);
}

async function readAutomationSnapshot(page, origin) {
    const raw = await safeEvaluate(page, () => {
        const readJson = (key) => {
            try {
                const raw = sessionStorage.getItem(key);

                return raw ? JSON.parse(raw) : null;
            } catch {
                return null;
            }
        };

        const fromApi = globalThis.__overlayLabSnapshot?.();
        const fromStorage = readJson('overlay-lab-automation-snapshot');
        const entries = readJson('overlay-lab-trace-entries');

        return {
            fromApi: fromApi ?? null,
            fromStorage: fromStorage ?? null,
            entryCount: Array.isArray(entries) ? entries.length : 0,
            domTraceTail: document.querySelector('.lab-trace__log')?.textContent?.slice(-2500) ?? null,
            dialogNativeOpen: Boolean(fromApi?.dialogNativeOpen ?? fromStorage?.dialogNativeOpen),
            pageCrashed: false,
        };
    }, 'readAutomationSnapshot');

    if (!raw?.__evalError) {
        return raw;
    }

    console.warn('evaluate snapshot failed, trying CDP sessionStorage…', raw.__evalError);

    const cdp = await readStorageViaCdp(page, origin);
    const snap = cdp.automation ?? {};

    if (cdp.traceEntries && !snap.traceText) {
        snap.traceText = cdp.traceEntries
            .map((entry) => {
                const line = `[${Math.round(entry.ms)}ms] ${entry.label}`;

                return entry.detail ? `${line} | ${entry.detail}` : line;
            })
            .join('\n');
        snap.entries = cdp.traceEntries;
        snap.lastLabel = cdp.traceEntries.at(-1)?.label ?? null;
    }

    if (cdp.handoff) {
        snap.handoff = cdp.handoff;
    }

    return {
        fromStorage: snap,
        fromApi: null,
        entryCount: snap.entries?.length ?? 0,
        domTraceTail: snap.traceText ?? null,
        dialogNativeOpen: snap.dialogNativeOpen ?? false,
        cdpFallback: true,
        cdpError: cdp.cdpError,
    };
}

function mergeSnapshot(raw) {
    if (raw?.__evalError) {
        return { evalError: raw.__evalError };
    }

    const snap = raw?.fromApi ?? raw?.fromStorage ?? {};
    const traceText = snap.traceText ?? raw?.domTraceTail ?? '';

    return {
        ...snap,
        traceText,
        dialogNativeOpen: snap.dialogNativeOpen ?? raw?.dialogNativeOpen ?? false,
        analysis: analyzeTraceText(traceText, snap.entries ?? raw?.fromStorage?.entries ?? []),
        entryCount: raw?.entryCount ?? snap.entries?.length ?? 0,
        cdpFallback: raw?.cdpFallback ?? false,
        cdpError: raw?.cdpError,
    };
}

async function runIteration(page, scenario, index, artifactDir) {
    console.log(`\n--- ${scenario.id} iteration ${index + 1}/${ITERATIONS} ---`);

    let crashed = false;

    page.once('crash', () => {
        crashed = true;
        console.error('⚠ renderer process crashed');
    });

    const t0 = Date.now();

    try {
        await scenario.prepare(page);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('setup failed:', message.slice(0, 160));

        return { scenario: scenario.id, index, ok: false, stage: 'setup', error: message };
    }

    const trigger = await scenario.trigger(page);
    console.log('trigger:', trigger);

    // Wait on Node side — does not require a responsive main thread.
    await sleep(POST_CLICK_MS);

    const origin = new URL(LAB_URL).origin;
    const rawSnap = await readAutomationSnapshot(page, origin);
    const snap = mergeSnapshot(rawSnap);
    const elapsed = Date.now() - t0;

    const ok = Boolean(snap.dialogNativeOpen) && !snap.evalError && !crashed && trigger.ok;

    console.log('elapsed ms:', elapsed);
    console.log('dialog native open:', snap.dialogNativeOpen);
    console.log('last milestone:', snap.analysis?.lastMilestone ?? '(unknown)');
    console.log('last trace label:', snap.lastLabel ?? '(n/a)');

    if (snap.cdpFallback) {
        console.log('snapshot via CDP fallback', snap.cdpError ? `(warn: ${snap.cdpError})` : '(ok)');
    }

    if (snap.evalError) {
        console.warn('snapshot eval:', snap.evalError);
    }

    if (!ok) {
        const screenshotPath = path.join(artifactDir, `${scenario.id}-iteration-${index + 1}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true, timeout: 10_000 }).catch(() => {});
        console.log('screenshot:', screenshotPath);

        const tracePath = path.join(artifactDir, `${scenario.id}-iteration-${index + 1}-trace.txt`);
        fs.writeFileSync(tracePath, snap.traceText || '(no trace captured)', 'utf8');
        console.log('trace file:', tracePath);

        if (snap.traceText) {
            console.log('\ntrace tail:\n', snap.traceText.slice(-1800));
        }
    }

    return {
        scenario: scenario.id,
        index,
        ok,
        crashed,
        elapsed,
        dialogNativeOpen: snap.dialogNativeOpen,
        lastMilestone: snap.analysis?.lastMilestone,
        lastLabel: snap.lastLabel,
        evalError: snap.evalError,
    };
}

async function main() {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

    const headless = process.env.HEADLESS !== '0';
    const channel = process.env.CHROME_CHANNEL || undefined;
    const selected = SCENARIOS.filter((scenario) => SCENARIO_FILTER.includes(scenario.id));

    if (selected.length === 0) {
        console.error(`No scenarios matched SCENARIO=${SCENARIO_FILTER.join(',')}`);
        console.error('Available:', SCENARIOS.map((scenario) => scenario.id).join(', '));
        process.exit(1);
    }

    console.log('Nested overlays automation');
    console.log('  url:', LAB_URL);
    console.log('  scenarios:', selected.map((scenario) => scenario.id).join(', '));
    console.log('  headless:', headless);
    console.log('  channel:', channel ?? 'bundled chromium');
    console.log('  post-click wait:', POST_CLICK_MS, 'ms');
    console.log('  artifacts:', ARTIFACT_DIR);

    const browser = await chromium.launch({
        headless,
        channel,
        args: headless ? [] : ['--disable-backgrounding-occluded-windows'],
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();
    let activePage = page;

    activePage.on('pageerror', (err) => {
        console.error('[pageerror]', err.message.slice(0, 200));
    });

    const results = [];

    for (const scenario of selected) {
        for (let i = 0; i < ITERATIONS; i++) {
            results.push(await runIteration(activePage, scenario, i, ARTIFACT_DIR));

            if (results.at(-1)?.crashed) {
                console.log('recovering: new page after crash');
                await activePage.close().catch(() => {});
                activePage = await context.newPage();
                activePage.on('pageerror', (err) => {
                    console.error('[pageerror]', err.message.slice(0, 200));
                });
            } else {
                await activePage.keyboard.press('Escape').catch(() => {});
                await sleep(300);
            }
        }
    }

    await browser.close();

    console.log('\n=== SUMMARY ===');
    console.table(results.map((r) => ({
        scenario: r.scenario,
        i: r.index + 1,
        ok: r.ok,
        dialog: r.dialogNativeOpen,
        lastMilestone: r.lastMilestone,
        ms: r.elapsed,
        crashed: r.crashed ?? false,
    })));

    const failed = results.filter((r) => !r.ok);

    if (failed.length > 0) {
        console.error(`\nFAILED ${failed.length}/${results.length}`);
        console.error('Stall point (most common last milestone):',
            failed.map((r) => r.lastMilestone).join(', '));
        process.exit(1);
    }

    console.log(`\nAll ${results.length} iteration(s) passed — dialog opened.`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
