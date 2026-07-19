import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import {
    applyLinkToEditor,
    createTiptapExtensions,
    getCraftLinkOptions,
    getFatalTiptapContentError,
    getLinkEditState,
    getLinkOptionsElementSiteId,
    getLinkOpenInNewTab,
    getSelectedText,
    getToolbarGroupDefaultIcon,
    getToolbarGroupMenuItems,
    getToolbarGroupTriggerState,
    isFormattingToolbarPreset,
    isHeadingsOnlyToolbarPreset,
    isTiptapButtonActive,
    isToolbarButtonActive,
    openCraftElementLinkSelector,
    runToolbarButton,
    toolbarIncludesButton,
    unsetLinkFromEditor,
    type LinkElementConfig,
    type LinkOptionsInput,
    type ToolbarGroup,
    type ToolbarNode,
} from '@verbb/plugin-kit-tiptap-core';
import { getMarkRange, posToDOMRect } from '@tiptap/core';

import { formControlStyles } from '../../base/form-control.styles.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { uniqueId } from '../../a11y/focus.js';
import { MirrorValidator } from '../../validators/index.js';
import {
    link,
    triangleExclamation,
    renderIconHtml,
} from '../../icons/index.js';

import '../button/pk-button.js';
import '../checkbox/pk-checkbox.js';
import '../dialog/pk-dialog.js';
import '../dropdown-menu/pk-dropdown-item.js';
import '../field/pk-field.js';
import '../input/pk-input.js';
import '../dropdown-menu/pk-dropdown-menu.js';
import '../dropdown-menu/pk-dropdown-separator.js';
import '../tooltip/pk-tooltip.js';
import type { PkButton } from '../button/pk-button.js';
import type { PkCheckbox } from '../checkbox/pk-checkbox.js';
import type { PkDialog } from '../dialog/pk-dialog.js';
import type { PkDropdownMenu } from '../dropdown-menu/pk-dropdown-menu.js';
import type { PkInput } from '../input/pk-input.js';
import { TiptapEditorHost, parseTiptapDocumentValue, serializeTiptapDocumentContent, serializeTiptapDocumentValue } from './tiptap-editor-host.js';
import { createCraftElementSelectorHost, parseLinkOptionsAttribute, parseToolbarAttribute } from './tiptap-utils.js';
import {
    TOOLBAR_CHEVRON_HTML,
    TOOLBAR_ICONS,
    TOOLBAR_LABELS,
    createToolbarPrefixIcon,
    getToolbarMenuItemLabel,
} from './tiptap-toolbar.js';
import { createVariableTagDomNodeView } from './variable-tag-node-view.js';
import { pkTiptapEditorStyles } from './pk-tiptap-editor.styles.js';
import { tiptapProseMirrorStyles } from './tiptap.styles.js';

type LinkDialogSeed = {
    url?: string;
    text?: string;
    openInNewTab?: boolean;
    from?: number;
    to?: number;
};

/**
 * TipTap document editor with a Craft-styled toolbar.
 *
 * @slot toolbar - Replace the entire default toolbar (opt-in via light-DOM presence).
 * @slot toolbar-end - Append controls after stock toolbar buttons (same flex gap).
 */
@customElement('pk-tiptap-editor')
export class PkTiptapEditor extends PkFormAssociatedElement {
    static override styles = [formControlStyles, pkTiptapEditorStyles, tiptapProseMirrorStyles];

    static override get validators() {
        return [...super.validators, MirrorValidator()];
    }

    override assumeInteractionOn = ['blur', 'input'];

    @query('.editor-mount')
    private editorMount!: HTMLDivElement;

    @query('.mirror-input')
    override input!: HTMLInputElement;

    @query('.link-dialog')
    private linkDialog?: PkDialog;

    @query('pk-input.link-dialog__url-input')
    private linkUrlInput?: PkInput;

    @query('pk-input.link-dialog__text-input')
    private linkTextInput?: PkInput;

    @query('pk-checkbox')
    private linkNewTabCheckbox?: PkCheckbox;

    @query('pk-button.link-dialog__submit')
    private linkSubmitButton?: PkButton;

    private readonly linkUrlInputId = uniqueId('pk-tiptap-link-url');

