import { css } from 'lit';

/**
 * Variant tokens are defined on `pk-tabs` and inherited by slotted
 * `pk-tab` / `pk-tab-panel` shadow roots (custom properties pierce shadow DOM).
 */
export const pkTabsStyles = css`
    @layer pk-component {
        :host {
            display: block;
            max-width: 100%;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
            /* Frame chrome on the host (matches v1 PaneTabs root) so consumer
             * overflow utilities on the host do not clip the pane shadow. */
            border-radius: var(--pk-tabs-root-radius);
            box-shadow: var(--pk-tabs-root-shadow);
            overflow: var(--pk-tabs-root-overflow);

            /* Root */
            --pk-tabs-root-gap: 0.75rem;
            --pk-tabs-root-height: auto;
            --pk-tabs-root-radius: 0;
            --pk-tabs-root-shadow: none;
            --pk-tabs-root-overflow: visible;

            /* List */
            --pk-tabs-list-display: inline-flex;
            --pk-tabs-list-width: fit-content;
            --pk-tabs-list-align-self: flex-start;
            --pk-tabs-list-align-items: center;
            --pk-tabs-list-padding: 2px;
            --pk-tabs-list-border-width: 1px;
            --pk-tabs-list-border-color: var(--pk-color-gray-150);
            --pk-tabs-list-border-bottom: var(--pk-tabs-list-border-width) solid var(--pk-tabs-list-border-color);
            --pk-tabs-list-radius: var(--pk-radius-md);
            --pk-tabs-list-bg: color-mix(in oklab, var(--pk-color-gray-100) 90%, transparent);
            --pk-tabs-list-shadow: 0 1px 2px rgba(31, 41, 51, 0.06);
            /* Transparent no-op — keyword none in a multi-shadow list invalidates the whole property. */
            --pk-tabs-list-inset-shadow: 0 0 #0000;
            --pk-tabs-list-color: var(--pk-color-gray-500);
            --pk-tabs-list-overflow-x: auto;
            --pk-tabs-list-overflow-y: visible;

            /* Trigger (inherited by pk-tab) */
            --pk-tabs-trigger-display: inline-flex;
            --pk-tabs-trigger-justify: center;
            --pk-tabs-trigger-width: auto;
            --pk-tabs-trigger-gap: 0.5rem;
            --pk-tabs-trigger-min-height: 2rem;
            --pk-tabs-trigger-padding-block: 0.375rem;
            --pk-tabs-trigger-padding-inline: 0.75rem;
            --pk-tabs-trigger-radius: var(--pk-radius-sm);
            --pk-tabs-trigger-color: inherit;
            --pk-tabs-trigger-font-size: 13px;
            --pk-tabs-trigger-font-weight: 400;
            --pk-tabs-trigger-text-align: center;
            --pk-tabs-trigger-text-transform: none;
            --pk-tabs-trigger-border-top: 0 solid transparent;
            --pk-tabs-trigger-hover-bg: rgb(255 255 255 / 0.7);
            --pk-tabs-trigger-hover-color: var(--pk-color-gray-700);
            --pk-tabs-trigger-selected-hover-bg: var(--pk-tabs-trigger-selected-bg, var(--pk-color-white));
            --pk-tabs-trigger-selected-hover-color: var(--pk-tabs-trigger-selected-color, var(--pk-color-gray-800));
            --pk-tabs-trigger-selected-bg: var(--pk-color-white);
            --pk-tabs-trigger-selected-color: var(--pk-color-gray-800);
            --pk-tabs-trigger-selected-shadow: 0 1px 2px rgba(31, 41, 51, 0.12);
            --pk-tabs-trigger-selected-radius: var(--pk-radius-sm);
            --pk-tabs-trigger-selected-border-top: 0 solid transparent;
            --pk-tabs-trigger-underline-height: 0;
            --pk-tabs-trigger-underline-inset: 15px;
            --pk-tabs-trigger-label-flex: 0 1 auto;
            --pk-tabs-trigger-icon-size: 1.125rem;
            --pk-tabs-trigger-icon-color: inherit;
            --pk-tabs-trigger-status-margin: 0;
            --pk-tabs-trigger-status-color: inherit;

            /* Group headings (pk-tab-heading) */
            --pk-tabs-heading-padding: 0.75rem 0.5rem 0.375rem;
            --pk-tabs-heading-color: var(--pk-color-gray-400);
            --pk-tabs-heading-font-size: 11px;
            --pk-tabs-heading-font-weight: 600;
            --pk-tabs-heading-letter-spacing: 0.04em;
            --pk-tabs-heading-text-transform: uppercase;

            /* Panel (inherited by pk-tab-panel) */
            --pk-tabs-panel-flex: none;
            --pk-tabs-panel-min-height: 0;
            --pk-tabs-panel-padding: 0;
            --pk-tabs-panel-bg: transparent;
            --pk-tabs-panel-radius: 0;
            --pk-tabs-panel-font-size: var(--pk-font-size-base);
        }

        :host([variant='pane']),
        :host([variant='modal']),
        :host([variant='sidebar']) {
            height: 100%;
            min-height: 0;
            --pk-tabs-root-height: 100%;
        }

        .tabs {
            display: flex;
            flex-direction: column;
            gap: var(--pk-tabs-root-gap);
            height: var(--pk-tabs-root-height);
            min-height: 0;
            /* Radius/shadow/overflow live on :host — keep the layout shell fill-only. */
        }

        .tabs[data-placement='bottom'] {
            flex-direction: column-reverse;
        }

        .tabs[data-placement='start'],
        .tabs[data-placement='end'] {
            flex-direction: row;
            align-items: flex-start;
            gap: 1rem;
        }

        .tabs[data-placement='end'] {
            flex-direction: row-reverse;
        }

        .tabs[data-placement='start'] .list,
        .tabs[data-placement='end'] .list {
            flex-direction: column;
            align-self: stretch;
        }

        .list {
            display: var(--pk-tabs-list-display);
            width: var(--pk-tabs-list-width);
            max-width: 100%;
            align-self: var(--pk-tabs-list-align-self);
            align-items: var(--pk-tabs-list-align-items);
            justify-content: flex-start;
            /* Tab strip must not shrink when panels flex-fill the column — otherwise
             * overflow-y clips trigger padding and the modal active underline. */
            flex-shrink: 0;
            position: relative;
            z-index: var(--pk-tabs-list-z-index, auto);
            isolation: isolate;
            padding: var(--pk-tabs-list-padding);
            border: var(--pk-tabs-list-border-width) solid var(--pk-tabs-list-border-color);
            border-bottom: var(--pk-tabs-list-border-bottom, var(--pk-tabs-list-border-width) solid var(--pk-tabs-list-border-color));
            border-radius: var(--pk-tabs-list-radius);
            background: var(--pk-tabs-list-bg);
            box-shadow: var(--pk-tabs-list-shadow), var(--pk-tabs-list-inset-shadow);
            color: var(--pk-tabs-list-color);
            overflow-x: var(--pk-tabs-list-overflow-x, auto);
            overflow-y: var(--pk-tabs-list-overflow-y, visible);
        }

        /* Pane — matches plugin-kit-react PaneTabs */
        :host([variant='pane']) {
            --pk-tabs-root-gap: 0;
            --pk-tabs-root-radius: var(--pk-radius-lg);
            --pk-tabs-root-shadow:
                0 0 0 1px var(--pk-color-gray-200),
                0 2px 12px rgb(205 216 228 / 50%);
            --pk-tabs-root-overflow: visible;

            --pk-tabs-list-display: flex;
            --pk-tabs-list-width: auto;
            --pk-tabs-list-align-self: stretch;
            --pk-tabs-list-align-items: flex-end;
            --pk-tabs-list-padding: 0;
            --pk-tabs-list-border-width: 0;
            --pk-tabs-list-radius: var(--pk-radius-lg) var(--pk-radius-lg) 0 0;
            --pk-tabs-list-bg: var(--pk-color-gray-50);
            /* Must not use keyword none — box-shadow: none, inset … is invalid and drops the hairline. */
            --pk-tabs-list-shadow: inset 0 -1px 0 0 rgb(154 165 177 / 25%);
            --pk-tabs-list-inset-shadow: 0 0 #0000;
            --pk-tabs-list-overflow-x: auto;
            --pk-tabs-list-overflow-y: visible;

            --pk-tabs-trigger-display: flex;
            --pk-tabs-trigger-justify: flex-start;
            --pk-tabs-trigger-min-height: 45px;
            --pk-tabs-trigger-padding-block: 0;
            --pk-tabs-trigger-padding-inline: 24px;
            --pk-tabs-trigger-radius: 0;
            --pk-tabs-trigger-border-top: 0 solid transparent;
            --pk-tabs-trigger-color: var(--pk-color-gray-550);
            --pk-tabs-trigger-font-size: var(--pk-font-size-base);
            --pk-tabs-trigger-font-weight: 400;
            --pk-tabs-trigger-hover-bg: var(--pk-color-slate-100);
            --pk-tabs-trigger-hover-color: var(--pk-color-gray-550);
            --pk-tabs-trigger-selected-bg: var(--pk-color-white);
            --pk-tabs-trigger-selected-color: var(--pk-color-gray-700);
            --pk-tabs-trigger-selected-border-top: 0 solid transparent;
            /* Match Craft .pane-tabs [role=tab].sel — inset top accent + elevation. */
            --pk-tabs-trigger-selected-shadow:
                inset 0 2px 0 var(--pk-color-gray-500),
                0 0 0 1px rgb(51 64 77 / 10%),
                0 2px 12px rgb(205 216 228 / 90%);
            --pk-tabs-trigger-selected-radius: 2px 2px 0 0;

            /* 0% basis — panel fills leftover height and scrolls; auto basis grew with
             * content and clipped under dialog overflow:hidden (Edit Buttons Appearance). */
            --pk-tabs-panel-flex: 1 1 0%;
            --pk-tabs-panel-min-height: 0;
            /*
             * No built-in panel inset — matches v1 PaneTabsContent (padding came from
             * the consumer: ReportTabPanel / FormBuilderTabContent / DefaultsPanel p-6).
             * A non-zero value here double-pads those surfaces.
             */
            --pk-tabs-panel-padding: 0;
            --pk-tabs-panel-bg: var(--pk-color-white);
            --pk-tabs-panel-radius: 0 0 var(--pk-radius-lg) var(--pk-radius-lg);
            --pk-tabs-panel-font-size: var(--pk-font-size-sm, 14px);
        }

        /* Craft bumps the first tab start corner to --radius-lg so the inset
         * accent follows the pane radius instead of reading as clipped at 2px.
         */
        :host([variant='pane']) ::slotted(pk-tab:first-child) {
            --pk-tabs-trigger-selected-radius: var(--pk-radius-lg) 2px 0 0;
        }

        /* Modal — matches plugin-kit-react ModalTabs */
        :host([variant='modal']) {
            --pk-tabs-root-gap: 0;
            --pk-tabs-root-height: 100%;
            /* Dialog already rounds the panel — host radius + overflow clips the
             * first tab’s focus ring into a one-corner “rounded border”. */
            --pk-tabs-root-radius: 0;
            /* Clip to the height chain so panels scroll inside, not through the footer. */
            --pk-tabs-root-overflow: hidden;

            --pk-tabs-list-display: flex;
            --pk-tabs-list-width: 100%;
            --pk-tabs-list-align-self: stretch;
            --pk-tabs-list-align-items: stretch;
            --pk-tabs-list-padding: 0;
            --pk-tabs-list-border-width: 0;
            --pk-tabs-list-border-bottom: 1px solid var(--pk-color-gray-100);
            --pk-tabs-list-radius: 0;
            --pk-tabs-list-bg: var(--pk-color-white);
            --pk-tabs-list-shadow: 0 1px 5px #cdd8e440;
            /* Transparent no-op — keyword none in a multi-shadow list invalidates the whole property. */
            --pk-tabs-list-inset-shadow: 0 0 #0000;
            --pk-tabs-list-color: inherit;
            --pk-tabs-list-overflow-x: auto;
            /* auto (not hidden): overflow-x:auto + overflow-y:hidden clips ~1 device
             * pixel of the bottom active underline, so the 2px sky bar reads as 1px. */
            --pk-tabs-list-overflow-y: auto;
            /* v1 ModalTabsList z-11 — keep the strip above scrolling panel content
             * (editable-table action columns, etc.) when body/panel scrolls. */
            --pk-tabs-list-z-index: 11;

            --pk-tabs-trigger-display: inline-flex;
            --pk-tabs-trigger-justify: center;
            --pk-tabs-trigger-min-height: auto;
            --pk-tabs-trigger-padding-block: 15px;
            --pk-tabs-trigger-padding-inline: 15px;
            --pk-tabs-trigger-radius: 0;
            --pk-tabs-trigger-color: #64788d;
            --pk-tabs-trigger-font-size: 12px;
            --pk-tabs-trigger-font-weight: 500;
            --pk-tabs-trigger-text-transform: uppercase;
            --pk-tabs-trigger-hover-bg: transparent;
            --pk-tabs-trigger-hover-color: var(--pk-color-sky-600);
            --pk-tabs-trigger-selected-bg: transparent;
            --pk-tabs-trigger-selected-color: #64788d;
            --pk-tabs-trigger-selected-hover-bg: transparent;
            --pk-tabs-trigger-selected-hover-color: var(--pk-color-sky-600);
            /* Active (mouse) = 15px-inset underline. Active + :focus-visible = screen3 box. */
            --pk-tabs-trigger-selected-shadow: none;
            --pk-tabs-trigger-selected-radius: 0;
            --pk-tabs-trigger-underline-height: 2px;
            --pk-tabs-trigger-underline-inset: 15px;
            --pk-tabs-trigger-focus-selected-shadow: inset 0 0 0 2px var(--pk-color-sky-600);
            --pk-tabs-trigger-focus-selected-underline-height: 0;

            /* 0% basis — panel fills leftover height and scrolls; auto basis grew with
             * content and clipped under dialog overflow:hidden (Edit Buttons Appearance). */
            --pk-tabs-panel-flex: 1 1 0%;
            --pk-tabs-panel-min-height: 0;
            --pk-tabs-panel-padding: 1rem;
            --pk-tabs-panel-bg: transparent;
            --pk-tabs-panel-radius: 0;
            --pk-tabs-panel-font-size: var(--pk-font-size-sm, 14px);
        }

        /* Sidebar — vertical nav list with optional icons, status, and headings */
        :host([variant='sidebar']) {
            --pk-tabs-root-gap: 0;
            --pk-tabs-root-radius: 0;
            --pk-tabs-root-shadow: none;
            --pk-tabs-root-overflow: visible;

            --pk-tabs-list-display: flex;
            --pk-tabs-list-width: var(--pk-tabs-sidebar-width, 14rem);
            --pk-tabs-list-align-self: stretch;
            --pk-tabs-list-align-items: stretch;
            --pk-tabs-list-padding: 0.5rem;
            --pk-tabs-list-border-width: 0;
            --pk-tabs-list-border-bottom: 0 solid transparent;
            --pk-tabs-list-radius: 0;
            --pk-tabs-list-bg: var(--pk-color-gray-100);
            --pk-tabs-list-shadow: 0 0 #0000;
            --pk-tabs-list-inset-shadow: 0 0 #0000;
            --pk-tabs-list-color: var(--pk-color-gray-600);
            --pk-tabs-list-overflow-x: hidden;
            --pk-tabs-list-overflow-y: auto;

            --pk-tabs-trigger-display: flex;
            --pk-tabs-trigger-justify: flex-start;
            --pk-tabs-trigger-width: 100%;
            /* Match Craft/Formie integrations nav: padding 7px 10px, 16px icons, content-sized height. */
            --pk-tabs-trigger-gap: 10px;
            --pk-tabs-trigger-min-height: 0;
            --pk-tabs-trigger-padding-block: 7px;
            --pk-tabs-trigger-padding-inline: 10px;
            --pk-tabs-trigger-radius: var(--pk-radius-md);
            --pk-tabs-trigger-color: var(--pk-color-gray-700);
            --pk-tabs-trigger-font-size: 13px;
            --pk-tabs-trigger-font-weight: 400;
            --pk-tabs-trigger-line-height: 1.2;
            --pk-tabs-trigger-text-align: start;
            --pk-tabs-trigger-text-transform: none;
            --pk-tabs-trigger-border-top: 0 solid transparent;
            --pk-tabs-trigger-hover-bg: color-mix(in oklab, var(--pk-color-gray-200) 70%, transparent);
            --pk-tabs-trigger-hover-color: var(--pk-color-gray-800);
            --pk-tabs-trigger-selected-bg: var(--pk-color-gray-500);
            --pk-tabs-trigger-selected-color: var(--pk-color-white);
            --pk-tabs-trigger-selected-hover-bg: var(--pk-color-gray-500);
            --pk-tabs-trigger-selected-hover-color: var(--pk-color-white);
            --pk-tabs-trigger-selected-shadow: none;
            --pk-tabs-trigger-selected-radius: var(--pk-radius-md);
            --pk-tabs-trigger-selected-border-top: 0 solid transparent;
            --pk-tabs-trigger-underline-height: 0;
            --pk-tabs-trigger-label-flex: 1 1 auto;
            --pk-tabs-trigger-icon-size: 16px;
            --pk-tabs-trigger-status-margin: auto;
            --pk-tabs-trigger-status-color: var(--pk-color-gray-400);

            --pk-tabs-heading-padding: 14px 10px 5px;
            --pk-tabs-heading-color: var(--pk-color-gray-400);
            --pk-tabs-heading-font-size: 11px;
            --pk-tabs-heading-font-weight: 600;
            --pk-tabs-heading-letter-spacing: 0.04em;
            --pk-tabs-heading-text-transform: uppercase;

            /* 0% basis — panel fills leftover height and scrolls; auto basis grew with
             * content and clipped under dialog overflow:hidden (Edit Buttons Appearance). */
            --pk-tabs-panel-flex: 1 1 0%;
            --pk-tabs-panel-min-height: 0;
            --pk-tabs-panel-padding: 1.25rem;
            --pk-tabs-panel-bg: var(--pk-color-white);
            --pk-tabs-panel-radius: 0;
            --pk-tabs-panel-font-size: var(--pk-font-size-base);
        }

        :host([variant='sidebar']) .tabs {
            flex-direction: row;
            align-items: stretch;
            gap: 0;
        }

        :host([variant='sidebar']) .tabs[data-placement='end'] {
            flex-direction: row-reverse;
        }

        :host([variant='sidebar']) .list {
            flex-direction: column;
            gap: 0.125rem;
            flex: none;
        }

        :host([variant='sidebar']) ::slotted(pk-tab) {
            display: block;
            width: 100%;
        }

        :host([variant='sidebar']) ::slotted(pk-tab-heading) {
            display: block;
            width: 100%;
        }

        /* First group heading sits closer to the list top edge */
        :host([variant='sidebar']) ::slotted(pk-tab-heading:first-child) {
            --pk-tabs-heading-padding: 10px 10px 5px;
        }

        /* Hollow inactive dots read better on the selected dark pill */
        :host([variant='sidebar']) ::slotted(pk-tab[selected]) {
            --pk-tabs-trigger-status-color: var(--pk-color-gray-300);
        }
    }
`;
