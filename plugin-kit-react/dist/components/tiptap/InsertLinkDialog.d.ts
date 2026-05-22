export type InsertLinkDialogState = {
    url: string;
    text: string;
    openInNewTab: boolean;
};
type InsertLinkDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues?: Partial<InsertLinkDialogState>;
    onInsert: (values: InsertLinkDialogState) => void;
};
export declare function InsertLinkDialog({ open, onOpenChange, initialValues, onInsert, }: InsertLinkDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=InsertLinkDialog.d.ts.map