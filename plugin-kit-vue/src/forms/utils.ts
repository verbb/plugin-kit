/** Normalize schema HTML attrs for Vue render functions. */
export const normalizeAttrs = (attrs: Record<string, unknown> = {}): Record<string, unknown> => {
    return { ...attrs };
};

export const isRecord = (value: unknown): value is Record<string, unknown> => {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

export const readEventValue = (valueOrEvent: unknown): unknown => {
    if (!isRecord(valueOrEvent) || !isRecord(valueOrEvent.target)) {
        return valueOrEvent;
    }

    const { type, checked, value } = valueOrEvent.target as {
        type?: string;
        checked?: boolean;
        value?: unknown;
    };

    return type === 'checkbox' ? checked : value;
};

export const readPkValue = (event: Event): unknown => {
    return (event as CustomEvent<{ value?: unknown }>).detail?.value ?? '';
};