    private readonly linkTextInputId = uniqueId('pk-tiptap-link-text');

    private readonly host = new TiptapEditorHost();

    private _value: string | null = null;

    /**
     * Flat toolbar button list. HTML uses a comma-separated attribute; React may
     * pass a `string[]`. Named `buttons` (not `buttonsAttr`) so React can set the
     * property — a getter-only `buttons` previously threw on assign.
     */
    @property({
        attribute: 'buttons',
        converter: {
            fromAttribute: (value: string | null) => value ?? 'bold,italic',
            toAttribute: (value: string | string[] | null | undefined) => {
                if (value == null) {
                    return 'bold,italic';
                }

                return Array.isArray(value) ? value.join(',') : value;
            },
        },
    })
    buttons: string | string[] = 'bold,italic';

    /** Structured toolbar config — JSON string attribute, or a node array from React. */
    @property({
        attribute: 'toolbar',
        converter: {
            fromAttribute: (value: string | null) => value,
            toAttribute: (value: string | ToolbarNode[] | null | undefined) => {
                if (value == null) {
                    return null;
                }

                return typeof value === 'string' ? value : JSON.stringify(value);
            },
        },
    })
    toolbar: string | ToolbarNode[] | null = null;

    @property({ attribute: 'link-options' })
    linkOptions: string | null = null;

    @property({ attribute: 'link-selector-storage-key-prefix' })
    linkSelectorStorageKeyPrefix?: string;

    @property({ type: Number })
    rows = 4;

    @property()
    placeholder = '';

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    /**
     * Formie / React configure bridge — called when a chip is activated for editing.
     * Prefer this over listening for `pk-variable-tag-configure` from React.
     */
    @property({ attribute: false })
    variableTagConfigure: ((detail: import('./variable-tag-node-view.js').PkVariableTagConfigureDetail) => void) | null = null;

    @property({ attribute: 'invalid-content-message' })
    invalidContentMessage = '';

    /** Show `pk-tooltip` hints on toolbar buttons (default: on). */
    @property({ type: Boolean, attribute: 'toolbar-tooltips' })
    toolbarTooltips = true;

    private linkDialogBusy = false;

    private linkDialogSeed: LinkDialogSeed = {};

    @state()
    private linkDialogTitle = 'Insert Link';

    @state()
    private linkDialogSubmitLabel = 'Insert';

    @state()
    private linkDialogMounted = false;

    @state()
    private linkBubbleVisible = false;

    @state()
    private linkBubbleHref = '';

    @state()
    private linkBubbleTop = 0;

    @state()
    private linkBubbleLeft = 0;

    private hasCustomToolbar = false;

    private readonly linkButtonId = uniqueId('pk-tiptap-link-btn');

    private readonly toolbarButtonIds = new Map<string, string>();

    private readonly toolbarGroupIds = new Map<string, string>();

    private selectionListenerAttached = false;

    get value(): string {
        if (this.valueHasChanged) {
            return this._value ?? '[]';
        }

        return this._value ?? this.defaultValue ?? '[]';
    }

    /**
     * Document JSON string. Also accepts a TipTap node array (common from React)
     * and serializes it — arrays previously bypassed JSON.parse and mounted empty.
     */
    @state()
    set value(val: string | unknown[] | null) {
        const next = serializeTiptapDocumentValue(val);

        if (this._value === next) {
            return;
        }

        this.valueHasChanged = true;
        this._value = next;
    }

    @property({ attribute: 'value', reflect: true })
    defaultValue: string | null = '[]';

    get editor() {
        return this.host.editor;
    }

    get toolbarNodes(): ToolbarNode[] {
        const buttonsRaw = Array.isArray(this.buttons) ? this.buttons.join(',') : this.buttons;

        return parseToolbarAttribute(this.toolbar, buttonsRaw)
            .filter((node) => node.type !== 'button' || node.name !== 'variableTag');
    }

    /** Resolved flat button names from the active toolbar config. */
    get buttonNames(): string[] {
        return this.toolbarNodes
            .filter((node): node is Extract<ToolbarNode, { type: 'button' }> => node.type === 'button')
            .map((node) => node.name);
    }

    private toolbarHasLink(): boolean {
        return toolbarIncludesButton(this.toolbarNodes, 'link');
    }

