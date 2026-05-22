import React, { useState } from 'react';
import { useEditorState } from '@tiptap/react';
import type { Editor } from '@tiptap/core';
import { Button } from '@verbb/plugin-kit-react/components/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@verbb/plugin-kit-react/components';
import { Tooltip, TooltipContent, TooltipTrigger } from '@verbb/plugin-kit-react/components/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { cn } from '@verbb/plugin-kit-react/utils';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';

import { buildVariableTagAttrs } from './variableSerialization';
import { VariableCommandList } from './VariableCommandList';
import { useVariablePicker } from './useVariablePicker';

export type VariableOption = {
    label: string;
    value?: string;
    children?: VariableOption[];
    /** Optional display bucket for first-level grouping (e.g. page headings). */
    pageLabel?: string;
    /** For child items: selector | format | value. Used by variableSerialization. */
    group?: string;
    /** Supported transform value types for this variable (e.g. text, number, date, url). */
    transformValueTypes?: string[];
};

export type VariableCategories = {
    [key: string]: VariableOption[] | undefined;
};

export function formatVariableCategoryLabel(key: string, labels?: Record<string, string> | null): string {
    return labels?.[key] ?? key;
}

type VariableDropdownProps = {
    editor: Editor | null | undefined;
    variableCategories: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    title?: string;
    buttonLabel?: string;
    buttonVariant?: 'default' | 'primary' | 'secondary' | 'dashed' | 'outline' | 'transparent' | 'link' | 'none';
    buttonSize?: 'default' | 'none' | 'xs' | 'sm' | 'lg' | 'xl';
    buttonClassName?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerMode?: 'toolbar' | 'input';
};

export function VariableDropdown({
    editor,
    variableCategories,
    variableCategoryLabels,
    variableCategoryOrder,
    title,
    buttonLabel,
    buttonVariant,
    buttonSize,
    buttonClassName,
    open,
    onOpenChange,
    triggerMode = 'toolbar',
}: VariableDropdownProps) {
    const t = useTranslation();
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

    const isControlledOpen = typeof open === 'boolean';
    const isOpen = isControlledOpen ? open : uncontrolledOpen;

    const picker = useVariablePicker({
        variableCategories,
        variableCategoryLabels,
        variableCategoryOrder,
        isOpen,
        onApply: (baseVariable, variable) => {
            const attrs = buildVariableTagAttrs(baseVariable, variable);
            const chain = editor?.chain();
            chain?.focus?.()?.setVariableTag?.(attrs)?.run?.();
            if (!isControlledOpen) {
                setUncontrolledOpen(false);
            }
            onOpenChange?.(false);
            picker.reset();
        },
    });

    const isVariableActive = useEditorState({
        editor: editor as import('@tiptap/core').Editor | null,
        selector: ({ editor: ed }) => {
            return (ed?.isFocused && ed?.isActive('variableTag')) ?? false;
        },
    });

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            picker.reset();
        }
        if (!isControlledOpen) {
            setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
    };

    const hasAnyVariables = Object.values(variableCategories ?? {}).some(
        items => {
            return Array.isArray(items) && items.length > 0;
        },
    );

    if (!hasAnyVariables) {
        return null;
    }

    const triggerButton = (
        <Button
            variant={buttonVariant ?? 'none'}
            size={buttonSize}
            className={cn(
                triggerMode === 'toolbar' && [
                    buttonLabel ? 'h-[32px] px-[8px] gap-1.5' : 'w-[32px] h-[32px]',
                    'text-[#1c2e36]',
                    'hover:bg-slate-100!',
                    isVariableActive && 'bg-slate-250! hover:bg-slate-250!',
                ],
                triggerMode === 'input' && [
                    'absolute right-[1px] top-1/2 -translate-y-1/2',
                    'border-l border-transparent',
                    'rounded-[3px] rounded-l-none',
                    'h-[calc(100%-2px)]',
                    'text-[#8d959b]',
                    'bg-white hover:bg-slate-50',
                    'border-[#d7dfe7]',
                    'text-[#1c2e36]',
                ],

                buttonClassName ?? '',
            )}
        >
            <FontAwesomeIcon icon={faPlusCircle} className="size-4" />
            {buttonLabel && <span>{buttonLabel}</span>}
        </Button>
    );

    const content = (
        <Popover modal={false} open={isOpen} onOpenChange={handleOpenChange}>
            {(buttonLabel || title) ? (
                <Tooltip>
                    <TooltipTrigger render={<PopoverTrigger nativeButton={true} render={triggerButton} />} />
                    <TooltipContent sideOffset={4}>{buttonLabel || title}</TooltipContent>
                </Tooltip>
            ) : (
                <PopoverTrigger nativeButton={true} render={triggerButton} />
            )}
            <PopoverContent
                align={triggerMode === 'input' ? 'end' : 'start'}
                side="bottom"
                sideOffset={6}
                positionMethod="fixed"
                collisionAvoidance={{
                    side: 'flip',
                    align: 'shift',
                    fallbackAxisSide: 'none',
                }}
                className="min-w-[260px] max-w-[360px] p-0 overflow-hidden flex flex-col"
                portalClassName="z-250"
            >
                <VariableCommandList
                    search={picker.search}
                    onSearchChange={picker.setSearch}
                    groups={picker.groups}
                    options={picker.options}
                    onSelect={picker.handleSelect}
                    placeholder={t('Search variables')}
                    showSearch
                    shouldFilter={false}
                    onBack={picker.page ? picker.handleBack : undefined}
                    isChildMode={!!picker.page}
                    selectFirstItem={triggerMode === 'input'}
                    autoFocusSearchInput={triggerMode !== 'input'}
                />
            </PopoverContent>
        </Popover>
    );

    return content;
}
