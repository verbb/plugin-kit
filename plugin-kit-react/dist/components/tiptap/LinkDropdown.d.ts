import { Editor } from '@tiptap/core';
export type LinkElementConfig = {
    elementType: string;
    refHandle: string;
    sources?: string[];
    criteria?: Record<string, unknown>;
};
export type LinkOptionSchemaItem = LinkElementConfig & {
    optionTitle: string;
};
export type LinkOptions = {
    elementSiteId?: number;
    linkToEntry?: LinkElementConfig;
    linkToAsset?: LinkElementConfig;
    linkToCategory?: LinkElementConfig;
};
/** linkOptions can be the object format above, or an array from schema: { optionTitle, elementType, refHandle, sources?, criteria? }[] */
export type LinkOptionsInput = LinkOptions | LinkOptionSchemaItem[];
type LinkDropdownProps = {
    editor: Editor | null | undefined;
    linkOptions?: LinkOptionsInput;
    linkSelectorStorageKeyPrefix?: string;
    openInsertLinkDialog: (initial?: {
        url?: string;
        text?: string;
        from?: number;
        to?: number;
    }) => void;
    title?: string;
};
declare global {
    interface Window {
        Craft?: {
            createElementSelectorModal?: (elementType: string, options: {
                storageKey: string;
                sources?: string[];
                criteria?: Record<string, unknown>;
                defaultSiteId?: number;
                autoFocusSearchBox?: boolean;
                onSelect: (elements: Array<{
                    url?: string;
                    label?: string;
                    id?: number;
                    siteId?: number;
                }>) => void;
                closeOtherModals?: boolean;
            }) => void;
        };
    }
}
export declare function LinkDropdown({ editor, linkOptions, linkSelectorStorageKeyPrefix, openInsertLinkDialog, title, }: LinkDropdownProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LinkDropdown.d.ts.map