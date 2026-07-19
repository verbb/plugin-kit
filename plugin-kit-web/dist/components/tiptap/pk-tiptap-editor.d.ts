import { PropertyValues } from 'lit';
import { ToolbarNode } from '@verbb/plugin-kit-tiptap-core';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
/**
 * TipTap document editor with a Craft-styled toolbar.
 *
 * @slot toolbar - Replace the entire default toolbar (opt-in via light-DOM presence).
 * @slot toolbar-end - Append controls after stock toolbar buttons (same flex gap).
 */
export declare class PkTiptapEditor extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    private editorMount;
    input: HTMLInputElement;
    private linkDialog?;
    private linkUrlInput?;
    private linkTextInput?;
    private linkNewTabCheckbox?;
    private linkSubmitButton?;
    private readonly linkUrlInputId;
    private readonly linkTextInputId;
    private readonly host;
    private _value;
    /**
     * Flat toolbar button list. HTML uses a comma-separated attribute; React may
     * pass a `string[]`. Named `buttons` (not `buttonsAttr`) so React can set the
     * property — a getter-only `buttons` previously threw on assign.
     */
    buttons: string | string[];
    /** Structured toolbar config — JSON string attribute, or a node array from React. */
    toolbar: string | ToolbarNode[] | null;
    linkOptions: string | null;
    linkSelectorStorageKeyPrefix?: string;
    rows: number;
    placeholder: string;
    readonly: boolean;
    invalid: boolean;
    /**
     * Formie / React configure bridge — called when a chip is activated for editing.
     * Prefer this over listening for `pk-variable-tag-configure` from React.
     */
    variableTagConfigure: ((detail: import('./variable-tag-node-view.js').PkVariableTagConfigureDetail) => void) | null;
    invalidContentMessage: string;
    /** Show `pk-tooltip` hints on toolbar buttons (default: on). */
    toolbarTooltips: boolean;
    private linkDialogBusy;
    private linkDialogSeed;
    private linkDialogTitle;
    private linkDialogSubmitLabel;
    private linkDialogMounted;
    private linkBubbleVisible;
    private linkBubbleHref;
    private linkBubbleTop;
    private linkBubbleLeft;
    private hasCustomToolbar;
    private readonly linkButtonId;
    private readonly toolbarButtonIds;
    private readonly toolbarGroupIds;
    private selectionListenerAttached;
    get value(): string;
    /**
     * Document JSON string. Also accepts a TipTap node array (common from React)
     * and serializes it — arrays previously bypassed JSON.parse and mounted empty.
     */
    set value(val: string | unknown[] | null);
    defaultValue: string | null;
    get editor(): import('@tiptap/core').Editor | null;
    get toolbarNodes(): ToolbarNode[];
    /** Resolved flat button names from the active toolbar config. */
    get buttonNames(): string[];
    private toolbarHasLink;
    private resolveLinkOptions;
    private get contentError();
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    firstUpdated(): void;
    private resolveContentError;
    private mountEditor;
    private attachSelectionListeners;
    private updateLinkBubble;
    private handleLinkBubbleEdit;
    private handleLinkBubbleUnlink;
    private renderLinkBubble;
    private syncEditorContent;
    private emitValueChange;
    private handleToolbarCommand;
    private openLinkMenu;
    private openLinkDialog;
    private closeLinkDialog;
    private handleLinkDialogAfterHide;
    private syncLinkDialogFields;
    private updateLinkDialogSubmitState;
    private handleLinkUrlInput;
    private handleLinkDialogKeyDown;
    private handleLinkDialogSubmit;
    private submitLinkDialog;
    private isLinkActive;
    private renderLinkDialog;
    private getToolbarButtonId;
    private getToolbarButtonLabel;
    private renderToolbarTooltip;
    private renderToolbarButton;
    private handleCraftLink;
    private getToolbarGroupId;
    private renderToolbarSeparator;
    private renderGroupTriggerContent;
    private renderToolbarGroup;
    private renderToolbarNode;
    private renderDefaultToolbar;
    private renderLinkToolbarButton;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-tiptap-editor': PkTiptapEditor;
    }
}
//# sourceMappingURL=pk-tiptap-editor.d.ts.map