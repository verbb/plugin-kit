import type { PkStatePanelSize } from '@verbb/plugin-kit-web/components/state-panel/pk-state-panel.js';
import { Component, type ErrorInfo, type ReactNode } from 'react';

import { ErrorState } from './ErrorState.js';

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
export class AppErrorBoundary extends Component<AppErrorBoundaryProps, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error(this.props.consoleLabel || 'React app crashed:', error, info);
    }

    render(): ReactNode {
        if (!this.state.hasError) {
            return this.props.children;
        }

        const {
            heading,
            message,
            detailsLabel,
            copyLabel,
            copiedLabel,
            copyErrorLabel,
            reloadLabel,
            size,
            className,
        } = this.props;

        return (
            <ErrorState
                error={this.state.error}
                heading={heading}
                message={message}
                detailsLabel={detailsLabel}
                copyLabel={copyLabel}
                copiedLabel={copiedLabel}
                copyErrorLabel={copyErrorLabel}
                actionLabel={reloadLabel}
                size={size}
                onAction={() => {
                    window.location.reload();
                }}
                className={className}
            />
        );
    }
}
