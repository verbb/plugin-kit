import { cn } from "../utils/classes.js";
import { getPortalClassName, getPortalContainer } from "../utils/portal.js";
import "../utils/index.js";
import { useTranslation } from "../hooks/useTranslation.js";
import "../hooks/index.js";
import { useCallback, useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { Dialog as Dialog$1 } from "@base-ui/react/dialog";
//#region src/components/Dialog.tsx
function Dialog({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Root, {
		"data-slot": "dialog",
		...props
	});
}
function DialogTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Trigger, {
		"data-slot": "dialog-trigger",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Portal, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogClose({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Close, {
		"data-slot": "dialog-close",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Backdrop, {
		"data-slot": "dialog-overlay",
		forceRender: true,
		className: cn("fixed isolate z-50 inset-0", "bg-gray-900/20", "data-[open]:animate-in data-[closed]:animate-out", "data-[closed]:fade-out-0 data-[open]:fade-in-0", className),
		onPointerDown: (event) => {
			const { target } = event;
			if (target instanceof HTMLElement && target.classList.contains("modal-shade")) {
				event.preventDefault();
				event.stopPropagation();
			}
			if (target instanceof HTMLElement && target.closest(".modal")) {
				event.preventDefault();
				event.stopPropagation();
			}
		},
		...props
	});
}
function DialogContent({ className, children, showCloseButton = false, autoFocusFirstInput = true, portalClassName, portalContainer, ...props }) {
	const resolvedPortalClassName = getPortalClassName(portalClassName);
	const resolvedPortalContainer = getPortalContainer(portalContainer);
	const t = useTranslation();
	const contentRef = useRef(null);
	const findFirstInput = useCallback((root) => {
		const focusSelector = [
			"input:not([type=\"hidden\"]):not([disabled])",
			"textarea:not([disabled])",
			"select:not([disabled])"
		].join(", ");
		return root.querySelector(focusSelector);
	}, []);
	const focusFirstInput = useCallback((root) => {
		const candidate = findFirstInput(root);
		if (!candidate) return false;
		if (candidate instanceof HTMLInputElement || candidate instanceof HTMLTextAreaElement) {
			if (candidate.value.length > 0) return true;
		}
		candidate.focus?.();
		if (candidate instanceof HTMLInputElement || candidate instanceof HTMLTextAreaElement) {
			const cursorPosition = candidate.value.length;
			window.setTimeout(() => {
				candidate.setSelectionRange?.(cursorPosition, cursorPosition);
			}, 0);
		}
		return true;
	}, [findFirstInput]);
	useEffect(() => {
		if (!autoFocusFirstInput) return;
		const root = contentRef.current;
		if (!root) return;
		let attemptCount = 0;
		const maxAttempts = 10;
		const attemptFocus = () => {
			const activeElement = document.activeElement;
			if (activeElement && root.contains(activeElement)) {
				if (activeElement.matches("input, textarea, select")) return;
			}
			if (focusFirstInput(root)) return;
			attemptCount += 1;
			if (attemptCount < maxAttempts) window.setTimeout(attemptFocus, 50);
		};
		const frame = window.requestAnimationFrame(attemptFocus);
		return () => {
			window.cancelAnimationFrame(frame);
		};
	}, [
		autoFocusFirstInput,
		children,
		focusFirstInput
	]);
	return /* @__PURE__ */ jsxs(DialogPortal, {
		"data-slot": "dialog-portal",
		className: resolvedPortalClassName,
		container: resolvedPortalContainer,
		children: [/* @__PURE__ */ jsx(DialogOverlay, { "data-slot": "dialog-overlay" }), /* @__PURE__ */ jsxs(Dialog$1.Popup, {
			"data-slot": "dialog-content",
			ref: contentRef,
			initialFocus: () => {
				if (!autoFocusFirstInput) return false;
				const root = contentRef.current;
				if (!root) return true;
				return !focusFirstInput(root);
			},
			className: cn("fixed z-50 left-[50%] top-[50%] w-full max-w-5xl", "flex flex-col", "bg-white", "rounded-lg", "shadow-modal", "translate-x-[-50%] translate-y-[-50%]", "data-[open]:animate-in data-[closed]:animate-out", "data-[closed]:fade-out-0 data-[open]:fade-in-0", "data-[closed]:zoom-out-95 data-[open]:zoom-in-95", className),
			...props,
			children: [showCloseButton && /* @__PURE__ */ jsxs(Dialog$1.Close, {
				"data-slot": "dialog-close",
				className: cn("absolute right-4 top-4 rounded-sm cursor-pointer", "opacity-70 ring-offset-background transition-opacity", "hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", "data-[open]:bg-blue-500 data-[open]:text-white"),
				children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
					icon: faXmark,
					className: "size-4.5"
				}), /* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: t("Close")
				})]
			}), children]
		})]
	});
}
function DialogHeader({ className, showCloseButton = true, children, ...props }) {
	const t = useTranslation();
	return /* @__PURE__ */ jsxs("div", {
		"data-slot": "dialog-header",
		className: cn("relative flex flex-col space-y-1.5", "text-left", "rounded-t-lg", "gap-1", "bg-[#f3f7fb] py-4 px-4", "border-b border-b-gray-150", className),
		...props,
		children: [showCloseButton && /* @__PURE__ */ jsxs(Dialog$1.Close, {
			"data-slot": "dialog-close",
			className: cn("absolute right-4 top-[50%] translate-y-[-50%] rounded-sm cursor-pointer", "opacity-70 ring-offset-background transition-opacity", "hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", "data-[open]:bg-blue-500 data-[open]:text-white"),
			children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
				icon: faXmark,
				className: "size-4.5"
			}), /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: t("Close")
			})]
		}), children]
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "dialog-footer",
		className: cn("flex flex-row justify-end", "rounded-b-lg", "bg-[#e4edf6] py-[10px] px-4", "border-t border-t-gray-150", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Title, {
		"data-slot": "dialog-title",
		className: cn("text-[15px] font-semibold leading-none m-0", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Description, {
		"data-slot": "dialog-description",
		className: cn("text-xs text-gray-500", className),
		...props
	});
}
//#endregion
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };

//# sourceMappingURL=Dialog.js.map