import * as JexlModule from 'jexl';

const Jexl = 'default' in JexlModule ? JexlModule.default : JexlModule;

const warnedConditions = new Set<string>();

type TraversalNode = Record<string, unknown> & {
    $field?: string;
    name?: string;
    children?: TraversalValue;
    schema?: TraversalValue;
};
type TraversalValue = TraversalNode | TraversalNode[] | null | undefined;

// Evaluate a conditional expression (Formie-style "field == 'x'") using Jexl.
export const evaluateCondition = (condition: string | undefined, data: Record<string, unknown>) => {
    if (!condition) { return true; }

    try {
        return Jexl.evalSync(condition, data);
    } catch (error) {
        if (typeof condition === 'string' && !warnedConditions.has(condition)) {
            warnedConditions.add(condition);
            console.warn('Condition evaluation error:', error, 'Condition:', condition, 'Data:', data);
        }

        return false;
    }
};

// Shared traversal function for schema nodes.
export const traverseSchema = (node: TraversalValue, visitor: (node: TraversalNode) => void) => {
    if (Array.isArray(node)) {
        node.forEach((child) => { return traverseSchema(child, visitor); });
    } else if (node && typeof node === 'object') {
        visitor(node);

        // Skip iterating through children if this is a list field.
        if (node.$field === 'list') {
            return;
        }

        Object.values(node).forEach((value) => {
            if (value && (typeof value === 'object' || Array.isArray(value))) {
                traverseSchema(value as TraversalValue, visitor);
            }
        });
    }
};

// Extract fields from schema for validation - generic recursive approach.
export const extractFields = (nodes: TraversalValue): TraversalNode[] => {
    const fields: TraversalNode[] = [];

    traverseSchema(nodes, (node) => {
        if (node.$field) {
            fields.push(node);
        }
    });

    return fields;
};

// Extract field names from schema content - generic recursive approach.
export const extractFieldNames = (content: TraversalValue): string[] => {
    return extractFields(content)
        .map((field) => { return field.name; })
        .filter((name): name is string => { return typeof name === 'string'; });
};

const fieldNamesCache = new WeakMap<object, string[]>();

export const getSchemaFieldNames = (node: unknown): string[] => {
    if (!node || (typeof node !== 'object' && !Array.isArray(node))) {
        return [];
    }

    const key = node as object;
    const cached = fieldNamesCache.get(key);
    if (cached) {
        return cached;
    }

    const fieldNames = extractFieldNames(node as TraversalValue);
    fieldNamesCache.set(key, fieldNames);
    return fieldNames;
};

const hasErrorValue = (value: unknown) => {
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    if (!value) {
        return false;
    }
    if (typeof value === 'object') {
        const entry = value as { errors?: unknown[] };
        if (Array.isArray(entry.errors)) {
            return entry.errors.length > 0;
        }
    }
    return Boolean(value);
};

export const createSchemaFieldIndex = (node: unknown) => {
    const fieldNames = getSchemaFieldNames(node);
    const fieldNameSet = new Set(fieldNames);
    return {
        fieldNames,
        hasField: (fieldName: string) => { return fieldNameSet.has(fieldName); },
    };
};

export const hasSchemaErrors = (errors: Record<string, unknown> | undefined, node: unknown) => {
    if (!errors || !node) {
        return false;
    }
    const fieldNames = getSchemaFieldNames(node);
    return fieldNames.some((fieldName) => {
        return hasErrorValue(errors[fieldName]);
    });
};
