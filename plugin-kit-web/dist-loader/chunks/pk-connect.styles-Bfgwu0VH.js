import { m as i } from "./lit-DpLik9Rf.js";
//#region ../plugin-kit-core/dist/utils/forms.js
var nl2br = (str) => {
	return str.replace(/\n/g, "<br>");
};
var getErrorHeading = (error) => {
	if (!error) return "An error has occurred";
	if (error.response?.statusText) return error.response.statusText;
	if (error.message?.includes("Network Error")) return "Network Error";
	if (error.message?.includes("timeout")) return "Request Timeout";
	return "An error has occurred";
};
var getErrorText = (error) => {
	if (!error) return "";
	if (error.response?.data?.message) return error.response.data.message;
	if (error.response?.data?.error) return error.response.data.error;
	if (error.message) return error.message;
	return String(error);
};
var getErrorTrace = (error, maxTraceLines = 5) => {
	const traces = [];
	if (!error) return {
		traces,
		traceAsString: ""
	};
	const file1 = error.response?.data?.file;
	const line1 = error.response?.data?.line;
	if (file1 && line1) traces.push(`${file1}:${line1}`);
	const traceArray = error.response?.data?.trace || [];
	for (let i = 0; i < Math.min(maxTraceLines, traceArray.length); i++) {
		const traceItem = traceArray[i];
		if (traceItem?.file && traceItem?.line) traces.push(`${traceItem.file}:${traceItem.line}`);
	}
	if (error.stack && traces.length === 0) traces.push(error.stack);
	return {
		traces,
		traceAsString: traces.map(nl2br).join("<br>")
	};
};
var getErrorMessage = function(error, maxTraceLines = 5) {
	if (error == null) return {
		heading: "An error has occurred",
		text: "",
		trace: "",
		traceAsString: "",
		traceAsArray: []
	};
	const { traces, traceAsString } = getErrorTrace(error, maxTraceLines);
	return {
		heading: getErrorHeading(error),
		text: getErrorText(error),
		trace: traceAsString,
		traceAsString,
		traceAsArray: traces
	};
};
//#endregion
//#region ../plugin-kit-core/dist/utils/connect.js
var craftWindow = () => window;
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
	const craft = craftWindow().Craft;
	if (craft?.escapeHtml) return craft.escapeHtml(value);
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};
/** POST a credentials connect/check controller action from the CP. */
var sendCpConnectRequest = (action, data) => {
	const craft = craftWindow().Craft;
	if (!craft?.sendActionRequest) return Promise.reject(/* @__PURE__ */ new Error("Craft.sendActionRequest is unavailable."));
	return craft.sendActionRequest("POST", action, { data });
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
	const csrfTokenName = typeof window !== "undefined" ? craftWindow().Craft?.csrfTokenName : void 0;
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
	const { Craft: craft, $ } = craftWindow();
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
//#region src/components/connect/pk-connect.styles.ts
/**
* Connect row layout on the custom-element host (light DOM).
*
* Mirrors `styles/connect/pk-connect.css` — document CSS is canonical for CP;
* keep `:host` rules in sync as a bundled fallback when document CSS is present.
*/
var pkConnectStyles = i`
    @layer pk-component {
        :host {
            display: flex;
            flex-wrap: nowrap;
            align-items: stretch;
            justify-content: space-between;
            box-sizing: border-box;
            width: 100%;
            flex: 1 1 100%;
            min-width: 0;
            min-height: 2.75rem;
        }

        :host .heading {
            display: flex;
            align-items: center;
            gap: var(--pk-connect-status-gap, 15px);
            margin: 0;
            flex: 1 1 auto;
            min-width: 0;
            line-height: 1.125rem;
            padding-block: 0.75rem;
            padding-inline: var(--pk-connect-heading-padding-inline, var(--m, 1rem) var(--s, 0.75rem));
            color: var(--pk-connect-heading-color, var(--gray-600, #515f6c));
        }

        :host .heading:only-child {
            flex: 1 1 100%;
        }

        :host .input {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            padding-block: var(--pk-connect-input-padding-block, var(--s, 0.75rem));
            padding-inline: var(--pk-connect-input-padding-inline, 10px var(--m, 1rem));
        }

        :host .heading .light {
            color: var(--pk-connect-muted-color, var(--gray-500, #606d7b));
        }

        :host .heading pk-status.pk-connect__status-icon {
            display: block;
            flex-shrink: 0;
            width: 0.75rem;
            height: 0.75rem;
            --pk-status-ring: var(--gray-500);
        }

        :host .heading .warning.with-icon::before {
            margin-inline-end: 7px;
        }
    }
`;
//#endregion
export { sendCpConnectRequest as a, watchCpFormDirty as c, resolveConnectError as i, buildConnectPayload as n, serializeCpForm as o, escapeCpHtml as r, submitCpFormAction as s, pkConnectStyles as t };
