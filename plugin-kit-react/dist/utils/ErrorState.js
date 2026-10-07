import { StatePanel } from "../components/StatePanel.js";
import { Button } from "../components/Button.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { getErrorMessage } from "@verbb/plugin-kit-core";
//#region src/utils/ErrorState.tsx
/**
* React error adapter over the shared StatePanel component, with optional stack details.
* Pass translated `heading` / `message` / labels from the host plugin.
*/
function ErrorState({ error = null, heading = null, message = null, detailsLabel = null, copyLabel = null, copiedLabel = null, copyErrorLabel = null, actionLabel = null, onAction = null, showDetails = true, size = "default", className, children = null }) {
	const resolvedError = error ? getErrorMessage(error) : null;
	const resolvedHeading = heading || resolvedError?.heading || "Something went wrong";
	const resolvedMessage = message || resolvedError?.text || "An error has occurred.";
	const resolvedDetailsLabel = detailsLabel || "Show error details";
	const resolvedCopyLabel = copyLabel || "Copy error details";
	const resolvedCopiedLabel = copiedLabel || "Error details copied.";
	const resolvedCopyErrorLabel = copyErrorLabel || "Copy failed. Select the details and copy them manually.";
	const errorDetails = [resolvedError ? [resolvedError.heading, resolvedError.text].filter(Boolean).join(": ") : "", ...resolvedError?.traceAsArray || []].filter(Boolean).join("\n\n");
	return /* @__PURE__ */ jsxs(StatePanel, {
		variant: "error",
		size,
		heading: resolvedHeading,
		detailsLabel: resolvedDetailsLabel,
		copyLabel: resolvedCopyLabel,
		copiedLabel: resolvedCopiedLabel,
		copyErrorLabel: resolvedCopyErrorLabel,
		copyable: showDetails && Boolean(errorDetails),
		className,
		children: [
			/* @__PURE__ */ jsx("span", { children: resolvedMessage }),
			children,
			showDetails && errorDetails ? /* @__PURE__ */ jsx("pre", {
				slot: "details",
				children: errorDetails
			}) : null,
			actionLabel && onAction ? /* @__PURE__ */ jsx(Button, {
				slot: "actions",
				type: "button",
				variant: "primary",
				onClick: onAction,
				children: actionLabel
			}) : null
		]
	});
}
//#endregion
export { ErrorState };

//# sourceMappingURL=ErrorState.js.map