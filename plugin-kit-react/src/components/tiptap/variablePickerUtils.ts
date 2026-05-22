import type { VariableCategories, VariableOption } from './VariableDropdown';
import { formatVariableCategoryLabel } from './VariableDropdown';
import type { VariableGroup } from './VariableCommandList';

export type VariableCategoryEntry = {
    key: string;
    label: string;
    options: VariableOption[];
};

export function getVariableCategoryEntries(
    variableCategories: VariableCategories,
    variableCategoryLabels?: Record<string, string>,
    variableCategoryOrder?: string[],
): VariableCategoryEntry[] {
    const entries = Object.entries(variableCategories ?? {})
        .map(([key, options]) => {
        return ({
            key,
            label: formatVariableCategoryLabel(key, variableCategoryLabels),
            options: Array.isArray(options) ? options : []
        });
    })
        .filter(entry => {
        return entry.options.length > 0;
    });

    const order = variableCategoryOrder ?? Object.keys(variableCategories ?? {});

    entries.sort((a, b) => {
        const aOrderIndex = order.indexOf(a.key);
        const bOrderIndex = order.indexOf(b.key);
        const aOrder = aOrderIndex === -1 ? Number.MAX_SAFE_INTEGER : aOrderIndex;
        const bOrder = bOrderIndex === -1 ? Number.MAX_SAFE_INTEGER : bOrderIndex;

        if (aOrder !== bOrder) {
            return aOrder - bOrder;
        }

        return a.label.localeCompare(b.label);
    });

    return entries;
}

export function toTopLevelGroups(
    entries: VariableCategoryEntry[],
    t: (message: string) => string,
): VariableGroup[] {
    const groups: VariableGroup[] = [];

    entries.forEach((entry) => {
        if (entry.key === 'fieldsVariables') {
            const pageBuckets = new Map<string, VariableOption[]>();
            let hasPageBuckets = false;

            entry.options.forEach((item) => {
                const pageLabel = String((item as VariableOption)?.pageLabel || '').trim();
                if (!pageLabel) {
                    return;
                }

                hasPageBuckets = true;
                if (!pageBuckets.has(pageLabel)) {
                    pageBuckets.set(pageLabel, []);
                }
                pageBuckets.get(pageLabel)!.push(item);
            });

            if (hasPageBuckets) {
                pageBuckets.forEach((items, pageLabel) => {
                    groups.push({
                        label: t(pageLabel),
                        value: `${entry.key}:${pageLabel}`,
                        items,
                    });
                });

                return;
            }
        }

        groups.push({
            label: t(entry.label),
            value: entry.key,
            items: entry.options,
        });
    });

    return groups;
}

export function matchesVariableQuery(item: VariableOption, normalizedQuery: string): boolean {
    if (!normalizedQuery) {
        return true;
    }

    return (
        (item.label ?? '').toLowerCase().includes(normalizedQuery) ||
        String(item.value ?? '').toLowerCase().includes(normalizedQuery)
    );
}
