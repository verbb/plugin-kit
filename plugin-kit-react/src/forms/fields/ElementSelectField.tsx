import { useEffect, useState } from 'react';
import { Button, Spinner, Status } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import useElementStore from '../store/element-store';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import {
    cn,
    hostOpenElementSelector,
    hostRequest,
} from '@verbb/plugin-kit-react/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/pro-solid-svg-icons';

type ElementSelectFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        elementType?: string;
        sources?: string[];
        criteria?: Record<string, unknown>;
        limit?: number;
        elementSelectOptionsAction?: string;
        elementSelectStorageKeyPrefix?: string;
    };
};

type Element = {
    id: number;
    siteId: number;
    label: string;
    url: string | null;
    status: string | null;
    elementType: string;
};

type ElementReference = {
    id: number;
    siteId: number;
};

type HostElementDataAccessor = {
    data: (key: string) => unknown;
};

type HostSelectedElement = {
    id: number;
    siteId: number;
    label: string;
    status?: string | null;
    $element?: HostElementDataAccessor;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const isElementReference = (value: unknown): value is ElementReference => {
    return isRecord(value) && typeof value.id === 'number' && typeof value.siteId === 'number';
};

const normalizeSelectedElement = (element: HostSelectedElement, elementType: string): Element => {
    const url = typeof element.$element?.data === 'function'
        ? element.$element.data('cp-url')
        : null;

    return {
        id: element.id,
        siteId: element.siteId,
        label: element.label,
        url: typeof url === 'string' ? url : null,
        status: element.status ?? null,
        elementType,
    };
};

const normalizeStoredElement = (value: unknown, elementType: string): Element | null => {
    if (!isRecord(value) || typeof value.id !== 'number' || typeof value.siteId !== 'number') {
        return null;
    }

    return {
        id: value.id,
        siteId: value.siteId,
        label: typeof value.label === 'string' ? value.label : `Element ${value.id}`,
        url: typeof value.url === 'string' ? value.url : null,
        status: typeof value.status === 'string' ? value.status : null,
        elementType: typeof value.elementType === 'string' ? value.elementType : elementType,
    };
};

export const ElementSelectField = ({ form, field }: ElementSelectFieldProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { getElementData, setElementData, hasElementData } = useElementStore();
    const t = useTranslation();
    const selectedElements = getElementData<Element[]>(field.name) || [];
    const errors = form?.getErrorMapFields?.()[field.name] || [];
    const { elementSelectOptionsAction } = field;
    const { elementSelectStorageKeyPrefix } = field;

    const handleButtonClick = () => {
        const elementType = field.elementType || 'craft\\elements\\Entry';

        if (!elementSelectStorageKeyPrefix) {
            throw new Error(`ElementSelectField requires "elementSelectStorageKeyPrefix" for "${field.name}".`);
        }

        hostOpenElementSelector(elementType, {
            storageKey: `${elementSelectStorageKeyPrefix}.${field.name}.${elementType}`,
            sources: field.sources || ['*'],
            criteria: field.criteria || {},
            multiSelect: field.limit ? false : true,
            limit: field.limit || null,
            autoFocusSearchBox: false,
            onShow: () => {
                document.body.style.pointerEvents = '';
            },
            onSelect: (elements: HostSelectedElement[]) => {
                const newElements = elements.map((element) => {
                    return normalizeSelectedElement(element, elementType);
                });

                const updatedElements = [...selectedElements, ...newElements];
                setElementData(field.name, updatedElements);

                const formValue = updatedElements.map((element) => {
                    return { id: element.id, siteId: element.siteId };
                });

                form.setFieldValue(field.name, formValue);
            },
            closeOtherModals: false,
        });
    };

    const removeElement = (elementId: number) => {
        const updatedElements = selectedElements.filter((el) => { return el.id !== elementId; });
        setElementData(field.name, updatedElements);

        const formValue = updatedElements.map((element) => {
            return { id: element.id, siteId: element.siteId };
        });

        form.setFieldValue(field.name, formValue);
    };

    useEffect(() => {
        const loadElements = async() => {
            if (field.name && !hasElementData(field.name)) {
                const currentValue = form.getFieldValue(field.name);

                if (currentValue && Array.isArray(currentValue) && currentValue.length > 0) {
                    const currentReferences = currentValue.filter(isElementReference);
                    if (!currentReferences.length) {
                        return;
                    }

                    setIsLoading(true);

                    try {
                        if (!elementSelectOptionsAction) {
                            throw new Error(`ElementSelectField requires "elementSelectOptionsAction" for "${field.name}".`);
                        }

                        const response = await hostRequest('POST', elementSelectOptionsAction, {
                            data: { elements: currentReferences },
                        });

                        if (response.data && Array.isArray(response.data)) {
                            const normalizedElements = response.data
                                .map((item) => { return normalizeStoredElement(item, field.elementType || 'craft\\elements\\Entry'); })
                                .filter((item): item is Element => {
                                return item !== null;
                            });
                            setElementData(field.name, normalizedElements);
                        }
                    } catch {
                        const fallbackElements: Element[] = currentReferences.map((item) => {
                            return {
                                id: item.id,
                                siteId: item.siteId,
                                label: `Element ${item.id}`,
                                url: null,
                                status: null,
                                elementType: field.elementType || 'craft\\elements\\Entry',
                            };
                        });
                        setElementData(field.name, fallbackElements);
                    } finally {
                        setIsLoading(false);
                    }
                }
            }
        };

        loadElements();
    }, [form, field.name, field.elementType, elementSelectOptionsAction, getElementData, setElementData, hasElementData]);

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
            withControl={false}
        >
            <div className="space-y-3">
                {isLoading && (
                    <div className="relative flex items-center text-sm text-gray-500 min-h-[34px]">
                        <Spinner size="xs" variant="default" className="absolute left-0" />
                        <span className="ml-6">{t('Loading elements...')}</span>
                    </div>
                )}

                {selectedElements.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {selectedElements.map((element) => {
                            return (
                                <div
                                    key={`${element.id}-${element.siteId}`}
                                    className={cn(
                                        'flex items-center gap-1.5',
                                        'border border-gray-200 rounded-lg text-sm',
                                        'px-2 py-1.5',
                                        'bg-[rgb(243,247,252)]',
                                        'shadow-sm',
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        {element.status && <Status status={element.status} />}
                                        <a href={element.url}>
                                            <span>{element.label}</span>
                                        </a>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="transparent"
                                        size="xs"
                                        onClick={() => { return removeElement(element.id); }}
                                        className={cn('-mr-1')}
                                        aria-label={t('Remove element')}
                                    >
                                        <FontAwesomeIcon icon={faXmark} className="size-[15px]" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {(!field.limit || selectedElements.length < field.limit) && !isLoading && (
                    <Button
                        type="button"
                        variant="dashed"
                        aria-label={t('Choose')}
                        className={cn(
                            'pl-1.5',
                            errors.length > 0 && [
                                'border-rose-600!',
                                'focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]!',
                            ],
                        )}
                        onClick={handleButtonClick}
                    >
                        <FontAwesomeIcon icon={faPlus} className="size-[16px]" /> {t('Choose')}
                    </Button>
                )}
            </div>
        </FieldLayout>
    );
};
