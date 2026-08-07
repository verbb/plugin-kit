import { StatePanel } from "./StatePanel.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { getErrorMessage } from "@verbb/plugin-kit-core";
//#region src/utils/LargeErrorState.tsx
/**
* StatePanel error variant + optional stack details (Formie LargeErrorState).
* Pass translated `title` / `message` / labels from the host plugin.
*/
function LargeErrorState({ error = null, title = null, message = null, detailsLabel = null, actionLabel = null, onAction = null, showDetails = true, containerClassName = "flex flex-1 items-center justify-center py-12", contentClassName = "flex w-[90%] max-w-[560px] flex-col items-center text-center" }) {
	const resolvedError = error ? getErrorMessage(error) : null;
	const resolvedTitle = title || resolvedError?.heading || "Something went wrong";
	const resolvedMessage = resolvedError?.text || message || "An error has occurred.";
	const resolvedDetailsLabel = detailsLabel || "Show error details";
	const traceAsString = resolvedError?.traceAsString || "";
	return /* @__PURE__ */ jsx(StatePanel, {
		variant: "error",
		title: resolvedTitle,
		message: resolvedMessage,
		containerClassName,
		contentClassName,
		primaryAction: actionLabel && onAction ? {
			label: actionLabel,
			onClick: onAction,
			variant: "primary"
		} : null,
		children: showDetails && traceAsString ? /* @__PURE__ */ jsxs("details", {
			className: "mb-4 w-full text-center text-xs text-rose-600",
			children: [/* @__PURE__ */ jsx("summary", {
				className: "cursor-pointer",
				children: resolvedDetailsLabel
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-2 whitespace-pre-wrap text-left",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "mb-2",
					children: [
						resolvedError?.heading,
						": ",
						resolvedError?.text
					]
				}), /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: traceAsString } })]
			})]
		}) : null
	});
}
//#endregion
export { LargeErrorState };

//# sourceMappingURL=LargeErrorState.js.map