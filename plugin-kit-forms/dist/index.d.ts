export declare const buildGroupedMessage: (message: string, parentLabel?: string, childLabel?: string) => string;

export declare type ConditionDataResolver = (values: FormValues, field?: SchemaNode) => Record<string, unknown>;

export declare const createSchemaFieldIndex: (node: unknown) => {
    fieldNames: string[];
    hasField: (fieldName: string) => boolean;
};

export declare const createValidationEngine: (index: SchemaIndex, options?: {
    conditionDataResolver?: ConditionDataResolver;
}) => {
    validate: (values: FormValues) => ValidationResult;
};

export declare const emailOrVariableRule: (value: unknown, label: string) => string | null;

export declare const emailRule: (value: unknown, label: string) => string | null;

export declare const evaluateCondition: (condition: string | undefined, data: Record<string, unknown>) => any;

export declare const extractFieldNames: (content: TraversalValue) => string[];

export declare const extractFields: (nodes: TraversalValue) => TraversalNode[];

export declare type FieldEntry = {
    path: string;
    field: SchemaNode;
};

export declare type FormState = {
    values: Record<string, unknown>;
    errors: Record<string, string[]>;
    touched: Set<string>;
    dirty: Set<string>;
};

export declare class FormStateStore {
    state: FormState;
    private listeners;
    private initialValues;
    constructor(initialValues?: Record<string, unknown>);
    subscribe(listener: FormSubscriber): () => void;
    notify(): void;
    getValue(path: string): unknown;
    setValue(path: string, value: unknown): void;
    setValues(values: Record<string, unknown>): void;
    setErrors(errors: Record<string, string[]>): void;
    clearErrors(): void;
    setTouched(path: string, touched?: boolean): void;
    reset(values?: Record<string, unknown>): void;
}

declare type FormSubscriber = () => void;

export declare type FormValues = Record<string, unknown>;

export declare const getSchemaFieldNames: (node: unknown) => string[];

export declare const handleRule: (value: unknown) => string | null;

export declare const hasSchemaErrors: (errors: Record<string, unknown> | undefined, node: unknown) => boolean;

export declare const isRequiredRuleName: (ruleName: string) => boolean;

export declare const maxRule: (value: unknown, label: string, args: string[]) => string | null;

export declare const minRule: (value: unknown, label: string, args: string[]) => string | null;

export declare type NestedFormApi = {
    path: string;
    validate: () => {
        fields: Record<string, string[]>;
    } | undefined;
    getValues: () => FormValues;
};

export declare const normalizeSchema: (items: SchemaRenderable, path?: string) => SchemaRenderable;

export declare const REQUIRED_RULE_NAMES: Set<string>;

/**
 * Required check for TipTap/ProseMirror JSON fields (`validation: 'requiredRichText'`).
 * Empty docs are JSON (`[]` / bare paragraphs), not `''` — handled via `isEmptyValue`.
 */
export declare const requiredRichTextRule: (value: unknown, label: string) => string | null;

export declare const requiredRule: (value: unknown, label: string) => string | null;

declare type RuleContext = {
    path: string;
    values: Record<string, unknown>;
    field: SchemaNode;
};

export declare type RuleHandler = (value: unknown, label: string, args: string[], context?: RuleHandlerContext) => string | null;

export declare type RuleHandlerContext = {
    path: string;
    values: Record<string, unknown>;
    field: SchemaNode;
};

export declare const ruleHandlers: Record<string, RuleHandler>;

export declare type SchemaFieldApi = {
    state: {
        value: unknown;
    };
    handleChange: (valueOrEvent: unknown) => void;
    handleBlur: () => void;
    errors: string[];
};

export declare type SchemaIndex = {
    schema: SchemaRenderable;
    fieldEntries: FieldEntry[];
};

export declare type SchemaNode = {
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

export declare type SchemaRenderable = SchemaNode | string | SchemaRenderable[];

export declare const setTranslateFunction: (fn?: (category: string, message: string, params?: TranslateParams) => string) => void;

export declare const setTranslationCategory: (category: string) => void;

export declare const translate: (message: string, params?: TranslateParams) => string;

export declare type TranslateParams = Record<string, string>;

declare type TraversalNode = Record<string, unknown> & {
    $field?: string;
    name?: string;
    children?: TraversalValue;
    schema?: TraversalValue;
};

declare type TraversalValue = TraversalNode | TraversalNode[] | null | undefined;

export declare const traverseSchema: (node: TraversalValue, visitor: (node: TraversalNode) => void) => void;

export declare const uniqueHandleRule: (value: unknown, label: string, args: string[], context?: RuleContext) => string | null;

export declare type ValidationResult = {
    fields: Record<string, string[]>;
} | undefined;

export { }
