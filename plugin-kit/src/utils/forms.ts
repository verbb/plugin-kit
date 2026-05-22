interface ErrorContent {
    heading: string;
    text: string;
    trace: string;
    traceAsString: string;
    traceAsArray: string[];
}

interface ServerError {
    response?: {
        statusText?: string;
        data?: {
            message?: string;
            error?: string;
            file?: string;
            line?: string;
            trace?: Array<{
                file?: string;
                line?: string;
            }>;
        };
    };
    message?: string;
    stack?: string;
}

const nl2br = (str: string): string => {
    return str.replace(/\n/g, '<br>');
};

const getErrorHeading = (error: ServerError): string => {
    // Server error status text (e.g., "Internal Server Error", "Bad Request")
    if (error.response?.statusText) {
        return error.response.statusText;
    }

    // Network errors or other client-side errors
    if (error.message?.includes('Network Error')) {
        return 'Network Error';
    }

    if (error.message?.includes('timeout')) {
        return 'Request Timeout';
    }

    // Default fallback
    return 'An error has occurred';
};

const getErrorText = (error: ServerError): string => {
    // Server-side error messages
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.response?.data?.error) {
        return error.response.data.error;
    }

    // Client-side error messages
    if (error.message) {
        return error.message;
    }

    // Fallback to string representation
    return String(error);
};

const getErrorTrace = (error: ServerError, maxTraceLines: number = 5): { traces: string[], traceAsString: string } => {
    const traces: string[] = [];

    // Server-side file and line information
    const file1 = error.response?.data?.file;
    const line1 = error.response?.data?.line;

    if (file1 && line1) {
        traces.push(`${file1}:${line1}`);
    }

    // Server-side stack trace (up to maxTraceLines)
    const traceArray = error.response?.data?.trace || [];

    for (let i = 0; i < Math.min(maxTraceLines, traceArray.length); i++) {
        const traceItem = traceArray[i];

        if (traceItem?.file && traceItem?.line) {
            traces.push(`${traceItem.file}:${traceItem.line}`);
        }
    }

    // Client-side stack trace - only if there's no server-side trace
    if (error.stack && traces.length === 0) {
        traces.push(error.stack);
    }

    return {
        traces,
        traceAsString: traces.map(nl2br).join('<br>'),
    };
};

export const getErrorMessage = function(error: ServerError, maxTraceLines: number = 5): ErrorContent {
    const { traces, traceAsString } = getErrorTrace(error, maxTraceLines);

    return {
        heading: getErrorHeading(error),
        text: getErrorText(error),
        trace: traceAsString, // Keep for backward compatibility
        traceAsString,
        traceAsArray: traces,
    };
};
