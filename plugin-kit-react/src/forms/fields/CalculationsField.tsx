import { useMemo, useState } from 'react';
import { TiptapEditor } from '@verbb/plugin-kit-react/components';
import type { VariableCategories, VariableOption } from '@verbb/plugin-kit-react/components/tiptap/VariableDropdown';
import { contentToValue } from '@verbb/plugin-kit-react/components/tiptap/variableSerialization';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { hostRequest } from '@verbb/plugin-kit-react/utils';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import type { SchemaNode } from '../engine/SchemaIndex';
import type { VariableConfig } from '../contexts/VariableCategoriesContext';
import { useEngineField } from '../useEngineField';
import { useVariableCategoriesContext } from '../contexts/VariableCategoriesContext';
import { CalculationsToolbar } from './CalculationsToolbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';

import { cn } from '@verbb/plugin-kit-react/utils';

type CalculationsFieldProps = {
    form: SchemaFormEngineApi;
    field: SchemaNode & {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        variableConfig?: VariableConfig;
        variableCategories?: VariableCategories;
        variablePickerTriggerCharacters?: string[];
        validationAction?: string;
        rows?: number;
    };
};

type ValidationState = {
    type: 'idle' | 'success' | 'error';
    message: string;
    technicalMessage?: string;
};

type CalculationPage = {
    _handle?: string;
    handle?: string;
};

type ValidationResponsePayload = {
    valid?: unknown;
    message?: unknown;
    technicalMessage?: unknown;
};

type HostRequestError = {
    message?: string;
    response?: {
        data?: {
            message?: unknown;
            technicalMessage?: unknown;
        };
    };
};

const flattenVariableOptions = (options: VariableOption[] = []): VariableOption[] => {
    const flat: VariableOption[] = [];

    const visit = (nodes: VariableOption[]) => {
        nodes.forEach((node) => {
            flat.push(node);

            if (Array.isArray(node?.children) && node.children.length) {
                visit(node.children);
            }
        });
    };

    visit(options);
    return flat;
};

const getAvailableVariableTokens = (variableCategories?: VariableCategories): string[] => {
    const categoryOptions = Object.values(variableCategories ?? {}).flatMap((items) => {
        return Array.isArray(items) ? items : [];
    });

    const flat = flattenVariableOptions(categoryOptions);

    return Array.from(new Set(flat
        .map((item) => {
            return typeof item?.value === 'string' ? item.value.trim() : '';
        })
        .filter(Boolean)));
};

const getVariableTokenLabelMap = (variableCategories?: VariableCategories): Record<string, string> => {
    const categoryOptions = Object.values(variableCategories ?? {}).flatMap((items) => {
        return Array.isArray(items) ? items : [];
    });

    const flat = flattenVariableOptions(categoryOptions);

    return flat.reduce((map, item) => {
        const token = typeof item?.value === 'string' ? item.value.trim() : '';
        if (!token) {
            return map;
        }

        const label = typeof item?.label === 'string' ? item.label.trim() : '';
        map[token] = label || token;

        return map;
    }, {} as Record<string, string>);
};

const getFormulaFromValue = (value: unknown): string => {
    if (typeof value === 'string') {
        return value;
    }

    if (Array.isArray(value)) {
        return contentToValue(value);
    }

    if (value && typeof value === 'object' && Array.isArray((value as { content?: unknown[] }).content)) {
        return contentToValue((value as { content: unknown[] }).content);
    }

    return '';
};

const getPageIndexFromScopePath = (scopePathValue: unknown): number | null => {
    const scopePath = typeof scopePathValue === 'string' ? scopePathValue : '';

    if (!scopePath) {
        return null;
    }

    const match = scopePath.match(/(?:^|\\.)pages\\.(\\d+)(?:\\.|$)/);
    if (!match) {
        return null;
    }

    const pageIndex = Number.parseInt(match[1] || '', 10);

    return Number.isInteger(pageIndex) ? pageIndex : null;
};

const getActivePageIndex = (pages: unknown, activePage: unknown): number | null => {
    if (!Array.isArray(pages) || !pages.length || typeof activePage !== 'string' || !activePage) {
        return null;
    }

    const pageIndex = pages.findIndex((page) => {
        const resolvedPage = (page && typeof page === 'object') ? page as CalculationPage : {};
        return resolvedPage._handle === activePage || resolvedPage.handle === activePage;
    });

    return pageIndex >= 0 ? pageIndex : null;
};

const getValidationErrorDetails = (error: unknown, fallbackMessage: string) => {
    const resolvedError = (error && typeof error === 'object') ? error as HostRequestError : {};
    const responseData = resolvedError.response?.data;
    const message = responseData?.message || resolvedError.message || fallbackMessage;

    return {
        message: String(message),
        technicalMessage: String(responseData?.technicalMessage ?? ''),
    };
};

