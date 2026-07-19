import { AppFaultBoundary } from "./AppFaultBoundary.js";
import { FaultFallback } from "./FaultFallback.js";
import { isIgnorableGlobalError } from "./isIgnorableGlobalError.js";
import { useUiWatchdog } from "./useUiWatchdog.js";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { recoverOverlays } from "@verbb/plugin-kit-web/plugin-kit";
//#region src/fault/AppFaultProvider.tsx
var AppFaultReactContext = createContext(null);
var faultKey = (input) => `${input.kind}:${input.tagName ?? ""}:${input.message.split("\n")[0]}`;
function AppFaultProvider({ children, meta, onResetUi, onReload, enableWatchdog = true, labels }) {
	const [faults, setFaults] = useState([]);
	const [hasFatalFault, setHasFatalFault] = useState(false);
	const [isStuck, setIsStuck] = useState(false);
	const seenRef = useRef(/* @__PURE__ */ new Map());
	const recordFault = useCallback((input) => {
		const key = faultKey(input);
		const count = (seenRef.current.get(key) ?? 0) + 1;
		seenRef.current.set(key, count);
		const record = {
			kind: input.kind,
			message: input.message,
			stack: input.stack,
			tagName: input.tagName,
			timestamp: Date.now(),
			count
		};
		setFaults((prev) => {
			return [record, ...prev.filter((item) => faultKey(item) !== key)].slice(0, 8);
		});
		if (input.fatal !== false && (input.kind === "react" || input.kind === "global")) setHasFatalFault(true);
	}, []);
	const resetUi = useCallback(() => {
		const { actions, diagnostic } = recoverOverlays();
		console.info("[plugin-kit] overlay recovery:", actions.join(", "), diagnostic.report);
		onResetUi?.();
		setIsStuck(false);
		setHasFatalFault(false);
		setFaults([]);
		seenRef.current.clear();
	}, [onResetUi]);
	const reload = useCallback(() => {
		if (onReload) {
			onReload();
			return;
		}
		window.location.reload();
	}, [onReload]);
	const clearFaults = useCallback(() => {
		setHasFatalFault(false);
		setFaults([]);
		seenRef.current.clear();
	}, []);
	const dismissStuck = useCallback(() => {
		setIsStuck(false);
	}, []);
	useEffect(() => {
		const onResetShortcut = (event) => {
			if (!((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === "U" || event.key === "u"))) return;
			event.preventDefault();
			resetUi();
		};
		window.addEventListener("keydown", onResetShortcut, true);
		return () => {
			window.removeEventListener("keydown", onResetShortcut, true);
		};
	}, [resetUi]);
	useEffect(() => {
		const onError = (event) => {
			if (isIgnorableGlobalError(event.message, event.error)) return;
			recordFault({
				kind: "global",
				message: event.message || event.error?.message || "Unknown error",
				stack: event.error?.stack,
				fatal: true
			});
		};
		const onRejection = (event) => {
			const reason = event.reason;
			const message = reason?.message ?? String(event.reason);
			if (isIgnorableGlobalError(message, reason)) return;
			recordFault({
				kind: "rejection",
				message,
				stack: reason?.stack,
				fatal: false
			});
		};
		const onPkError = (event) => {
			const detail = event.detail;
			recordFault({
				kind: "pk-error",
				tagName: detail?.tagName,
				message: detail?.message ?? "Web component error",
				stack: detail?.stack,
				fatal: false
			});
		};
		window.addEventListener("error", onError);
		window.addEventListener("unhandledrejection", onRejection);
		window.addEventListener("pk-error", onPkError);
		return () => {
			window.removeEventListener("error", onError);
			window.removeEventListener("unhandledrejection", onRejection);
			window.removeEventListener("pk-error", onPkError);
		};
	}, [recordFault]);
	useUiWatchdog({
		enabled: enableWatchdog && !hasFatalFault,
		onStall: () => {
			setIsStuck(true);
			recordFault({
				kind: "watchdog",
				message: "The builder stopped responding.",
				fatal: false
			});
		}
	});
	const value = useMemo(() => ({
		faults,
		hasFatalFault,
		isStuck,
		recordFault,
		resetUi,
		reload,
		clearFaults,
		dismissStuck
	}), [
		faults,
		hasFatalFault,
		isStuck,
		recordFault,
		resetUi,
		reload,
		clearFaults,
		dismissStuck
	]);
	return /* @__PURE__ */ jsx(AppFaultReactContext.Provider, {
		value,
		children: /* @__PURE__ */ jsx(AppFaultBoundary, {
			onFault: (fault) => recordFault({
				...fault,
				fatal: true
			}),
			children: hasFatalFault ? /* @__PURE__ */ jsx(FaultFallback, {
				title: labels?.fatalTitle,
				message: labels?.fatalMessage,
				faults,
				meta,
				onReload: reload,
				onResetUi: resetUi
			}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [isStuck ? /* @__PURE__ */ jsx("div", {
				className: "mb-3",
				children: /* @__PURE__ */ jsx(FaultFallback, {
					compact: true,
					title: labels?.stuckTitle ?? "Builder became unresponsive",
					message: labels?.stuckMessage ?? "The page may still scroll but clicks might not work. Reset UI to close stuck overlays, or reload if the problem continues.",
					faults,
					meta,
					onReload: reload,
					onResetUi: resetUi,
					onDismiss: dismissStuck
				})
			}) : null, children] })
		})
	});
}
function useAppFault() {
	const ctx = useContext(AppFaultReactContext);
	if (!ctx) throw new Error("useAppFault must be used within AppFaultProvider");
	return ctx;
}
/** Optional hook — returns null outside a provider (for chrome mounted in separate portals). */
function useAppFaultOptional() {
	return useContext(AppFaultReactContext);
}
/** Always-reachable overlay recovery — mount in builder chrome, not inside dialogs. */
function ResetUiButton({ className, label = "Reset UI" }) {
	const fault = useAppFaultOptional();
	if (!fault) return null;
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className,
		onClick: fault.resetUi,
		title: "Close stuck dialogs and overlays",
		children: label
	});
}
//#endregion
export { AppFaultProvider, ResetUiButton, useAppFault, useAppFaultOptional };

//# sourceMappingURL=AppFaultProvider.js.map