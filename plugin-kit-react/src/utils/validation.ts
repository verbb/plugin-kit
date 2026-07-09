import * as v from 'valibot';
import { translate } from '@verbb/plugin-kit-react/utils/translation';
import { isRequiredRuleName } from '../forms/engine/rules/requiredRules';
import { isRichTextEmpty } from './tiptap';

// ============================================================================
// Valibot schema adapter
// ============================================================================
// We accept Laravel-style rule strings from Craft schema and turn them into
// Valibot validation actions. This keeps the server-driven rules contract
// while avoiding validatorjs' brittle attribute handling.

// Minimal schema shape required to derive rules/labels.
type SchemaField = {
    name?: string;
    label?: string;
    required?: boolean;
    validation?: string;
    $field?: string;
    children?: SchemaValue;
    columns?: Array<SchemaField & { type?: string }>;
};

type SchemaValue = SchemaField | SchemaValue[] | null | undefined;

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

type RuleToken = {
    name: string;
    args: string[];
};

const parseRules = (field: SchemaField): RuleToken[] => {
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

const isEmptyValue = (value: unknown) => {
    if (value === undefined || value === null) {
        return true;
    }

    if (typeof value === 'string') {
        return value === '';
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    return false;
};

const getValueSize = (value: unknown) => {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed !== '' && Number.isFinite(Number(trimmed))) {
            return Number(trimmed);
        }

        return value.length;
    }

    if (Array.isArray(value)) {
        return value.length;
    }

    return NaN;
};

// Walk schema nodes and collect all fields that can be validated.
// - list fields: expand children using wildcard paths (`list.*.field`)
// - table fields: validate the table itself (required / min rules), then each
//   column per row (`table.*.column`)
// - default fields: just collect as-is
const collectFields = (node: SchemaValue, prefix = '', fields: SchemaField[] = []) => {
    if (!node) {
        return fields;
    }

    if (Array.isArray(node)) {
        node.forEach((child) => { return collectFields(child, prefix, fields); });
        return fields;
    }

    if (!isRecord(node)) {
        return fields;
    }

    if (node.$field === 'list' && node.name) {
        if (node.children) {
            collectFields(node.children, `${prefix}${node.name}.*.`, fields);
        }
        return fields;
    }

    if (node.$field === 'table' && node.name) {
        fields.push({
            ...node,
            name: `${prefix}${node.name}`,
        });

        if (!Array.isArray(node.columns)) {
            return fields;
        }

        node.columns.forEach((column: SchemaField & { type?: string }) => {
            if (!column?.name) {
                return;
            }

            if (column.type === 'heading' || column.type === 'label') {
                return;
            }

            fields.push({
                ...column,
                name: `${prefix}${node.name}.*.${column.name}`,
            });
        });

        return fields;
    }

    if (node.$field && node.name) {
        fields.push({
            ...node,
            name: `${prefix}${node.name}`,
        });
    }

    if (node.children) {
        collectFields(node.children, prefix, fields);
    }

    return fields;
};

type TableDefinition = {
    name: string;
    label: string;
    columns: Record<string, string>;
};

const collectTableDefinitions = (
    node: SchemaValue,
    tables: Record<string, TableDefinition> = {},
): Record<string, TableDefinition> => {
    if (!node) {
        return tables;
    }

    if (Array.isArray(node)) {
        node.forEach((child) => { return collectTableDefinitions(child, tables); });
        return tables;
    }

    if (!isRecord(node)) {
        return tables;
    }

    if (node.$field === 'table' && node.name) {
        const tableName = String(node.name);
        const tableLabel = String(node.label || node.name);
        const columns: Record<string, string> = {};

        if (Array.isArray(node.columns)) {
            node.columns.forEach((column) => {
                if (!column?.name) {
                    return;
                }

                columns[String(column.name)] = String(column.label || column.name);
            });
        }

        tables[tableName] = {
            name: tableName,
            label: tableLabel,
            columns,
        };
    }

    if (node.children) {
        collectTableDefinitions(node.children, tables);
    }

    return tables;
};

const expandWildcardPaths = (values: Record<string, unknown>, path: string) => {
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

        // Allow missing leaf keys so required rules still validate.
        walk(undefined, index + 1, [...acc, part]);
    };

    walk(values, 0, []);
    return results;
};

const getValueAtPath = (values: Record<string, unknown>, path: string) => {
    if (!path) {
        return undefined;
    }

    return path.split('.').reduce<unknown>((current, segment) => {
        if (current === undefined || current === null) {
            return undefined;
        }

        const key = Array.isArray(current) ? Number(segment) : segment;
        return current[key as keyof typeof current];
    }, values);
};

const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
const variableRegex = /({.*?})/;

