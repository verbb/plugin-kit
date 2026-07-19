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
export declare const getErrorMessage: (error: ServerError, maxTraceLines?: number) => ErrorContent;
export {};
//# sourceMappingURL=forms.d.ts.map