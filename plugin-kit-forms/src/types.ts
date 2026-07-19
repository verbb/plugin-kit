export type FormValues = Record<string, unknown>;

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

export type SchemaFieldApi = {
    state: { value: unknown };
    handleChange: (valueOrEvent: unknown) => void;
    handleBlur: () => void;
    errors: string[];
};

export type NestedFormApi = {
    path: string;
    validate: () => { fields: Record<string, string[]> } | undefined;
    getValues: () => FormValues;
};

export type ConditionDataResolver = (values: FormValues, field?: SchemaNode) => Record<string, unknown>;

export type ValidationResult = { fields: Record<string, string[]> } | undefined;
