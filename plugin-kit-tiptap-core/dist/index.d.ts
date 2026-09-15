export type { VariableOption, VariableCategories } from './types/variable-option.js';
export { createTiptapExtensions, createTiptapInputExtensions, createVariableTagExtension, OneLinerDocument, FontVariantCaps, BackgroundColor, Color, FontFamily, FontSize, LineHeight, TextStyle, TextStyleKit, } from './extensions/index.js';
export type { CreateTiptapExtensionsOptions, CreateTiptapInputExtensionsOptions, VariableTagExtensionOptions, } from './extensions/index.js';
export { getRegisteredTiptapExtensions, getRegisteredTiptapToolbarControl, isRegisteredTiptapToolbarControl, registerTiptapExtension, registerTiptapToolbarControl, } from './registry.js';
export { registerTiptapTextStyleDefinition } from './text-style-definition.js';
export type { TiptapTextStyleCssProperty, TiptapTextStyleDefinition, } from './text-style-definition.js';
export { DEFAULT_TIPTAP_TEXT_STYLE_TOOLBAR_CONFIG, resolveTiptapTextStyleToolbarConfig, } from './text-style-toolbar.js';
export type { TiptapTextStyleColorOption, TiptapTextStyleOption, TiptapTextStyleToolbarConfig, } from './text-style-toolbar.js';
export type { TiptapDocumentSurface, TiptapExtensionFactory, TiptapExtensionRegistration, TiptapToolbarIcon, TiptapToolbarControl, } from './registry.js';
export { normalizeContentArray, valueToContent, getFatalTiptapContentError, } from './serialization/editor.js';
export type { VariableTagAttrs } from './serialization/input.js';
export { buildVariableTagAttrs, contentToValue, dedupeVariableOptions, flattenVariableOptions, getReferenceBaseToken, parseTokenWithDefault, replaceTokenWithVariable, resolveVariableTagByValue, resolveVariableTagLabel, valueToContent as inputValueToContent, } from './serialization/input.js';
export * from './links/index.js';
export { isTiptapButtonActive, isTiptapButtonName, runTiptapButton, } from './toolbar/index.js';
export type { BuiltInTiptapButtonName, RunTiptapButtonOptions, TiptapButtonName, TiptapTableInsertOptions, } from './toolbar/index.js';
export { expandPresetItems, flattenToolbarButtonNames, getToolbarGroupDefaultIcon, getToolbarGroupItems, getToolbarGroupMenuItems, getToolbarGroupTriggerState, isFormattingToolbarPreset, isHeadingsOnlyToolbarPreset, isToolbarButtonActive, isToolbarSeparatorToken, normalizeToolbarNodes, parseToolbarConfig, runToolbarButton, toolbarIncludesButton, } from './toolbar/index.js';
export type { ToolbarButtonNode, ToolbarFormattingPreset, ToolbarGroup, ToolbarGroupItemDefinition, ToolbarGroupMenuButton, ToolbarGroupMenuEntry, ToolbarGroupNode, ToolbarGroupPreset, ToolbarGroupTriggerState, ToolbarHeadingsPreset, ToolbarHeadingLevel, ToolbarIconName, ToolbarNode, ToolbarSeparatorNode, ToolbarSeparatorToken, } from './toolbar/index.js';
//# sourceMappingURL=index.d.ts.map