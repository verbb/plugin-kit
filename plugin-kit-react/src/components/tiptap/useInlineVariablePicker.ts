import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Editor } from '@tiptap/core';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import type { EditorView } from '@tiptap/pm/view';
import {
    buildVariableTagAttrs,
    replaceTokenWithVariable,
} from './variableSerialization';
import type { VariableCategories, VariableOption } from './VariableDropdown';
import type { FilteredVariables } from './InlineVariablePickerPopover';
import { getVariableCategoryEntries, matchesVariableQuery, toTopLevelGroups } from './variablePickerUtils';

/** Keep cursor placeholders from blocking inline variable trigger matching. */
const INLINE_TRIGGER_REGEX = /(?:^|[\s\u200B\u2060])@([A-Za-z0-9:_-]*)$/;

function getFilteredVariables(
    t: (msg: string) => string,
    variableCategories: VariableCategories,
    variableCategoryLabels: Record<string, string> | undefined,
    variableCategoryOrder: string[] | undefined,
    query: string,
    activeParent: VariableOption | null,
): FilteredVariables {
    const entries = getVariableCategoryEntries(variableCategories, variableCategoryLabels, variableCategoryOrder);
    const groupedTopLevelOptions = toTopLevelGroups(entries, t);

    const q = query.trim().toLowerCase();

    if (activeParent?.children?.length) {
        const { children } = activeParent;
        if (!q) {
            return { groups: [], options: children.slice(0, 50), isChildMode: true };
        }
        const filtered = children
            .filter((item) => {
                return matchesVariableQuery(item, q);
            })
            .slice(0, 50);
        return { groups: [], options: filtered, isChildMode: true };
    }

    if (!q) {
        const options = groupedTopLevelOptions.flatMap((g) => {
            return g.items;
        }).slice(0, 100);
        return { groups: groupedTopLevelOptions, options, isChildMode: false };
    }

    const filteredGroups = groupedTopLevelOptions
        .map((group) => {
            return {
                ...group,
                items: group.items.filter((item) => {
                    const baseMatch = matchesVariableQuery(item, q);
                    if (baseMatch) {
                        return true;
                    }

                    const children = Array.isArray(item.children) ? item.children : [];
                    return children.some((c) => {
                        return matchesVariableQuery(c, q);
                    });
                }),
            };
        })
        .filter((g) => {
            return g.items.length > 0;
        });

    // Build options in the SAME order as VariableCommandList renders:
    // for each (group, item): [parent if showParent] + [matching children]
    const options: VariableOption[] = [];
    for (const group of filteredGroups) {
        for (let ii = 0; ii < group.items.length; ii++) {
            const item = group.items[ii];
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const parentMatches = matchesVariableQuery(item, q);
            const showParent = !hasChildren || parentMatches;
            if (showParent) {
                options.push(item);
            }
            if (hasChildren) {
                for (const child of item.children!) {
                    const childMatches = matchesVariableQuery(child, q);
                    if (childMatches) {
                        options.push(child);
                    }
                }
            }
            if (options.length >= 100) {
                break;
            }
        }
        if (options.length >= 100) {
            break;
        }
    }
    return { groups: filteredGroups, options, isChildMode: false };
}

export type InlinePickerState = {
    open: boolean;
    query: string;
    from: number;
    to: number;
    top: number;
    left: number;
    selectedIndex: number;
    activeParent: VariableOption | null;
};

export type InlineVariablePickerHandleKeyDown = (view: EditorView, event: KeyboardEvent) => boolean;

