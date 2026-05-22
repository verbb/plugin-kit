import { useEffect } from 'react';

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

export const useKeyboardShortcuts = ({
    onSave,
    onCut,
    onCopy,
    onPaste,
    onUndo,
    onRedo,
    onSelectAll,
    onEscape,
    onEnter,
    onDelete,
}: KeyboardShortcutsConfig = {}) => {
    useEffect(() => {
        const isInputElement = (element: Element | null): boolean => {
            if (!element) { return false; }

            const tagName = element.tagName?.toLowerCase();
            const isInput = tagName === 'input' || tagName === 'textarea';
            const isContentEditable = (element as HTMLElement).contentEditable === 'true';

            return isInput || isContentEditable;
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            // Check for Cmd+S (Mac) or Ctrl+S (Windows/Linux)
            if ((event.metaKey || event.ctrlKey) && event.key === 's') {
                event.preventDefault(); // Prevent browser save dialog

                if (onSave) {
                    onSave();
                }
            }

            // Check for Cmd+X (Mac) or Ctrl+X (Windows/Linux) - Cut
            if ((event.metaKey || event.ctrlKey) && event.key === 'x') {
                // Don't prevent default for cut as it's useful for text selection
                if (onCut) {
                    onCut();
                }
            }

            // Check for Cmd+C (Mac) or Ctrl+C (Windows/Linux) - Copy
            if ((event.metaKey || event.ctrlKey) && event.key === 'c') {
                // Don't prevent default for copy as it's useful for text selection
                if (onCopy) {
                    onCopy();
                }
            }

            // Check for Cmd+V (Mac) or Ctrl+V (Windows/Linux) - Paste
            if ((event.metaKey || event.ctrlKey) && event.key === 'v') {
                // Don't prevent default for paste as it's useful for text input
                if (onPaste) {
                    onPaste();
                }
            }

            // Check for Cmd+Z (Mac) or Ctrl+Z (Windows/Linux) - Undo
            if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
                event.preventDefault(); // Prevent browser undo
                if (onUndo) {
                    onUndo();
                }
            }

            // Check for Cmd+Shift+Z (Mac) or Ctrl+Y (Windows/Linux) - Redo
            if (((event.metaKey && event.shiftKey) || event.ctrlKey) &&
                (event.key === 'z' || event.key === 'y')) {
                event.preventDefault(); // Prevent browser redo
                if (onRedo) {
                    onRedo();
                }
            }

            // Check for Cmd+A (Mac) or Ctrl+A (Windows/Linux) - Select All
            if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
                // Don't prevent default for select all as it's useful for text selection
                if (onSelectAll) {
                    onSelectAll();
                }
            }

            // Check for Escape key
            if (event.key === 'Escape') {
                if (onEscape) {
                    onEscape();
                }
            }

            // Check for Enter/Return key (only when not in input/textarea)
            if (event.key === 'Enter' && !isInputElement(event.target as Element)) {
                if (onEnter) {
                    onEnter();
                }
            }

            // Check for Delete key (only when not in input/textarea)
            if (event.key === 'Delete' && !isInputElement(event.target as Element)) {
                if (onDelete) {
                    onDelete();
                }
            }
        };

        // Add event listener
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSave, onCut, onCopy, onPaste, onUndo, onRedo, onSelectAll, onEscape, onEnter, onDelete]);
};
