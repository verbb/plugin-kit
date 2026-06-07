import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';

import VariableTag from '@verbb/plugin-kit-react/components/tiptap/VariableTag';
import { VariableDropdown } from '@verbb/plugin-kit-react/components/tiptap/VariableDropdown';
import type { VariableCategories } from '@verbb/plugin-kit-react/components/tiptap/VariableDropdown';
import type { VariableConfigureSectionProps, VariableTransformerRegistry, VariableTagLabelResolver } from '@verbb/plugin-kit-react/components/tiptap/VariablePickerContext';
import { VariablePickerProvider } from '@verbb/plugin-kit-react/components/tiptap/VariablePickerContext';
import { InlineVariablePickerPopover } from '@verbb/plugin-kit-react/components/tiptap/InlineVariablePickerPopover';
import { useInlineVariablePicker } from '@verbb/plugin-kit-react/components/tiptap/useInlineVariablePicker';
import {
    contentToValue,
    dedupeVariableOptions,
    flattenVariableOptions,
    valueToContent,
} from '@verbb/plugin-kit-react/components/tiptap/variableSerialization';

import { cn } from '@verbb/plugin-kit-react/utils';

const OneLinerDocument = Document.extend({
    content: 'inline*',
});

export const TiptapInput = ({
    value = '',
    onChange,
    className,
    isInvalid,
    disabled = false,
    readOnly = false,
    variableCategories = {},
    variableCategoryLabels,
    variableCategoryOrder,
    variableTransformerRegistry,
    variablePickerTriggerCharacters = ['@'],
    renderVariableConfigureSection,
    resolveVariableTagLabel,
    ...props
}: {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    isInvalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    variableCategories?: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variableTransformerRegistry?: VariableTransformerRegistry;
    variablePickerTriggerCharacters?: string[];
    renderVariableConfigureSection?: (props: VariableConfigureSectionProps) => ReactNode;
    resolveVariableTagLabel?: VariableTagLabelResolver;
    [key: string]: unknown;
}) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [isVariablePickerOpen, setIsVariablePickerOpen] = useState(false);
    const handleKeyDownRef = useRef<import('./tiptap/useInlineVariablePicker').InlineVariablePickerHandleKeyDown | null>(null);

    const topLevelVariables = useMemo(() => {
        const values = Object.values(variableCategories ?? {}).flatMap(items => {
            return Array.isArray(items) ? items : [];
        },
        );
        return dedupeVariableOptions(values);
    }, [variableCategories]);

    const variables = useMemo(() => {
        return flattenVariableOptions(topLevelVariables);
    }, [topLevelVariables]);

    const extensions = useMemo(
        () => {
            return [OneLinerDocument, Text, VariableTag.configure({})];
        },
        [],
    );

    const editor = useEditor({
        extensions,
        content: valueToContent(value, topLevelVariables, variables) as Parameters<typeof useEditor>[0]['content'],
        editable: !disabled && !readOnly,
        editorProps: {
            handleKeyDown: (view, event) => {
                return handleKeyDownRef.current?.(view, event) ?? false;
            },
        } as Parameters<typeof useEditor>[0]['editorProps'],
        onUpdate: ({ editor: ed }) => {
            if (onChange) {
                onChange(contentToValue(ed.getJSON().content));
            }
        },
    });

    const inlinePicker = useInlineVariablePicker(editor, {
        variableCategories,
        variableCategoryLabels,
        variableCategoryOrder,
        variablePickerTriggerCharacters,
        disabled,
        readOnly,
        wrapperRef,
        onOpenDropdown: () => {
            return setIsVariablePickerOpen(true);
        },
    });

    useEffect(() => {
        handleKeyDownRef.current = inlinePicker.handleKeyDown;
    }, [inlinePicker.handleKeyDown]);

    useEffect(() => {
        if (!editor) {
            return;
        }
        if (!readOnly && editor.isFocused) {
            return;
        }

        const newContent = valueToContent(value, topLevelVariables, variables);
        const currentContent = editor.getJSON();
        if (JSON.stringify(newContent) !== JSON.stringify(currentContent)) {
            queueMicrotask(() => {
                const content = newContent ?? { type: 'doc' as const, content: [] as const };
                editor.commands.setContent(content);
            });
        }
    }, [editor, value, readOnly, topLevelVariables, variables]);

    const hasVariables = variables.length > 0;

    return (
        <VariablePickerProvider
            variableCategories={variableCategories}
            variableCategoryLabels={variableCategoryLabels}
            variableCategoryOrder={variableCategoryOrder}
            variableTransformerRegistry={variableTransformerRegistry as VariableTransformerRegistry | undefined}
            renderVariableConfigureSection={renderVariableConfigureSection}
            resolveVariableTagLabel={resolveVariableTagLabel}
        >
            <div ref={wrapperRef} className={cn('relative', className)}>
                <EditorContent
                    editor={editor}
                    className={cn(
                        !readOnly && [
                            '[&_.ProseMirror]:outline-none [&_.ProseMirror]:bg-clip-padding',
                            '[&_.ProseMirror]:rounded-sm',
                            '[&_.ProseMirror]:border [&_.ProseMirror]:border-[rgba(96,125,159,0.4)]',
                            '[&_.ProseMirror]:bg-[rgb(251,252,254)]',
                            '[&_.ProseMirror]:whitespace-pre-wrap',
                            '[&_.ProseMirror]:w-full [&_.ProseMirror]:h-[34px] [&_.ProseMirror]:px-2 [&_.ProseMirror]:pr-10 [&_.ProseMirror]:pt-[6px] [&_.ProseMirror]:text-sm',
                            '[&_.ProseMirror]:whitespace-nowrap [&_.ProseMirror]:overflow-x-auto [&_.ProseMirror]:overflow-y-hidden',
                            '[&_.ProseMirror]:[scrollbar-width:none] [&_.ProseMirror::-webkit-scrollbar]:hidden',
                            '[&_.ProseMirror]:placeholder:text-[#7c8793]',
                            '[&_.ProseMirror]:focus-visible:border-sky-600 [&_.ProseMirror]:focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]',
                            '[&_.ProseMirror]:disabled:cursor-not-allowed [&_.ProseMirror]:disabled:opacity-50',
                        ],
                        isInvalid && [
                            '[&_.ProseMirror]:border-rose-600',
                            '[&_.ProseMirror]:focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]',
                        ],
                        '[&_.ProseMirror_p]:m-0 [&_.ProseMirror_p]:inline',
                        '[&_.ProseMirror_p]:leading-tight',
                        '[&_.ProseMirror-trailingBreak]:inline [&_.ProseMirror-trailingBreak]:leading-none [&_.ProseMirror-trailingBreak]:w-0 [&_.ProseMirror-trailingBreak]:h-0',
                    )}
                    {...props}
                />

                {hasVariables && !readOnly && (
                    <VariableDropdown
                        editor={editor}
                        variableCategories={variableCategories}
                        variableCategoryLabels={variableCategoryLabels}
                        variableCategoryOrder={variableCategoryOrder}
                        triggerMode="input"
                        open={isVariablePickerOpen}
                        onOpenChange={setIsVariablePickerOpen}
                    />
                )}

                {hasVariables && !readOnly && (
                    <InlineVariablePickerPopover
                        open={inlinePicker.state.open}
                        onOpenChange={(open) => {
                            if (!open) {
                                inlinePicker.closePicker();
                            }
                        }}
                        position={{ top: inlinePicker.state.top, left: inlinePicker.state.left }}
                        isChildMode={inlinePicker.filteredVariables.isChildMode}
                        query={inlinePicker.state.query}
                        onQueryChange={inlinePicker.setQuery}
                        filteredVariables={inlinePicker.filteredVariables}
                        onSelect={inlinePicker.handleSelect}
                        onBack={inlinePicker.goBack}
                    />
                )}
            </div>
        </VariablePickerProvider>
    );
};
