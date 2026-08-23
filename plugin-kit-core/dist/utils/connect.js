import { getErrorMessage } from "./forms.js";
//#region src/utils/connect.ts
var DEFAULT_FORM_SELECTOR = "#main-form";
var resolveCpForm = ({ formSelector = DEFAULT_FORM_SELECTOR, host } = {}) => {
	if (formSelector) {
		const explicit = document.querySelector(formSelector);
		if (explicit) return explicit;
	}
	const hostForm = host?.closest("form") ?? null;
	if (hostForm) return hostForm;
	return document.querySelector(DEFAULT_FORM_SELECTOR) ?? document.getElementById("main");
};
/** Escape text for CP dialog markup; prefers `Craft.escapeHtml` when available. */
var escapeCpHtml = (value) => {
	if (window.Craft?.escapeHtml) return window.Craft.escapeHtml(value);
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};
/** POST a credentials connect/check controller action from the CP. */
var sendCpConnectRequest = (action, data) => {
	if (!window.Craft?.sendActionRequest) return Promise.reject(/* @__PURE__ */ new Error("Craft.sendActionRequest is unavailable."));
	return window.Craft.sendActionRequest("POST", action, { data });
};
/**
* Serialize named CP form controls into a flat key → value map.
* Mirrors Video Picker / Formie connect payloads (name attribute only).
*/
var serializeCpForm = (formSelector = DEFAULT_FORM_SELECTOR, host) => {
	const form = resolveCpForm({
		formSelector,
		host
	});
	if (!form) return {};
	const values = {};
	form.querySelectorAll("input, select, textarea").forEach((input) => {
		const name = input.getAttribute("name");
		if (name) values[name] = input.value;
	});
	return values;
};
/**
* Build the POST body for check-connection controller actions from serialized form values.
*/
var buildConnectPayload = (values, options = {}) => {
	const includeTypeNamespace = options.includeTypeNamespace !== false;
	const type = values.type || options.type || "";
	const idParam = options.idParam ?? "sourceId";
	const payload = { type };
	payload[idParam] = values[idParam] ?? values.sourceId ?? values.id ?? options.sourceId;
	const csrfTokenName = typeof window !== "undefined" ? window.Craft?.csrfTokenName : void 0;
	if (csrfTokenName && values[csrfTokenName]) payload[csrfTokenName] = values[csrfTokenName];
	if (includeTypeNamespace && type) {
		const prefix = `types[${type}]`;
		Object.keys(values).forEach((key) => {
			if (key.startsWith(prefix)) payload[key] = values[key];
		});
	}
	(options.extraKeys ?? [
		"name",
		"handle",
		"enabled"
	]).forEach((key) => {
		if (values[key] !== void 0) payload[key] = values[key];
	});
	return payload;
};
/**
* Normalize Craft AJAX / logical failures into dialog-friendly error content.
*/
var resolveConnectError = (sourceError, labels) => {
	if (sourceError == null || sourceError === "") return {
		heading: labels.errorHeading,
		text: labels.genericError,
		trace: "",
		traceAsString: "",
		traceAsArray: []
	};
	if (typeof sourceError === "string") return {
		heading: labels.errorHeading,
		text: sourceError,
		trace: "",
		traceAsString: "",
		traceAsArray: []
	};
	let normalized = sourceError;
	if (typeof sourceError === "object" && sourceError !== null && "data" in sourceError && !("response" in sourceError)) normalized = { response: {
		data: sourceError.data,
		statusText: labels.errorHeading
	} };
	const parsed = getErrorMessage(normalized);
	if (parsed.text) return parsed;
	return {
		heading: labels.errorHeading,
		text: labels.genericError,
		trace: "",
		traceAsString: "",
		traceAsArray: []
	};
};
/**
* Submit a Craft CP controller action via the edit form (or host's ancestor form).
* Mirrors `.formsubmit` / `Craft.submitForm` without requiring a Craft-styled trigger.
*/
var submitCpFormAction = ({ formSelector = DEFAULT_FORM_SELECTOR, host, action, redirect, paramName, paramValue, confirm }) => {
	const form = resolveCpForm({
		formSelector,
		host
	});
	const craft = window.Craft;
	const $ = window.$;
	if (!form || typeof craft?.submitForm !== "function" || !$) return;
	const params = {};
	if (paramName && paramValue) params[paramName] = paramValue;
	craft.submitForm($(form), {
		action,
		redirect,
		params,
		confirm
	});
};
/**
* Watch the main CP edit form for unsaved changes.
* Returns a cleanup function — use for OAuth rows or custom connect hosts.
*/
var watchCpFormDirty = ({ formSelector = DEFAULT_FORM_SELECTOR, host, onDirty, onClean }) => {
	const form = resolveCpForm({
		formSelector,
		host
	});
	if (!form) return () => {};
	const initialSnapshot = JSON.stringify(serializeCpForm(formSelector, host));
	const handleChange = () => {
		if (JSON.stringify(serializeCpForm(formSelector, host)) !== initialSnapshot) onDirty();
		else onClean?.();
	};
	const inputs = form.querySelectorAll("input, select, textarea");
	const lightswitches = form.querySelectorAll(".lightswitch");
	inputs.forEach((input) => {
		input.addEventListener("input", handleChange);
	});
	lightswitches.forEach((lightswitch) => {
		lightswitch.addEventListener("change", handleChange);
	});
	return () => {
		inputs.forEach((input) => {
			input.removeEventListener("input", handleChange);
		});
		lightswitches.forEach((lightswitch) => {
			lightswitch.removeEventListener("change", handleChange);
		});
	};
};
//#endregion
export { buildConnectPayload, escapeCpHtml, resolveConnectError, sendCpConnectRequest, serializeCpForm, submitCpFormAction, watchCpFormDirty };

//# sourceMappingURL=connect.js.map