type ZustandLikeStore<TState> = {
    setState: (state: TState) => void;
    subscribe: (listener: (state: TState) => void) => void;
};

type ImportMetaHotModule<TState> = {
    data: Record<string, TState | undefined>;
    accept: (callback: (newModule: unknown) => void) => void;
};

export const zustandHmrFix = <TState>(name: string, useStore: ZustandLikeStore<TState>) => {
    if (import.meta.hot) {
        const hot = import.meta.hot as ImportMetaHotModule<TState>;
        const state = hot.data[name];

        if (state) {
            useStore.setState(state);
        }

        useStore.subscribe((nextState) => {
            if (hot.data) {
                hot.data[name] = nextState;
            }
        });

        hot.accept((newModule) => {
            if (newModule && hot.data) {
                const nextState = hot.data[name];
                if (nextState) {
                    useStore.setState(nextState);
                }
            }
        });
    }
};
