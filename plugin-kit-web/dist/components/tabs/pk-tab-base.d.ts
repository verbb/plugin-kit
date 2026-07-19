import { PkElement } from '../../base/pk-element.js';
/** Shared tab trigger behaviour for all tab variants. */
export declare class PkTabBase extends PkElement {
    value: string;
    disabled: boolean;
    selected: boolean;
    focusIndex: number;
    panelId?: string;
    focusControl(): void;
    protected handleClick(): void;
    protected handleKeyDown(event: KeyboardEvent): void;
    protected renderTrigger(className: string): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=pk-tab-base.d.ts.map