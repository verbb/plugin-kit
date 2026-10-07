import { PkStatePanelSize } from '@verbb/plugin-kit-web/components/state-panel/pk-state-panel.js';
import { Component, ErrorInfo, ReactNode } from 'react';
export type AppErrorBoundaryProps = {
    children: ReactNode;
    consoleLabel?: string;
    heading?: string;
    message?: string;
    detailsLabel?: string;
    copyLabel?: string;
    copiedLabel?: string;
    copyErrorLabel?: string;
    reloadLabel?: string;
    size?: PkStatePanelSize;
    className?: string;
};
type State = {
    hasError: boolean;
    error: Error | null;
};
/**
 * Class error boundary for full React CP apps. Renders {@link ErrorState} on catch.
 */
export declare class AppErrorBoundary extends Component<AppErrorBoundaryProps, State> {
    state: State;
    static getDerivedStateFromError(error: Error): State;
    componentDidCatch(error: Error, info: ErrorInfo): void;
    render(): ReactNode;
}
export {};
//# sourceMappingURL=AppErrorBoundary.d.ts.map