export const CalculationsField = ({ form, field }: CalculationsFieldProps) => {
    const t = useTranslation();
    const { value, setValue, errors } = useEngineField(form, field.name);
    const [guideOpen, setGuideOpen] = useState(false);
    const [validating, setValidating] = useState(false);
    const [validation, setValidation] = useState<ValidationState>({ type: 'idle', message: '' });
    const {
        getVariableCategories,
        variableCategoryLabels,
        variableCategoryOrder,
        variableTransformerRegistry,
    } = useVariableCategoriesContext();

    const resolvedVariableCategories = useMemo(() => {
        if (field.variableCategories) {
            return field.variableCategories;
        }

        const { variableConfig } = field;
        if (!variableConfig || !getVariableCategories) {
            return undefined;
        }

        const pages = form?.getFieldValue?.('pages');
        const activePage = form?.getFieldValue?.('activePage');
        const scopePageIndex = getPageIndexFromScopePath(field._scopePath);
        const activePageIndex = getActivePageIndex(pages, activePage);
        const currentPageIndex = Number.isInteger(scopePageIndex) ? scopePageIndex : activePageIndex;
        const scopedVariableConfig = {
            ...variableConfig,
            ...(Number.isInteger(currentPageIndex) ? { currentPageIndex } : {}),
        };

        return getVariableCategories(scopedVariableConfig, { form });
    }, [field, form, getVariableCategories]);

    const availableVariableTokens = useMemo(() => {
        return getAvailableVariableTokens(resolvedVariableCategories);
    }, [resolvedVariableCategories]);
    const tokenLabels = useMemo(() => {
        return getVariableTokenLabelMap(resolvedVariableCategories);
    }, [resolvedVariableCategories]);

    const runValidation = async () => {
        const formula = getFormulaFromValue(value).trim();
        if (!formula) {
            setValidation({ type: 'error', message: t('Enter a formula to test.') });
            return;
        }

        setValidating(true);
        setValidation({ type: 'idle', message: '', technicalMessage: '' });

        try {
            const action = field.validationAction || 'plugin-kit/fields/validate-calculations-formula';
            const response = await hostRequest('POST', action, {
                data: {
                    formula,
                    availableTokens: availableVariableTokens,
                    tokenLabels,
                },
            });

            const payload = (response?.data ?? response) as ValidationResponsePayload;
            const isValid = Boolean(payload?.valid);
            const message = String(payload?.message ?? '');
            const technicalMessage = String(payload?.technicalMessage ?? '');

            setValidation({
                type: isValid ? 'success' : 'error',
                message: message || (isValid ? t('Formula is valid.') : t('Formula is invalid.')),
                technicalMessage,
            });
        } catch (error) {
            const { message, technicalMessage } = getValidationErrorDetails(error, t('Unable to validate formula.'));
            setValidation({
                type: 'error',
                message: String(message),
                technicalMessage,
            });
        } finally {
            setValidating(false);
        }
    };

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
            <div className="space-y-2">
                <TiptapEditor
                    value={value ?? ''}
                    onChange={setValue}
                    placeholder={field.placeholder}
                    rows={field.rows}
                    buttons={['variableTag']}
                    toolbarContent={({ editor, variableCategories, variableCategoryLabels, variableCategoryOrder, variablePickerOpen, onVariablePickerOpenChange }) => {
                        return (
                            <CalculationsToolbar
                                editor={editor}
                                variableCategories={variableCategories}
                                variableCategoryLabels={variableCategoryLabels}
                                variableCategoryOrder={variableCategoryOrder}
                                variablePickerOpen={variablePickerOpen}
                                onVariablePickerOpenChange={onVariablePickerOpenChange}
                                guideOpen={guideOpen}
                                onGuideOpenChange={setGuideOpen}
                                validating={validating}
                                onValidate={runValidation}
                            />
                        );
                    }}
                    disabled={field.disabled}
                    isInvalid={errors.length > 0}
                    variableCategories={resolvedVariableCategories}
                    variableCategoryLabels={variableCategoryLabels}
                    variableCategoryOrder={variableCategoryOrder}
                    variableTransformerRegistry={variableTransformerRegistry}
                    variablePickerTriggerCharacters={field.variablePickerTriggerCharacters}
                />

                {validation.type !== 'idle' && (
                    <div className="space-y-1">
                        <p className={cn(
                            'flex items-center gap-1',
                            validation.type === 'success' ? 'text-emerald-700' : 'text-rose-700',
                        )}>
                            {validation.type === 'success' ? (
                                <FontAwesomeIcon icon={faCheck} className="size-3 mt-0.5" />
                            ) : null}
                            {validation.message}
                        </p>

                        {validation.type === 'error' && validation.technicalMessage && validation.technicalMessage !== validation.message && (
                            <details className="text-xs text-gray-500">
                                <summary className="cursor-pointer select-none">{t('Show technical details')}</summary>
                                <p className="mt-1 text-rose-700">{validation.technicalMessage}</p>
                            </details>
                        )}
                    </div>
                )}
            </div>
        </FieldLayout>
    );
};
