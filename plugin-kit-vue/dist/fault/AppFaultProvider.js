import { AppFaultBoundary } from "./AppFaultBoundary.js";
import { FaultFallback } from "./FaultFallback.js";
import { isIgnorableGlobalError } from "./isIgnorableGlobalError.js";
import { useUiWatchdog } from "./useUiWatchdog.js";
import { computed, defineComponent, h, inject, onMounted, onUnmounted, provide, ref } from "vue";
import { recoverOverlays } from "@verbb/plugin-kit-web/plugin-kit";
//#region src/fault/AppFaultProvider.ts
var AppFaultKey = Symbol("pluginKitAppFault");
var faultKey = (input) => `${input.kind}:${input.tagName ?? ""}:${input.message.split("\n")[0]}`;
var AppFaultProvider = defineComponent({
	name: "AppFaultProvider",
	props: {
		meta: {
			type: Object,
			default: void 0
		},
		onResetUi: {
			type: Function,
			default: void 0
		},
		onReload: {
			type: Function,
			default: void 0
		},
		enableWatchdog: {
			type: Boolean,
			default: true
		},
		labels: {
			type: Object,
			default: void 0
		}
	},
	setup(props, { slots }) {
		const faults = ref([]);
		const hasFatalFault = ref(false);
		const isStuck = ref(false);
		const seen = /* @__PURE__ */ new Map();
		const recordFault = (input) => {
			const key = faultKey(input);
			const count = (seen.get(key) ?? 0) + 1;
			seen.set(key, count);
			faults.value = [{
				kind: input.kind,
				message: input.message,
				stack: input.stack,
				tagName: input.tagName,
				timestamp: Date.now(),
				count
			}, ...faults.value.filter((item) => faultKey(item) !== key)].slice(0, 8);
			if (input.fatal !== false && (input.kind === "vue" || input.kind === "global")) hasFatalFault.value = true;
		};
		const resetUi = () => {
			const { actions, diagnostic } = recoverOverlays();
			console.info("[plugin-kit] overlay recovery:", actions.join(", "), diagnostic.report);
			props.onResetUi?.();
			isStuck.value = false;
			hasFatalFault.value = false;
			faults.value = [];
			seen.clear();
		};
		const reload = () => {
			if (props.onReload) {
				props.onReload();
				return;
			}
			window.location.reload();
		};
		const clearFaults = () => {
			hasFatalFault.value = false;
			faults.value = [];
			seen.clear();
		};
		const dismissStuck = () => {
			isStuck.value = false;
		};
		provide(AppFaultKey, {
			get faults() {
				return faults.value;
			},
			get hasFatalFault() {
				return hasFatalFault.value;
			},
			get isStuck() {
				return isStuck.value;
			},
			recordFault,
			resetUi,
			reload,
			clearFaults,
			dismissStuck
		});
		const onResetShortcut = (event) => {
			if (!((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === "U" || event.key === "u"))) return;
			event.preventDefault();
			resetUi();
		};
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
		onMounted(() => {
			window.addEventListener("keydown", onResetShortcut, true);
			window.addEventListener("error", onError);
			window.addEventListener("unhandledrejection", onRejection);
			window.addEventListener("pk-error", onPkError);
		});
		onUnmounted(() => {
			window.removeEventListener("keydown", onResetShortcut, true);
			window.removeEventListener("error", onError);
			window.removeEventListener("unhandledrejection", onRejection);
			window.removeEventListener("pk-error", onPkError);
		});
		useUiWatchdog({
			enabled: computed(() => props.enableWatchdog && !hasFatalFault.value),
			onStall: () => {
				isStuck.value = true;
				recordFault({
					kind: "watchdog",
					message: "The builder stopped responding.",
					fatal: false
				});
			}
		});
		return () => h(AppFaultBoundary, { onFault: (fault) => recordFault({
			...fault,
			fatal: true
		}) }, { default: () => {
			if (hasFatalFault.value) return h(FaultFallback, {
				title: props.labels?.fatalTitle,
				message: props.labels?.fatalMessage,
				faults: faults.value,
				meta: props.meta,
				onReload: reload,
				onResetUi: resetUi
			});
			return [isStuck.value ? h("div", { class: "mb-3" }, h(FaultFallback, {
				compact: true,
				title: props.labels?.stuckTitle ?? "Builder became unresponsive",
				message: props.labels?.stuckMessage ?? "The page may still scroll but clicks might not work. Reset UI to close stuck overlays, or reload if the problem continues.",
				faults: faults.value,
				meta: props.meta,
				onReload: reload,
				onResetUi: resetUi,
				onDismiss: dismissStuck
			})) : null, slots.default?.()];
		} });
	}
});
function useAppFault() {
	const ctx = inject(AppFaultKey, null);
	if (!ctx) throw new Error("useAppFault must be used within AppFaultProvider");
	return ctx;
}
/** Optional composable — returns null outside a provider (for chrome mounted in separate trees). */
function useAppFaultOptional() {
	return inject(AppFaultKey, null);
}
/** Always-reachable overlay recovery — mount in builder chrome, not inside dialogs. */
var ResetUiButton = defineComponent({
	name: "ResetUiButton",
	props: {
		className: {
			type: String,
			default: void 0
		},
		label: {
			type: String,
			default: "Reset UI"
		}
	},
	setup(props) {
		const fault = useAppFaultOptional();
		return () => {
			if (!fault) return null;
			return h("button", {
				type: "button",
				class: props.className,
				title: "Close stuck dialogs and overlays",
				onClick: fault.resetUi
			}, props.label);
		};
	}
});
//#endregion
export { AppFaultProvider, ResetUiButton, useAppFault, useAppFaultOptional };

//# sourceMappingURL=AppFaultProvider.js.map