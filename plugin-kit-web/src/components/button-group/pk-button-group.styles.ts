import { css } from 'lit';

export const pkButtonGroupStyles = css`
    @layer pk-component {
        :host {
            display: inline-flex;
            width: fit-content;
            vertical-align: middle;
        }

        .group {
            display: flex;
            position: relative;
            isolation: isolate;
            flex-wrap: nowrap;
            gap: 0;
            width: fit-content;
            max-width: 100%;
            align-items: stretch;
        }

        :host([orientation='horizontal']) .group {
            flex-direction: row;
        }

        :host([orientation='vertical']) .group {
            flex-direction: column;
            align-items: stretch;
        }

        :host([orientation='vertical']) ::slotted(pk-button),
        :host([orientation='vertical']) ::slotted(pk-toggle),
        :host([orientation='vertical']) ::slotted(pk-input),
        :host([orientation='vertical']) ::slotted(pk-input-group),
        :host([orientation='vertical']) ::slotted(.button-group-text),
        :host([orientation='vertical']) ::slotted(select.button-group-select) {
            align-self: stretch;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        @media (hover: hover) {
            .group > :hover,
            ::slotted(:hover) {
                z-index: 1;
            }
        }

        .group > :focus-visible,
        ::slotted(:focus-visible),
        ::slotted(:focus-within),
        ::slotted([aria-checked='true']),
        ::slotted([checked]) {
            position: relative;
            z-index: 2;
        }

        /* Flush join: filled controls sit edge-to-edge; outlined controls overlap 1px to collapse borders */
        :host([orientation='horizontal']) {
            --pk-bg-horizontal-indent: 0;
            --pk-bg-horizontal-indent-outlined: -1px;
            --pk-btn-group-gap: 1px;
            --pk-btn-group-divider-color-outline: var(--pk-color-slate-400);
            --pk-btn-group-divider-color-dashed: var(--pk-color-slate-500);
        }

        :host([orientation='vertical']) {
            --pk-bg-vertical-indent: 0;
            --pk-bg-vertical-indent-outlined: -1px;
            --pk-btn-group-gap: 1px;
            --pk-btn-group-divider-color-outline: var(--pk-color-slate-400);
            --pk-btn-group-divider-color-dashed: var(--pk-color-slate-500);
        }

        :host([separators][orientation='horizontal']) {
            --pk-bg-horizontal-indent: 0;
        }

        :host([separators][orientation='vertical']) {
            --pk-bg-vertical-indent: 0;
        }

        ::slotted([data-pk-group-orientation='horizontal']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-end-start-radius: 0;
        }

        ::slotted([data-pk-group-orientation='vertical']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='vertical'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='vertical'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
        }

        :host([exclusive]) ::slotted(pk-button[aria-pressed='true']) {
            --pk-btn-fill: var(--pk-color-gray-500);
            --pk-btn-fill-hover: var(--pk-color-gray-550);
            --pk-btn-fill-active: var(--pk-color-gray-600);
            --pk-btn-on: var(--pk-color-white);
        }

        :host:has(::slotted(pk-button-group-separator)) {
            --pk-btn-group-separator-color: transparent;
        }

        ::slotted(pk-input),
        ::slotted(pk-input-group) {
            width: auto;
            flex: 0 1 auto;
            align-self: stretch;
        }

        ::slotted(pk-popover),
        ::slotted(pk-dropdown-menu) {
            display: inline-flex;
            align-self: auto;
            flex: 0 0 auto;
        }

        ::slotted(.button-group-text) {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-height: var(--pk-btn-height-default);
            padding: 0 0.625rem;
            border-width: 1px;
            border-style: solid;
            border-color: var(--pk-color-slate-400);
            background: var(--pk-color-gray-100);
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-sm);
            font-weight: 500;
            line-height: var(--pk-line-height);
            box-sizing: border-box;
            white-space: nowrap;
            border-top-left-radius: var(--pk-bg-start-start-radius, var(--pk-radius-lg));
            border-top-right-radius: var(--pk-bg-start-end-radius, var(--pk-radius-lg));
            border-bottom-left-radius: var(--pk-bg-end-start-radius, var(--pk-radius-lg));
            border-bottom-right-radius: var(--pk-bg-end-end-radius, var(--pk-radius-lg));
        }

        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider]).button-group-text),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])select.button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])pk-input-group) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            border-left-width: 0;
        }

        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider]).button-group-text),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])select.button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])pk-input-group) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            border-top-width: 0;
        }

        ::slotted(select.button-group-select) {
            display: block;
            margin: 0;
            padding: 0 10px;
            border-width: 1px;
            border-style: solid;
            border-color: var(--pk-color-slate-400);
            background: var(--pk-color-white);
            color: var(--pk-color-gray-900);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: 1.4;
            appearance: none;
            box-sizing: border-box;
            align-self: stretch;
            min-height: var(--pk-btn-height-default);
            height: var(--pk-btn-height-default);
            border-top-left-radius: var(--pk-bg-start-start-radius, var(--pk-radius-lg));
            border-top-right-radius: var(--pk-bg-start-end-radius, var(--pk-radius-lg));
            border-bottom-left-radius: var(--pk-bg-end-start-radius, var(--pk-radius-lg));
            border-bottom-right-radius: var(--pk-bg-end-end-radius, var(--pk-radius-lg));
        }

        ::slotted(pk-separator) {
            align-self: stretch;
        }

        ::slotted(pk-separator[orientation='vertical']),
        ::slotted(pk-button-group-separator) {
            height: auto;
            flex-shrink: 0;
        }

        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join].button-group-text),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]select.button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]pk-input-group) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
        }

        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join].button-group-text),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]select.button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]pk-input-group) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
        }

        :host([orientation='horizontal']) ::slotted(.button-group-text[data-pk-group-divider]),
        :host([orientation='horizontal']) ::slotted(select.button-group-select[data-pk-group-divider]),
        :host([orientation='horizontal']) ::slotted(pk-input-group[data-pk-group-divider]) {
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            box-shadow: none;
        }

        :host([orientation='vertical']) ::slotted(.button-group-text[data-pk-group-divider]),
        :host([orientation='vertical']) ::slotted(select.button-group-select[data-pk-group-divider]),
        :host([orientation='vertical']) ::slotted(pk-input-group[data-pk-group-divider]) {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            box-shadow: none;
        }

        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail].button-group-text),
        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail].button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail]select.button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail]pk-input-group) {
            border-right-width: 0;
        }

        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail].button-group-text),
        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail].button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail]select.button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail]pk-input-group) {
            border-bottom-width: 0;
        }
    }
`;
