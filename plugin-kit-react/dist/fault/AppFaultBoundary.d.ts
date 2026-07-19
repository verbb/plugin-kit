import { Component, ErrorInfo, ReactNode } from 'react';
import { AppFaultRecord } from './types.js';
type Props = {
    children: ReactNode;
    onFault: (fault: Omit<AppFaultRecord, 'timestamp' | 'count'>) => void;
};
type State = {
    hasError: boolean;
};
/** Catches React render/lifecycle errors in the builder subtree. */
export declare class AppFaultBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(): State;
    componentDidCatch(error: Error, info: ErrorInfo): void;
    render(): ReactNode;
}
export {};
//# sourceMappingURL=AppFaultBoundary.d.ts.map