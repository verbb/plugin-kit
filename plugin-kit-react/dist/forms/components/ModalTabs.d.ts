import { SchemaFormComponentProps } from '../engine/context';
export declare const useModalTabsErrors: () => Record<string, boolean>;
declare const ModalTabs: (({ children, schema, schemaNode, ...props }: SchemaFormComponentProps) => import("react/jsx-runtime").JSX.Element) & {
    usesSchemaNode: true;
};
declare function ModalTabsList({ children, ...props }: {
    [x: string]: any;
    children: any;
}): import("react/jsx-runtime").JSX.Element;
declare function ModalTabsTrigger({ children, value, ...props }: {
    [x: string]: any;
    children: any;
    value: any;
}): import("react/jsx-runtime").JSX.Element;
declare function ModalTabsContent({ children, value, ...props }: {
    [x: string]: any;
    children: any;
    value: any;
}): import("react/jsx-runtime").JSX.Element;
export { ModalTabs, ModalTabsList, ModalTabsTrigger, ModalTabsContent, };
//# sourceMappingURL=ModalTabs.d.ts.map