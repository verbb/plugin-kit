import { useCallback, useEffect, useState } from 'react';
import { useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { getMarkRange, posToDOMRect, type Editor } from '@tiptap/core';
import { Button } from '@verbb/plugin-kit-react/components/Button';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { cn } from '@verbb/plugin-kit-react/utils';
import { getPortalTargetForAppend } from '@verbb/plugin-kit-react/utils/portal';

type LinkBubbleMenuProps = {
    editor: Editor | null | undefined;
    onEdit: () => void;
    /** When true, hide the bubble (e.g. when Insert Link dialog is open) so it doesn't stack above the dialog */
    dialogOpen?: boolean;
};

export function LinkBubbleMenu({ editor, onEdit, dialogOpen = false }: LinkBubbleMenuProps) {
    const t = useTranslation();
    const pluginKey = 'linkBubbleMenu';
    const [dismissed, setDismissed] = useState(false);

    const href = useEditorState({
        editor,
        selector: ({ editor: ed }) => {
            return ed?.isActive('link') ? ed.getAttributes('link').href : undefined;
        },
    });

    const getReferencedVirtualElement = useCallback(() => {
        if (!editor?.isActive('link')) {
            return null;
        }
        const { state, view } = editor;
        const linkType = state.schema.marks.link;

        const getRect = () => {
            const range = getMarkRange(editor.state.selection.$from, linkType);

            if (range) {
                return posToDOMRect(view, range.from, range.to);
            }

            const { from } = editor.state.selection;
            return posToDOMRect(view, from, from);
        };

        return {
            getBoundingClientRect: getRect,
            getClientRects: () => {
                return [getRect()];
            },
        };
    }, [editor]);

    const handleShow = useCallback(() => {
        if (!editor) {
            return;
        }
        requestAnimationFrame(() => {
            editor.view.dispatch(editor.state.tr.setMeta(pluginKey, 'updatePosition'));
        });
    }, [editor, pluginKey]);

    useEffect(() => {
        // Re-enable bubble after modal closes.
        if (!dialogOpen) {
            setDismissed(false);
        }
    }, [dialogOpen]);

    if (!editor) {
        return null;
    }
    const appendTarget = getPortalTargetForAppend();

    return (
        <BubbleMenu
            editor={editor}
            pluginKey={pluginKey}
            shouldShow={({ editor: ed }) => {
                return !dismissed && !dialogOpen && ed.isFocused && ed.isActive('link');
            }}
            appendTo={appendTarget ? () => {
                return appendTarget;
            } : undefined}
            getReferencedVirtualElement={getReferencedVirtualElement}
            updateDelay={0}
            options={{
                placement: 'top',
                onShow: handleShow,
            }}
            className={cn(
                'relative z-[250] flex items-center gap-0 rounded-md overflow-visible',
                'bg-[#1c2e36] text-white text-[12px]',
                dismissed && 'hidden',
                // 'shadow-lg border border-slate-600',
            )}
        >
            <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 size-2 rotate-45 bg-[#1c2e36]"
                aria-hidden
            />
            <span className="px-2 py-1.5 max-w-[200px] truncate">
                {href}
            </span>
            <span className="w-px h-3 bg-[#616d73]" />
            <Button
                type="button"
                variant="none"
                size="xs"
                className="text-white hover:text-white/70 px-2 py-1.5"
                onClick={() => {
                    setDismissed(true);
                    editor?.commands?.blur?.();
                    onEdit();
                }}
            >
                {t('Edit')}
            </Button>
            <span className="w-px h-3 bg-[#616d73]" />
            <Button
                type="button"
                variant="none"
                size="xs"
                className="text-white hover:text-white/70 px-2 py-1.5"
                onClick={() => { return editor.chain().focus().unsetLink().run(); }}
            >
                {t('Unlink')}
            </Button>
        </BubbleMenu>
    );
}
