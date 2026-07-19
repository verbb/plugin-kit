import { buildSupportBundle } from "./buildSupportBundle.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/fault/FaultFallback.tsx
var btnClass = "inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50";
var btnPrimaryClass = "inline-flex items-center justify-center rounded-md border border-transparent bg-[#0d78f2] px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-[#0b6ad9] disabled:opacity-50";
function FaultFallback({ title = "Something went wrong", message = "The builder hit an unexpected error. You can try resetting the UI or reloading the builder.", faults, meta, onReload, onResetUi, onDismiss, compact = false, children }) {
	const copyDetails = async () => {
		const text = buildSupportBundle(faults, meta);
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			console.warn("[plugin-kit] support bundle:\n", text);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: compact ? "rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950" : "rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-900",
		role: "alert",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "font-semibold",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-[13px] leading-relaxed opacity-90",
				children: message
			}),
			children,
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					onResetUi ? /* @__PURE__ */ jsx("button", {
						type: "button",
						className: btnClass,
						onClick: onResetUi,
						children: "Reset UI"
					}) : null,
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: btnPrimaryClass,
						onClick: onReload,
						children: "Reload builder"
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: btnClass,
						onClick: () => void copyDetails(),
						children: "Copy details for support"
					}),
					onDismiss ? /* @__PURE__ */ jsx("button", {
						type: "button",
						className: btnClass,
						onClick: onDismiss,
						children: "Dismiss"
					}) : null
				]
			}),
			!compact && faults[0]?.message ? /* @__PURE__ */ jsx("pre", {
				className: "mt-4 max-h-40 overflow-auto rounded border border-red-200/60 bg-white/70 p-3 text-xs text-red-800",
				children: faults[0].message
			}) : null
		]
	});
}
//#endregion
export { FaultFallback };

//# sourceMappingURL=FaultFallback.js.map