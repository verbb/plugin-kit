/**
 * Debounced async option fetch with abort + stale-request guards.
 * Used by Combobox and Autocomplete so both share one loading lifecycle.
 */
export type PkAsyncOptionItem = {
    value: string;
    label: string;
};
export type PkAsyncOptionFetchHandler = (query: string, signal: AbortSignal) => Promise<PkAsyncOptionItem[]>;
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
export declare class AsyncOptionFetcher {
    private readonly getHandler;
    private timer;
    private requestId;
    private abortController;
    private readonly debounceMs;
    private readonly errorLabel;
    private readonly callbacks;
    constructor(getHandler: () => PkAsyncOptionFetchHandler | null, callbacks: PkAsyncOptionFetchCallbacks);
    schedule(query: string): void;
    cancel(): void;
    private run;
}
//# sourceMappingURL=async-option-fetch.d.ts.map