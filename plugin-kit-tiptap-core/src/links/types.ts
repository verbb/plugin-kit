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

/** linkOptions can be the object format above, or an array from schema. */
export type LinkOptionsInput = LinkOptions | LinkOptionSchemaItem[];

export type CraftSelectedElement = {
    id?: number;
    siteId?: number;
    label?: string;
    url?: string;
};

export type ParsedCraftElementLink = {
    baseUrl: string;
    refHandle: string;
    id: number;
    siteId: number;
};

export type ElementSelectorOpenOptions = {
    storageKey: string;
    sources?: string[];
    criteria?: Record<string, unknown>;
    defaultSiteId?: number;
    autoFocusSearchBox?: boolean;
    onSelect: (elements: CraftSelectedElement[]) => void;
    closeOtherModals?: boolean;
};

export type ElementSelectorHost = {
    openElementSelector: (elementType: string, options: ElementSelectorOpenOptions) => void;
};

export type InsertLinkDialogState = {
    url: string;
    text: string;
    openInNewTab: boolean;
};

export type InsertLinkParams = InsertLinkDialogState & {
    from?: number;
    to?: number;
};

export type LinkMarkAttributes = {
    href: string;
    target?: string | null;
};

export type LinkEditState = {
    from: number;
    to: number;
    href: string;
    text: string;
    openInNewTab: boolean;
};
