/**
 * Command-based variable list. Used by VariableDropdown and InlineVariablePickerPopover.
 * Supports grouped items and nested "pages" (parent → children) via groups/options.
 */

import React, { useRef, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@verbb/plugin-kit-react/components/Command';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { cn } from '@verbb/plugin-kit-react/utils';
import type { VariableOption } from './VariableDropdown';
import { Button } from '@verbb/plugin-kit-react/components/Button';

export type VariableGroup = {
    label: string;
    value: string;
    items: VariableOption[];
};

/** Renders child item only when search is non-empty and child matches (cmdk sub-item pattern) */
function VariableSubItem({
    child,
    parent,
    groupLabel,
    search,
    handleSelectItem,
}: {
    child: VariableOption;
    parent: VariableOption;
    groupLabel: string;
    search: string;
    handleSelectItem: (item: VariableOption, baseVariable?: VariableOption) => void;
}) {
    const q = search.trim().toLowerCase();
    if (!q) {
        return null;
    }
    const matches =
        (child.label ?? '').toLowerCase().includes(q) ||
        String(child.value ?? '').toLowerCase().includes(q);
    if (!matches) {
        return null;
    }
    const key = child.value ?? child.label ?? `sub-${parent.label}-${child.label}`;
    const value = child.value ?? child.label ?? key;
    return (
        <CommandItem
            key={key}
            value={value}
            onSelect={() => {
                return handleSelectItem(child, parent);
            }}
            keywords={[child.label, child.value ?? '', parent.label, groupLabel]}
        >
            {child.label}
        </CommandItem>
    );
}

export type VariableCommandListProps = {
    /** Search query - controls Command filter. Use empty string to show all. */
    search: string;
    onSearchChange?: (value: string) => void;
    /** Grouped items (top-level categories). When null, shows flat options (child mode). */
    groups: VariableGroup[] | null;
    /** Flat options for child mode when groups is null */
    options: VariableOption[];
    /** Currently selected value for keyboard-nav sync (inline picker). Pass to highlight. */
    selectedValue?: string | null;
    onSelect: (item: VariableOption, baseVariable?: VariableOption) => void;
    /** Placeholder for search input */
    placeholder?: string;
    /** Show search input */
    showSearch?: boolean;
    /** Disable built-in filtering - we provide pre-filtered items */
    shouldFilter?: boolean;
    /** Optional: render back button row when in child mode */
    onBack?: () => void;
    /** True when showing a drilled-in child page; used to restore scroll when navigating back */
    isChildMode?: boolean;
    /** When false, don't auto-select first item (e.g. for toolbar/button trigger) */
    selectFirstItem?: boolean;
    /** Control autofocus of command search input when list opens/navigates */
    autoFocusSearchInput?: boolean;
    /** Optional content rendered directly below search input */
    afterSearchContent?: React.ReactNode;
};

export function VariableCommandList({
    search,
    onSearchChange,
    groups,
    options,
    selectedValue,
    onSelect,
    placeholder,
    showSearch = true,
    shouldFilter = false,
    onBack,
    isChildMode = false,
    selectFirstItem = true,
    autoFocusSearchInput = true,
    afterSearchContent,
}: VariableCommandListProps) {
    const t = useTranslation();
    const listRef = useRef<HTMLDivElement>(null);
    const commandRef = useRef<HTMLDivElement>(null);
    const savedScrollTopRef = useRef<number | null>(null);

    const flatItems = groups ? groups.flatMap(g => {
        return g.items;
    }) : options;
    const isControlled = selectedValue !== undefined && selectedValue !== null;
    const currentValue = selectedValue ?? (selectFirstItem ? flatItems[0]?.value ?? '' : '');
    // Dropdown: uncontrolled (no value/onValueChange) so cmdk handles scroll natively like shadcn static example
    const commandProps = isControlled
        ? { value: currentValue, onValueChange: () => { } }
        : { defaultValue: currentValue || undefined };

    const handleSelectItem = (item: VariableOption, baseVariable?: VariableOption) => {
        if (Array.isArray(item.children) && item.children.length > 0) {
            savedScrollTopRef.current = listRef.current?.scrollTop ?? 0;
        }
        onSelect(item, baseVariable);
    };

    const wasChildModeRef = React.useRef(isChildMode);
    useLayoutEffect(() => {
        const wasChild = wasChildModeRef.current;
        wasChildModeRef.current = isChildMode;
        if (wasChild && !isChildMode && savedScrollTopRef.current != null && listRef.current) {
            listRef.current.scrollTop = savedScrollTopRef.current;
            savedScrollTopRef.current = null;
        }
        if (!wasChild && isChildMode && showSearch && autoFocusSearchInput) {
            const input = commandRef.current?.querySelector<HTMLInputElement>('[data-slot="command-input"]');
            input?.focus();
        }
    }, [autoFocusSearchInput, isChildMode, showSearch]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (onBack && !search.trim() && e.key === 'Backspace') {
            e.preventDefault();
            e.stopPropagation();
            onBack();
        }
    };

    const content = (
        <div ref={commandRef} className="contents">
            <Command
                shouldFilter={shouldFilter}
                className="border-0 shadow-none rounded-none"
                {...commandProps}
            >
                {showSearch && (
                    <CommandInput
                        value={search}
                        onValueChange={onSearchChange}
                        placeholder={placeholder ?? t('Search variables')}
                        className="border-0"
                    />
                )}

                {afterSearchContent}

                {onBack && (
                    <Button
                        variant="none"
                        className={cn([
                            'w-full text-left text-[11px] flex flex-1 items-center justify-start',
                            'hover:bg-slate-100 gap-1 border-b border-slate-150 px-2 py-1.5'
                        ])}
                        onClick={(e) => {
                            e.preventDefault();
                            onBack();
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="size-[8px] shrink-0" />
                        {t('Back')}
                    </Button>
                )}

                <CommandList ref={listRef} className="max-h-[280px]">
                    <CommandEmpty>{t('No variables found.')}</CommandEmpty>

                    {groups ? (
                        groups.map((group, gi) => {
                            return (
                                <React.Fragment key={group.value ?? group.label ?? gi}>
                                    {gi > 0 && <CommandSeparator />}
                                    <CommandGroup heading={group.label}>
                                        {group.items.map((item, ii) => {
                                            const q = search.trim().toLowerCase();
                                            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                                            // In search mode, for nested items show only matching children (visual test behavior).
                                            // Parents are still shown when not searching.
                                            const showParent = !hasChildren || !q;
                                            return (
                                                <React.Fragment key={item.value ?? item.label ?? `${gi}-${ii}`}>
                                                    {showParent && (
                                                        <CommandItem
                                                            value={item.value ?? item.label ?? `${gi}-${ii}`}
                                                            onSelect={() => {
                                                                return handleSelectItem(item);
                                                            }}
                                                            keywords={[item.label, item.value ?? '', group.label]}
                                                        >
                                                            <span className="truncate flex-1">{item.label}</span>
                                                            {hasChildren && (
                                                                <FontAwesomeIcon
                                                                    icon={faChevronRight}
                                                                    className={cn('size-3 shrink-0 text-gray-400 ml-2')}
                                                                    aria-hidden
                                                                />
                                                            )}
                                                        </CommandItem>
                                                    )}
                                                    {hasChildren &&
                                                        item.children!.map(child => {
                                                            return (
                                                                <VariableSubItem
                                                                    key={child.value ?? child.label ?? `${gi}-${ii}-${child.label}`}
                                                                    child={child}
                                                                    parent={item}
                                                                    groupLabel={group.label}
                                                                    search={search}
                                                                    handleSelectItem={handleSelectItem}
                                                                />
                                                            );
                                                        })}
                                                </React.Fragment>
                                            );
                                        })}
                                    </CommandGroup>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <CommandGroup heading={t('Selectors')}>
                            {options.map((item, i) => {
                                return (
                                    <CommandItem
                                        key={item.value ?? item.label ?? `opt-${i}`}
                                        value={item.value ?? item.label ?? `opt-${i}`}
                                        onSelect={() => {
                                            return handleSelectItem(item);
                                        }}
                                    >
                                        {item.label}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    )}
                </CommandList>
            </Command>
        </div>
    );

    return onBack ? (
        <div onKeyDown={handleKeyDown} className="contents">
            {content}
        </div>
    ) : (
        content
    );
}
