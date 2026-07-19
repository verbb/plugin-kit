import { defineComponent, onErrorCaptured, ref } from "vue";
//#region src/fault/AppFaultBoundary.ts
/**
* Catches Vue render/lifecycle errors in the builder subtree via `onErrorCaptured`.
* Emits `fault` then returns null so the parent provider can show {@link FaultFallback}.
*
* Listen with `onFault` in `h()` / templates — Vue maps that to the `fault` emit
* (do not declare an `onFault` prop; `on*` keys are event listeners in `h()`).
*/
var AppFaultBoundary = defineComponent({
	name: "AppFaultBoundary",
	emits: { fault: (_fault) => true },
	setup(_props, { slots, emit }) {
		const hasError = ref(false);
		onErrorCaptured((error, _instance, info) => {
			hasError.value = true;
			const err = error instanceof Error ? error : new Error(String(error));
			emit("fault", {
				kind: "vue",
				message: err.message,
				stack: info ? `${err.stack ?? ""}\n\n${info}` : err.stack
			});
			return false;
		});
		return () => hasError.value ? null : slots.default?.();
	}
});
//#endregion
export { AppFaultBoundary };

//# sourceMappingURL=AppFaultBoundary.js.map