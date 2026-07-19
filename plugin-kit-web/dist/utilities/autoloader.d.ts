export declare function startLoader(): void;
export declare function stopLoader(): void;
export declare function discover(root?: Document | Element): Promise<void>;
/** Prevent FOUCE when navigating with Turbo (Hotwire). */
export declare function preventTurboFouce(timeout?: number): void;
export declare const FOUCE_TIMEOUT_MS = 2000;
export declare const DISCOVERY_COMPLETE_EVENT = "pk-discovery-complete";
//# sourceMappingURL=autoloader.d.ts.map