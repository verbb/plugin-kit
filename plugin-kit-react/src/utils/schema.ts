import * as JexlModule from 'jexl';

const Jexl = 'default' in JexlModule ? JexlModule.default : JexlModule;

const warnedConditions = new Set<string>();
type SchemaNode = Record<string, unknown> & {
    $field?: string;
    name?: string;
    children?: SchemaValue;
    schema?: SchemaValue;
};
type SchemaValue = SchemaNode | SchemaNode[] | null | undefined;

// Helper function to evaluate conditional expressions using Jexl
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

// Shared traversal function for schema nodes
export const traverseSchema = (node: SchemaValue, visitor: (node: SchemaNode) => void) => {
    if (Array.isArray(node)) {
        node.forEach((child) => { return traverseSchema(child, visitor); });
    } else if (node && typeof node === 'object') {
        // Visit this node
        visitor(node);

        // Skip iterating through children if this is a list field
        if (node.$field === 'list') {
            return;
        }

        // Recursively search all object properties
        Object.values(node).forEach((value) => {
            if (value && (typeof value === 'object' || Array.isArray(value))) {
                traverseSchema(value, visitor);
            }
        });
    }
};

// Extract fields from schema for validation - generic recursive approach
export const extractFields = (nodes: SchemaValue): SchemaNode[] => {
    const fields: SchemaNode[] = [];

    traverseSchema(nodes, (node) => {
        if (node.$field) {
            fields.push(node);
        }
    });

    return fields;
};

// Extract field names from schema content - generic recursive approach
export const extractFieldNames = (content: SchemaValue): string[] => {
    return extractFields(content)
        .map((field) => { return field.name; })
        .filter((name): name is string => { return typeof name === 'string'; });
};

// Normalize attributes for React compatibility
export const normalizeAttrs = (attrs: Record<string, unknown> = {}) => {
    const normalized: Record<string, unknown> & { class?: string; className?: string } = { ...attrs };

    // Convert 'class' to 'className' for React
    if (typeof normalized.class === 'string') {
        normalized.className = normalized.class;
        delete normalized.class;
    }

    return normalized;
};
