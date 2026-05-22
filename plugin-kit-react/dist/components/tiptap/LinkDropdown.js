import { cn } from "../../utils/classes.js";
import { hostOpenElementSelector } from "../../utils/hostBridge.js";
import "../../utils/index.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../DropdownMenu.js";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip.js";
import { Button } from "../Button.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/pro-solid-svg-icons";
import { useEditorState } from "@tiptap/react";
//#region src/components/tiptap/LinkDropdown.tsx
function openCraftElementModal(config, elementSiteId, linkSelectorStorageKeyPrefix, onSelect, getSelectedText) {
	if (!linkSelectorStorageKeyPrefix) throw new Error("LinkDropdown requires \"linkSelectorStorageKeyPrefix\" when using element selector links.");
	hostOpenElementSelector(config.elementType, {
		storageKey: `${linkSelectorStorageKeyPrefix}.${config.elementType}`,
		sources: config.sources,
		criteria: config.criteria,
		defaultSiteId: elementSiteId,
		autoFocusSearchBox: false,
		onSelect: (elements) => {
			if (elements?.length) {
				const [element] = elements;
				onSelect(`${element.url || ""}#${config.refHandle}:${element.id}@${element.siteId}`, getSelectedText() || element.label || "");
			}
		},
		closeOtherModals: false
	});
}
function isLinkOptionsArray(value) {
	return Array.isArray(value) && value.length > 0;
}
function getCraftOptionsFromLinkOptions(linkOptions) {
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
function LinkDropdown({ editor, linkOptions = {}, linkSelectorStorageKeyPrefix, openInsertLinkDialog, title }) {
	const t = useTranslation();
	const craftOptions = getCraftOptionsFromLinkOptions(linkOptions);
	const elementSiteId = !isLinkOptionsArray(linkOptions) ? linkOptions?.elementSiteId : void 0;
	const getSelectedText = () => {
		if (!editor) return "";
		const { from, to } = editor.state.selection;
		return editor.state.doc.textBetween(from, to, " ");
	};
	const handleCraftElementSelect = (url, text) => {
		openInsertLinkDialog({
			url,
			text
		});
	};
	const handleCraftOption = (config) => {
		openCraftElementModal(config, elementSiteId, linkSelectorStorageKeyPrefix, handleCraftElementSelect, getSelectedText);
	};
	const handleLinkToEntry = () => {
		const config = !isLinkOptionsArray(linkOptions) ? linkOptions?.linkToEntry : void 0;
		if (config) handleCraftOption(config);
		else openInsertLinkDialog();
	};
	const handleLinkToAsset = () => {
		const config = !isLinkOptionsArray(linkOptions) ? linkOptions?.linkToAsset : void 0;
		if (config) handleCraftOption(config);
		else openInsertLinkDialog();
	};
	const handleLinkToCategory = () => {
		const config = !isLinkOptionsArray(linkOptions) ? linkOptions?.linkToCategory : void 0;
		if (config) handleCraftOption(config);
		else openInsertLinkDialog();
	};
	const handleUnlink = () => {
		editor?.chain().focus().extendMarkRange("link").unsetLink().run();
	};
	const isLinkActive = useEditorState({
		editor,
		selector: ({ editor: ed }) => {
			return (ed?.isFocused && ed?.isActive("link")) ?? false;
		}
	});
	const showCraftOptions = !isLinkOptionsArray(linkOptions) && (linkOptions?.linkToEntry || linkOptions?.linkToAsset || linkOptions?.linkToCategory) || craftOptions.length > 0;
	const triggerButton = /* @__PURE__ */ jsx(Button, {
		variant: "transparent",
		className: cn("w-[32px] h-[32px]", "text-[#1c2e36]", "hover:bg-slate-100!", isLinkActive && "bg-slate-250! hover:bg-slate-250!"),
		children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
			icon: faLink,
			className: "size-4"
		})
	});
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [title ? /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, { render: /* @__PURE__ */ jsx(DropdownMenuTrigger, { render: triggerButton }) }), /* @__PURE__ */ jsx(TooltipContent, {
		sideOffset: 4,
		children: title
	})] }) : /* @__PURE__ */ jsx(DropdownMenuTrigger, { render: triggerButton }), /* @__PURE__ */ jsxs(DropdownMenuContent, {
		align: "start",
		side: "bottom",
		children: [
			showCraftOptions && /* @__PURE__ */ jsxs(Fragment, { children: [craftOptions.length > 0 ? craftOptions.map((option, index) => {
				return /* @__PURE__ */ jsx(DropdownMenuItem, {
					onClick: () => {
						return handleCraftOption(option);
					},
					children: option.optionTitle
				}, index);
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [
				!isLinkOptionsArray(linkOptions) && linkOptions?.linkToEntry && /* @__PURE__ */ jsx(DropdownMenuItem, {
					onClick: handleLinkToEntry,
					children: t("Link to an entry")
				}),
				!isLinkOptionsArray(linkOptions) && linkOptions?.linkToAsset && /* @__PURE__ */ jsx(DropdownMenuItem, {
					onClick: handleLinkToAsset,
					children: t("Link to an asset")
				}),
				!isLinkOptionsArray(linkOptions) && linkOptions?.linkToCategory && /* @__PURE__ */ jsx(DropdownMenuItem, {
					onClick: handleLinkToCategory,
					children: t("Link to a category")
				})
			] }), /* @__PURE__ */ jsx(DropdownMenuSeparator, {})] }),
			/* @__PURE__ */ jsx(DropdownMenuItem, {
				onClick: () => {
					const selected = getSelectedText();
					const { from, to } = editor?.state.selection ?? {};
					openInsertLinkDialog(typeof from === "number" && typeof to === "number" && from !== to ? {
						text: selected,
						from,
						to
					} : void 0);
				},
				children: t("Insert Link")
			}),
			/* @__PURE__ */ jsx(DropdownMenuItem, {
				onClick: handleUnlink,
				disabled: !isLinkActive,
				className: !isLinkActive ? "opacity-50" : "",
				children: t("Unlink")
			})
		]
	})] });
}
//#endregion
export { LinkDropdown };

//# sourceMappingURL=LinkDropdown.js.map