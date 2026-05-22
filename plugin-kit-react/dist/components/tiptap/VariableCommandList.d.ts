import { default as React } from 'react';
import { VariableOption } from './VariableDropdown';
export type VariableGroup = {
    label: string;
    value: string;
    items: VariableOption[];
};
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
export declare function VariableCommandList({ search, onSearchChange, groups, options, selectedValue, onSelect, placeholder, showSearch, shouldFilter, onBack, isChildMode, selectFirstItem, autoFocusSearchInput, afterSearchContent, }: VariableCommandListProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=VariableCommandList.d.ts.map