import { css } from 'lit';

export const pkScrollAreaStyles = css`
    @layer pk-component {
        :host {
            --pk-shadow-color: var(--pk-color-white);
            --pk-shadow-size: 2rem;
            --pk-start-shadow-opacity: 0;
            --pk-end-shadow-opacity: 0;

            display: block;
            position: relative;
            max-width: 100%;
            overflow: hidden;
            isolation: isolate;
            font-family: var(--pk-font-family);
        }

        :host([orientation='vertical']) {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .root {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 100%;
        }

        .viewport {
            z-index: 1;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            outline: none;
            scroll-behavior: smooth;
            scrollbar-width: none;
        }

        .viewport::-webkit-scrollbar {
            display: none;
        }

        .viewport:focus-visible {
            box-shadow: 0 0 0 3px color-mix(in oklab, var(--pk-color-sky-600) 50%, transparent);
        }

        :host([orientation='horizontal']) .viewport {
            overflow-x: auto;
            overflow-y: hidden;
        }

        :host([orientation='vertical']) .viewport {
            flex: 1 1 auto;
            min-height: 0;
            overflow-x: hidden;
            overflow-y: auto;
        }

        .content {
            min-height: 100%;
        }

        :host([orientation='horizontal']) .content {
            width: max-content;
            min-height: 100%;
        }

        .start-shadow,
        .end-shadow {
            z-index: 2;
            position: absolute;
            pointer-events: none;
        }

        .start-shadow {
            opacity: var(--pk-start-shadow-opacity);
        }

        .end-shadow {
            opacity: var(--pk-end-shadow-opacity);
        }

        :host([orientation='horizontal']) .start-shadow,
        :host([orientation='horizontal']) .end-shadow {
            top: 0;
            bottom: 0;
            width: var(--pk-shadow-size);
        }

        :host([orientation='horizontal']) .start-shadow {
            left: 0;
            background: linear-gradient(to right, var(--pk-shadow-color), transparent 100%);
        }

        :host([orientation='horizontal']) .end-shadow {
            right: 0;
            background: linear-gradient(to left, var(--pk-shadow-color), transparent 100%);
        }

        :host([orientation='vertical']) .start-shadow,
        :host([orientation='vertical']) .end-shadow {
            left: 0;
            right: 0;
            height: var(--pk-shadow-size);
        }

        :host([orientation='vertical']) .start-shadow {
            top: 0;
            background: linear-gradient(to bottom, var(--pk-shadow-color), transparent 100%);
        }

        :host([orientation='vertical']) .end-shadow {
            bottom: 0;
            background: linear-gradient(to top, var(--pk-shadow-color), transparent 100%);
        }

        .scrollbar {
            /* Cross-axis thickness — size variants override via --pk-scroll-thumb-size. */
            --pk-scroll-thumb-size: 8px;

            z-index: 3;
            position: absolute;
            touch-action: none;
            user-select: none;
            border-radius: 9999px;
            /* Track stays subtle; thumb carries the Craft gray affordance. */
            background: color-mix(in oklab, var(--pk-color-gray-200) 70%, transparent);
            opacity: 0;
            transition: opacity 0.15s ease;
        }

        .scrollbar.pk-scroll-area__scrollbar--size-xs {
            --pk-scroll-thumb-size: 6px;
        }

        .scrollbar.pk-scroll-area__scrollbar--size-sm {
            --pk-scroll-thumb-size: 7px;
        }

        .scrollbar.pk-scroll-area__scrollbar--size-default {
            --pk-scroll-thumb-size: 8px;
        }

        /* Inset from the clipped host edge so the rounded thumb is fully visible. */
        .scrollbar[data-orientation='vertical'] {
            top: 4px;
            right: 3px;
            bottom: 4px;
            width: var(--pk-scroll-thumb-size);
            height: auto;
        }

        .scrollbar[data-orientation='horizontal'] {
            left: 4px;
            right: 4px;
            bottom: 3px;
            width: auto;
            height: var(--pk-scroll-thumb-size);
        }

        .scrollbar[data-hovering],
        .scrollbar[data-scrolling] {
            opacity: 1;
        }

        .thumb {
            position: absolute;
            border-radius: 9999px;
            background: var(--pk-color-gray-350);
            transition: background 0.12s ease;
        }

        /* Min size is along the scroll axis only — never force cross-axis past the track. */
        .scrollbar[data-orientation='vertical'] .thumb {
            left: 0;
            right: 0;
            width: auto;
            min-height: 24px;
        }

        .scrollbar[data-orientation='horizontal'] .thumb {
            top: 0;
            bottom: 0;
            height: auto;
            min-width: 24px;
        }

        .thumb:hover {
            background: var(--pk-color-gray-500);
        }
    }
`;
