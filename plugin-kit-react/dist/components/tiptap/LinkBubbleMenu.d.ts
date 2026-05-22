import { Editor } from '@tiptap/core';
type LinkBubbleMenuProps = {
    editor: Editor | null | undefined;
    onEdit: () => void;
    /** When true, hide the bubble (e.g. when Insert Link dialog is open) so it doesn't stack above the dialog */
    dialogOpen?: boolean;
};
export declare function LinkBubbleMenu({ editor, onEdit, dialogOpen }: LinkBubbleMenuProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=LinkBubbleMenu.d.ts.map