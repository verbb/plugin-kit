//#region src/links/craft-element.ts
function isLinkOptionsArray(value) {
	return Array.isArray(value) && value.length > 0;
}
function getCraftLinkOptions(linkOptions) {
	if (!linkOptions) return [];
	if (isLinkOptionsArray(linkOptions)) return linkOptions;
	const items = [];
	if (linkOptions.linkToEntry) items.push({
		...linkOptions.linkToEntry,
		optionTitle: "Link to an entry"
	});
	if (linkOptions.linkToAsset) items.push({
		...linkOptions.linkToAsset,
		optionTitle: "Link to an asset"
	});
	if (linkOptions.linkToCategory) items.push({
		...linkOptions.linkToCategory,
		optionTitle: "Link to a category"
	});
	return items;
}
function getLinkOptionsElementSiteId(linkOptions) {
	if (!linkOptions || isLinkOptionsArray(linkOptions)) return;
	return linkOptions.elementSiteId;
}
function hasCraftLinkOptions(linkOptions) {
	return getCraftLinkOptions(linkOptions).length > 0;
}
/**
* Build a Craft element link URL with the standard ref fragment:
* `https://example.com/page#refHandle:123@1`
*/
function buildCraftElementLinkUrl(element, refHandle) {
	return `${element.url || ""}#${refHandle}:${element.id}@${element.siteId}`;
}
/** Parse a Craft element link URL back into its parts. */
function parseCraftElementLink(href) {
	const hashIndex = href.indexOf("#");
	if (hashIndex === -1) return null;
	const baseUrl = href.slice(0, hashIndex);
	const match = href.slice(hashIndex + 1).match(/^([^:]+):(\d+)@(\d+)$/);
	if (!match) return null;
	return {
		baseUrl,
		refHandle: match[1],
		id: Number(match[2]),
		siteId: Number(match[3])
	};
}
function isCraftElementLink(href) {
	return parseCraftElementLink(href) !== null;
}
function buildCraftElementSelectorStorageKey(linkSelectorStorageKeyPrefix, elementType) {
	return `${linkSelectorStorageKeyPrefix}.${elementType}`;
}
/** Open Craft's element selector modal and return a Plugin Kit link URL on selection. */
function openCraftElementLinkSelector({ config, elementSiteId, linkSelectorStorageKeyPrefix, getSelectedText, onSelect, host }) {
	if (!linkSelectorStorageKeyPrefix) throw new Error("Craft element links require \"linkSelectorStorageKeyPrefix\".");
	host.openElementSelector(config.elementType, {
		storageKey: buildCraftElementSelectorStorageKey(linkSelectorStorageKeyPrefix, config.elementType),
		sources: config.sources,
		criteria: config.criteria,
		defaultSiteId: elementSiteId,
		autoFocusSearchBox: false,
		onSelect: (elements) => {
			if (!elements?.length) return;
			const [element] = elements;
			onSelect({
				url: buildCraftElementLinkUrl(element, config.refHandle),
				text: getSelectedText() || element.label || ""
			});
		},
		closeOtherModals: false
	});
}
//#endregion
export { buildCraftElementLinkUrl, buildCraftElementSelectorStorageKey, getCraftLinkOptions, getLinkOptionsElementSiteId, hasCraftLinkOptions, isCraftElementLink, isLinkOptionsArray, openCraftElementLinkSelector, parseCraftElementLink };

//# sourceMappingURL=craft-element.js.map