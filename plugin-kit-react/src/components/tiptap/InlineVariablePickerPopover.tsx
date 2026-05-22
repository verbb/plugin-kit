import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@verbb/plugin-kit-react/components';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { cn } from '@verbb/plugin-kit-react/utils';
import type { VariableOption } from './VariableDropdown';
import { VariableCommandList } from './VariableCommandList';
import type { VariableGroup } from './VariableCommandList';

export type FilteredVariables = {
    groups: VariableGroup[];
    options: VariableOption[];
    isChildMode: boolean;
};

type InlineVariablePickerPopoverProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    position: { top: number; left: number };
    isChildMode: boolean;
    query: string;
    onQueryChange: (query: string) => void;
    filteredVariables: FilteredVariables;
    onSelect: (item: VariableOption, baseVariable?: VariableOption) => void;
    onBack: () => void;
};

export function InlineVariablePickerPopover({
    open,
    onOpenChange,
    position,
    isChildMode,
    query,
    onQueryChange,
    filteredVariables,
    onSelect,
    onBack,
}: InlineVariablePickerPopoverProps) {
    const t = useTranslation();
    const groups = filteredVariables.isChildMode || !filteredVariables.groups?.length
        ? null
        : filteredVariables.groups;
    const { options } = filteredVariables;

    return (
        <Popover
            modal={false}
            open={open && options.length > 0}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                    onOpenChange(false);
                }
            }}
        >
            <PopoverTrigger
                nativeButton={false}
                render={
                    <span
                        aria-hidden="true"
                        className="absolute size-px opacity-0 pointer-events-none"
                        style={{ top: position.top, left: position.left }}
                    />
                }
            />
            <PopoverContent
                align="start"
                side="bottom"
                sideOffset={4}
                positionMethod="fixed"
                collisionAvoidance={{
                    side: 'flip',
                    align: 'shift',
                    fallbackAxisSide: 'none',
                }}
                portalClassName="z-250"
                className={cn(
                    'p-0 overflow-hidden flex flex-col',
                    isChildMode
                        ? 'w-[260px] max-h-[280px]'
                        : 'min-w-[260px] max-w-[360px] max-h-[300px]',
                )}
            >
                <VariableCommandList
                    search={query}
                    onSearchChange={onQueryChange}
                    groups={groups}
                    options={options}
                    onSelect={onSelect}
                    showSearch
                    placeholder={t('Search variables')}
                    shouldFilter={false}
                    onBack={isChildMode ? onBack : undefined}
                    isChildMode={isChildMode}
                    selectFirstItem
                    autoFocusSearchInput={false}
                />
            </PopoverContent>
        </Popover>
    );
}
