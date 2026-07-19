import { CraftSelectedElement, ElementSelectorHost, LinkElementConfig, LinkOptionSchemaItem, LinkOptionsInput, ParsedCraftElementLink } from './types.js';
export declare function isLinkOptionsArray(value: LinkOptionsInput | undefined): value is LinkOptionSchemaItem[];
export declare function getCraftLinkOptions(linkOptions: LinkOptionsInput | undefined): LinkOptionSchemaItem[];
export declare function getLinkOptionsElementSiteId(linkOptions: LinkOptionsInput | undefined): number | undefined;
export declare function hasCraftLinkOptions(linkOptions: LinkOptionsInput | undefined): boolean;
/**
 * Build a Craft element link URL with the standard ref fragment:
 * `https://example.com/page#refHandle:123@1`
 */
export declare function buildCraftElementLinkUrl(element: CraftSelectedElement, refHandle: string): string;
/** Parse a Craft element link URL back into its parts. */
export declare function parseCraftElementLink(href: string): ParsedCraftElementLink | null;
export declare function isCraftElementLink(href: string): boolean;
export declare function buildCraftElementSelectorStorageKey(linkSelectorStorageKeyPrefix: string, elementType: string): string;
export type OpenCraftElementLinkSelectorParams = {
    config: LinkElementConfig;
    elementSiteId?: number;
    linkSelectorStorageKeyPrefix?: string;
    getSelectedText: () => string;
    onSelect: (result: {
        url: string;
        text: string;
    }) => void;
    host: ElementSelectorHost;
};
/** Open Craft's element selector modal and return a Plugin Kit link URL on selection. */
export declare function openCraftElementLinkSelector({ config, elementSiteId, linkSelectorStorageKeyPrefix, getSelectedText, onSelect, host, }: OpenCraftElementLinkSelectorParams): void;
//# sourceMappingURL=craft-element.d.ts.map