    private resolveLinkOptions(): LinkOptionsInput | undefined {
        return parseLinkOptionsAttribute(this.linkOptions);
    }

    private get contentError(): string {
        return this.resolveContentError();
    }

    protected override syncFormValue(): void {
        this.setValue(this.value || '[]');

        if (this.input) {
            this.input.value = this.value || '[]';
        }
    }

    protected override resetToDefaultValue(): void {
        this.valueHasChanged = false;
        this._value = null;
        this.syncEditorContent();
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (typeof state === 'string') {
            this.value = state;
            this.syncEditorContent();
        }
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.hasCustomToolbar = Boolean(this.querySelector('[slot="toolbar"]'));
    }

    override disconnectedCallback(): void {
        this.linkDialog?.forceOverlayReset();
        this.linkDialogBusy = false;
        this.host.destroy();
        this.selectionListenerAttached = false;
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('value') && !changed.has('defaultValue')) {
            this.syncEditorContent();
        }

        if (changed.has('defaultValue') && !this.valueHasChanged) {
            this.syncEditorContent();
        }

        if (changed.has('disabled') || changed.has('readonly')) {
            this.host.editor?.setEditable(!this.disabled && !this.readonly);
        }

        super.updated(changed);
    }

    override firstUpdated(): void {
        queueMicrotask(() => {
            this.mountEditor();
            this.syncFormValue();
        });
    }

    private resolveContentError(): string {
        const detected = getFatalTiptapContentError(this.value);
        return detected ? (this.invalidContentMessage || detected) : '';
    }

    private mountEditor(): void {
        const content = this.contentError ? null : parseTiptapDocumentValue(this.value);
        const normalizedRows = Math.max(1, Number(this.rows || 0));
        const minHeight = `${(normalizedRows * 24) + 32}px`;

        this.host.mount({
            element: this.editorMount,
            extensions: createTiptapExtensions({
                trailingCursorText: '\u2060',
                variableTagNodeView: createVariableTagDomNodeView(),
            }),
            content,
            editable: !this.disabled && !this.readonly && !this.contentError,
            trailingCursorText: '\u2060',
            minHeight,
            onUpdate: (nextContent) => {
                const serialized = serializeTiptapDocumentContent(nextContent);
                this.value = serialized;

                if (this.input) {
                    this.input.value = serialized;
                }

                this.syncFormValue();
                // Emit JSON string (matches `value` prop) — arrays caused Formie controlled
                // fields to write mismatched types and re-enter sync forever.
                this.emitValueChange(serialized);
            },
        });

        queueMicrotask(() => {
            this.attachSelectionListeners();
        });
    }

    private attachSelectionListeners(): void {
        const editor = this.host.editor;

        if (!editor || this.selectionListenerAttached) {
            return;
        }

        const refreshToolbar = () => {
            if (this.linkDialogBusy || this.linkDialog?.open) {
                this.linkBubbleVisible = false;
                return;
            }

            this.updateLinkBubble();

            queueMicrotask(() => {
                if (this.isConnected && !this.linkDialogBusy && !this.linkDialog?.open) {
                    this.requestUpdate();
                }
            });
        };

        editor.on('selectionUpdate', refreshToolbar);
        editor.on('transaction', refreshToolbar);
        editor.on('focus', refreshToolbar);
        editor.on('blur', () => {
            this.linkBubbleVisible = false;
            this.requestUpdate();
        });
        this.selectionListenerAttached = true;
    }

    private updateLinkBubble(): void {
        const editor = this.host.editor;

        if (
            !editor
            || this.disabled
            || this.readonly
            || this.linkDialogBusy
            || this.linkDialog?.open
            || !editor.isFocused
            || !editor.isActive('link')
        ) {
            this.linkBubbleVisible = false;
            return;
        }

        const linkType = editor.state.schema.marks.link;
        const range = getMarkRange(editor.state.selection.$from, linkType);

        if (!range) {
            this.linkBubbleVisible = false;
            return;
        }

        const linkRect = posToDOMRect(editor.view, range.from, range.to);
        const mountRect = this.editorMount.getBoundingClientRect();
        const bubbleOffset = 8;

        this.linkBubbleHref = String(editor.getAttributes('link').href ?? '');
        this.linkBubbleTop = linkRect.top - mountRect.top - bubbleOffset;
        this.linkBubbleLeft = linkRect.left - mountRect.left + (linkRect.width / 2);
        this.linkBubbleVisible = true;
    }

    private handleLinkBubbleEdit = (event: Event): void => {
        event.preventDefault();

        const editor = this.host.editor;

        if (!editor) {
            return;
        }

        const state = getLinkEditState(editor);
        this.linkBubbleVisible = false;
        this.openLinkDialog({
            url: state.href,
            text: state.text,
            openInNewTab: state.openInNewTab,
            from: state.from,
            to: state.to,
        });
    };

    private handleLinkBubbleUnlink = (event: Event): void => {
        event.preventDefault();

        const editor = this.host.editor;

        if (!editor) {
            return;
        }

        unsetLinkFromEditor(editor);
        this.linkBubbleVisible = false;
    };

    private renderLinkBubble() {
        return html`
            <div
                class="link-bubble"
                role="toolbar"
                aria-label="Link actions"
                tabindex="0"
                style=${`top:${this.linkBubbleTop}px;left:${this.linkBubbleLeft}px;transform:translate(-50%, -100%);`}
            >
                <span class="link-bubble__arrow" aria-hidden="true"></span>
                <span class="link-bubble__url" title=${this.linkBubbleHref}>${this.linkBubbleHref}</span>
                <span class="link-bubble__divider" aria-hidden="true"></span>
                <button
                    type="button"
                    class="link-bubble__action"
                    @mousedown=${(event: Event) => event.preventDefault()}
                    @click=${this.handleLinkBubbleEdit}
                >Edit</button>
                <span class="link-bubble__divider" aria-hidden="true"></span>
                <button
                    type="button"
                    class="link-bubble__action"
                    @mousedown=${(event: Event) => event.preventDefault()}
                    @click=${this.handleLinkBubbleUnlink}
                >Unlink</button>
            </div>
        `;
    }

    private syncEditorContent(): void {
        const content = this.contentError ? null : parseTiptapDocumentValue(this.value);
        this.host.setContent(content, { trailingCursorText: '\u2060' });

        if (this.input) {
            this.input.value = this.value || '[]';
        }
    }

    private emitValueChange(value: string): void {
        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { value },
            bubbles: true,
            composed: true,
        }));
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private handleToolbarCommand(buttonName: string): void {
        const editor = this.host.editor;

        if (!editor) {
            return;
        }

        runToolbarButton(editor, buttonName);
    }

    private openLinkMenu(): void {
        const editor = this.host.editor;

        if (!editor) {
            return;
        }

        const selected = getSelectedText(editor);
        const { from, to } = editor.state.selection;

        const menu = this.shadowRoot?.querySelector<PkDropdownMenu>(
            `pk-dropdown-menu[for="${this.linkButtonId}"]`,
        );

        void (async () => {
            await menu?.whenClosed();
            this.openLinkDialog(from !== to ? { text: selected, from, to } : undefined);
        })();
    }

    private openLinkDialog(initial?: LinkDialogSeed): void {
        const editor = this.host.editor;
        const url = initial?.url ?? '';

        this.linkDialogBusy = true;
        this.linkBubbleVisible = false;
        this.linkDialogSeed = {
            url,
            text: initial?.text ?? '',
            openInNewTab: initial?.openInNewTab ?? (editor ? getLinkOpenInNewTab(editor) : false),
            from: initial?.from,
            to: initial?.to,
        };
        this.linkDialogTitle = url.trim() ? 'Update Link' : 'Insert Link';
        this.linkDialogSubmitLabel = url.trim() ? 'Update' : 'Insert';

        if (!this.linkDialogMounted) {
            this.linkDialogMounted = true;
        }

        // Mount first, then open after the dropdown has fully demoted (caller awaits
        // whenClosed). Busy flag still suppresses toolbar refresh during show animation.
        queueMicrotask(async () => {
            await this.updateComplete;
            await this.linkDialog?.updateComplete;
            this.syncLinkDialogFields();
            // Prefer show() over flipping `open` before firstUpdated — that path only
            // call showModal() and skips PkShowEvent / enter animation.
            await this.linkDialog?.show();
        });
    }

    private closeLinkDialog(): void {
        void this.linkDialog?.hide('close-button');
    }

    private handleLinkDialogAfterHide = (): void => {
        this.linkDialogBusy = false;

        queueMicrotask(() => {
            if (this.isConnected && !this.linkDialog?.open) {
                this.requestUpdate();
            }
        });
    };

    private syncLinkDialogFields(): void {
        const seed = this.linkDialogSeed;

        if (this.linkUrlInput) {
            this.linkUrlInput.value = seed.url ?? '';
        }

        if (this.linkTextInput) {
            this.linkTextInput.value = seed.text ?? '';
        }

        if (this.linkNewTabCheckbox) {
            this.linkNewTabCheckbox.checked = Boolean(seed.openInNewTab);
        }

        this.updateLinkDialogSubmitState();
    }

    private updateLinkDialogSubmitState(): void {
        const canSubmit = Boolean(this.linkUrlInput?.value.trim());

        if (this.linkSubmitButton) {
            this.linkSubmitButton.disabled = !canSubmit;
        }
    }

    private handleLinkUrlInput = (): void => {
        this.updateLinkDialogSubmitState();
    };

    private handleLinkDialogKeyDown = (event: KeyboardEvent): void => {
        if (event.key !== 'Enter') {
            return;
        }

        const path = event.composedPath();

        if (path.some((node) => node instanceof HTMLElement && node.localName === 'pk-checkbox')) {
            return;
        }

        if (path.some((node) => node instanceof HTMLElement && node.localName === 'pk-button')) {
            return;
        }

        if (path.some((node) => node instanceof HTMLButtonElement)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.submitLinkDialog();
    };

    private handleLinkDialogSubmit = (): void => {
        this.submitLinkDialog();
    };

    private submitLinkDialog(): void {
        const editor = this.host.editor;
        const url = this.linkUrlInput?.value.trim() ?? '';

        if (!editor || !url) {
            return;
        }

        applyLinkToEditor(editor, {
            url,
            text: this.linkTextInput?.value ?? '',
            openInNewTab: Boolean(this.linkNewTabCheckbox?.checked),
            from: this.linkDialogSeed.from,
            to: this.linkDialogSeed.to,
        });

        this.closeLinkDialog();
    }

    private isLinkActive(): boolean {
        const editor = this.host.editor;
        return editor ? isTiptapButtonActive(editor, 'link') : false;
    }

    private renderLinkDialog() {
        return html`
            <pk-dialog
                class="link-dialog"
                size="wide"
                label=${this.linkDialogTitle}
                @pk-after-hide=${this.handleLinkDialogAfterHide}
                @keydown=${this.handleLinkDialogKeyDown}
            >
                <div class="link-dialog__fields">
                    <pk-field label="URL" required .for=${this.linkUrlInputId}>
                        <pk-input
                            id=${this.linkUrlInputId}
                            class="link-dialog__url-input"
                            type="url"
                            placeholder="https://"
                            autofocus
                            @input=${this.handleLinkUrlInput}
                        ></pk-input>
                    </pk-field>
                    <pk-field label="Text" .for=${this.linkTextInputId}>
                        <pk-input
                            id=${this.linkTextInputId}
                            class="link-dialog__text-input"
                            type="text"
                        ></pk-input>
                    </pk-field>
                    <pk-checkbox>Open link in new tab</pk-checkbox>
                </div>
                <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
                <pk-button
                    slot="footer"
                    class="link-dialog__submit"
                    variant="primary"
                    disabled
                    @click=${this.handleLinkDialogSubmit}
                >
                    ${this.linkDialogSubmitLabel}
                </pk-button>
            </pk-dialog>
        `;
    }

    private getToolbarButtonId(buttonName: string): string {
        let id = this.toolbarButtonIds.get(buttonName);

        if (!id) {
            id = uniqueId(`pk-tiptap-toolbar-${buttonName}`);
            this.toolbarButtonIds.set(buttonName, id);
        }

        return id;
    }

    private getToolbarButtonLabel(buttonName: string): string {
        return TOOLBAR_LABELS[buttonName] ?? buttonName;
    }

    private renderToolbarTooltip(buttonId: string, label: string) {
        if (!this.toolbarTooltips) {
            return nothing;
        }

        return html`
            <pk-tooltip for=${buttonId} content=${label} placement="top"></pk-tooltip>
        `;
    }

    private renderToolbarButton(buttonName: string) {
        const editor = this.host.editor;
        const icon = TOOLBAR_ICONS[buttonName];
        const label = this.getToolbarButtonLabel(buttonName);
        const buttonId = this.getToolbarButtonId(buttonName);
        const active = editor ? isTiptapButtonActive(editor, buttonName) : false;

        return html`
            <div class="toolbar-item">
                <button
                    id=${buttonId}
                    type="button"
                    class="toolbar-btn"
                    aria-label=${label}
                    ?disabled=${this.disabled || this.readonly}
                    data-state=${active ? 'active' : nothing}
                    @click=${() => this.handleToolbarCommand(buttonName)}
                >
                    ${icon ? unsafeSVG(icon) : html`<span class="toolbar-btn__label">${label}</span>`}
                </button>
                ${this.renderToolbarTooltip(buttonId, label)}
            </div>
        `;
    }

    private handleCraftLink(config: LinkElementConfig): void {
        const editor = this.host.editor;

        if (!editor) {
            return;
        }

        openCraftElementLinkSelector({
            config,
            elementSiteId: getLinkOptionsElementSiteId(this.resolveLinkOptions()),
            linkSelectorStorageKeyPrefix: this.linkSelectorStorageKeyPrefix,
            getSelectedText: () => getSelectedText(editor),
            onSelect: ({ url, text }) => { this.openLinkDialog({ url, text }); },
            host: createCraftElementSelectorHost(),
        });
    }

    private getToolbarGroupId(groupKey: string): string {
        let id = this.toolbarGroupIds.get(groupKey);

        if (!id) {
            id = uniqueId('pk-tiptap-toolbar-group');
            this.toolbarGroupIds.set(groupKey, id);
        }

        return id;
    }

    private renderToolbarSeparator() {
        return html`<span class="toolbar-separator" aria-hidden="true"></span>`;
    }

    private renderGroupTriggerContent(group: ToolbarGroup, triggerLabel: string, iconName: string) {
        const icon = TOOLBAR_ICONS[iconName];
        const showTextLabel = Boolean(group.label);

        if (showTextLabel && triggerLabel) {
            return html`
                <span class="toolbar-btn__trigger-label">${triggerLabel}</span>
                <span class="toolbar-btn__chevron">${unsafeSVG(TOOLBAR_CHEVRON_HTML)}</span>
            `;
        }

        return html`
            ${icon ? unsafeSVG(icon) : html`<span class="toolbar-btn__trigger-label">${triggerLabel}</span>`}
            <span class="toolbar-btn__chevron">${unsafeSVG(TOOLBAR_CHEVRON_HTML)}</span>
        `;
    }

    private renderToolbarGroup(group: ToolbarGroup, groupKey: string) {
        const editor = this.host.editor;
        const groupId = this.getToolbarGroupId(groupKey);
        const trigger = editor ? getToolbarGroupTriggerState(editor, group) : {
            activeName: null,
            label: group.label ?? '',
            isActive: false,
            icon: group.icon ?? getToolbarGroupDefaultIcon(group),
        };
        const menuItems = getToolbarGroupMenuItems(group);
        const tooltipLabel = group.label
            ?? (isHeadingsOnlyToolbarPreset(group.preset) ? 'Headings'
                : isFormattingToolbarPreset(group.preset) ? 'Formatting'
                    : group.preset === 'lists' ? 'Lists'
                        : group.preset === 'align' ? 'Alignment'
                            : 'More');

        return html`
            <div class="toolbar-item">
                <button
                    id=${groupId}
                    type="button"
                    class="toolbar-btn toolbar-btn--menu"
                    aria-label=${tooltipLabel}
                    aria-haspopup="menu"
                    ?disabled=${this.disabled || this.readonly}
                    data-state=${trigger.isActive ? 'active' : nothing}
                >
                    ${this.renderGroupTriggerContent(group, trigger.label, trigger.icon)}
                </button>
                ${this.renderToolbarTooltip(groupId, tooltipLabel)}
                <pk-dropdown-menu for=${groupId} placement="bottom-start">
                    ${menuItems.map((entry, itemIndex) => {
                        if (entry.type === 'separator') {
                            return html`<pk-dropdown-separator key=${`${groupKey}-sep-${itemIndex}`}></pk-dropdown-separator>`;
                        }

                        const itemName = entry.name;
                        const active = editor ? isToolbarButtonActive(editor, itemName) : false;
                        const prefixIcon = createToolbarPrefixIcon(itemName);
                        const itemLabel = getToolbarMenuItemLabel(itemName);

                        return html`
                            <pk-dropdown-item
                                key=${`${groupKey}-${itemName}-${itemIndex}`}
                                ?data-active=${active || nothing}
                                @click=${() => this.handleToolbarCommand(itemName)}
                            >
                                ${prefixIcon ?? nothing}
                                ${itemLabel}
                            </pk-dropdown-item>
                        `;
                    })}
                </pk-dropdown-menu>
            </div>
        `;
    }

    private renderToolbarNode(node: ToolbarNode, index: number) {
        if (node.type === 'separator') {
            return this.renderToolbarSeparator();
        }

        if (node.type === 'group') {
            return this.renderToolbarGroup(node.group, `group-${index}`);
        }

        if (node.name === 'link') {
            return this.renderLinkToolbarButton();
        }

        return this.renderToolbarButton(node.name);
    }

    private renderDefaultToolbar() {
        // `toolbar-end` — append custom controls (Formie variable picker, etc.) into the
        // stock toolbar flex/gap. Prefer over replacing the whole bar via slot="toolbar".
        return html`
            <div class="toolbar" part="toolbar">
                ${this.toolbarNodes.map((node, index) => this.renderToolbarNode(node, index))}
                <slot name="toolbar-end"></slot>
            </div>
        `;
    }

    private renderLinkToolbarButton() {
        const editor = this.host.editor;
        const craftOptions = getCraftLinkOptions(this.resolveLinkOptions());
        const label = this.getToolbarButtonLabel('link');
        const active = this.isLinkActive();

        return html`
            <div class="toolbar-item">
                <button
                    id=${this.linkButtonId}
                    type="button"
                    class="toolbar-btn"
                    aria-label=${label}
                    aria-haspopup="menu"
                    ?disabled=${this.disabled || this.readonly}
                    data-state=${active ? 'active' : nothing}
                >
                    ${unsafeSVG(TOOLBAR_ICONS.link)}
                </button>
                ${this.renderToolbarTooltip(this.linkButtonId, label)}
                <pk-dropdown-menu for=${this.linkButtonId} placement="bottom-start">
                    ${craftOptions.map((option) => html`
                        <pk-dropdown-item @click=${() => this.handleCraftLink(option)}>
                            ${option.optionTitle}
                        </pk-dropdown-item>
                    `)}
                    ${craftOptions.length > 0 ? html`<pk-dropdown-separator></pk-dropdown-separator>` : nothing}
                    <pk-dropdown-item @click=${() => this.openLinkMenu()}>Insert Link</pk-dropdown-item>
                    <pk-dropdown-item
                        ?disabled=${!active}
                        @click=${() => editor && unsetLinkFromEditor(editor)}
                    >Unlink</pk-dropdown-item>
                </pk-dropdown-menu>
            </div>
        `;
    }

    override render() {
        return html`
            <div class="shell" part="shell">
                ${this.hasCustomToolbar
                    ? html`<slot name="toolbar"></slot>`
                    : this.renderDefaultToolbar()}

                <div class="editor-mount" part="editor">
                    ${this.contentError ? html`
                        <div class="content-error">
                            <span>${unsafeSVG(renderIconHtml(triangleExclamation))}</span>
                            <span>${this.contentError}</span>
                        </div>
                    ` : nothing}
                    ${this.toolbarHasLink() && this.linkBubbleVisible ? this.renderLinkBubble() : nothing}
                </div>

                <input class="mirror-input" type="text" .value=${this.value} readonly tabindex="-1" aria-hidden="true" />
                ${this.toolbarHasLink() && this.linkDialogMounted ? this.renderLinkDialog() : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-tiptap-editor': PkTiptapEditor;
    }
}
