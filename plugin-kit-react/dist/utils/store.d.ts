type ZustandLikeStore<TState> = {
    setState: (state: TState) => void;
    subscribe: (listener: (state: TState) => void) => void;
};
export declare const zustandHmrFix: <TState>(name: string, useStore: ZustandLikeStore<TState>) => void;
export {};
//# sourceMappingURL=store.d.ts.map