import { translate } from "./translation.js";
import { isRichTextEmpty } from "./tiptap.js";
import { isRequiredRuleName } from "../forms/engine/rules/requiredRules.js";
import * as v from "valibot";
//#region src/utils/validation.ts
var isRecord = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
var parseRules = (field) => {
	const tokens = (typeof field.validation === "string" ? field.validation : "").split("|").map((token) => {
		return token.trim();
	}).filter(Boolean);
	const hasRequiredRule = tokens.some((rule) => {
		return rule === "required" || rule.startsWith("required");
	});
	if (field.required && !hasRequiredRule) tokens.unshift("required");
	return tokens.map((token) => {
		const [name, ...rest] = token.split(":");
		return {
			name,
			args: rest.length > 0 ? rest.join(":").split(",") : []
		};
	});
};
var isEmptyValue = (value) => {
	if (value === void 0 || value === null) return true;
	if (typeof value === "string") return value === "";
	if (Array.isArray(value)) return value.length === 0;
	return false;
};
var getValueSize = (value) => {
	if (typeof value === "number") return value;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (trimmed !== "" && Number.isFinite(Number(trimmed))) return Number(trimmed);
		return value.length;
	}
	if (Array.isArray(value)) return value.length;
	return NaN;
};
var collectFields = (node, prefix = "", fields = []) => {
	if (!node) return fields;
	if (Array.isArray(node)) {
		node.forEach((child) => {
			return collectFields(child, prefix, fields);
		});
		return fields;
	}
	if (!isRecord(node)) return fields;
	if (node.$field === "list" && node.name) {
		if (node.children) collectFields(node.children, `${prefix}${node.name}.*.`, fields);
		return fields;
	}
	if (node.$field === "table" && node.name) {
		fields.push({
			...node,
			name: `${prefix}${node.name}`
		});
		if (!Array.isArray(node.columns)) return fields;
		node.columns.forEach((column) => {
			if (!column?.name) return;
			if (column.type === "heading" || column.type === "label") return;
			fields.push({
				...column,
				name: `${prefix}${node.name}.*.${column.name}`
			});
		});
		return fields;
	}
	if (node.$field && node.name) fields.push({
		...node,
		name: `${prefix}${node.name}`
	});
	if (node.children) collectFields(node.children, prefix, fields);
	return fields;
};
var collectTableDefinitions = (node, tables = {}) => {
	if (!node) return tables;
	if (Array.isArray(node)) {
		node.forEach((child) => {
			return collectTableDefinitions(child, tables);
		});
		return tables;
	}
	if (!isRecord(node)) return tables;
	if (node.$field === "table" && node.name) {
		const tableName = String(node.name);
		const tableLabel = String(node.label || node.name);
		const columns = {};
		if (Array.isArray(node.columns)) node.columns.forEach((column) => {
			if (!column?.name) return;
			columns[String(column.name)] = String(column.label || column.name);
		});
		tables[tableName] = {
			name: tableName,
			label: tableLabel,
			columns
		};
	}
	if (node.children) collectTableDefinitions(node.children, tables);
	return tables;
};
var expandWildcardPaths = (values, path) => {
	if (!path.includes("*")) return [path];
	const parts = path.split(".");
	const results = [];
	const walk = (current, index, acc) => {
		if (index >= parts.length) {
			results.push(acc.join("."));
			return;
		}
		const part = parts[index];
		if (part === "*") {
			if (Array.isArray(current)) current.forEach((item, idx) => {
				walk(item, index + 1, [...acc, String(idx)]);
			});
			return;
		}
		if (isRecord(current) && part in current) {
			walk(current[part], index + 1, [...acc, part]);
			return;
		}
		walk(void 0, index + 1, [...acc, part]);
	};
	walk(values, 0, []);
	return results;
};
var getValueAtPath = (values, path) => {
	if (!path) return;
	return path.split(".").reduce((current, segment) => {
		if (current === void 0 || current === null) return;
		return current[Array.isArray(current) ? Number(segment) : segment];
	}, values);
};
var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
var variableRegex = /({.*?})/;
var buildFieldSchema = (field, rules) => {
	const label = String(field.label || field.name || "");
	const isRequired = rules.some((rule) => {
		return isRequiredRuleName(rule.name);
	});
	const actions = [];
	rules.forEach((rule) => {
		const ruleName = rule.name;
		const { args } = rule;
		const maybeSkip = (value) => {
			return !isRequired && isEmptyValue(value);
		};
		switch (ruleName) {
			case "required":
				actions.push(v.check((value) => {
					return !isEmptyValue(value);
				}, translate("{attribute} cannot be blank.", { attribute: label })));
				break;
			case "requiredRichText":
				actions.push(v.check((value) => {
					return !isRichTextEmpty(value);
				}, translate("{attribute} cannot be blank.", { attribute: label })));
				break;
			case "email":
				actions.push(v.check((value) => {
					if (maybeSkip(value)) return true;
					return emailRegex.test(String(value));
				}, translate("{attribute} must be a valid email address.", { attribute: label })));
				break;
			case "emailOrVariable":
				actions.push(v.check((value) => {
					if (maybeSkip(value)) return true;
					const text = String(value);
					return variableRegex.test(text) || emailRegex.test(text);
				}, translate("{attribute} must be a valid email address or variable.", { attribute: label })));
				break;
			case "min": {
				const min = Number(args[0]);
				actions.push(v.check((value) => {
					if (maybeSkip(value)) return true;
					const size = getValueSize(value);
					return Number.isFinite(size) ? size >= min : false;
				}, translate("{attribute} must be at least {min}.", {
					attribute: label,
					min: String(args[0])
				})));
				break;
			}
			case "max": {
				const max = Number(args[0]);
				actions.push(v.check((value) => {
					if (maybeSkip(value)) return true;
					const size = getValueSize(value);
					return Number.isFinite(size) ? size <= max : false;
				}, translate("{attribute} must be at most {max}.", {
					attribute: label,
					max: String(args[0])
				})));
				break;
			}
			default: break;
		}
	});
	return v.pipe(v.any(), ...actions);
};
function validateFormValues(schema, values) {
	const normalizedValues = values && typeof values === "object" ? values : {};
	const fields = collectFields(schema);
	if (!fields.length) return;
	const fieldErrors = {};
	fields.forEach((field) => {
		if (!field?.name) return;
		const rules = parseRules(field);
		if (!rules.length) return;
		const validator = buildFieldSchema(field, rules);
		expandWildcardPaths(normalizedValues, field.name).forEach((path) => {
			const value = getValueAtPath(normalizedValues, path);
			const result = v.safeParse(validator, value);
			if (result.success) return;
			const message = (result.issues || []).map((issue) => {
				return issue.message;
			}).filter(Boolean)[0];
			if (message) fieldErrors[path] = [message];
		});
	});
	const tableDefinitions = collectTableDefinitions(schema);
	const formatColumnMessage = (message, label) => {
		const trimmed = String(message || "").trim();
		if (!trimmed) return label;
		const match = trimmed.match(/^.+?(\s+(?:cannot|must|is)\b.*)$/i);
		if (match) return `${label}${match[1]}`;
		return `${label}: ${trimmed}`;
	};
	Object.entries(tableDefinitions).forEach(([tableName, definition]) => {
		const nestedKeys = Object.keys(fieldErrors).filter((key) => {
			return key.startsWith(`${tableName}.`);
		});
		if (nestedKeys.length === 0) return;
		const columnErrors = {};
		nestedKeys.forEach((key) => {
			const columnName = key.match(new RegExp(`^${tableName}\\.\\d+\\.(.+)$`))?.[1];
			if (!columnName) return;
			const messages = fieldErrors[key] || [];
			if (!messages.length) return;
			if (!columnErrors[columnName]) columnErrors[columnName] = [];
			columnErrors[columnName].push(...messages);
		});
		const columnMessages = Object.entries(columnErrors).flatMap(([columnName, messages]) => {
			if (!messages.length) return [];
			const columnLabel = definition.columns[columnName] || columnName;
			const label = `${definition.label} - ${columnLabel}`;
			const firstMessage = Array.from(new Set(messages))[0];
			return firstMessage ? [formatColumnMessage(firstMessage, label)] : [];
		});
		if (!columnMessages.length) return;
		const merged = new Set([...fieldErrors[tableName] || [], ...columnMessages]);
		fieldErrors[tableName] = Array.from(merged);
	});
	return Object.keys(fieldErrors).length > 0 ? { fields: fieldErrors } : void 0;
}
//#endregion
export { validateFormValues };

//# sourceMappingURL=validation.js.map