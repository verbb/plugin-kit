import type { DataTableFilter, DataTableFilterValue } from './model.js';

export type DataTableFilterOperator =
    | 'contains'
    | 'not-contains'
    | 'equals'
    | 'not-equals'
    | 'starts-with'
    | 'ends-with'
    | 'in'
    | 'not-in'
    | 'between'
    | 'greater-than'
    | 'at-least'
    | 'less-than'
    | 'at-most'
    | 'empty'
    | 'not-empty';

/** The first operator preserves the original value-only filter semantics. */
export function dataTableFilterOperators(
    filter: DataTableFilter,
): DataTableFilterOperator[] {
    let supported: DataTableFilterOperator[];
    switch (filter.type) {
        case 'text':
            supported = [
                'contains',
                'equals',
                'not-equals',
                'not-contains',
                'starts-with',
                'ends-with',
                'empty',
                'not-empty',
            ];
            break;
        case 'number-range':
        case 'date-range':
            supported = [
                'between',
                'equals',
                'not-equals',
                'greater-than',
                'at-least',
                'less-than',
                'at-most',
                'empty',
                'not-empty',
            ];
            break;
        case 'multi-select':
            supported = ['in', 'not-in', 'empty', 'not-empty'];
            break;
        case 'boolean':
            supported = ['equals', 'empty', 'not-empty'];
            break;
        default:
            supported = ['equals', 'not-equals', 'empty', 'not-empty'];
    }
    const allowed = filter.operators?.filter((operator) =>
        supported.includes(operator),
    );
    return allowed?.length ? allowed : supported;
}

export function dataTableFilterOperator(
    filter: DataTableFilter,
    operator?: DataTableFilterOperator,
): DataTableFilterOperator {
    const supported = dataTableFilterOperators(filter);
    return operator && supported.includes(operator) ? operator : supported[0];
}

export const filterNeedsValue = (operator: DataTableFilterOperator): boolean =>
    operator !== 'empty' && operator !== 'not-empty';
export const filterValueIsBlank = (value: DataTableFilterValue): boolean =>
    Array.isArray(value) ? value.every((part) => !part.trim()) : !value.trim();

/** Calendar comparisons use UTC day boundaries, matching the existing date-range contract. */
export function matchesDataTableFilter(
    filter: DataTableFilter,
    value: unknown,
    expected: DataTableFilterValue,
    requested?: DataTableFilterOperator,
    locale?: string,
): boolean {
    const operator = dataTableFilterOperator(filter, requested);
    const empty =
        value == null ||
        value === '' ||
        (Array.isArray(value) && !value.length);
    if (operator === 'empty') return empty;
    if (operator === 'not-empty') return !empty;
    if (filterValueIsBlank(expected)) return true;
    if (filter.type === 'number-range' || filter.type === 'date-range') {
        if (empty) return false;
        const date = filter.type === 'date-range';
        const actual = date ? Date.parse(String(value)) : Number(value);
        const [from = '', to = ''] = Array.isArray(expected)
            ? expected
            : [expected];
        const lower = date ? Date.parse(from) : Number(from);
        const upper = date ? Date.parse(to) + 86400000 - 1 : Number(to);
        if (!Number.isFinite(actual)) return false;
        if (operator === 'between')
            return (!from || actual >= lower) && (!to || actual <= upper);
        if (!Number.isFinite(lower)) return false;
        const end = date ? lower + 86400000 - 1 : lower;
        if (operator === 'equals') return actual >= lower && actual <= end;
        if (operator === 'not-equals') return actual < lower || actual > end;
        if (operator === 'greater-than') return actual > end;
        if (operator === 'at-least') return actual >= lower;
        if (operator === 'less-than') return actual < lower;
        return actual <= end;
    }
    const actual = value == null ? '' : String(value);
    const values = Array.isArray(expected) ? expected : [expected];
    if (operator === 'in' || operator === 'not-in') {
        const included = values.includes(actual);
        return operator === 'in' ? included : !included;
    }
    const a =
        filter.type === 'text' ? actual.toLocaleLowerCase(locale) : actual;
    const b =
        filter.type === 'text'
            ? String(expected).toLocaleLowerCase(locale)
            : String(expected);
    switch (operator) {
        case 'equals':
            return a === b;
        case 'not-equals':
            return a !== b;
        case 'not-contains':
            return !a.includes(b);
        case 'starts-with':
            return a.startsWith(b);
        case 'ends-with':
            return a.endsWith(b);
        default:
            return a.includes(b);
    }
}
