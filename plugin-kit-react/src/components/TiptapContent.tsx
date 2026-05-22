import { useMemo } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import type { ComponentProps } from 'react';
import { cn } from '@verbb/plugin-kit-react/utils';
import { createTiptapExtensions, valueToContent } from './tiptap/editorConfig';

type TiptapContentProps = Omit<ComponentProps<typeof EditorContent>, 'editor'> & {
    value?: unknown;
    className?: string;
};

export const TiptapContent = ({ value = '', className, ...props }: TiptapContentProps) => {
    const extensions = useMemo(() => {
        return createTiptapExtensions();
    }, []);

    const editor = useEditor({
        extensions,
        content: valueToContent(value),
        editable: false,
    });

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
