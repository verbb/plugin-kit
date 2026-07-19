import { webComponentRegistry, getWebRegistryEntry } from '../catalog/registry.js';
import { renderPlaceholderPlayground, renderUnknownPlayground } from './placeholder.js';
import { renderButtonPlayground } from './button.js';
import { renderSpinnerPlayground } from './spinner.js';
import { renderCheckboxPlayground } from './checkbox.js';
import { renderDialogPlayground } from './dialog.js';
import { renderDropdownMenuPlayground } from './dropdown-menu.js';
import { renderInputPlayground } from './input.js';
import { renderFieldPlayground } from './field.js';
import { renderIconPlayground } from './icon.js';
import { renderPopoverPlayground } from './popover.js';
import { renderSeparatorPlayground } from './separator.js';
import { renderStatusPlayground } from './status.js';
import { renderTextareaPlayground } from './textarea.js';
import { renderTogglePlayground } from './toggle.js';
import { renderCopyButtonPlayground } from './copy-button.js';
import { renderTooltipPlayground } from './tooltip.js';
import { renderButtonGroupPlayground } from './button-group.js';
import { renderCheckboxSelectPlayground } from './checkbox-select.js';
import { renderColorInputPlayground } from './color-input.js';
import { renderCalendarPlayground } from './calendar.js';
import { renderCodeEditorPlayground } from './code-editor.js';
import { renderEditableTablePlayground } from './editable-table.js';
import { renderDatePickerPlayground } from './date-picker.js';
import { renderTimePickerPlayground } from './time-picker.js';
import { renderComboboxPlayground } from './combobox.js';
import { renderTiptapEditorPlayground } from './tiptap-editor.js';
import { renderTiptapInputPlayground } from './tiptap-input.js';
import { renderTiptapContentPlayground } from './tiptap-content.js';
import { renderLightswitchPlayground } from './lightswitch.js';
import { renderRadioGroupPlayground } from './radio-group.js';
import { renderScrollAreaPlayground } from './scroll-area.js';
import { renderSelectPlayground } from './select.js';
import { renderTabsPlayground } from './tabs.js';
import { renderToggleGroupPlayground } from './toggle-group.js';

const renderedViews = new Set<string>();

type PlaygroundRenderer = (root: HTMLElement) => void;

/** Native web component playground pages */
const wcPlaygroundRenderers: Record<string, PlaygroundRenderer> = {
    button: renderButtonPlayground,
    spinner: renderSpinnerPlayground,
    icon: renderIconPlayground,
    checkbox: renderCheckboxPlayground,
    field: renderFieldPlayground,
    input: renderInputPlayground,
    textarea: renderTextareaPlayground,
    separator: renderSeparatorPlayground,
    status: renderStatusPlayground,
    toggle: renderTogglePlayground,
    dialog: renderDialogPlayground,
    'dropdown-menu': renderDropdownMenuPlayground,
    popover: renderPopoverPlayground,
    tooltip: renderTooltipPlayground,
    lightswitch: renderLightswitchPlayground,
    'button-group': renderButtonGroupPlayground,
    'toggle-group': renderToggleGroupPlayground,
    select: renderSelectPlayground,
    combobox: renderComboboxPlayground,
    'radio-group': renderRadioGroupPlayground,
    'checkbox-select': renderCheckboxSelectPlayground,
    tabs: renderTabsPlayground,
    'scroll-area': renderScrollAreaPlayground,
    'color-input': renderColorInputPlayground,
    'copy-button': renderCopyButtonPlayground,
    calendar: renderCalendarPlayground,
    'code-editor': renderCodeEditorPlayground,
    'editable-table': renderEditableTablePlayground,
    'date-picker': renderDatePickerPlayground,
    'time-picker': renderTimePickerPlayground,
    'tiptap-editor': renderTiptapEditorPlayground,
    'tiptap-input': renderTiptapInputPlayground,
    'tiptap-content': renderTiptapContentPlayground,
};

function resolvePlaygroundRenderer(componentId: string): PlaygroundRenderer | undefined {
    return wcPlaygroundRenderers[componentId];
}

