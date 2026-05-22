import { Editor } from '@tiptap/core';
import { EditorView } from '@tiptap/pm/view';
import { VariableCategories, VariableOption } from './VariableDropdown';
import { FilteredVariables } from './InlineVariablePickerPopover';
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
export declare function useInlineVariablePicker(editor: Editor | null, options: {
    variableCategories: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variablePickerTriggerCharacters?: string[];
    disabled?: boolean;
    readOnly?: boolean;
    wrapperRef: React.RefObject<HTMLDivElement | null>;
    onOpenDropdown?: () => void;
}): {
    state: InlinePickerState;
    filteredVariables: FilteredVariables;
    handleSelect: (selected: VariableOption, baseVariableOpt?: VariableOption) => void;
    closePicker: () => void;
    goBack: () => void;
    handleKeyDown: InlineVariablePickerHandleKeyDown;
    setQuery: (query: string) => void;
};
//# sourceMappingURL=useInlineVariablePicker.d.ts.map