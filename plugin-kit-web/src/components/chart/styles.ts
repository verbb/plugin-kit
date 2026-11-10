import { css } from 'lit';

/** Styles shared by the line, bar, donut and funnel chart elements. */
export const pkChartStyles = css`
    @layer pk-component {
        :host {
            display: block;
            min-width: 0;
            color: var(--pk-chart-text);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-sm);
            line-height: var(--pk-line-height);
            --_pk-chart-height: var(--pk-chart-height, 240px);
        }

        :host([hidden]) {
            display: none;
        }

        [hidden] {
            display: none !important;
        }

        .base {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 12px;
            align-items: center;
        }

        .legend {
            display: flex;
            flex: 1 1 auto;
            flex-wrap: wrap;
            gap: 4px 14px;
            min-width: 0;
        }

        .legend-item {
            all: unset;
            display: inline-flex;
            gap: 6px;
            align-items: center;
            padding: 2px 1px;
            border-radius: var(--pk-radius-sm);
            color: var(--pk-chart-text-secondary);
            font-size: 12px;
            cursor: pointer;
        }

        .legend-item:focus-visible,
        .toggle button:focus-visible,
        .plot:focus-visible {
            outline: none;
            box-shadow: var(--pk-shadow-focus);
        }

        .legend-item[aria-pressed='false'] .legend-label {
            text-decoration: line-through;
            text-decoration-color: var(--pk-chart-text-muted);
        }

        .key {
            flex: none;
            width: 10px;
            height: 10px;
            border-radius: 2px;
            background: var(--_key-color);
        }

        .key.line,
        .key.dash {
            width: 14px;
            height: 0;
            border-radius: 0;
            border-top: 2px solid var(--_key-color);
            background: none;
        }

        .key.dash {
            border-top-style: dashed;
        }

        [aria-pressed='false'] > .key {
            background: transparent;
            box-shadow: inset 0 0 0 1.5px var(--_key-color);
        }

        [aria-pressed='false'] > .key.line,
        [aria-pressed='false'] > .key.dash {
            box-shadow: none;
            opacity: 0.4;
        }

        .toggle {
            display: inline-flex;
            margin-inline-start: auto;
            padding: 2px;
            border-radius: var(--pk-radius-lg);
            background: var(--pk-chart-toggle-background);
        }

        .toggle button {
            all: unset;
            padding: 2px 10px;
            border-radius: var(--pk-radius-md);
            color: var(--pk-chart-text-secondary);
            font-size: 12px;
            cursor: pointer;
        }

        .toggle button[aria-pressed='true'] {
            background: var(--pk-chart-surface);
            color: var(--pk-chart-text);
            box-shadow: 0 0 0 1px var(--pk-chart-border);
        }

        .body {
            position: relative;
            min-width: 0;
        }

        .plot {
            position: relative;
            height: var(--_pk-chart-height);
            border-radius: var(--pk-radius-md);
            transition: opacity 0.2s;
        }

        .plot.html-plot {
            height: auto;
        }

        .base.refreshing .plot {
            opacity: 0.45;
        }

        canvas {
            display: block;
        }

        .overlay {
            position: absolute;
            inset: 0;
            display: grid;
            place-items: center;
            text-align: center;
            pointer-events: none;
        }

        .tooltip {
            position: absolute;
            z-index: 3;
            top: 0;
            left: 0;
            min-width: 150px;
            max-width: 280px;
            padding: 8px 10px;
            border-radius: var(--pk-radius-lg);
            background: var(--pk-chart-tooltip-background);
            box-shadow: var(--pk-chart-tooltip-shadow);
            color: var(--pk-chart-text);
            font-size: 12px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.12s;
        }

        .tooltip.visible {
            opacity: 1;
        }

        .tooltip-title {
            margin-bottom: 6px;
            font-weight: 600;
        }

        .tooltip-row {
            display: grid;
            grid-template-columns: 14px minmax(0, 1fr) auto;
            gap: 4px 8px;
            align-items: center;
            padding: 1px 0;
        }

        .tooltip-row.plain {
            grid-template-columns: minmax(0, 1fr) auto;
        }

        .tooltip-label {
            color: var(--pk-chart-text-secondary);
            overflow-wrap: anywhere;
        }

        .tooltip-value {
            font-weight: 600;
            font-variant-numeric: tabular-nums;
            text-align: end;
            white-space: nowrap;
        }

        .tooltip-row .change {
            grid-column: 2 / -1;
            justify-self: start;
        }

        .tooltip-footer {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-top: 6px;
            padding-top: 6px;
            border-top: 1px solid var(--pk-chart-grid);
        }

        .tooltip-footer b {
            font-variant-numeric: tabular-nums;
        }

        .change {
            display: inline-flex;
            gap: 3px;
            align-items: center;
            padding: 0 6px;
            border-radius: 999px;
            background: var(--pk-chart-toggle-background);
            color: var(--pk-chart-text-secondary);
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
        }

        .change.good {
            background: var(--pk-chart-positive-background);
            color: var(--pk-chart-positive);
        }

        .change.bad {
            background: var(--pk-chart-negative-background);
            color: var(--pk-chart-negative);
        }

        .change svg {
            width: 8px;
            height: 8px;
            fill: currentColor;
        }

        .table-wrap {
            max-height: calc(var(--_pk-chart-height) + 48px);
            overflow: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: var(--pk-font-size-sm);
        }

        th,
        td {
            padding: 6px 10px;
            border-bottom: 1px solid var(--pk-chart-grid);
            text-align: start;
            white-space: nowrap;
        }

        thead th {
            position: sticky;
            top: 0;
            background: var(--pk-chart-table-head-background);
            color: var(--pk-chart-text-secondary);
            font-size: 12px;
            font-weight: 600;
        }

        tbody th {
            font-weight: 400;
        }

        .numeric {
            font-variant-numeric: tabular-nums;
            text-align: end;
        }

        .sr-only,
        caption {
            position: absolute !important;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
            border: 0;
        }

        pk-state-panel {
            --pk-state-panel-min-height: var(--_pk-chart-height);
        }

        /* Default state messages are fallback content in this shadow root, so reset their margins here. */
        pk-state-panel p {
            margin: 0;
        }

        /* The spinner stands on its own; the tinted icon box is for static state icons. */
        pk-state-panel.loading {
            --pk-state-panel-icon-background: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
            .plot,
            .tooltip {
                transition: none;
            }
        }
    }
`;