/**
 * Render the web playground for one component into an arbitrary root.
 * Always re-renders — does not use the route-level renderedViews cache.
 */
export function renderWebPlaygroundInto(componentId: string, root: HTMLElement): void {
    root.replaceChildren();

    const shell = document.createElement('div');
    shell.className = 'cp-preview';
    shell.innerHTML = `
        <div class="content-pane">
            <div class="cp-preview__content"></div>
        </div>
    `;
    root.append(shell);

    const content = getPlaygroundContentRoot(shell);

    if (!content) {
        return;
    }

    const renderer = resolvePlaygroundRenderer(componentId);

    if (renderer) {
        renderer(content);
        return;
    }

    const entry = getWebRegistryEntry(componentId);

    if (entry?.web) {
        renderPlaceholderPlayground(content, { entry, surface: 'web' });
        return;
    }

    renderUnknownPlayground(content, componentId);
}

export function getPlaygroundMain(): HTMLElement | null {
    return document.querySelector('.pg-main');
}

export function getPlaygroundContentRoot(view: HTMLElement): HTMLElement | null {
    return view.querySelector<HTMLElement>('.cp-preview__content')
        ?? view.querySelector<HTMLElement>('.content-pane');
}

function createPlaygroundViewShell(componentId: string): HTMLElement {
    const view = document.createElement('div');
    view.dataset.playgroundView = componentId;
    view.innerHTML = `
        <div class="cp-preview">
            <div class="content-pane">
                <div class="cp-preview__content"></div>
            </div>
        </div>
    `;
    return view;
}

export function ensurePlaygroundView(componentId: string, main = getPlaygroundMain()): HTMLElement | null {
    if (!main) {
        return null;
    }

    let view = main.querySelector<HTMLElement>(`[data-playground-view="${componentId}"]`);

    if (!view) {
        view = createPlaygroundViewShell(componentId);
        main.append(view);
    }

    return view;
}

/** Drop the active playground view and cached renderers (route changes, surface switches). */
export function teardownPlaygroundMain(main = getPlaygroundMain()): void {
    if (!main) {
        return;
    }

    main.replaceChildren();
    renderedViews.clear();
}

export function renderPlaygroundView(componentId: string, main = getPlaygroundMain()): void {
    const view = ensurePlaygroundView(componentId, main);

    if (!view) {
        return;
    }

    const content = getPlaygroundContentRoot(view);

    if (!content) {
        return;
    }

    const renderer = resolvePlaygroundRenderer(componentId);

    if (renderer) {
        if (!renderedViews.has(componentId)) {
            renderer(content);
            renderedViews.add(componentId);
        }

        return;
    }

    const entry = getWebRegistryEntry(componentId);

    if (entry?.web) {
        if (!renderedViews.has(componentId)) {
            renderPlaceholderPlayground(content, { entry, surface: 'web' });
            renderedViews.add(componentId);
        }

        return;
    }

    if (!renderedViews.has(componentId)) {
        renderUnknownPlayground(content, componentId);
        renderedViews.add(componentId);
    }
}

/**
 * Mount a single web playground page into `.pg-main` — used by the unified workshop router.
 * Replaces any previous view instead of pre-mounting the full registry.
 */
export function mountWebPlaygroundView(componentId: string, main = getPlaygroundMain()): void {
    if (!main) {
        return;
    }

    teardownPlaygroundMain(main);

    const view = createPlaygroundViewShell(componentId);
    main.append(view);
    renderPlaygroundView(componentId, main);
}

/** @deprecated Hash-router dev entry — prefer mountWebPlaygroundView per route. */
export function mountPlaygroundViews(): void {
    for (const view of document.querySelectorAll<HTMLElement>('[data-playground-view]')) {
        if (view.dataset.playgroundView) {
            ensurePlaygroundView(view.dataset.playgroundView);
        }
    }
}

/** @deprecated Eager mount — removed in favor of route-based mountWebPlaygroundView. */
export function mountAllWebPlaygroundViews(): void {
    for (const entry of webComponentRegistry) {
        if (entry.web) {
            ensurePlaygroundView(entry.id);
        }
    }
}
