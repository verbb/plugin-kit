import { get } from 'lodash-es';
import { evaluateCondition } from '@verbb/plugin-kit-react/utils/schema';

import type { FieldEntry, SchemaIndex, SchemaNode, SchemaRenderable } from './SchemaIndex';
import { ruleHandlers, RuleHandlerContext } from './rules';
import { isRequiredRuleName } from './rules/requiredRules';
import { isEmptyValue } from './rules/utils';
import type { FormValues } from './context';

type RuleToken = {
    name: string;
    args: string[];
};
type ConditionContext = {
    condition: string;
    field: SchemaNode;
};
type ConditionDataResolver = (values: FormValues, field?: SchemaNode) => Record<string, unknown>;

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const parseRules = (field: { validation?: string; required?: boolean }): RuleToken[] => {
    const rawRules = typeof field.validation === 'string' ? field.validation : '';
    const tokens = rawRules
        .split('|')
        .map((token) => { return token.trim(); })
        .filter(Boolean);

    const hasRequiredRule = tokens.some((rule) => { return rule === 'required' || rule.startsWith('required'); });
    if (field.required && !hasRequiredRule) {
        tokens.unshift('required');
    }

    return tokens.map((token) => {
        const [name, ...rest] = token.split(':');
        const args = rest.length > 0 ? rest.join(':').split(',') : [];
        return { name, args };
    });
};

const expandWildcardPaths = (values: FormValues, path: string) => {
    if (!path.includes('*')) {
        return [path];
    }

    const parts = path.split('.');
    const results: string[] = [];

    const walk = (current: unknown, index: number, acc: string[]) => {
        if (index >= parts.length) {
            results.push(acc.join('.'));
            return;
        }

        const part = parts[index];
        if (part === '*') {
            if (Array.isArray(current)) {
                current.forEach((item, idx) => {
                    walk(item, index + 1, [...acc, String(idx)]);
                });
            }
            return;
        }

        if (isRecord(current) && part in current) {
            walk(current[part], index + 1, [...acc, part]);
            return;
        }

        walk(undefined, index + 1, [...acc, part]);
    };

    walk(values, 0, []);
    return results;
};

const validateValue = (
    field: SchemaNode,
    rules: RuleToken[],
    value: unknown,
    context: RuleHandlerContext,
) => {
    const label = String(field.label || field.name || '');
    const isRequired = rules.some((rule) => { return isRequiredRuleName(rule.name); });

    for (const rule of rules) {
        const { name, args } = rule;
        const shouldSkip = !isRequired && isEmptyValue(value);

        if (shouldSkip) {
            continue;
        }

        const handler = ruleHandlers[name];
        if (!handler) {
            continue;
        }

        const message = handler(value, label, args, context);
        if (message) {
            return message;
        }
    }

    return null;
};

const buildConditionData = (
    field: SchemaNode,
    values: FormValues,
    conditionDataResolver?: ConditionDataResolver,
) => {
    const scopePath = typeof field?._scopePath === 'string' ? field._scopePath : '';
    const scopedValues = scopePath ? get(values, scopePath) : null;
    const scopedObject = isRecord(scopedValues) ? scopedValues : {};
    const conditionContext = conditionDataResolver?.(values, field);
    const normalizedConditionContext = isRecord(conditionContext) ? conditionContext : {};
    const fieldData = isRecord(field._data) ? field._data : {};

    return {
        ...values,
        ...scopedObject,
        ...fieldData,
        ...normalizedConditionContext,
    };
};

const shouldValidateField = (
    field: SchemaNode,
    values: FormValues,
    conditionDataResolver?: ConditionDataResolver,
) => {
    const condition = field?.if;

    if (!condition) {
        return true;
    }

    try {
        return evaluateCondition(condition, buildConditionData(field, values, conditionDataResolver));
    } catch {
        // Fail-open to avoid accidentally blocking saves due to malformed conditions.
        return true;
    }
};

const collectPathConditions = (schema: SchemaRenderable) => {
    const pathConditions = new Map<string, ConditionContext[]>();

    const walk = (node: SchemaRenderable, currentPath = '', inherited: ConditionContext[] = []) => {
        if (Array.isArray(node)) {
            node.forEach((child) => {
                walk(child, currentPath, inherited);
            });
            return;
        }

        if (!isRecord(node)) {
            return;
        }

        const name = typeof node.name === 'string' && node.name ? node.name : '';
        let nodePath = currentPath;
        if (name) {
            nodePath = currentPath ? `${currentPath}.${name}` : name;
        }

        const ownCondition = typeof node.if === 'string' && node.if
            ? [{ condition: node.if, field: node }]
            : [];
        const nextInherited = [...inherited, ...ownCondition];

        if (nodePath && nextInherited.length) {
            pathConditions.set(nodePath, nextInherited);
        }

        if (Array.isArray(node.children)) {
            walk(node.children, nodePath, nextInherited);
        }

        if (Array.isArray(node.schema)) {
            walk(node.schema, nodePath, nextInherited);
        }
    };

    walk(schema, '', []);

    return pathConditions;
};

const shouldValidatePathConditions = (
    path: string,
    fallbackField: SchemaNode,
    values: FormValues,
    pathConditions: Map<string, ConditionContext[]>,
    conditionDataResolver?: ConditionDataResolver,
) => {
    const conditions = pathConditions.get(path) || [];

    if (!conditions.length) {
        return true;
    }

    return conditions.every(({ condition, field }) => {
        try {
            return evaluateCondition(condition, buildConditionData(field || fallbackField, values, conditionDataResolver));
        } catch {
            // Fail-open to avoid accidental save blocking on malformed conditions.
            return true;
        }
    });
};

export type ValidationResult = { fields: Record<string, string[]> } | undefined;

export const createValidationEngine = (
    index: SchemaIndex,
    options: { conditionDataResolver?: ConditionDataResolver } = {},
) => {
    const { conditionDataResolver } = options;
    const fieldRules = new Map<FieldEntry, RuleToken[]>();
    const pathConditions = collectPathConditions(index.schema);

    index.fieldEntries.forEach((entry) => {
        fieldRules.set(entry, parseRules(entry.field));
    });

    const validate = (values: FormValues): ValidationResult => {
        const fieldErrors: Record<string, string[]> = {};
        index.fieldEntries.forEach((entry) => {
            const rules = fieldRules.get(entry) || [];
            if (!rules.length) {
                return;
            }

            if (!shouldValidateField(entry.field, values, conditionDataResolver)) {
                return;
            }

            const paths = expandWildcardPaths(values, entry.path);
            paths.forEach((path) => {
                if (!shouldValidatePathConditions(path, entry.field, values, pathConditions, conditionDataResolver)) {
                    return;
                }

                const value = get(values, path);
                const message = validateValue(entry.field, rules, value, {
                    path,
                    values,
                    field: entry.field,
                });
                if (message) {
                    fieldErrors[path] = [message];

                }
            });
        });

        return Object.keys(fieldErrors).length > 0 ? { fields: fieldErrors } : undefined;
    };

    return { validate };
};
