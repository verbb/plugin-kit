import { Component, type ErrorInfo, type ReactNode } from 'react';

import type { AppFaultRecord } from './types.js';

type Props = {
    children: ReactNode;
    onFault: (fault: Omit<AppFaultRecord, 'timestamp' | 'count'>) => void;
};

type State = {
    hasError: boolean;
};

/** Catches React render/lifecycle errors in the builder subtree. */
export class AppFaultBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        this.props.onFault({
            kind: 'react',
            message: error.message,
            stack: info.componentStack ? `${error.stack ?? ''}\n\n${info.componentStack}` : error.stack,
        });
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}
