export type AppFaultKind = 'react' | 'global' | 'rejection' | 'pk-error' | 'watchdog' | 'overlay';

export type AppFaultRecord = {
    kind: AppFaultKind;
    message: string;
    stack?: string;
    tagName?: string;
    timestamp: number;
    count: number;
};

export type AppFaultContext = {
    /** App-specific metadata included in support bundles (menu id, site id, etc.). */
    meta?: Record<string, unknown>;
    /** Called after overlay recovery — reset dialog/menu React state. */
    onResetUi?: () => void;
    /** Soft reload — remount builder without full page navigation when provided. */
    onReload?: () => void;
};
