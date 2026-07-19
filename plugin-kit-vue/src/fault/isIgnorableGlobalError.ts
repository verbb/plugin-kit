/** Errors that should not escalate to the app fault UI. */
export const isIgnorableGlobalError = (message: string, error?: Error): boolean => {
    const text = `${message}\n${error?.message ?? ''}`.toLowerCase();

    if (text.includes('resizeobserver loop')) {
        return true;
    }

    if (text.includes('aborted') && text.includes('fetch')) {
        return true;
    }

    if (text.includes('networkerror') && text.includes('fetch')) {
        return true;
    }

    // Chunk load failures are actionable — do not ignore.
    if (text.includes('loading chunk') && text.includes('failed')) {
        return false;
    }

    return false;
};
