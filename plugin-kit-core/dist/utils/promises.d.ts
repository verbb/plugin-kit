/**
 * Creates a function that ensures a promise takes at least a minimum amount of time to resolve
 *
 * @param ms - The minimum time in milliseconds that the promise should take
 * @returns A function that wraps a promise or promise-returning function
 * @example
 * ```ts
 * const slowFetch = takeAtLeast(1000)(fetch('https://api.example.com'));
 * // Will take at least 1 second even if the fetch is faster
 * ```
 */
export declare const takeAtLeast: (ms: number) => <T>(promiseOrFn: Promise<T> | (() => Promise<T>)) => Promise<T>;
//# sourceMappingURL=promises.d.ts.map