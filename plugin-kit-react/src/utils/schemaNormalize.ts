type SchemaNormalizeNode = Record<string, unknown> & {
    children?: SchemaNormalizeValue;
    schema?: SchemaNormalizeValue;
    $el?: string;
    $cmp?: string;
    $field?: string;
    name?: string;
    schemaChildPrefix?: string;
};

type SchemaNormalizeValue = SchemaNormalizeNode | SchemaNormalizeNode[] | null | undefined;

export const normalizeSchemaNode = (node: SchemaNormalizeValue): SchemaNormalizeValue => {
    if (Array.isArray(node)) {
        return node.map(normalizeSchemaNode);
    }

    if (!node || typeof node !== 'object') {
        return node;
    }

    const next: SchemaNormalizeNode = { ...node };

    if (next.children) {
        const children = Array.isArray(next.children) ? next.children : [next.children];
        next.children = children.map(normalizeSchemaNode);

        if (!next.schema && (next.$el || next.$cmp || next.$field)) {
            next.schema = next.children;
        }
    }

    if (next.schema) {
        const schemaChildren = Array.isArray(next.schema) ? next.schema : [next.schema];
        next.schema = schemaChildren.map(normalizeSchemaNode);
    }

    if ((next.$field === 'list' || next.$field === 'table') && next.name && next.schema && !next.schemaChildPrefix) {
        next.schemaChildPrefix = `${next.name}.*.`;
    }

    return next;
};
