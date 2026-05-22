import { evaluateCondition } from "../../utils/schema.js";
import { isEmptyValue } from "./rules/utils.js";
import { ruleHandlers } from "./rules/index.js";
import { get } from "lodash-es";
//#region src/forms/engine/ValidationEngine.ts
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
var validateValue = (field, rules, value, context) => {
	const label = String(field.label || field.name || "");
	const isRequired = rules.some((rule) => {
		return rule.name === "required";
	});
	for (const rule of rules) {
		const { name, args } = rule;
		if (!isRequired && isEmptyValue(value)) continue;
		const handler = ruleHandlers[name];
		if (!handler) continue;
		const message = handler(value, label, args, context);
		if (message) return message;
	}
	return null;
};
var buildConditionData = (field, values, conditionDataResolver) => {
	const scopePath = typeof field?._scopePath === "string" ? field._scopePath : "";
	const scopedValues = scopePath ? get(values, scopePath) : null;
	const scopedObject = isRecord(scopedValues) ? scopedValues : {};
	const conditionContext = conditionDataResolver?.(values, field);
	const normalizedConditionContext = isRecord(conditionContext) ? conditionContext : {};
	const fieldData = isRecord(field._data) ? field._data : {};
	return {
		...values,
		...scopedObject,
		...fieldData,
		...normalizedConditionContext
	};
};
var shouldValidateField = (field, values, conditionDataResolver) => {
	const condition = field?.if;
	if (!condition) return true;
	try {
		return evaluateCondition(condition, buildConditionData(field, values, conditionDataResolver));
	} catch {
		return true;
	}
};
var collectPathConditions = (schema) => {
	const pathConditions = /* @__PURE__ */ new Map();
	const walk = (node, currentPath = "", inherited = []) => {
		if (Array.isArray(node)) {
			node.forEach((child) => {
				walk(child, currentPath, inherited);
			});
			return;
		}
		if (!isRecord(node)) return;
		const name = typeof node.name === "string" && node.name ? node.name : "";
		let nodePath = currentPath;
		if (name) nodePath = currentPath ? `${currentPath}.${name}` : name;
		const ownCondition = typeof node.if === "string" && node.if ? [{
			condition: node.if,
			field: node
		}] : [];
		const nextInherited = [...inherited, ...ownCondition];
		if (nodePath && nextInherited.length) pathConditions.set(nodePath, nextInherited);
		if (Array.isArray(node.children)) walk(node.children, nodePath, nextInherited);
		if (Array.isArray(node.schema)) walk(node.schema, nodePath, nextInherited);
	};
	walk(schema, "", []);
	return pathConditions;
};
var shouldValidatePathConditions = (path, fallbackField, values, pathConditions, conditionDataResolver) => {
	const conditions = pathConditions.get(path) || [];
	if (!conditions.length) return true;
	return conditions.every(({ condition, field }) => {
		try {
			return evaluateCondition(condition, buildConditionData(field || fallbackField, values, conditionDataResolver));
		} catch {
			return true;
		}
	});
};
var createValidationEngine = (index, options = {}) => {
	const { conditionDataResolver } = options;
	const fieldRules = /* @__PURE__ */ new Map();
	const pathConditions = collectPathConditions(index.schema);
	index.fieldEntries.forEach((entry) => {
		fieldRules.set(entry, parseRules(entry.field));
	});
	const validate = (values) => {
		const fieldErrors = {};
		index.fieldEntries.forEach((entry) => {
			const rules = fieldRules.get(entry) || [];
			if (!rules.length) return;
			if (!shouldValidateField(entry.field, values, conditionDataResolver)) return;
			expandWildcardPaths(values, entry.path).forEach((path) => {
				if (!shouldValidatePathConditions(path, entry.field, values, pathConditions, conditionDataResolver)) return;
				const value = get(values, path);
				const message = validateValue(entry.field, rules, value, {
					path,
					values,
					field: entry.field
				});
				if (message) fieldErrors[path] = [message];
			});
		});
		return Object.keys(fieldErrors).length > 0 ? { fields: fieldErrors } : void 0;
	};
	return { validate };
};
//#endregion
export { createValidationEngine };

//# sourceMappingURL=ValidationEngine.js.map