import { useEffect, useMemo } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import type { ComponentProps } from 'react';
import { cn } from '@verbb/plugin-kit-react/utils';
import { createTiptapExtensions, valueToContent } from './tiptap/editorConfig';

type TiptapContentProps = Omit<ComponentProps<typeof EditorContent>, 'editor'> & {
    value?: unknown;
    className?: string;
};

const serializeDocContent = (content: ReturnType<typeof valueToContent>) => {
    if (!content) {
        return '[]';
    }

    if (Array.isArray(content.content)) {
        return JSON.stringify(content.content);
    }

    return JSON.stringify(content);
};

export const TiptapContent = ({ value = '', className, ...props }: TiptapContentProps) => {
    const extensions = useMemo(() => {
        return createTiptapExtensions();
    }, []);

    const editorContent = useMemo(() => {
        return valueToContent(value);
    }, [value]);

    const editor = useEditor({
        extensions,
        content: editorContent,
        editable: false,
    });

    useEffect(() => {
        if (!editor) {
            return;
        }

        const incomingContent = editorContent ?? { type: 'doc', content: [] };
        const incomingSerialized = serializeDocContent(editorContent);
        const currentSerialized = serializeDocContent(editor.getJSON() as ReturnType<typeof valueToContent>);

        if (incomingSerialized === currentSerialized) {
            return;
        }

        editor.commands.setContent(incomingContent);
    }, [editor, editorContent]);

    return (
        <EditorContent
            editor={editor}
            className={cn(
                '[&_.ProseMirror]:outline-none',
                '[&_.ProseMirror_p]:m-0',
                '[&_.ProseMirror_p]:leading-[1.4]',
                '[&_.ProseMirror]:text-sm',
                className,
            )}
            {...props}
        />
    );
};
