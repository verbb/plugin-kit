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
import { buildVariableTagAttrs, getReferenceBaseToken, resolveVariableTagLabel } from './variableSerialization';
import { parseTokenWithDefault } from './variableSerialization';

type VariableMeta = VariableOption & {
    compatibleWith?: string[];
    types?: string[];
    transformValueTypes?: string[];
    allowTransforms?: boolean;
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
    const [pendingTokenValue, setPendingTokenValue] = useState(String(node?.attrs?.value ?? ''));
    const pendingTokenValueRef = useRef(String(node?.attrs?.value ?? ''));
    const configureStateRef = useRef(null);
    const prepareSaveRef = useRef(null);
    const onPendingTokenChangeRef = useRef<(token: string) => void>(() => {});
    const originalTagAttrsRef = useRef<Record<string, unknown> | null>(null);
    const [configureSessionKey, setConfigureSessionKey] = useState(0);
    const openOnInsertHandled = useRef(false);
    const popoverContentRef = useRef<HTMLDivElement | null>(null);
    const pickerContext = useVariablePickerContext();

    const resolveVariableMetaForToken = useCallback((lookupValue = '') => {
        const [token] = parseTokenWithDefault(String(lookupValue || ''));
        const tokenBase = getReferenceBaseToken(token);
        const groups = Object.values(pickerContext?.variableCategories ?? {});

        const visit = (items: VariableOption[]): VariableMeta | null => {
            let fallbackMatch: VariableMeta | null = null;

            for (const item of items) {
                const children = Array.isArray(item?.children) ? item.children : [];
                const itemValue = String(item?.value ?? '');

                if (itemValue === token) {
                    return item as VariableMeta;
                }

                if (children.length) {
                    const childMatch = visit(children);
                    if (childMatch?.value === token) {
                        return childMatch;
                    }

                    if (childMatch && !fallbackMatch) {
                        fallbackMatch = childMatch;
                    }
                }

                if (getReferenceBaseToken(itemValue) === tokenBase) {
                    if (!fallbackMatch) {
                        fallbackMatch = item as VariableMeta;
                    }
                }
            }

            return fallbackMatch;
        };

        for (const groupItems of groups) {
            const match = visit(Array.isArray(groupItems) ? groupItems : []);
            if (match) {
                return match;
            }
        }

        return null;
    }, [pickerContext?.variableCategories]);

    const selectedVariableMeta = useMemo(() => {
        const lookupValue = isConfigOpen
            ? String(pendingTokenValueRef.current || node?.attrs?.value || '')
            : String(node?.attrs?.value ?? '');

        return resolveVariableMetaForToken(lookupValue);
    }, [isConfigOpen, node?.attrs?.value, pendingTokenValue, resolveVariableMetaForToken]);

    const transformOptions = useMemo(() => {
        if (selectedVariableMeta?.allowTransforms === false) {
            return [];
        }

        const registry = pickerContext?.variableTransformerRegistry ?? {};
        const compatibleWith = Array.isArray(selectedVariableMeta?.compatibleWith)
            ? selectedVariableMeta.compatibleWith
            : [];
        const sourceTypes = Array.isArray(selectedVariableMeta?.types)
            ? selectedVariableMeta.types
            : [];

        const allowedTypes = new Set<string>();
        const hasCompatibilityHints = compatibleWith.length > 0;
        const hasExplicitTransformTypes = Object.prototype.hasOwnProperty.call(selectedVariableMeta ?? {}, 'transformValueTypes');
        const explicitTransformTypes = hasExplicitTransformTypes && Array.isArray(selectedVariableMeta?.transformValueTypes)
            ? selectedVariableMeta.transformValueTypes
            : sourceTypes;
        explicitTransformTypes.forEach((type) => {
            if (typeof type === 'string' && type.trim() !== '') {
                allowedTypes.add(type);
            }
        });
        const hasTransformHints = hasCompatibilityHints || hasExplicitTransformTypes || sourceTypes.length > 0;
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

        if (hasTransformHints && allowedTypes.size === 0) {
            return [];
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
        originalTagAttrsRef.current = {
            value: node?.attrs?.value ?? null,
            label: node?.attrs?.label ?? null,
            default: node?.attrs?.default ?? null,
            transformerId: node?.attrs?.transformerId ?? null,
            transformerParams: node?.attrs?.transformerParams ?? null,
        };
        setIsConfigOpen(true);
        queueMicrotask(() => {
            updateAttributes?.({ openOnInsert: false });
        });
    }, [
        node?.attrs?.default,
        node?.attrs?.label,
        node?.attrs?.transformerId,
        node?.attrs?.transformerParams,
        node?.attrs?.value,
        openOnInsert,
        updateAttributes,
    ]);

    const handleDelete = () => {
        if (!isReadOnly) {
            deleteNode();
        }
    };

    const commitPendingToken = useCallback((nextToken: string) => {
        const normalizedToken = String(nextToken || '');
        const meta = resolveVariableMetaForToken(normalizedToken);
        const defaultLabel = resolveVariableTagLabel(normalizedToken, meta);
        const label = pickerContext?.resolveVariableTagLabel?.({
            tokenValue: normalizedToken,
            variableOption: meta,
            defaultLabel,
            storedLabel: String(node?.attrs?.label ?? ''),
        }) || defaultLabel;

        pendingTokenValueRef.current = normalizedToken;
        setPendingTokenValue(normalizedToken);

        updateAttributes?.({
            value: normalizedToken,
            label,
            default: node?.attrs?.default ?? null,
            transformerId: node?.attrs?.transformerId ?? null,
            transformerParams: node?.attrs?.transformerParams ?? null,
        });
    }, [
        node?.attrs?.default,
        node?.attrs?.label,
        node?.attrs?.transformerId,
        node?.attrs?.transformerParams,
        pickerContext,
        resolveVariableMetaForToken,
        updateAttributes,
    ]);

    function closeConfig(preservedValue: string | null = null) {
        const nextValue = preservedValue != null
            ? String(preservedValue)
            : String(node?.attrs?.value ?? '');

        pendingTokenValueRef.current = nextValue;
        setPendingTokenValue(nextValue);

        if (preservedValue == null && originalTagAttrsRef.current) {
            updateAttributes?.(originalTagAttrsRef.current);
        }

        originalTagAttrsRef.current = null;
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

        const attrValue = String(node?.attrs?.value ?? '');
        const nextValue = attrValue;
        originalTagAttrsRef.current = {
            value: node?.attrs?.value ?? null,
            label: node?.attrs?.label ?? null,
            default: node?.attrs?.default ?? null,
            transformerId: node?.attrs?.transformerId ?? null,
            transformerParams: node?.attrs?.transformerParams ?? null,
        };
        pendingTokenValueRef.current = nextValue;
        setPendingTokenValue(nextValue);
        setConfigureSessionKey((current) => current + 1);
        setIsConfigOpen(true);
    }, [
        isConfigurable,
        node?.attrs?.default,
        node?.attrs?.label,
        node?.attrs?.transformerId,
        node?.attrs?.transformerParams,
        node?.attrs?.value,
    ]);

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
        prepareSaveRef.current?.();

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
        const savedValue = pendingTokenValueRef.current || String(node?.attrs?.value ?? '');
        const savedMeta = resolveVariableMetaForToken(savedValue);
        const defaultSavedLabel = resolveVariableTagLabel(savedValue, savedMeta);
        const savedLabel = pickerContext?.resolveVariableTagLabel?.({
            tokenValue: savedValue,
            variableOption: savedMeta,
            defaultLabel: defaultSavedLabel,
            storedLabel: String(node?.attrs?.label ?? ''),
        }) || defaultSavedLabel;

        updateAttributes?.({
            value: savedValue,
            label: savedLabel,
            default: trimmedDefault || null,
            transformerId: trimmedTransformerId || null,
            transformerParams: trimmedTransformerId ? normalizedParams : null,
        });
        closeConfig(savedValue);
    };

    const handleConfigOpenChange = (nextOpen: boolean) => {
        if (nextOpen) {
            setIsConfigOpen(true);
            setIsPickerMode(false);
            return;
        }

        closeConfig();
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
        if (!isConfigOpen) {
            return;
        }

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
    const tokenValue = String(
        isConfigOpen
            ? (pendingTokenValueRef.current || pendingTokenValue || node?.attrs?.value || '')
            : (node?.attrs?.value || pendingTokenValue || ''),
    );
    const tagLabel = useMemo(() => {
        const resolvedMeta = selectedVariableMeta || resolveVariableMetaForToken(tokenValue);
        const defaultLabel = resolveVariableTagLabel(tokenValue, resolvedMeta);

        return pickerContext?.resolveVariableTagLabel?.({
            tokenValue,
            variableOption: resolvedMeta,
            defaultLabel,
            storedLabel: String(node?.attrs?.label ?? ''),
        }) || defaultLabel;
    }, [node?.attrs?.label, pickerContext, resolveVariableMetaForToken, selectedVariableMeta, tokenValue]);
    const tagTitle = tagLabel;
    const configureResetKey = isConfigOpen ? String(configureSessionKey) : 'closed';

    onPendingTokenChangeRef.current = commitPendingToken;

    const configureSection = pickerContext?.renderVariableConfigureSection?.({
        tokenValue,
        variableOption: selectedVariableMeta,
        configureResetKey,
        configureStateRef,
        prepareSaveRef,
        getPendingTokenValue: () => pendingTokenValueRef.current || String(node?.attrs?.value ?? ''),
        onPendingTokenChange: (nextToken) => {
            onPendingTokenChangeRef.current(nextToken);
        },
    });
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
                            data-variable-config-popover=""
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
                                    {configureSection}
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
