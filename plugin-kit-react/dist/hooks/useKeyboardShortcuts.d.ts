export interface KeyboardShortcutsConfig {
    onSave?: () => void;
    onCut?: () => void;
    onCopy?: () => void;
    onPaste?: () => void;
    onUndo?: () => void;
    onRedo?: () => void;
    onSelectAll?: () => void;
    onEscape?: () => void;
    onEnter?: () => void;
    onDelete?: () => void;
}
export declare const useKeyboardShortcuts: ({ onSave, onCut, onCopy, onPaste, onUndo, onRedo, onSelectAll, onEscape, onEnter, onDelete, }?: KeyboardShortcutsConfig) => void;
//# sourceMappingURL=useKeyboardShortcuts.d.ts.map