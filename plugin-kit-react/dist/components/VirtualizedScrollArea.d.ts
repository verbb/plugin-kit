import * as React from 'react';
interface VirtualizedScrollAreaProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    overscan?: number;
    estimateSize: (index: number) => number;
    getItemKey?: (index: number) => string | number;
    listHeight: number;
    enableDynamicHeights?: boolean;
    nativeScroll?: boolean;
    className?: string;
    initialScroll?: {
        index: number;
        clickAfterScroll: boolean;
    };
}
export interface VirtualizedScrollAreaRef {
    scrollToIndex: (index: number, options?: {
        align?: 'start' | 'center' | 'end';
        behavior?: 'auto' | 'smooth';
    }) => void;
}
declare function VirtualizedScrollArea<T>({ items, renderItem, overscan, estimateSize, getItemKey, listHeight, enableDynamicHeights, nativeScroll, initialScroll, className, ...props }: VirtualizedScrollAreaProps<T>): import("react/jsx-runtime").JSX.Element;
export { VirtualizedScrollArea };
//# sourceMappingURL=VirtualizedScrollArea.d.ts.map