export function useInlineVariablePicker(
    editor: Editor | null,
    options: {
        variableCategories: VariableCategories;
        variableCategoryLabels?: Record<string, string>;
        variableCategoryOrder?: string[];
        variablePickerTriggerCharacters?: string[];
        disabled?: boolean;
        readOnly?: boolean;
        wrapperRef: React.RefObject<HTMLDivElement | null>;
        onOpenDropdown?: () => void;
    },
) {
    const {
        variableCategories,
        variableCategoryLabels,
        variableCategoryOrder,
        variablePickerTriggerCharacters = ['@'],
        disabled = false,
        readOnly = false,
        wrapperRef,
        onOpenDropdown,
    } = options;

    const t = useTranslation();

    const [state, setState] = useState<InlinePickerState>({
        open: false,
        query: '',
        from: 0,
        to: 0,
        top: 0,
        left: 0,
        selectedIndex: -1,
        activeParent: null,
    });

    const filteredVariables = useMemo(() => {
        return getFilteredVariables(
            t,
            variableCategories,
            variableCategoryLabels,
            variableCategoryOrder,
            state.query,
            state.activeParent,
        );
    }, [t, variableCategories, variableCategoryLabels, variableCategoryOrder, state.query, state.activeParent]);

    const updateFromCursor = useCallback(() => {
        if (!editor || readOnly || disabled) {
            return;
        }

        const { state: editorState, view } = editor;
        const { selection } = editorState;

        if (!selection.empty) {
            setState((prev) => {
                return prev.open ? { ...prev, open: false, query: '', selectedIndex: -1 } : prev;
            });
            return;
        }

        const cursorPos = selection.from;
        const start = Math.max(0, cursorPos - 120);
        const textBefore = editorState.doc.textBetween(start, cursorPos, '\n');
        const match = textBefore.match(INLINE_TRIGGER_REGEX);

        if (!match) {
            setState((prev) => {
                return prev.open ? { ...prev, open: false, query: '', selectedIndex: -1 } : prev;
            });
            return;
        }

        const query = match[1] ?? '';
        const tokenLength = query.length + 1;
        const tokenFrom = cursorPos - tokenLength;
        const coords = view.coordsAtPos(cursorPos);
        const wrapperRect = wrapperRef.current?.getBoundingClientRect();
        if (!wrapperRect) {
            return;
        }

        setState((prev) => {
            return {
                ...prev,
                open: true,
                query,
                from: tokenFrom,
                to: cursorPos,
                top: coords.bottom - wrapperRect.top + 4,
                left: coords.left - wrapperRect.left,
                activeParent: prev.activeParent,
            };
        });
    }, [disabled, editor, readOnly, wrapperRef]);

    const handleSelect = (selected: VariableOption, baseVariableOpt?: VariableOption) => {
        if (!selected) {
            return;
        }

        if (Array.isArray(selected.children) && selected.children.length > 0) {
            setState((prev) => {
                return {
                    ...prev,
                    activeParent: selected,
                    query: '',
                    selectedIndex: -1,
                };
            });
            return;
        }

        const baseVariable = baseVariableOpt ?? state.activeParent ?? selected;
        const tagAttrs = buildVariableTagAttrs(baseVariable, selected, { openOnInsert: false });
        replaceTokenWithVariable(editor!, tagAttrs, state.from, state.to);
        requestAnimationFrame(() => {
            editor?.commands.focus();
        });
        setState((prev) => {
            return {
                ...prev,
                open: false,
                query: '',
                selectedIndex: -1,
                activeParent: null,
            };
        });
    };

    const closePicker = () => {
        setState((prev) => {
            return {
                ...prev,
                open: false,
                query: '',
                selectedIndex: -1,
                activeParent: null,
            };
        });
    };

    const goBack = () => {
        setState((prev) => {
            return {
                ...prev,
                activeParent: null,
                selectedIndex: -1,
            };
        });
    };

    const setQuery = (query: string) => {
        setState((prev) => {
            return { ...prev, query };
        });
    };

    const handleKeyDown: InlineVariablePickerHandleKeyDown = (view, event) => {
        const variables = Object.values(variableCategories ?? {}).flatMap((items) => {
            return Array.isArray(items) ? items : [];
        });
        if (!variables.length || disabled || readOnly) {
            return false;
        }

        const isShortcut = (event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === 'v';
        const isTrigger = variablePickerTriggerCharacters.includes(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey;
        if (!isShortcut && !isTrigger) {
            return false;
        }

        // When picker is open, focus moves to it; cmdk handles keyboard nav
        if (state.open) {
            return false;
        }

        if (isTrigger) {
            const { from } = view.state.selection;
            const prevChar = from > 1 ? view.state.doc.textBetween(from - 1, from, '\n') : '';
            /** Allow @ after whitespace, brackets, quotes, or zwsp (used after variable tags) */
            if (prevChar && !/[\s\u200B\u2060]|\(|\[|"|'/.test(prevChar)) {
                return false;
            }
        }

        if (isShortcut) {
            event.preventDefault();
            onOpenDropdown?.();
            return true;
        }

        return false;
    };

    useEffect(() => {
        if (!editor) {
            return;
        }
        editor.on('update', updateFromCursor);
        editor.on('selectionUpdate', updateFromCursor);
        return () => {
            editor.off('update', updateFromCursor);
            editor.off('selectionUpdate', updateFromCursor);
        };
    }, [editor, updateFromCursor]);

    return {
        state,
        filteredVariables,
        handleSelect,
        closePicker,
        goBack,
        handleKeyDown,
        setQuery,
    };
}
