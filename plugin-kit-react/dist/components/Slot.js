import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { cloneElement, forwardRef, isValidElement } from "react";
//#region src/components/Slot.tsx
var mergeEventHandlers = (parentHandler, childHandler) => {
	if (!parentHandler) return childHandler;
	if (!childHandler) return parentHandler;
	return ((...args) => {
		childHandler(...args);
		parentHandler(...args);
	});
};
var mergeRefs = (...refs) => {
	return (node) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") {
				ref(node);
				return;
			}
			if (typeof ref === "object" && "current" in ref) ref.current = node;
		});
	};
};
var mergeProps = (slotProps, childProps) => {
	const mergedProps = {
		...slotProps,
		...childProps
	};
	mergedProps.className = cn(slotProps.className, childProps.className);
	mergedProps.style = {
		...slotProps.style,
		...childProps.style
	};
	Object.keys(childProps).forEach((propName) => {
		if (propName.startsWith("on") && typeof childProps[propName] === "function") mergedProps[propName] = mergeEventHandlers(slotProps[propName], childProps[propName]);
	});
	if (slotProps.ref || childProps.ref) mergedProps.ref = mergeRefs(slotProps.ref, childProps.ref);
	return mergedProps;
};
var Slot = forwardRef(({ children, ...props }, ref) => {
	if (!isValidElement(children)) return null;
	return cloneElement(children, mergeProps({
		...props,
		ref
	}, children.props));
});
Slot.displayName = "Slot";
//#endregion
export { Slot };

//# sourceMappingURL=Slot.js.map