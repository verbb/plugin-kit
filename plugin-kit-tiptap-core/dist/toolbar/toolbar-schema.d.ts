import { Editor } from '@tiptap/core';
import { RunTiptapButtonOptions, TiptapButtonName } from './button-registry.js';
/** Toolbar chrome icons that are not editor commands. */
export type ToolbarIconName = TiptapButtonName | 'paragraph' | 'heading';
export type ToolbarSeparatorToken = '|' | 'separator';
/** Paragraph, headings, blockquote, and code block. */
export type ToolbarFormattingPreset = 'formatting';
/** Heading levels only — TipTap-style trigger with icon menu items. */
export type ToolbarHeadingsPreset = 'headings';
export type ToolbarGroupPreset = ToolbarFormattingPreset | ToolbarHeadingsPreset | 'lists' | 'align';
export type ToolbarHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type ToolbarGroupMenuButton = TiptapButtonName | 'paragraph';
export type ToolbarGroupMenuEntry = {
    type: 'item';
    name: ToolbarGroupMenuButton;
} | {
    type: 'separator';
};
/** Custom dropdown item — buttons, paragraph, or separators. */
export type ToolbarGroupItemDefinition = ToolbarGroupMenuButton | ToolbarSeparatorToken | {
    type: 'separator';
};
export type ToolbarGroup = {
    label?: string;
    icon?: TiptapButtonName;
    preset?: ToolbarGroupPreset;
    items?: ToolbarGroupItemDefinition[];
    headingLevels?: ToolbarHeadingLevel[];
};
export type ToolbarButtonNode = {
    type: 'button';
    name: TiptapButtonName;
};
export type ToolbarSeparatorNode = {
    type: 'separator';
};
export type ToolbarGroupNode = {
    type: 'group';
    group: ToolbarGroup;
};
export type ToolbarNode = ToolbarButtonNode | ToolbarSeparatorNode | ToolbarGroupNode;
export type ToolbarGroupTriggerState = {
    /** Active item inside the group, or `paragraph` for formatting presets when in body text. */
    activeName: TiptapButtonName | 'paragraph' | null;
    /** Short label for the trigger (e.g. `H2`, `Text`). */
    label: string;
    /** Whether any item in the group is currently active. */
    isActive: boolean;
    /** Icon to render on the trigger when no text label is preferred. */
    icon: ToolbarIconName;
};
export declare function isFormattingToolbarPreset(preset?: ToolbarGroupPreset): preset is ToolbarFormattingPreset;
export declare function isHeadingsOnlyToolbarPreset(preset?: ToolbarGroupPreset): preset is ToolbarHeadingsPreset;
export declare function getToolbarGroupDefaultIcon(group: ToolbarGroup): ToolbarIconName;
export declare function isToolbarSeparatorToken(value: string): value is ToolbarSeparatorToken;
export declare function expandPresetItems(group: ToolbarGroup): TiptapButtonName[];
export declare function getToolbarGroupItems(group: ToolbarGroup): TiptapButtonName[];
export declare function flattenToolbarButtonNames(nodes: ToolbarNode[]): TiptapButtonName[];
export declare function toolbarIncludesButton(nodes: ToolbarNode[], buttonName: string): boolean;
export declare function normalizeToolbarNodes(raw: unknown[]): ToolbarNode[];
export declare function parseToolbarConfig(input: unknown): ToolbarNode[];
export declare function runToolbarButton(editor: Editor, buttonName: string, options?: RunTiptapButtonOptions): boolean;
export declare function isToolbarButtonActive(editor: Editor, buttonName: string): boolean;
export declare function getToolbarGroupTriggerState(editor: Editor, group: ToolbarGroup): ToolbarGroupTriggerState;
export declare function getToolbarGroupMenuItems(group: ToolbarGroup): ToolbarGroupMenuEntry[];
//# sourceMappingURL=toolbar-schema.d.ts.map