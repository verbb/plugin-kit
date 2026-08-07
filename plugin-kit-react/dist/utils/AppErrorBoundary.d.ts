import { Component, ErrorInfo, ReactNode } from 'react';
export type AppErrorBoundaryProps = {
    children: ReactNode;
    consoleLabel?: string;
    title?: string;
    message?: string;
    detailsLabel?: string;
    reloadLabel?: string;
    containerClassName?: string;
    contentClassName?: string;
};
type State = {
    hasError: boolean;
    error: Error | null;
};
/**
 * Class error boundary for full React CP apps. Renders {@link LargeErrorState}
 * on catch — the shared Formie / Navigation / CP Nav crash pattern.
 */
export declare class AppErrorBoundary extends Component<AppErrorBoundaryProps, State> {
    state: State;
    static getDerivedStateFromError(): Partial<State>;
    componentDidCatch(error: Error, info: ErrorInfo): void;
    render(): ReactNode;
}
export {};
//# sourceMappingURL=AppErrorBoundary.d.ts.map