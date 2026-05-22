import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { ScrollArea } from "./ScrollArea.js";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { useVirtualizer } from "@tanstack/react-virtual";
//#region src/components/VirtualizedScrollArea.tsx
function VirtualizedScrollArea({ items, renderItem, overscan = 5, estimateSize, getItemKey, listHeight, enableDynamicHeights = false, nativeScroll = false, initialScroll, className, ...props }) {
	const parentRef = React$1.useRef(null);
	const initialScrollIndex = initialScroll?.index ?? -1;
	const clickAfterInitialScroll = initialScroll?.clickAfterScroll ?? false;
	const rowVirtualizer = useVirtualizer({
		count: items.length,
		getScrollElement: () => {
			return parentRef.current;
		},
		estimateSize,
		overscan,
		getItemKey: getItemKey || ((index) => {
			return index;
		})
	});
	const virtualItems = rowVirtualizer.getVirtualItems();
	React$1.useEffect(() => {
		if (initialScrollIndex < 0) return;
		rowVirtualizer.scrollToIndex(initialScrollIndex, {
			align: "start",
			behavior: "auto"
		});
		if (clickAfterInitialScroll) setTimeout(() => {
			const renderedElement = (parentRef.current?.querySelector(`[data-virtual-index="${initialScrollIndex}"]`))?.children[0];
			if (renderedElement instanceof HTMLElement) renderedElement.click();
		}, 100);
	}, [
		clickAfterInitialScroll,
		initialScrollIndex,
		rowVirtualizer
	]);
	const innerContent = /* @__PURE__ */ jsx("div", {
		style: {
			height: `${rowVirtualizer.getTotalSize()}px`,
			width: "100%",
			position: "relative"
		},
		children: virtualItems.map((virtualItem) => {
			return /* @__PURE__ */ jsx("div", {
				"data-index": virtualItem.index,
				"data-virtual-index": virtualItem.index,
				ref: enableDynamicHeights ? rowVirtualizer.measureElement : void 0,
				style: {
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: enableDynamicHeights ? void 0 : `${virtualItem.size}px`,
					transform: `translateY(${virtualItem.start}px)`
				},
				children: renderItem(items[virtualItem.index], virtualItem.index)
			}, virtualItem.key);
		})
	});
	if (nativeScroll) return /* @__PURE__ */ jsx("div", {
		ref: parentRef,
		className: cn("overflow-y-auto overflow-x-hidden", className),
		style: { height: `${listHeight}px` },
		children: innerContent
	});
	return /* @__PURE__ */ jsx(ScrollArea, {
		size: "default",
		style: { height: `${listHeight}px` },
		viewPortRef: parentRef,
		className,
		...props,
		children: innerContent
	});
}
//#endregion
export { VirtualizedScrollArea };

//# sourceMappingURL=VirtualizedScrollArea.js.map