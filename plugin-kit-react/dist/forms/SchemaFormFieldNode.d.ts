import { ReactNode } from 'react';
import { SchemaNode } from '@verbb/plugin-kit-forms';
import { SchemaFormEngineApi } from './engine/context.js';
type SchemaFormFieldNodeProps = {
    fieldType: string;
    schema: SchemaNode;
    field: Record<string, unknown>;
    form: SchemaFormEngineApi;
    children?: ReactNode;
};
export declare const SchemaFormFieldNode: import('react').MemoExoticComponent<({ fieldType, schema, field, form, children, }: SchemaFormFieldNodeProps) => import('react').ReactElement<import('./index.js').SchemaFormFieldComponentProps, string | import('react').JSXElementConstructor<any>> | null>;
export {};
//# sourceMappingURL=SchemaFormFieldNode.d.ts.map