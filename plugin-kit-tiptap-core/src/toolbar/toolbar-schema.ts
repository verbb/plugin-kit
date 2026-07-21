import type { Editor } from '@tiptap/core';

import {
    isTiptapButtonActive,
    isTiptapButtonName,
    runTiptapButton,
    type RunTiptapButtonOptions,
    type TiptapButtonName,
} from './button-registry.js';

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

export type ToolbarGroupMenuEntry =
    | { type: 'item'; name: ToolbarGroupMenuButton }
    | { type: 'separator' };

/** Custom dropdown item — buttons, paragraph, or separators. */
export type ToolbarGroupItemDefinition =
    | ToolbarGroupMenuButton
    | ToolbarSeparatorToken
    | { type: 'separator' };

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

const DEFAULT_HEADING_LEVELS: ToolbarHeadingLevel[] = [1, 2, 3, 4];

const PRESET_DEFAULT_ICONS: Record<ToolbarGroupPreset, ToolbarIconName> = {
    formatting: 'paragraph',
    headings: 'heading',
    lists: 'unordered-list',
    align: 'align-left',
};

const VALID_PRESETS = new Set<string>(['formatting', 'headings', 'lists', 'align']);

export function isFormattingToolbarPreset(preset?: ToolbarGroupPreset): preset is ToolbarFormattingPreset {
    return preset === 'formatting';
}

export function isHeadingsOnlyToolbarPreset(preset?: ToolbarGroupPreset): preset is ToolbarHeadingsPreset {
    return preset === 'headings';
}

export function getToolbarGroupDefaultIcon(group: ToolbarGroup): ToolbarIconName {
    if (group.preset) {
        return PRESET_DEFAULT_ICONS[group.preset];
    }

    const items = getToolbarGroupItems(group);

    return items[0] ?? 'bold';
}

const SEPARATOR_TOKENS = new Set<string>(['|', 'separator']);

export function isToolbarSeparatorToken(value: string): value is ToolbarSeparatorToken {
    return SEPARATOR_TOKENS.has(value);
}

export function expandPresetItems(group: ToolbarGroup): TiptapButtonName[] {
    if (group.items?.length) {
        return group.items
            .filter((item): item is TiptapButtonName => typeof item === 'string' && isTiptapButtonName(item));
    }

    switch (group.preset) {
        case 'formatting': {
            const levels = group.headingLevels ?? DEFAULT_HEADING_LEVELS;
            return [
                ...levels.map((level) => `h${level}` as TiptapButtonName),
                'blockquote',
                'code-block',
            ];
        }
        case 'headings': {
            const levels = group.headingLevels ?? DEFAULT_HEADING_LEVELS;
            return levels.map((level) => `h${level}` as TiptapButtonName);
        }
        case 'lists':
            return ['unordered-list', 'ordered-list'];
        case 'align':
            return ['align-left', 'align-center', 'align-right', 'align-justify'];
        default:
            return [];
    }
}

export function getToolbarGroupItems(group: ToolbarGroup): TiptapButtonName[] {
    return expandPresetItems(group);
}

export function flattenToolbarButtonNames(nodes: ToolbarNode[]): TiptapButtonName[] {
    const names: TiptapButtonName[] = [];

    nodes.forEach((node) => {
        if (node.type === 'button') {
            names.push(node.name);
            return;
        }

        if (node.type === 'group') {
            names.push(...getToolbarGroupItems(node.group));
        }
    });

    return names;
}

export function toolbarIncludesButton(nodes: ToolbarNode[], buttonName: string): boolean {
    return flattenToolbarButtonNames(nodes).includes(buttonName as TiptapButtonName);
}

function normalizeGroupItemDefinition(raw: unknown): ToolbarGroupItemDefinition | null {
    if (typeof raw === 'string') {
        const token = raw.trim();

        if (!token) {
            return null;
        }

        if (isToolbarSeparatorToken(token)) {
            return token;
        }

        if (token === 'paragraph') {
            return 'paragraph';
        }

        return normalizeButtonName(token);
    }

    if (!raw || typeof raw !== 'object') {
        return null;
    }

    const record = raw as Record<string, unknown>;

    if (record.type === 'separator') {
        return { type: 'separator' };
    }

    if (record.type === 'item' && typeof record.name === 'string') {
        if (record.name === 'paragraph') {
            return 'paragraph';
        }

        return normalizeButtonName(record.name);
    }

    return null;
}

function normalizeGroupItemDefinitions(raw: unknown[]): ToolbarGroupItemDefinition[] {
    return raw
        .map((item) => normalizeGroupItemDefinition(item))
        .filter((item): item is ToolbarGroupItemDefinition => item !== null);
}

