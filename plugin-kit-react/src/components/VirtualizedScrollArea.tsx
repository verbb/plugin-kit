import { useVirtualizer } from '@tanstack/react-virtual';
import * as React from 'react';

import { ScrollArea } from '@verbb/plugin-kit-react/components/ScrollArea';
import { cn } from '@verbb/plugin-kit-react/utils';

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
    scrollToIndex: (
        index: number,
        options?: {
            align?: 'start' | 'center' | 'end';
            behavior?: 'auto' | 'smooth';
        },
    ) => void;
}

function VirtualizedScrollArea<T>({
    items,
    renderItem,
    overscan = 5,
    estimateSize,
    getItemKey,
    listHeight,
    enableDynamicHeights = false,
    nativeScroll = false,
    initialScroll,
    className,
    ...props
}: VirtualizedScrollAreaProps<T>) {
    const parentRef = React.useRef<HTMLDivElement>(null);
    const initialScrollIndex = initialScroll?.index ?? -1;
    const clickAfterInitialScroll = initialScroll?.clickAfterScroll ?? false;

    const rowVirtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => { return parentRef.current; },
        estimateSize,
        overscan,
        getItemKey: getItemKey || ((index) => { return index; }),
    });

    const virtualItems = rowVirtualizer.getVirtualItems();
    React.useEffect(() => {
        if (initialScrollIndex < 0) {
            return;
        }
        rowVirtualizer.scrollToIndex(initialScrollIndex, {
            align: 'start',
            behavior: 'auto',
        });

        if (clickAfterInitialScroll) {
            // need to wait for the scroll to be completed
            setTimeout(() => {
                const targetElement = parentRef.current?.querySelector(
                    `[data-virtual-index="${initialScrollIndex}"]`,
                );
                const renderedElement = targetElement?.children[0];
                if (renderedElement instanceof HTMLElement) {
                    renderedElement.click();
                }
            }, 100);
        }
    }, [clickAfterInitialScroll, initialScrollIndex, rowVirtualizer]);

    const innerContent = (
        <div
            style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
            }}
        >
            {virtualItems.map((virtualItem) => {
                return (
                    <div
                        key={virtualItem.key}
                        data-index={virtualItem.index}
                        data-virtual-index={virtualItem.index}
                        ref={enableDynamicHeights ? rowVirtualizer.measureElement : undefined}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: enableDynamicHeights ? undefined : `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                        }}
                    >
                        {renderItem(items[virtualItem.index], virtualItem.index)}
                    </div>
                );
            })}
        </div>
    );

    if (nativeScroll) {
        return (
            <div
                ref={parentRef}
                className={cn('overflow-y-auto overflow-x-hidden', className)}
                style={{ height: `${listHeight}px` }}
            >
                {innerContent}
            </div>
        );
    }

    return (
        <ScrollArea
            size="default"
            style={{ height: `${listHeight}px` }}
            viewPortRef={parentRef as React.RefObject<HTMLDivElement>}
            className={className}
            {...props}
        >
            {innerContent}
        </ScrollArea>
    );
};

export { VirtualizedScrollArea };
