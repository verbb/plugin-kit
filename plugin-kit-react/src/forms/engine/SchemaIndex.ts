export type SchemaNode = {
    _id?: string;
    _data?: Record<string, unknown>;
    _scopePath?: string;
    name?: string;
    label?: string;
    required?: boolean;
    validation?: string;
    columns?: unknown[];
    children?: SchemaRenderable;
    schema?: SchemaRenderable;
    schemaChildPrefix?: string;
    $field?: string;
    $cmp?: string;
    $el?: string;
    type?: string;
    if?: string;
    hideOnIf?: boolean;
    attrs?: Record<string, unknown>;
    props?: Record<string, unknown>;
    [key: string]: unknown;
};

export type SchemaRenderable = SchemaNode | string | SchemaRenderable[];

export type FieldEntry = {
    path: string;
    field: SchemaNode;
};

export type SchemaIndex = {
    schema: SchemaRenderable;
    fieldEntries: FieldEntry[];
};

export const normalizeSchema = (items: SchemaRenderable, path = 'root'): SchemaRenderable => {
    if (Array.isArray(items)) {
        return items.map((item, index) => {
            return normalizeSchema(item, `${path}.${index}`);
        });
    }

    if (!items || typeof items !== 'object') {
        return items;
    }

    const itemWithId: SchemaNode = { ...items };
    const itemPath = path || 'root';

    if (!itemWithId._id) {
        itemWithId._id = `schema_${itemPath}`;
    }

    if (Array.isArray(itemWithId.children)) {
        itemWithId.children = itemWithId.children.map((child, index) => {
            return normalizeSchema(child, `${itemPath}.children.${index}`);
        });
    }

    if (Array.isArray(itemWithId.schema)) {
        itemWithId.schema = itemWithId.schema.map((child, index) => {
            return normalizeSchema(child, `${itemPath}.schema.${index}`);
        });
    }

    return itemWithId;
};
