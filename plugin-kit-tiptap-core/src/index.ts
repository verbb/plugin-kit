export type { VariableOption, VariableCategories } from './types/variable-option.js';

export {
    createTiptapExtensions,
    createTiptapInputExtensions,
    createVariableTagExtension,
    OneLinerDocument,
} from './extensions/index.js';
export type {
    CreateTiptapExtensionsOptions,
    CreateTiptapInputExtensionsOptions,
    VariableTagExtensionOptions,
} from './extensions/index.js';

export {
    normalizeContentArray,
    valueToContent,
    getFatalTiptapContentError,
} from './serialization/editor.js';

export type { VariableTagAttrs } from './serialization/input.js';
export {
    buildVariableTagAttrs,
    contentToValue,
    dedupeVariableOptions,
    flattenVariableOptions,
    getReferenceBaseToken,
    parseTokenWithDefault,
    replaceTokenWithVariable,
    resolveVariableTagByValue,
    resolveVariableTagLabel,
    valueToContent as inputValueToContent,
} from './serialization/input.js';

export * from './links/index.js';

export {
    isTiptapButtonActive,
    isTiptapButtonName,
    runTiptapButton,
} from './toolbar/index.js';
export type {
    RunTiptapButtonOptions,
    TiptapButtonName,
    TiptapTableInsertOptions,
} from './toolbar/index.js';
export {
    expandPresetItems,
    flattenToolbarButtonNames,
    getToolbarGroupDefaultIcon,
    getToolbarGroupItems,
    getToolbarGroupMenuItems,
    getToolbarGroupTriggerState,
    isFormattingToolbarPreset,
    isHeadingsOnlyToolbarPreset,
    isToolbarButtonActive,
    isToolbarSeparatorToken,
    normalizeToolbarNodes,
    parseToolbarConfig,
    runToolbarButton,
    toolbarIncludesButton,
} from './toolbar/index.js';
export type {
    ToolbarButtonNode,
    ToolbarFormattingPreset,
    ToolbarGroup,
    ToolbarGroupItemDefinition,
    ToolbarGroupMenuButton,
    ToolbarGroupMenuEntry,
    ToolbarGroupNode,
    ToolbarGroupPreset,
    ToolbarGroupTriggerState,
    ToolbarHeadingsPreset,
    ToolbarHeadingLevel,
    ToolbarIconName,
    ToolbarNode,
    ToolbarSeparatorNode,
    ToolbarSeparatorToken,
} from './toolbar/index.js';
