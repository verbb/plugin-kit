import { ReactNode } from 'react';
import { SchemaFormComponentProps } from '../engine/context.js';
/**
 * Schema `$cmp: 'FieldWrap'` — labels a horizontal cluster of nested fields and
 * surfaces grouped nested errors on the wrapper (kit v1 FieldWrap contract).
 */
export declare const FieldWrap: (({ name, label, instructions, required, warning, children, schemaNode, }: SchemaFormComponentProps & {
    name?: string;
    label?: string;
    instructions?: string;
    required?: boolean;
    warning?: string;
    children?: ReactNode;
}) => import("react/jsx-runtime").JSX.Element) & {
    usesSchemaNode: true;
};
//# sourceMappingURL=FieldWrap.d.ts.map