import { DataTableFilter, DataTableFilterValue } from './model.js';
export type DataTableFilterOperator = 'contains' | 'not-contains' | 'equals' | 'not-equals' | 'starts-with' | 'ends-with' | 'in' | 'not-in' | 'between' | 'greater-than' | 'at-least' | 'less-than' | 'at-most' | 'empty' | 'not-empty';
/** The first operator preserves the original value-only filter semantics. */
export declare function dataTableFilterOperators(filter: DataTableFilter): DataTableFilterOperator[];
export declare function dataTableFilterOperator(filter: DataTableFilter, operator?: DataTableFilterOperator): DataTableFilterOperator;
export declare const filterNeedsValue: (operator: DataTableFilterOperator) => boolean;
export declare const filterValueIsBlank: (value: DataTableFilterValue) => boolean;
/** Calendar comparisons use UTC day boundaries, matching the existing date-range contract. */
export declare function matchesDataTableFilter(filter: DataTableFilter, value: unknown, expected: DataTableFilterValue, requested?: DataTableFilterOperator, locale?: string): boolean;
//# sourceMappingURL=filter-model.d.ts.map