const buildFieldSchema = (field: SchemaField, rules: RuleToken[]) => {
    const label = String(field.label || field.name || '');
    const isRequired = rules.some((rule) => { return isRequiredRuleName(rule.name); });

    const actions = [];

    rules.forEach((rule) => {
        const ruleName = rule.name;
        const { args } = rule;

        const maybeSkip = (value: unknown) => {
            return !isRequired && isEmptyValue(value);
        };

        switch (ruleName) {
            case 'required':
                actions.push(v.check(
                    (value) => { return !isEmptyValue(value); },
                    translate('{attribute} cannot be blank.', { attribute: label }),
                ));
                break;

            case 'requiredRichText':
                actions.push(v.check(
                    (value) => { return !isRichTextEmpty(value); },
                    translate('{attribute} cannot be blank.', { attribute: label }),
                ));
                break;

            case 'email':
                actions.push(v.check(
                    (value) => {
                        if (maybeSkip(value)) {
                            return true;
                        }
                        return emailRegex.test(String(value));
                    },
                    translate('{attribute} must be a valid email address.', { attribute: label }),
                ));
                break;

            case 'emailOrVariable':
                actions.push(v.check(
                    (value) => {
                        if (maybeSkip(value)) {
                            return true;
                        }
                        const text = String(value);
                        return variableRegex.test(text) || emailRegex.test(text);
                    },
                    translate('{attribute} must be a valid email address or variable.', { attribute: label }),
                ));
                break;

            case 'min': {
                const min = Number(args[0]);
                actions.push(v.check(
                    (value) => {
                        if (maybeSkip(value)) {
                            return true;
                        }
                        const size = getValueSize(value);
                        return Number.isFinite(size) ? size >= min : false;
                    },
                    translate('{attribute} must be at least {min}.', { attribute: label, min: String(args[0]) }),
                ));
                break;
            }

            case 'max': {
                const max = Number(args[0]);
                actions.push(v.check(
                    (value) => {
                        if (maybeSkip(value)) {
                            return true;
                        }
                        const size = getValueSize(value);
                        return Number.isFinite(size) ? size <= max : false;
                    },
                    translate('{attribute} must be at most {max}.', { attribute: label, max: String(args[0]) }),
                ));
                break;
            }

            default:
                break;
        }
    });

    return v.pipe(v.any(), ...actions);
};

// Run Valibot and return TanStack Form–friendly error shape.
export function validateFormValues(
    schema: unknown,
    values: Record<string, unknown>,
): { fields: Record<string, string[]> } | undefined {
    const normalizedValues = values && typeof values === 'object' ? values : {};
    const fields = collectFields(schema as SchemaValue);

    if (!fields.length) {
        return undefined;
    }

    const fieldErrors: Record<string, string[]> = {};

    fields.forEach((field) => {
        if (!field?.name) {
            return;
        }

        const rules = parseRules(field);
        if (!rules.length) {
            return;
        }

        const validator = buildFieldSchema(field, rules);
        const paths = expandWildcardPaths(normalizedValues, field.name);

        paths.forEach((path) => {
            const value = getValueAtPath(normalizedValues, path);
            const result = v.safeParse(validator, value);

            if (result.success) {
                return;
            }

            const message = (result.issues || [])
                .map((issue) => { return issue.message; })
                .filter(Boolean)[0];

            if (message) {
                fieldErrors[path] = [message];
            }
        });
    });

    // Aggregate table row errors up to the parent table field.
    const tableDefinitions = collectTableDefinitions(schema);
    const formatColumnMessage = (message: string, label: string) => {
        const trimmed = String(message || '').trim();
        if (!trimmed) {
            return label;
        }

        const match = trimmed.match(/^.+?(\s+(?:cannot|must|is)\b.*)$/i);
        if (match) {
            return `${label}${match[1]}`;
        }

        return `${label}: ${trimmed}`;
    };

    Object.entries(tableDefinitions).forEach(([tableName, definition]) => {
        const nestedKeys = Object.keys(fieldErrors).filter((key) => {
            return key.startsWith(`${tableName}.`);
        });
        if (nestedKeys.length === 0) {
            return;
        }

        const columnErrors: Record<string, string[]> = {};
        nestedKeys.forEach((key) => {
            const matches = key.match(new RegExp(`^${tableName}\\.\\d+\\.(.+)$`));
            const columnName = matches?.[1];
            if (!columnName) {
                return;
            }

            const messages = fieldErrors[key] || [];
            if (!messages.length) {
                return;
            }

            if (!columnErrors[columnName]) {
                columnErrors[columnName] = [];
            }

            columnErrors[columnName].push(...messages);
        });

        const columnMessages = Object.entries(columnErrors).flatMap(([columnName, messages]) => {
            if (!messages.length) {
                return [];
            }

            const columnLabel = definition.columns[columnName] || columnName;
            const label = `${definition.label} - ${columnLabel}`;
            const uniqueMessages = Array.from(new Set(messages));
            const firstMessage = uniqueMessages[0];
            return firstMessage ? [formatColumnMessage(firstMessage, label)] : [];
        });

        if (!columnMessages.length) {
            return;
        }

        const merged = new Set([...(fieldErrors[tableName] || []), ...columnMessages]);
        fieldErrors[tableName] = Array.from(merged);
    });

    return Object.keys(fieldErrors).length > 0 ? { fields: fieldErrors } : undefined;
}
