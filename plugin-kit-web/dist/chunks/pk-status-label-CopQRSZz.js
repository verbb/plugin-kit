import { i as customElement, n as PkElement, t as __decorate } from "./decorate-Br_PE9pq.js";
import { t as property } from "./decorators-BkErmuYK.js";
import "./pk-status-CdiRBRyh.js";
import { css, html } from "lit";
//#region src/components/status-label/pk-status-label.styles.ts
var pkStatusLabelStyles = css`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            max-width: 100%;
            font-family: var(--pk-font-family, system-ui, sans-serif);
        }
        .base {
            --_text: var(--pk-color-gray-900);
            --_tint: var(
                --pk-status-label-neutral-tint,
                var(--pk-color-gray-500)
            );
            display: inline-flex;
            align-items: start;
            justify-content: center;
            gap: 0.25rem;
            padding: 0.25rem 0.5rem 0.25rem 0.25rem;
            border-radius: 0.6875rem;
            background: var(
                --pk-status-label-background,
                color-mix(in srgb, var(--_tint) 15%, transparent)
            );
            color: var(--pk-status-label-color, var(--_text));
            font-size: 0.6875rem;
            font-weight: 500;
            line-height: 1.1;
            text-transform: uppercase;
            max-width: 100%;
            box-sizing: border-box;
        }
        .label {
            min-width: 0;
            overflow-wrap: anywhere;
        }
        pk-status {
            width: 0.75rem;
            height: 0.75rem;
        }
        .base[data-tone='red'] {
            --_text: var(--pk-color-red-900);
            --_tint: var(--pk-color-red-600);
        }
        .base[data-tone='orange'] {
            --_text: var(--pk-color-orange-900);
            --_tint: var(--pk-color-orange-400);
        }
        .base[data-tone='amber'] {
            --_text: var(--pk-color-amber-900);
            --_tint: var(--pk-color-amber-500);
        }
        .base[data-tone='yellow'] {
            --_text: var(--pk-color-yellow-900);
            --_tint: var(--pk-color-yellow-500);
        }
        .base[data-tone='lime'] {
            --_text: var(--pk-color-lime-900);
            --_tint: var(--pk-color-lime-500);
        }
        .base[data-tone='green'] {
            --_text: var(--pk-color-green-900);
            --_tint: var(--pk-color-green-500);
        }
        .base[data-tone='emerald'] {
            --_text: var(--pk-color-emerald-900);
            --_tint: var(--pk-color-emerald-500);
        }
        .base[data-tone='teal'] {
            --_text: var(--pk-color-teal-900);
            --_tint: var(--pk-color-teal-550);
        }
        .base[data-tone='cyan'] {
            --_text: var(--pk-color-cyan-900);
            --_tint: var(--pk-color-cyan-500);
        }
        .base[data-tone='sky'] {
            --_text: var(--pk-color-sky-900);
            --_tint: var(--pk-color-sky-500);
        }
        .base[data-tone='blue'] {
            --_text: var(--pk-color-blue-900);
            --_tint: var(--pk-color-blue-500);
        }
        .base[data-tone='indigo'] {
            --_text: var(--pk-color-indigo-900);
            --_tint: var(--pk-color-indigo-500);
        }
        .base[data-tone='violet'] {
            --_text: var(--pk-color-violet-900);
            --_tint: var(--pk-color-violet-500);
        }
        .base[data-tone='purple'] {
            --_text: var(--pk-color-purple-900);
            --_tint: var(--pk-color-purple-500);
        }
        .base[data-tone='fuchsia'] {
            --_text: var(--pk-color-fuchsia-900);
            --_tint: var(--pk-color-fuchsia-500);
        }
        .base[data-tone='pink'] {
            --_text: var(--pk-color-pink-900);
            --_tint: var(--pk-color-pink-500);
        }
        .base[data-tone='rose'] {
            --_text: var(--pk-color-rose-900);
            --_tint: var(--pk-color-rose-500);
        }
        .base[data-tone='white'] {
            --_text: var(--pk-color-black);
            --_tint: var(--pk-color-gray-500);
        }
        .base[data-tone='black'] {
            --_text: var(--pk-color-black);
            --_tint: var(--pk-color-gray-1000);
        }
        .base[data-indicator='white'] pk-status::part(base) {
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-300);
        }
    }
`;
//#endregion
//#region src/components/status-label/pk-status-label.ts
var tones = {
	red: "red",
	orange: "orange",
	amber: "amber",
	yellow: "yellow",
	lime: "lime",
	green: "green",
	emerald: "emerald",
	teal: "teal",
	cyan: "cyan",
	sky: "sky",
	blue: "blue",
	indigo: "indigo",
	violet: "violet",
	purple: "purple",
	fuchsia: "fuchsia",
	pink: "pink",
	rose: "rose",
	gray: "gray",
	white: "white",
	black: "black",
	all: "gray",
	on: "teal",
	live: "teal",
	active: "teal",
	enabled: "teal",
	off: "red",
	suspended: "red",
	expired: "red",
	warning: "amber",
	pending: "orange",
	turquoise: "teal",
	light: "gray",
	grey: "gray",
	disabled: "gray",
	inactive: "gray"
};
var PkStatusLabel = class PkStatusLabel extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.status = "gray";
	}
	static {
		this.styles = pkStatusLabelStyles;
	}
	render() {
		const known = Object.hasOwn(tones, this.status);
		return html`<span
            part="base"
            class="base"
            data-tone=${known ? tones[this.status] : "gray"}
            data-indicator=${this.status}
        >
            <pk-status
                part="indicator"
                aria-hidden="true"
                .status=${known ? this.status : "gray"}
            ></pk-status>
            <span part="label" class="label"><slot>${this.status}</slot></span>
        </span>`;
	}
};
__decorate([property({ reflect: true })], PkStatusLabel.prototype, "status", void 0);
PkStatusLabel = __decorate([customElement("pk-status-label")], PkStatusLabel);
//#endregion
export { PkStatusLabel as t };

//# sourceMappingURL=pk-status-label-CopQRSZz.js.map