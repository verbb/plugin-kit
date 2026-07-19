import { isTiptapButtonActive, isTiptapButtonName, runTiptapButton } from "./button-registry.js";
//#region src/toolbar/toolbar-schema.ts
var DEFAULT_HEADING_LEVELS = [
	1,
	2,
	3,
	4
];
var PRESET_DEFAULT_ICONS = {
	formatting: "paragraph",
	headings: "heading",
	lists: "unordered-list",
	align: "align-left"
};
var VALID_PRESETS = new Set([
	"formatting",
	"headings",
	"lists",
	"align"
]);
function isFormattingToolbarPreset(preset) {
	return preset === "formatting";
}
function isHeadingsOnlyToolbarPreset(preset) {
	return preset === "headings";
}
function getToolbarGroupDefaultIcon(group) {
	if (group.preset) return PRESET_DEFAULT_ICONS[group.preset];
	return getToolbarGroupItems(group)[0] ?? "bold";
}
var SEPARATOR_TOKENS = new Set(["|", "separator"]);
function isToolbarSeparatorToken(value) {
	return SEPARATOR_TOKENS.has(value);
}
function expandPresetItems(group) {
	if (group.items?.length) return group.items.filter((item) => typeof item === "string" && isTiptapButtonName(item));
	switch (group.preset) {
		case "formatting": return [
			...(group.headingLevels ?? DEFAULT_HEADING_LEVELS).map((level) => `h${level}`),
			"blockquote",
			"code-block"
		];
		case "headings": return (group.headingLevels ?? DEFAULT_HEADING_LEVELS).map((level) => `h${level}`);
		case "lists": return ["unordered-list", "ordered-list"];
		case "align": return [
			"align-left",
			"align-center",
			"align-right",
			"align-justify"
		];
		default: return [];
	}
}
function getToolbarGroupItems(group) {
	return expandPresetItems(group);
}
function flattenToolbarButtonNames(nodes) {
	const names = [];
	nodes.forEach((node) => {
		if (node.type === "button") {
			names.push(node.name);
			return;
		}
		if (node.type === "group") names.push(...getToolbarGroupItems(node.group));
	});
	return names;
}
function toolbarIncludesButton(nodes, buttonName) {
	return flattenToolbarButtonNames(nodes).includes(buttonName);
}
function normalizeGroupItemDefinition(raw) {
	if (typeof raw === "string") {
		const token = raw.trim();
		if (!token) return null;
		if (isToolbarSeparatorToken(token)) return token;
		if (token === "paragraph") return "paragraph";
		return normalizeButtonName(token);
	}
	if (!raw || typeof raw !== "object") return null;
	const record = raw;
	if (record.type === "separator") return { type: "separator" };
	if (record.type === "item" && typeof record.name === "string") {
		if (record.name === "paragraph") return "paragraph";
		return normalizeButtonName(record.name);
	}
	return null;
}
function normalizeGroupItemDefinitions(raw) {
	return raw.map((item) => normalizeGroupItemDefinition(item)).filter((item) => item !== null);
}
function isGroupItemSeparator(item) {
	return item === "|" || item === "separator" || typeof item === "object" && item.type === "separator";
}
function isToolbarGroupMenuButton(item) {
	return !isGroupItemSeparator(item);
}
function groupItemDefinitionsToMenuEntries(items) {
	return items.flatMap((item) => {
		if (isGroupItemSeparator(item)) return [{ type: "separator" }];
		if (!isToolbarGroupMenuButton(item)) return [];
		return [{
			type: "item",
			name: item
		}];
	});
}
function getToolbarGroupMenuButtons(group) {
	return getToolbarGroupMenuItems(group).filter((entry) => entry.type === "item").map((entry) => entry.name);
}
function normalizeButtonName(value) {
	return isTiptapButtonName(value) ? value : null;
}
function normalizeHeadingLevels(value) {
	if (!Array.isArray(value)) return;
	const levels = value.map((level) => Number(level)).filter((level) => [
		1,
		2,
		3,
		4,
		5,
		6
	].includes(level));
	return levels.length > 0 ? levels : void 0;
}
function normalizeToolbarGroup(raw) {
	const source = typeof raw.group === "object" && raw.group !== null ? raw.group : raw;
	const preset = typeof source.preset === "string" ? source.preset : void 0;
	const label = typeof source.label === "string" ? source.label : void 0;
	const iconRaw = typeof source.icon === "string" ? source.icon : void 0;
	const icon = iconRaw ? normalizeButtonName(iconRaw) ?? void 0 : void 0;
	const headingLevels = normalizeHeadingLevels(source.headingLevels);
	const items = Array.isArray(source.items) ? normalizeGroupItemDefinitions(source.items) : void 0;
	if (!preset && !items?.length) return null;
	if (preset && !VALID_PRESETS.has(preset)) return null;
	return {
		type: "group",
		group: {
			...label ? { label } : {},
			...icon ? { icon } : {},
			...preset ? { preset } : {},
			...items?.length ? { items } : {},
			...headingLevels ? { headingLevels } : {}
		}
	};
}
function normalizeToolbarNode(raw) {
	if (typeof raw === "string") {
		const token = raw.trim();
		if (!token) return null;
		if (isToolbarSeparatorToken(token)) return { type: "separator" };
		const buttonName = normalizeButtonName(token);
		return buttonName ? {
			type: "button",
			name: buttonName
		} : null;
	}
	if (!raw || typeof raw !== "object") return null;
	const record = raw;
	if (record.type === "separator") return { type: "separator" };
	if (record.type === "button" && typeof record.name === "string") {
		const buttonName = normalizeButtonName(record.name);
		return buttonName ? {
			type: "button",
			name: buttonName
		} : null;
	}
	if (record.type === "group" || record.preset || record.items || record.group) return normalizeToolbarGroup(record);
	if (typeof record.button === "string") {
		const buttonName = normalizeButtonName(record.button);
		return buttonName ? {
			type: "button",
			name: buttonName
		} : null;
	}
	return null;
}
function normalizeToolbarNodes(raw) {
	return raw.map((item) => normalizeToolbarNode(item)).filter((item) => item !== null);
}
function parseToolbarConfig(input) {
	if (input === null || input === void 0 || input === "") return [{
		type: "button",
		name: "bold"
	}, {
		type: "button",
		name: "italic"
	}];
	if (Array.isArray(input)) {
		const normalized = normalizeToolbarNodes(input);
		return normalized.length > 0 ? normalized : [{
			type: "button",
			name: "bold"
		}, {
			type: "button",
			name: "italic"
		}];
	}
	if (typeof input === "string") {
		const trimmed = input.trim();
		if (!trimmed) return [{
			type: "button",
			name: "bold"
		}, {
			type: "button",
			name: "italic"
		}];
		if (trimmed.startsWith("[")) try {
			const parsed = JSON.parse(trimmed);
			return Array.isArray(parsed) ? parseToolbarConfig(parsed) : parseToolbarConfig(null);
		} catch {
			return parseToolbarConfig(null);
		}
		return parseToolbarConfig(trimmed.split(",").map((token) => token.trim()).filter(Boolean));
	}
	return parseToolbarConfig(null);
}
function runToolbarButton(editor, buttonName, options = {}) {
	if (buttonName === "paragraph") return editor.chain().focus().setParagraph().run();
	return runTiptapButton(editor, buttonName, options);
}
function isToolbarButtonActive(editor, buttonName) {
	if (buttonName === "paragraph") return editor.isActive("paragraph") && !editor.isActive("heading");
	return isTiptapButtonActive(editor, buttonName);
}
function getActiveHeadingLevel(editor) {
	for (const level of [
		1,
		2,
		3,
		4,
		5,
		6
	]) if (editor.isActive("heading", { level })) return level;
	return null;
}
function getToolbarGroupTriggerState(editor, group) {
	const fallbackIcon = group.icon ?? getToolbarGroupDefaultIcon(group);
	const menuButtons = getToolbarGroupMenuButtons(group);
	if (isHeadingsOnlyToolbarPreset(group.preset)) {
		const activeLevel = getActiveHeadingLevel(editor);
		if (activeLevel) {
			const name = `h${activeLevel}`;
			return {
				activeName: name,
				label: `H${activeLevel}`,
				isActive: true,
				icon: name
			};
		}
		return {
			activeName: null,
			label: "",
			isActive: false,
			icon: "heading"
		};
	}
	if (isFormattingToolbarPreset(group.preset)) {
		const activeLevel = getActiveHeadingLevel(editor);
		if (activeLevel) {
			const name = `h${activeLevel}`;
			return {
				activeName: name,
				label: `H${activeLevel}`,
				isActive: true,
				icon: name
			};
		}
		if (isToolbarButtonActive(editor, "blockquote")) return {
			activeName: "blockquote",
			label: "",
			isActive: true,
			icon: "blockquote"
		};
		if (isToolbarButtonActive(editor, "code-block")) return {
			activeName: "code-block",
			label: "",
			isActive: true,
			icon: "code-block"
		};
		return {
			activeName: "paragraph",
			label: "Text",
			isActive: isToolbarButtonActive(editor, "paragraph"),
			icon: "paragraph"
		};
	}
	const activeName = menuButtons.find((name) => isToolbarButtonActive(editor, name)) ?? null;
	if (activeName) {
		const icon = activeName === "paragraph" ? "paragraph" : isTiptapButtonName(activeName) ? activeName : fallbackIcon;
		return {
			activeName: activeName === "paragraph" ? "paragraph" : activeName,
			label: activeName === "paragraph" ? "Text" : group.label ?? activeName,
			isActive: true,
			icon
		};
	}
	return {
		activeName: null,
		label: group.label ?? "",
		isActive: false,
		icon: fallbackIcon
	};
}
function getFormattingHeadingLevels(group) {
	return group.headingLevels ?? DEFAULT_HEADING_LEVELS;
}
function getFormattingMenuEntries(group) {
	return [
		{
			type: "item",
			name: "paragraph"
		},
		{ type: "separator" },
		...getFormattingHeadingLevels(group).map((level) => ({
			type: "item",
			name: `h${level}`
		})),
		{ type: "separator" },
		{
			type: "item",
			name: "blockquote"
		},
		{
			type: "item",
			name: "code-block"
		}
	];
}
function getToolbarGroupMenuItems(group) {
	if (group.items?.length) return groupItemDefinitionsToMenuEntries(group.items);
	if (isFormattingToolbarPreset(group.preset)) return getFormattingMenuEntries(group);
	return getToolbarGroupItems(group).map((name) => ({
		type: "item",
		name
	}));
}
//#endregion
export { expandPresetItems, flattenToolbarButtonNames, getToolbarGroupDefaultIcon, getToolbarGroupItems, getToolbarGroupMenuItems, getToolbarGroupTriggerState, isFormattingToolbarPreset, isHeadingsOnlyToolbarPreset, isToolbarButtonActive, isToolbarSeparatorToken, normalizeToolbarNodes, parseToolbarConfig, runToolbarButton, toolbarIncludesButton };

//# sourceMappingURL=toolbar-schema.js.map