import { get, set } from "lodash-es";
//#region src/forms/engine/FormStateStore.ts
var FormStateStore = class {
	state;
	listeners = /* @__PURE__ */ new Set();
	initialValues;
	constructor(initialValues = {}) {
		this.initialValues = { ...initialValues };
		this.state = {
			values: { ...initialValues },
			errors: {},
			touched: /* @__PURE__ */ new Set(),
			dirty: /* @__PURE__ */ new Set()
		};
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	notify() {
		this.listeners.forEach((listener) => {
			listener();
		});
	}
	getValue(path) {
		return get(this.state.values, path);
	}
	setValue(path, value) {
		const nextErrors = { ...this.state.errors };
		if (path in nextErrors) delete nextErrors[path];
		if (Array.isArray(value)) {
			const descendantPrefix = `${path}.`;
			Object.keys(nextErrors).forEach((key) => {
				if (key.startsWith(descendantPrefix)) delete nextErrors[key];
			});
		}
		this.state = {
			...this.state,
			values: (() => {
				const cloneRoot = Array.isArray(this.state.values) ? [...this.state.values] : { ...this.state.values ?? {} };
				set(cloneRoot, path, value);
				return cloneRoot;
			})(),
			dirty: new Set(this.state.dirty).add(path),
			errors: nextErrors
		};
		this.notify();
	}
	setValues(values) {
		this.state = {
			...this.state,
			values: { ...values }
		};
		this.notify();
	}
	setErrors(errors) {
		this.state = {
			...this.state,
			errors: { ...errors }
		};
		this.notify();
	}
	clearErrors() {
		this.state = {
			...this.state,
			errors: {}
		};
		this.notify();
	}
	setTouched(path, touched = true) {
		if (this.state.touched.has(path) === touched) return;
		const nextTouched = new Set(this.state.touched);
		if (touched) nextTouched.add(path);
		else nextTouched.delete(path);
		this.state = {
			...this.state,
			touched: nextTouched
		};
		this.notify();
	}
	reset(values = this.initialValues) {
		this.initialValues = { ...values };
		this.state = {
			values: { ...values },
			errors: {},
			touched: /* @__PURE__ */ new Set(),
			dirty: /* @__PURE__ */ new Set()
		};
		this.notify();
	}
};
//#endregion
export { FormStateStore };

//# sourceMappingURL=FormStateStore.js.map