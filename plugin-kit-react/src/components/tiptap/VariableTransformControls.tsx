import type { ComponentProps } from 'react';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { Input } from '@verbb/plugin-kit-react/components/Input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@verbb/plugin-kit-react/components/Select';

type TransformParamOption = {
    value: string;
    label: string;
    group?: string;
};

type TransformParam = {
    name: string;
    type: string;
    label: string;
    required: boolean;
    default?: string | number | boolean | null;
    placeholder?: string;
    options?: TransformParamOption[];
    showWhen?: {
        param: string;
        equals: string;
    };
};

type TransformOption = {
    value: string;
    label: string;
    description: string;
    appliesTo?: string[];
    params: TransformParam[];
};

type VariableTransformControlsProps = {
    transformerId: string;
    onTransformerIdChange: (value: string) => void;
    transformOptions: TransformOption[];
    hasIncompatibleTransformerSelection: boolean;
    selectedTransformer: TransformOption | null;
    transformerParams: Record<string, string>;
    onTransformerParamChange: (paramName: string, value: string) => void;
};

function TransformParamField({
    param,
    value,
    onChange,
    t,
}: {
    param: TransformParam;
    value: string;
    onChange: (value: string) => void;
    t: (key: string) => string;
}) {
    if (!Array.isArray(param.options) || param.options.length === 0) {
        return (
            <Input
                type={param.type === 'number' ? 'number' : 'text'}
                value={value}
                onChange={event => {
                    return onChange(event.target.value);
                }}
                placeholder={param.placeholder || (param.default == null ? '' : String(param.default))}
                className="text-[13px] placeholder:text-slate-400"
            />
        );
    }

    const { options } = param;
    const selectItems = [
        ...options.map(option => {
            return ({
                value: option.value,
                label: option.label
            });
        }),
    ];
    const groupedOptions = options.reduce((acc, option) => {
        const group = option.group ?? '';
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(option);
        return acc;
    }, {} as Record<string, TransformParamOption[]>);
    const groupOrder = Object.keys(groupedOptions);
    const preferredDefault = options.some(option => {
        return option.value === 'isoDate';
    }) ? 'isoDate' : options[0]?.value ?? '';
    const resolvedDefault = String(param.default ?? preferredDefault);
    const selectValue = value || resolvedDefault;

    return (
        <div className="space-y-2">
            <Select
                value={selectValue}
                items={selectItems as ComponentProps<typeof Select>['items']}
                onValueChange={(value) => {
                    const nextValue = String(value ?? '');
                    onChange(nextValue);
                }}
                size="sm"
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('Select option')} />
                </SelectTrigger>
                <SelectContent>
                    {groupOrder.map((groupKey) => {
                        const entries = groupedOptions[groupKey] ?? [];
                        if (entries.length === 0) {
                            return null;
                        }

                        if (!groupKey) {
                            return entries.map(entry => {
                                return (
                                    <SelectItem key={entry.value} value={entry.value}>
                                        {entry.label}
                                    </SelectItem>
                                );
                            });
                        }

                        return (
                            <SelectGroup key={groupKey}>
                                <SelectLabel>{groupKey}</SelectLabel>
                                {entries.map(entry => {
                                    return (
                                        <SelectItem key={entry.value} value={entry.value}>
                                            {entry.label}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}

export function VariableTransformControls({
    transformerId,
    onTransformerIdChange,
    transformOptions,
    hasIncompatibleTransformerSelection,
    selectedTransformer,
    transformerParams,
    onTransformerParamChange,
}: VariableTransformControlsProps) {
    const t = useTranslation();

    if (transformOptions.length === 0) {
        return null;
    }

    const selectItems = [
        { value: '', label: t('None') },
        ...transformOptions.map(option => {
            return ({
                value: option.value,
                label: option.label
            });
        }),
    ];
    const activeParams = (selectedTransformer?.params ?? []).filter((param) => {
        if (!param.showWhen) {
            return true;
        }

        const dependencyValue = transformerParams[param.showWhen.param] ?? '';
        return dependencyValue === param.showWhen.equals;
    });
    const groupedTransformOptions = transformOptions.reduce((groups, option) => {
        const typeKey = option.appliesTo?.[0] || 'other';

        if (!groups[typeKey]) {
            groups[typeKey] = [];
        }

        groups[typeKey].push(option);
        return groups;
    }, {} as Record<string, TransformOption[]>);
    const groupOrder = ['text', 'number', 'date', 'boolean', 'other'];
    const groupLabelByType: Record<string, string> = {
        text: t('Text'),
        number: t('Number'),
        date: t('Date'),
        boolean: t('Boolean'),
        other: t('Other'),
    };

    return (
        <>
            <label className="text-[11px] text-gray-500 block mt-2 mb-1">
                {t('Transform (optional)')}
            </label>
            <Select
                value={transformerId}
                onValueChange={value => {
                    return onTransformerIdChange(String(value ?? ''));
                }}
                items={selectItems as ComponentProps<typeof Select>['items']}
                size="sm"
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('None')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">{t('None')}</SelectItem>
                    {groupOrder.map((typeKey) => {
                        const options = groupedTransformOptions[typeKey] ?? [];
                        if (options.length === 0) {
                            return null;
                        }

                        return (
                            <SelectGroup key={typeKey}>
                                <SelectLabel>{groupLabelByType[typeKey] ?? typeKey}</SelectLabel>
                                {options.map(option => {
                                    return (
                                        <SelectItem key={`${typeKey}-${option.value}`} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        );
                    })}
                </SelectContent>
            </Select>
            {hasIncompatibleTransformerSelection && (
                <p className="mt-1 text-[11px] text-amber-700">
                    {t('The selected transform is not compatible with this variable.')}
                </p>
            )}
            {activeParams.length > 0 && (
                <div className="mt-2 space-y-2">
                    {activeParams.map(param => {
                        return (
                            <div key={param.name}>
                                <label className="text-[11px] text-gray-500 block mb-1">
                                    {param.label}
                                </label>
                                <TransformParamField
                                    param={param}
                                    value={transformerParams[param.name] ?? ''}
                                    onChange={(value) => {
                                        onTransformerParamChange(param.name, value);
                                        if (param.name === 'preset' && value !== 'custom') {
                                            onTransformerParamChange('pattern', '');
                                        }
                                    }}
                                    t={t}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}
