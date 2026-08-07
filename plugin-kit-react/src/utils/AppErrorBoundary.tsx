import { Component, type ErrorInfo, type ReactNode } from 'react';

import { LargeErrorState } from './LargeErrorState.js';

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
export class AppErrorBoundary extends Component<AppErrorBoundaryProps, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(): Partial<State> {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        this.setState({ error });
        console.error(this.props.consoleLabel || 'React app crashed:', error, info);
    }

    render(): ReactNode {
        if (!this.state.hasError) {
            return this.props.children;
        }

        const {
            title,
            message,
            detailsLabel,
            reloadLabel,
            containerClassName = 'flex flex-1 items-center justify-center py-12',
            contentClassName = 'flex flex-col items-center justify-center text-center',
        } = this.props;

        return (
            <LargeErrorState
                error={this.state.error}
                title={title}
                message={message}
                detailsLabel={detailsLabel}
                actionLabel={reloadLabel}
                onAction={() => {
                    window.location.reload();
                }}
                containerClassName={containerClassName}
                contentClassName={contentClassName}
            />
        );
    }
}
