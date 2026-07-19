/** Normalize HTML attributes for React consumption (e.g. `class` -> `className`). */
export const normalizeAttrs = (attrs: Record<string, unknown> = {}) => {
    const normalized: Record<string, unknown> & { class?: string; className?: string } = { ...attrs };

    if (typeof normalized.class === 'string') {
        normalized.className = normalized.class;
        delete normalized.class;
    }

    return normalized;
};