function isGroupItemSeparator(item: ToolbarGroupItemDefinition): boolean {
    return item === '|' || item === 'separator' || (typeof item === 'object' && item.type === 'separator');
}

function isToolbarGroupMenuButton(item: ToolbarGroupItemDefinition): item is ToolbarGroupMenuButton {
    return !isGroupItemSeparator(item);
}

function groupItemDefinitionsToMenuEntries(items: ToolbarGroupItemDefinition[]): ToolbarGroupMenuEntry[] {
    return items.flatMap<ToolbarGroupMenuEntry>((item) => {
        if (isGroupItemSeparator(item)) {
            return [{ type: 'separator' as const }];
        }

        if (!isToolbarGroupMenuButton(item)) {
            return [];
        }

        return [{ type: 'item' as const, name: item }];
    });
}

function getToolbarGroupMenuButtons(group: ToolbarGroup): ToolbarGroupMenuButton[] {
    return getToolbarGroupMenuItems(group)
        .filter((entry): entry is { type: 'item'; name: ToolbarGroupMenuButton } => entry.type === 'item')
        .map((entry) => entry.name);
}

function normalizeButtonName(value: string): TiptapButtonName | null {
    return isTiptapButtonName(value) ? value : null;
}

function normalizeHeadingLevels(value: unknown): ToolbarHeadingLevel[] | undefined {
    if (!Array.isArray(value)) {
        return undefined;
    }

    const levels = value
        .map((level) => Number(level))
        .filter((level): level is ToolbarHeadingLevel => [1, 2, 3, 4, 5, 6].includes(level));

    return levels.length > 0 ? levels : undefined;
}

function normalizeToolbarGroup(raw: Record<string, unknown>): ToolbarGroupNode | null {
    const source = typeof raw.group === 'object' && raw.group !== null
        ? raw.group as Record<string, unknown>
        : raw;

    const preset = typeof source.preset === 'string' ? source.preset : undefined;
    const label = typeof source.label === 'string' ? source.label : undefined;
    const iconRaw = typeof source.icon === 'string' ? source.icon : undefined;
    const icon = iconRaw ? normalizeButtonName(iconRaw) ?? undefined : undefined;
    const headingLevels = normalizeHeadingLevels(source.headingLevels);

    const items = Array.isArray(source.items)
        ? normalizeGroupItemDefinitions(source.items)
        : undefined;

    if (!preset && !items?.length) {
        return null;
    }

    if (preset && !VALID_PRESETS.has(preset)) {
        return null;
    }

    return {
        type: 'group',
        group: {
            ...(label ? { label } : {}),
            ...(icon ? { icon } : {}),
            ...(preset ? { preset: preset as ToolbarGroupPreset } : {}),
            ...(items?.length ? { items } : {}),
            ...(headingLevels ? { headingLevels } : {}),
        },
    };
}

function normalizeToolbarNode(raw: unknown): ToolbarNode | null {
    if (typeof raw === 'string') {
        const token = raw.trim();

        if (!token) {
            return null;
        }

        if (isToolbarSeparatorToken(token)) {
            return { type: 'separator' };
        }

        const buttonName = normalizeButtonName(token);

        return buttonName ? { type: 'button', name: buttonName } : null;
    }

    if (!raw || typeof raw !== 'object') {
        return null;
    }

    const record = raw as Record<string, unknown>;

    if (record.type === 'separator') {
        return { type: 'separator' };
    }

    if (record.type === 'button' && typeof record.name === 'string') {
        const buttonName = normalizeButtonName(record.name);
        return buttonName ? { type: 'button', name: buttonName } : null;
    }

    if (record.type === 'group' || record.preset || record.items || record.group) {
        return normalizeToolbarGroup(record);
    }

    if (typeof record.button === 'string') {
        const buttonName = normalizeButtonName(record.button);
        return buttonName ? { type: 'button', name: buttonName } : null;
    }

    return null;
}

export function normalizeToolbarNodes(raw: unknown[]): ToolbarNode[] {
    return raw
        .map((item) => normalizeToolbarNode(item))
        .filter((item): item is ToolbarNode => item !== null);
}

export function parseToolbarConfig(input: unknown): ToolbarNode[] {
    if (input === null || input === undefined || input === '') {
        return [
            { type: 'button', name: 'bold' },
            { type: 'button', name: 'italic' },
        ];
    }

    if (Array.isArray(input)) {
        const normalized = normalizeToolbarNodes(input);
        return normalized.length > 0 ? normalized : [
            { type: 'button', name: 'bold' },
            { type: 'button', name: 'italic' },
        ];
    }

    if (typeof input === 'string') {
        const trimmed = input.trim();

        if (!trimmed) {
            return [
                { type: 'button', name: 'bold' },
                { type: 'button', name: 'italic' },
            ];
        }

        if (trimmed.startsWith('[')) {
            try {
                const parsed = JSON.parse(trimmed) as unknown;
                return Array.isArray(parsed) ? parseToolbarConfig(parsed) : parseToolbarConfig(null);
            } catch {
                return parseToolbarConfig(null);
            }
        }

        return parseToolbarConfig(
            trimmed
                .split(',')
                .map((token) => token.trim())
                .filter(Boolean),
        );
    }

    return parseToolbarConfig(null);
}

