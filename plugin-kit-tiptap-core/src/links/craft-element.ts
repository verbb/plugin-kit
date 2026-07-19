import type {
    CraftSelectedElement,
    ElementSelectorHost,
    LinkElementConfig,
    LinkOptionSchemaItem,
    LinkOptionsInput,
    ParsedCraftElementLink,
} from './types.js';

export function isLinkOptionsArray(value: LinkOptionsInput | undefined): value is LinkOptionSchemaItem[] {
    return Array.isArray(value) && value.length > 0;
}

export function getCraftLinkOptions(linkOptions: LinkOptionsInput | undefined): LinkOptionSchemaItem[] {
    if (!linkOptions) {
        return [];
    }

    if (isLinkOptionsArray(linkOptions)) {
        return linkOptions;
    }

    const items: LinkOptionSchemaItem[] = [];

    if (linkOptions.linkToEntry) {
        items.push({ ...linkOptions.linkToEntry, optionTitle: 'Link to an entry' });
    }

    if (linkOptions.linkToAsset) {
        items.push({ ...linkOptions.linkToAsset, optionTitle: 'Link to an asset' });
    }

    if (linkOptions.linkToCategory) {
        items.push({ ...linkOptions.linkToCategory, optionTitle: 'Link to a category' });
    }

    return items;
}

export function getLinkOptionsElementSiteId(linkOptions: LinkOptionsInput | undefined): number | undefined {
    if (!linkOptions || isLinkOptionsArray(linkOptions)) {
        return undefined;
    }

    return linkOptions.elementSiteId;
}

export function hasCraftLinkOptions(linkOptions: LinkOptionsInput | undefined): boolean {
    return getCraftLinkOptions(linkOptions).length > 0;
}

/**
 * Build a Craft element link URL with the standard ref fragment:
 * `https://example.com/page#refHandle:123@1`
 */
export function buildCraftElementLinkUrl(
    element: CraftSelectedElement,
    refHandle: string,
): string {
    return `${element.url || ''}#${refHandle}:${element.id}@${element.siteId}`;
}

/** Parse a Craft element link URL back into its parts. */
export function parseCraftElementLink(href: string): ParsedCraftElementLink | null {
    const hashIndex = href.indexOf('#');

    if (hashIndex === -1) {
        return null;
    }

    const baseUrl = href.slice(0, hashIndex);
    const fragment = href.slice(hashIndex + 1);
    const match = fragment.match(/^([^:]+):(\d+)@(\d+)$/);

    if (!match) {
        return null;
    }

    return {
        baseUrl,
        refHandle: match[1],
        id: Number(match[2]),
        siteId: Number(match[3]),
    };
}

export function isCraftElementLink(href: string): boolean {
    return parseCraftElementLink(href) !== null;
}

export function buildCraftElementSelectorStorageKey(
    linkSelectorStorageKeyPrefix: string,
    elementType: string,
): string {
    return `${linkSelectorStorageKeyPrefix}.${elementType}`;
}

export type OpenCraftElementLinkSelectorParams = {
    config: LinkElementConfig;
    elementSiteId?: number;
    linkSelectorStorageKeyPrefix?: string;
    getSelectedText: () => string;
    onSelect: (result: { url: string; text: string }) => void;
    host: ElementSelectorHost;
};

/** Open Craft's element selector modal and return a Plugin Kit link URL on selection. */
export function openCraftElementLinkSelector({
    config,
    elementSiteId,
    linkSelectorStorageKeyPrefix,
    getSelectedText,
    onSelect,
    host,
}: OpenCraftElementLinkSelectorParams): void {
    if (!linkSelectorStorageKeyPrefix) {
        throw new Error('Craft element links require "linkSelectorStorageKeyPrefix".');
    }

    host.openElementSelector(config.elementType, {
        storageKey: buildCraftElementSelectorStorageKey(linkSelectorStorageKeyPrefix, config.elementType),
        sources: config.sources,
        criteria: config.criteria,
        defaultSiteId: elementSiteId,
        autoFocusSearchBox: false,
        onSelect: (elements) => {
            if (!elements?.length) {
                return;
            }

            const [element] = elements;
            const url = buildCraftElementLinkUrl(element, config.refHandle);
            const text = getSelectedText() || element.label || '';

            onSelect({ url, text });
        },
        closeOtherModals: false,
    });
}
