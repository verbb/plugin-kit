/**
 * Debounced async option fetch with abort + stale-request guards.
 * Used by Combobox and Autocomplete so both share one loading lifecycle.
 */
export type PkAsyncOptionItem = {
    value: string;
    label: string;
};

export type PkAsyncOptionFetchHandler = (
    query: string,
    signal: AbortSignal,
) => Promise<PkAsyncOptionItem[]>;

export type PkAsyncOptionFetchCallbacks = {
    /** Called when a fetch starts (non-empty query). */
    onLoading?: () => void;
    /** Apply results for the latest request (may be empty). */
    onResults: (items: PkAsyncOptionItem[]) => void;
    /** Called when a non-abort failure occurs for the latest request. */
    onError?: (message: string) => void;
    /** Called when loading ends for the latest request (success or error). */
    onSettled?: () => void;
    /** Empty query — typically show selected meta or clear. */
    onEmptyQuery?: () => void;
    /** Log context when a fetch throws (defaults to "options"). */
    errorLabel?: string;
    debounceMs?: number;
};

export class AsyncOptionFetcher {
    private timer: number | null = null;
    private requestId = 0;
    private abortController: AbortController | null = null;
    private readonly debounceMs: number;
    private readonly errorLabel: string;
    private readonly callbacks: PkAsyncOptionFetchCallbacks;

    constructor(
        private readonly getHandler: () => PkAsyncOptionFetchHandler | null,
        callbacks: PkAsyncOptionFetchCallbacks,
    ) {
        this.callbacks = callbacks;
        this.debounceMs = callbacks.debounceMs ?? 200;
        this.errorLabel = callbacks.errorLabel ?? 'options';
    }

    schedule(query: string): void {
        if (this.timer !== null) {
            window.clearTimeout(this.timer);
        }

        this.timer = window.setTimeout(() => {
            this.timer = null;
            void this.run(query);
        }, this.debounceMs);
    }

    cancel(): void {
        if (this.timer !== null) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }

        this.abortController?.abort();
        this.abortController = null;
    }

    private async run(query: string): Promise<void> {
        const handler = this.getHandler();

        if (!handler) {
            return;
        }

        const requestId = ++this.requestId;
        this.abortController?.abort();
        this.abortController = new AbortController();

        if (!query) {
            this.callbacks.onEmptyQuery?.();
            return;
        }

        this.callbacks.onLoading?.();

        try {
            const results = await handler(query, this.abortController.signal);

            if (requestId !== this.requestId) {
                return;
            }

            this.callbacks.onResults(results);
        } catch (error) {
            if (this.abortController?.signal.aborted || requestId !== this.requestId) {
                return;
            }

            if (error instanceof DOMException && error.name === 'AbortError') {
                return;
            }

            console.error(`Failed to load ${this.errorLabel}:`, error);
            this.callbacks.onError?.('Failed to load options. Please try again.');
            this.callbacks.onResults([]);
        } finally {
            if (requestId === this.requestId) {
                this.callbacks.onSettled?.();
            }
        }
    }
}
