import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { cn } from '@verbb/plugin-kit-react/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@verbb/plugin-kit-react/components';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@verbb/plugin-kit-react/components/Button';
import { Input } from '@verbb/plugin-kit-react/components/Input';
import type { VariableOption } from './VariableDropdown';
import { VariableCommandList } from './VariableCommandList';
import { useVariablePickerContext } from './VariablePickerContext';
import { VariableTransformControls } from './VariableTransformControls';
import { useVariablePicker } from './useVariablePicker';
import { buildVariableTagAttrs } from './variableSerialization';
import { parseTokenWithDefault } from './variableSerialization';

type VariableMeta = VariableOption & {
    compatibleWith?: string[];
    transformValueTypes?: string[];
};

export default (props) => {
    const t = useTranslation();
    const {
        editor,
        node,
        updateAttributes,
        deleteNode,
        selected: isActive,
    } = props;
    const isReadOnly = !editor?.isEditable || false;
    const openOnInsert = Boolean(node?.attrs?.openOnInsert);
    const [isConfigOpen, setIsConfigOpen] = useState(openOnInsert);
    const [isPickerMode, setIsPickerMode] = useState(false);
    const [defaultIfEmpty, setDefaultIfEmpty] = useState(node?.attrs?.default ?? '');
    const [transformerId, setTransformerId] = useState(node?.attrs?.transformerId ?? '');
    const [transformerParams, setTransformerParams] = useState<Record<string, string>>(() => {
        const raw = node?.attrs?.transformerParams;
        if (!raw || typeof raw !== 'object') {
            return {};
        }

        return Object.entries(raw).reduce((acc, [key, value]) => {
            acc[key] = value == null ? '' : String(value);
            return acc;
        }, {} as Record<string, string>);
    });
    const openOnInsertHandled = useRef(false);
    const popoverContentRef = useRef<HTMLDivElement | null>(null);
    const pickerContext = useVariablePickerContext();

    const selectedVariableMeta = useMemo(() => {
        const [token] = parseTokenWithDefault(String(node?.attrs?.value ?? ''));
        const groups = Object.values(pickerContext?.variableCategories ?? {});

        const visit = (items: VariableOption[]): VariableMeta | null => {
            for (const item of items) {
                if (item?.value === token) {
                    return item as VariableMeta;
                }

                const children = Array.isArray(item?.children) ? item.children : [];
                const childMatch = children.find((child) => {
                    return child?.value === token;
                });
                if (childMatch) {
                    return childMatch as VariableMeta;
                }
            }

            return null;
        };

        for (const groupItems of groups) {
            const match = visit(Array.isArray(groupItems) ? groupItems : []);
            if (match) {
                return match;
            }
        }

        return null;
    }, [pickerContext?.variableCategories, node?.attrs?.value]);

    const transformOptions = useMemo(() => {
        const registry = pickerContext?.variableTransformerRegistry ?? {};
        const compatibleWith = Array.isArray(selectedVariableMeta?.compatibleWith)
            ? selectedVariableMeta.compatibleWith
            : [];

        const allowedTypes = new Set<string>();
        const hasCompatibilityHints = compatibleWith.length > 0;
        const explicitTransformTypes = Array.isArray(selectedVariableMeta?.transformValueTypes)
            ? selectedVariableMeta.transformValueTypes
            : [];
        explicitTransformTypes.forEach((type) => {
            if (typeof type === 'string' && type.trim() !== '') {
                allowedTypes.add(type);
            }
        });
        const hasTransformHints = hasCompatibilityHints || allowedTypes.size > 0;
        if (compatibleWith.includes('plainText') || compatibleWith.includes('email')) {
            allowedTypes.add('text');
        }
        if (compatibleWith.includes('number') || compatibleWith.includes('calculations')) {
            allowedTypes.add('number');
        }
        if (compatibleWith.includes('url')) {
            allowedTypes.add('url');
        }
        if (compatibleWith.includes('date')) {
            allowedTypes.add('date');
        }
        if (compatibleWith.includes('boolean')) {
            allowedTypes.add('boolean');
        }
        if (compatibleWith.includes('array')) {
            allowedTypes.add('array');
        }

        const byId = new Map();

        Object.entries(registry).forEach(([valueType, transformers]) => {
            if (hasTransformHints && allowedTypes.size > 0 && !allowedTypes.has(valueType)) {
                return;
            }

            (Array.isArray(transformers) ? transformers : []).forEach((transformer) => {
                const appliesTo = Array.isArray(transformer.appliesTo) && transformer.appliesTo.length
                    ? transformer.appliesTo
                    : [valueType];

                if (hasTransformHints && allowedTypes.size > 0 && !appliesTo.some((type) => {
                    return allowedTypes.has(type);
                })) {
                    return;
                }

                if (!byId.has(transformer.id)) {
                    byId.set(transformer.id, {
                        value: transformer.id,
                        label: transformer.label,
                        description: transformer.description,
                        params: Array.isArray(transformer.params) ? transformer.params : [],
                        appliesTo,
                    });
                }
            });
        });

        return Array.from(byId.values());
    }, [pickerContext?.variableTransformerRegistry, selectedVariableMeta]);

    const selectedTransformer = useMemo(() => {
        return transformOptions.find((option) => {
            return option.value === transformerId;
        }) ?? null;
    }, [transformOptions, transformerId]);
    const hasIncompatibleTransformerSelection = useMemo(() => {
        const current = transformerId.trim();
        return current !== '' && !selectedTransformer;
    }, [transformerId, selectedTransformer]);

    const initialPage = useMemo((): VariableOption | null => {
        const currentValue = node?.attrs?.value;
        if (!currentValue || !pickerContext?.variableCategories) {
            return null;
        }
        const findParentWithChild = (items: VariableOption[]): VariableOption | null => {
            for (const item of items) {
                const children = Array.isArray(item?.children) ? item.children : [];
                if (children.some((c) => {
                    return c?.value === currentValue;
                })) {
                    return item;
                }
                const nested = findParentWithChild(children);
                if (nested) {
                    return nested;
                }
            }
            return null;
        };
        const allItems = Object.values(pickerContext.variableCategories).flatMap((items) => {
            return items ?? [];
        });
        return findParentWithChild(allItems);
    }, [node?.attrs?.value, pickerContext?.variableCategories]);

    const picker = useVariablePicker({
        variableCategories: pickerContext?.variableCategories ?? {},
        variableCategoryLabels: pickerContext?.variableCategoryLabels,
        variableCategoryOrder: pickerContext?.variableCategoryOrder,
        isOpen: isConfigOpen,
        initialPage,
        getDefaultIfEmpty: () => {
            return defaultIfEmpty;
        },
        onApply: (baseVariable, variable, defaultText) => {
            const attrs = buildVariableTagAttrs(baseVariable, variable, {
                defaultIfEmpty: defaultText,
            });
            updateAttributes?.(attrs);
            setDefaultIfEmpty('');
            setTransformerId('');
            setTransformerParams({});
            setIsConfigOpen(false);
            setIsPickerMode(false);
            picker.reset();
        },
    });

    const hasFullPicker = pickerContext && Object.values(pickerContext.variableCategories ?? {}).some((items) => {
        return Array.isArray(items) && items.length > 0;
    });

    const isConfigurable = !isReadOnly;
    const canChangeVariable = !!hasFullPicker;

    useEffect(() => {
        if (!openOnInsert) {
            return;
        }
        openOnInsertHandled.current = false;
    }, [openOnInsert]);

    useEffect(() => {
        if (!openOnInsert || openOnInsertHandled.current) {
            return;
        }
        openOnInsertHandled.current = true;
        setIsConfigOpen(true);
        queueMicrotask(() => {
            updateAttributes?.({ openOnInsert: false });
        });
    }, [openOnInsert, updateAttributes]);

    const handleDelete = () => {
        if (!isReadOnly) {
            deleteNode();
        }
    };

    function closeConfig() {
        setIsConfigOpen(false);
        setIsPickerMode(false);
        picker.reset();
    }

    const exitPickerMode = useCallback(() => {
        setIsPickerMode(false);
    }, []);

    const handleOpenConfig = useCallback(() => {
        if (!isConfigurable) {
            return;
        }

        setIsConfigOpen(true);
    }, [isConfigurable]);

    useEffect(() => {
        const editorDom = editor?.view?.dom;

        if (!editorDom || !isActive || !isConfigurable) {
            return;
        }

        const handleEditorKeyDown = (event: KeyboardEvent) => {
            if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
                return;
            }

            const target = event.target as HTMLElement | null;
            const tagName = target?.tagName;
            const isFocusableInput = tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';

            if (isFocusableInput) {
                return;
            }

            if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                event.preventDefault();
                event.stopPropagation();
                handleOpenConfig();
            }
        };

        editorDom.addEventListener('keydown', handleEditorKeyDown, true);

        return () => {
            editorDom.removeEventListener('keydown', handleEditorKeyDown, true);
        };
    }, [editor, isActive, isConfigurable, handleOpenConfig]);

    const handleSaveOptions = () => {
        const trimmedDefault = defaultIfEmpty.trim();
        const trimmedTransformerId = transformerId.trim();
        const normalizedParams = trimmedTransformerId
            ? Object.entries(transformerParams).reduce((acc, [key, value]) => {
                const trimmed = String(value ?? '').trim();
                if (trimmed !== '') {
                    acc[key] = trimmed;
                }
                return acc;
            }, {} as Record<string, string>)
            : null;

        updateAttributes?.({
            default: trimmedDefault || null,
            transformerId: trimmedTransformerId || null,
            transformerParams: trimmedTransformerId ? normalizedParams : null,
        });
        closeConfig();
    };

    const handleConfigOpenChange = (nextOpen: boolean) => {
        setIsConfigOpen(nextOpen);

        // Always reopen on the options view.
        setIsPickerMode(false);

        if (!nextOpen) {
            picker.reset();
        }
    };

    const handleTagKeyDown = (event) => {
        if (!isConfigurable) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            handleOpenConfig();
        }
    };

    useEffect(() => {
        setDefaultIfEmpty(node?.attrs?.default ?? '');
        setTransformerId(node?.attrs?.transformerId ?? '');
        const raw = node?.attrs?.transformerParams;
        if (raw && typeof raw === 'object') {
            setTransformerParams(Object.entries(raw).reduce((acc, [key, value]) => {
                acc[key] = value == null ? '' : String(value);
                return acc;
            }, {} as Record<string, string>));
        } else {
            setTransformerParams({});
        }
    }, [isConfigOpen, node?.attrs?.default, node?.attrs?.transformerId, node?.attrs?.transformerParams]);

    useEffect(() => {
        if (!selectedTransformer) {
            return;
        }

        setTransformerParams((current) => {
            const next = { ...current };
            (selectedTransformer.params ?? []).forEach((param) => {
                if (next[param.name] == null || next[param.name] === '') {
                    next[param.name] = param.default == null ? '' : String(param.default);
                }
            });

            return next;
        });
    }, [selectedTransformer]);

    useEffect(() => {
        if (!isConfigOpen || !isPickerMode) {
            return;
        }

        let frame = 0;
        let cancelled = false;

        const focusSearch = (attempt = 0) => {
            if (cancelled) {
                return;
            }

            const input = popoverContentRef.current?.querySelector<HTMLInputElement>('[data-slot="command-input"]');

            if (input) {
                input.focus();
                return;
            }

            if (attempt < 8) {
                frame = requestAnimationFrame(() => {
                    focusSearch(attempt + 1);
                });
            }
        };

        focusSearch();

        return () => {
            cancelled = true;

            if (frame) {
                cancelAnimationFrame(frame);
            }
        };
    }, [isConfigOpen, isPickerMode]);

    const fallbackPreview = String(props.node?.attrs?.default ?? '').trim();
    const appliedTransformerId = String(props.node?.attrs?.transformerId ?? '').trim();
    const appliedTransformer = transformOptions.find((option) => {
        return option.value === appliedTransformerId;
    }) ?? null;
    let transformPreview = '';
    if (appliedTransformer?.label) {
        transformPreview = appliedTransformer.label;
    } else if (appliedTransformerId) {
        transformPreview = appliedTransformerId;
    }
    const tokenValue = String(node?.attrs?.value ?? '');
    const tagLabel = selectedVariableMeta?.label ?? (node?.attrs?.label ?? '');
    const tagTitle = tagLabel;
    const useCornerBadge = true;

    return (
        <NodeViewWrapper
            as="span"
            className={cn(
                'relative inline-block leading-none mx-[1px] cursor-default',
            )}
            tabIndex={isConfigurable ? 0 : undefined}
            onKeyDown={handleTagKeyDown}
            data-drag-handle
            data-variable-value={tokenValue}
        >
            <span className={cn(
                'relative inline-flex items-stretch whitespace-nowrap gap-0 overflow-hidden',
                '-mt-[3px] text-[11px] font-normal! leading-none align-middle',
                'bg-[#5C6BC0] text-white rounded-[2px]',

                isReadOnly && 'inline-flex flex-1 px-[5px] py-[4px]',

                isActive && !isReadOnly && 'outline-none shadow-[0_0_0_2px_rgba(123,140,232,0.5)]',

                isReadOnly && isActive && 'shadow-none',
            )}>
                {fallbackPreview && useCornerBadge && (
                    <span
                        className="pointer-events-none absolute top-0 left-0 h-0 w-0 border-t-[8px] border-r-[8px] border-t-orange-400 border-r-transparent"
                        aria-label={t('Has fallback value')}
                    />
                )}
                {isConfigurable ? (
                    <Popover open={isConfigOpen} onOpenChange={handleConfigOpenChange}>
                        <PopoverTrigger
                            render={
                                <button
                                    type="button"
                                    className="inline-flex flex-1 min-w-0 self-stretch items-center cursor-pointer bg-transparent border-0 px-[5px] py-[4px] m-0 text-left text-inherit focus:outline-none"
                                    title={tagTitle}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleOpenConfig();
                                    }}
                                >
                                    <span className="block truncate max-w-[220px]">
                                        {tagLabel}
                                        {(transformPreview) && (
                                            <span
                                                className="ml-1 inline-flex items-center rounded bg-white/20 px-1 py-[1px] text-[9px] leading-none text-white/95 align-middle"
                                                title={t('Transform: {transform}', { transform: transformPreview })}
                                                aria-label={t('Transform: {transform}', { transform: transformPreview })}
                                            >
                                                {transformPreview}
                                            </span>
                                        )}
                                        {fallbackPreview && !useCornerBadge && (
                                            <span
                                                className="ml-1 inline-block size-[5px] rounded-full bg-white/75 align-middle"
                                                aria-label={t('Has fallback value')}
                                            />
                                        )}
                                    </span>
                                </button>
                            }
                        />

                        <PopoverContent
                            ref={popoverContentRef}
                            align="start"
                            side="bottom"
                            sideOffset={6}
                            className={hasFullPicker ? 'min-w-[260px] max-w-[360px] p-0' : 'w-[260px] p-0'}
                            onMouseDown={(event) => {
                                const target = event.target as HTMLElement | null;
                                const tagName = target?.tagName;
                                const isFocusableInput = tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
                                const isSelectControl = Boolean(target?.closest('[data-slot="select-trigger"]'));

                                // Keep editor selection stable for picker clicks, but allow typing in fallback input.
                                if (isFocusableInput || isSelectControl) {
                                    return;
                                }

                                event.preventDefault();
                                event.stopPropagation();
                            }}
                        >
                            {isPickerMode ? (
                                canChangeVariable && (
                                    <VariableCommandList
                                        search={picker.search}
                                        onSearchChange={picker.setSearch}
                                        groups={picker.groups}
                                        options={picker.options}
                                        selectedValue={node?.attrs?.value}
                                        onSelect={picker.handleSelect}
                                        placeholder={t('Search variables')}
                                        showSearch
                                        shouldFilter={false}
                                        onBack={picker.page ? picker.handleBack : exitPickerMode}
                                        isChildMode={!!picker.page}
                                    />
                                )
                            ) : (
                                <div className="p-2">
                                    <label className="text-[11px] text-gray-500 block mb-1">
                                        {t('Default if empty (optional)')}
                                    </label>
                                    <Input
                                        type="text"
                                        value={defaultIfEmpty}
                                        onChange={(event) => {
                                            setDefaultIfEmpty(event.target.value);
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                handleSaveOptions();
                                            }
                                        }}
                                    />
                                    <VariableTransformControls
                                        transformerId={transformerId}
                                        onTransformerIdChange={(nextId) => {
                                            setTransformerId(nextId);
                                            if (!nextId) {
                                                setTransformerParams({});
                                            }
                                        }}
                                        transformOptions={transformOptions}
                                        hasIncompatibleTransformerSelection={hasIncompatibleTransformerSelection}
                                        selectedTransformer={selectedTransformer}
                                        transformerParams={transformerParams}
                                        onTransformerParamChange={(paramName, nextValue) => {
                                            setTransformerParams((current) => {
                                                return {
                                                    ...current,
                                                    [paramName]: nextValue,
                                                };
                                            });
                                        }}
                                    />
                                    <div className="mt-3 -mx-2 -mb-2 border-t border-slate-200 bg-[#f3f7fd] px-2 py-2 flex items-center justify-between gap-2">
                                        {canChangeVariable ? (
                                            <Button
                                                type="button"
                                                variant="default"
                                                size="sm"
                                                className="text-[11px]"
                                                onClick={() => {
                                                    setIsPickerMode(true);
                                                }}
                                            >
                                                {t('Change variable')}
                                            </Button>
                                        ) : <span className="inline-block" />}
                                        <Button
                                            type="button"
                                            variant="primary"
                                            size="sm"
                                            className="text-[11px]"
                                            onClick={handleSaveOptions}
                                        >
                                            {t('Save')}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                ) : (
                    <span className="block truncate max-w-[220px]" title={tagTitle}>
                        {tagLabel}
                        {(transformPreview && !isReadOnly) && (
                            <span
                                className="ml-1 inline-flex items-center rounded bg-white/20 px-1 py-[1px] text-[9px] leading-none text-white/95 align-middle"
                                title={t('Transform: {transform}', { transform: transformPreview })}
                                aria-label={t('Transform: {transform}', { transform: transformPreview })}
                            >
                                {transformPreview}
                            </span>
                        )}
                        {fallbackPreview && !useCornerBadge && (
                            <span
                                className="ml-1 inline-block size-[5px] rounded-full bg-white/75 align-middle"
                                aria-label={t('Has fallback value')}
                            />
                        )}
                    </span>
                )}

                <span
                    className={cn(
                        'inline-flex items-center justify-center cursor-pointer',
                        'px-1 pr-[5px] py-[4px] self-stretch',
                        isReadOnly && 'hidden',
                    )}
                    onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleDelete();
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} className="size-[10px]" />
                </span>
            </span>

        </NodeViewWrapper>
    );
};
