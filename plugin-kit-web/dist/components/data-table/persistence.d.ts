import { PkDataTable } from './pk-data-table.js';
export type DataTablePreferenceStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export interface DataTablePersistenceOptions {
    /** Stable table identity. Include site/context here when preferences should differ. */
    key: string;
    /** Current account identity; never share preferences between users on the same browser. */
    userId: string | number;
    /** Bump when the consumer's preference schema changes incompatibly. */
    version?: string | number;
    /** False keeps the supplied query sort, for example when the URL specifies one. */
    restoreSort?: boolean;
    /** Defaults to the table document's localStorage. Access failures are ignored. */
    storage?: DataTablePreferenceStorage;
}
export interface DataTablePersistence {
    readonly storageKey: string;
    /** Remove saved preferences without changing the current table. */
    clear(): void;
    /** Stop listening; call when disposing of the table or changing the account/key. */
    disconnect(): void;
}
/** Attach after configuring columns/defaults/query and before connecting the table or starting its loader. */
export declare function persistDataTableView(table: PkDataTable, options: DataTablePersistenceOptions): DataTablePersistence;
//# sourceMappingURL=persistence.d.ts.map