export function runToolbarButton(
    editor: Editor,
    buttonName: string,
    options: RunTiptapButtonOptions = {},
): boolean {
    if (buttonName === 'paragraph') {
        return editor.chain().focus().setParagraph().run();
    }

    return runTiptapButton(editor, buttonName, options);
}

export function isToolbarButtonActive(editor: Editor, buttonName: string): boolean {
    if (buttonName === 'paragraph') {
        return editor.isActive('paragraph') && !editor.isActive('heading');
    }

    return isTiptapButtonActive(editor, buttonName);
}

function getActiveHeadingLevel(editor: Editor): ToolbarHeadingLevel | null {
    for (const level of [1, 2, 3, 4, 5, 6] as const) {
        if (editor.isActive('heading', { level })) {
            return level;
        }
    }

    return null;
}

export function getToolbarGroupTriggerState(
    editor: Editor,
    group: ToolbarGroup,
): ToolbarGroupTriggerState {
    const fallbackIcon = group.icon ?? getToolbarGroupDefaultIcon(group);
    const menuButtons = getToolbarGroupMenuButtons(group);

    if (isHeadingsOnlyToolbarPreset(group.preset)) {
        const activeLevel = getActiveHeadingLevel(editor);

        if (activeLevel) {
            const name = `h${activeLevel}` as TiptapButtonName;
            return {
                activeName: name,
                label: `H${activeLevel}`,
                isActive: true,
                icon: name,
            };
        }

        return {
            activeName: null,
            label: '',
            isActive: false,
            icon: 'heading',
        };
    }

    if (isFormattingToolbarPreset(group.preset)) {
        const activeLevel = getActiveHeadingLevel(editor);

        if (activeLevel) {
            const name = `h${activeLevel}` as TiptapButtonName;
            return {
                activeName: name,
                label: `H${activeLevel}`,
                isActive: true,
                icon: name,
            };
        }

        if (isToolbarButtonActive(editor, 'blockquote')) {
            return {
                activeName: 'blockquote',
                label: '',
                isActive: true,
                icon: 'blockquote',
            };
        }

        if (isToolbarButtonActive(editor, 'code-block')) {
            return {
                activeName: 'code-block',
                label: '',
                isActive: true,
                icon: 'code-block',
            };
        }

        return {
            activeName: 'paragraph',
            label: 'Text',
            isActive: isToolbarButtonActive(editor, 'paragraph'),
            icon: 'paragraph',
        };
    }

    const activeName = menuButtons.find((name) => isToolbarButtonActive(editor, name)) ?? null;

    if (activeName) {
        const icon = activeName === 'paragraph'
            ? 'paragraph'
            : (isTiptapButtonName(activeName) ? activeName : fallbackIcon);

        return {
            activeName: activeName === 'paragraph' ? 'paragraph' : activeName,
            label: activeName === 'paragraph' ? 'Text' : (group.label ?? activeName),
            isActive: true,
            icon,
        };
    }

    return {
        activeName: null,
        label: group.label ?? '',
        isActive: false,
        icon: fallbackIcon,
    };
}

function getFormattingHeadingLevels(group: ToolbarGroup): ToolbarHeadingLevel[] {
    return group.headingLevels ?? DEFAULT_HEADING_LEVELS;
}

function getFormattingMenuEntries(group: ToolbarGroup): ToolbarGroupMenuEntry[] {
    const headings = getFormattingHeadingLevels(group).map((level) => ({
        type: 'item' as const,
        name: `h${level}` as TiptapButtonName,
    }));

    return [
        { type: 'item', name: 'paragraph' },
        { type: 'separator' },
        ...headings,
        { type: 'separator' },
        { type: 'item', name: 'blockquote' },
        { type: 'item', name: 'code-block' },
    ];
}

export function getToolbarGroupMenuItems(group: ToolbarGroup): ToolbarGroupMenuEntry[] {
    if (group.items?.length) {
        return groupItemDefinitionsToMenuEntries(group.items);
    }

    if (isFormattingToolbarPreset(group.preset)) {
        return getFormattingMenuEntries(group);
    }

    return getToolbarGroupItems(group).map((name) => ({ type: 'item', name }));
}
