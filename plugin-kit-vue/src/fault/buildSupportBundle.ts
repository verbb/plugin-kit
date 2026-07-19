import type { AppFaultRecord } from './types.js';

export const buildSupportBundle = (
    faults: AppFaultRecord[],
    meta?: Record<string, unknown>,
): string => {
    const payload = {
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        url: typeof location !== 'undefined' ? location.href : '',
        meta: meta ?? {},
        faults: faults.map((fault) => ({
            kind: fault.kind,
            message: fault.message,
            stack: fault.stack,
            tagName: fault.tagName,
            timestamp: new Date(fault.timestamp).toISOString(),
            count: fault.count,
        })),
    };

    return JSON.stringify(payload, null, 2);
};
