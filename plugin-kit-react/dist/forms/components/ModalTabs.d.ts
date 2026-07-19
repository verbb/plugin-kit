import { ReactNode } from 'react';
import { SchemaFormComponentProps } from '../engine/context.js';
import { SchemaNode } from '@verbb/plugin-kit-forms';
export declare const useModalTabsErrors: () => Record<string, boolean>;
type ModalTabsRootProps = SchemaFormComponentProps & {
    children?: ReactNode;
    className?: string;
    value?: string;
    defaultValue?: string;
};
/**
 * Schema `$cmp: 'ModalTabs'` — wraps stock `Tabs` `variant="modal"`.
 * Owns tab ↔ schema error mapping (same contract as kit v1 ModalTabs).
 */
declare const ModalTabs: (({ children, schemaNode, schema, _id: _schemaId, _data: _schemaData, className, value: controlledValue, defaultValue, ...props }: ModalTabsRootProps & {
    schema?: SchemaNode;
    _id?: string;
    _data?: Record<string, unknown>;
}) => import("react/jsx-runtime").JSX.Element) & {
    usesSchemaNode: true;
};
declare function ModalTabsList({ children }: {
    children?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function ModalTabsTrigger({ children, value, className, ...props }: {
    children?: ReactNode;
    value?: string;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function ModalTabsContent({ children, className, ...props }: {
    children?: ReactNode;
    className?: string;
    value?: string;
}): import("react/jsx-runtime").JSX.Element;
export { ModalTabs, ModalTabsList, ModalTabsTrigger, ModalTabsContent, };
//# sourceMappingURL=ModalTabs.d.ts.map