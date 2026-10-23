import { nothing, ReactiveController } from 'lit';
import { PkDataTable } from './pk-data-table.js';
import { DataTableFilter } from './model.js';
import { DataTableFilterOperator } from './filter-model.js';
/** Owns a filter-editing session; only Apply mutates the table's public query. */
export declare class DataTableFilterController implements ReactiveController {
    private host;
    private rules;
    private error;
    private opened;
    private closing;
    private preserveUnknown;
    private signature;
    private resizeObserver?;
    private positionFrame?;
    private pendingAdd?;
    private pendingType?;
    constructor(host: PkDataTable);
    private text;
    private get dialog();
    private get trigger();
    private get available();
    private get querySignature();
    hostUpdated(): void;
    hostDisconnected(): void;
    private resetDraft;
    private position;
    private stopObserving;
    show(): Promise<void>;
    private focusRule;
    private afterHide;
    private close;
    private change;
    private add;
    private remove;
    private clearDraft;
    operatorLabel(filter: DataTableFilter, operator: DataTableFilterOperator): string;
    private apply;
    private renderValue;
    renderTrigger(slot?: string): import('lit-html').TemplateResult<1> | typeof nothing;
    renderDialog(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=filter-controller.d.ts.map