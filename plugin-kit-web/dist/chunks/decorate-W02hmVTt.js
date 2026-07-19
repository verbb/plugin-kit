import { LitElement, css, unsafeCSS } from "lit";
//#region src/base/styles.ts
var sharedStyleSheets = /* @__PURE__ */ new Map();
/**
* Share constructable stylesheets across component instances ( pattern).
* Falls back to an injected `<style>` tag when adoptedStyleSheets aren't supported.
*/
function adoptStyles(shadowRoot, styleResults, cacheKey) {
	const cssText = styleResults.flatMap((result) => Array.isArray(result) ? result : [result]).map((result) => {
		if ("cssText" in result && typeof result.cssText === "string") return result.cssText;
		return unsafeCSS(result).cssText;
	}).join("\n");
	if (!("adoptedStyleSheets" in Document.prototype) || typeof CSSStyleSheet === "undefined") {
		const styleKey = cacheKey ?? String(styleResults.length);
		if (!shadowRoot.querySelector(`style[data-pk-adopted-styles="${styleKey}"]`)) {
			const style = document.createElement("style");
			style.dataset.pkAdoptedStyles = styleKey;
			style.textContent = cssText;
			shadowRoot.prepend(style);
		}
		return;
	}
	const key = cacheKey ?? cssText;
	let sheet = sharedStyleSheets.get(key);
	if (!sheet) {
		sheet = new CSSStyleSheet();
		sheet.replaceSync(cssText);
		sharedStyleSheets.set(key, sheet);
	}
	shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
}
var hostDisplayInlineBlock = css`
    @layer pk-component {
        :host {
            display: inline-block;
            vertical-align: middle;
        }
    }
`;
css`
    .pk-focus-ring:focus {
        outline: none;
    }

    .pk-focus-ring:focus-visible {
        box-shadow: var(--pk-shadow-focus);
    }
`;
//#endregion
//#region src/base/shadow-reset.styles.ts
/**
* Shadow-root baseline — box model + inherited typography inside every pk-* component.
* Applied via PkElement.createRenderRoot(); does not replace per-component styles.
*/
var shadowResetStyles = css`
    @layer pk-reset {
        :host {
            box-sizing: border-box;
        }

        :host *,
        :host *::before,
        :host *::after {
            box-sizing: border-box;
        }

        :host(:not([hidden])) {
            /* Prevent UA / CP margin on unstyled custom element hosts in light DOM. */
            margin: 0;
        }
    }
`;
//#endregion
//#region src/base/pk-element.ts
/**
* Base class for Plugin Kit web components.
* Open shadow root; Lit adopts constructable stylesheets where supported.
*
* `performUpdate` is wrapped so a single control failure degrades inline instead of
* taking down the whole CP surface (React error boundaries do not see Lit throws).
*/
var PkElement = class extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.pkRenderFailed = false;
	}
	static {
		this.shadowRootOptions = {
			mode: "open",
			delegatesFocus: true
		};
	}
	connectedCallback() {
		super.connectedCallback();
		if (!this.hasAttribute("data-pk")) this.setAttribute("data-pk", "");
	}
	createRenderRoot() {
		const root = super.createRenderRoot();
		adoptStyles(root, [shadowResetStyles], "pk-shadow-reset");
		return root;
	}
	performUpdate() {
		if (this.pkRenderFailed) return;
		try {
			const result = super.performUpdate();
			if (result instanceof Promise) result.catch((error) => {
				this.handleRenderFailure(error);
			});
		} catch (error) {
			this.handleRenderFailure(error);
		}
	}
	handleRenderFailure(error) {
		const err = error instanceof Error ? error : new Error(String(error));
		this.pkRenderFailed = true;
		this.dispatchEvent(new CustomEvent("pk-error", {
			detail: {
				tagName: this.localName || this.tagName.toLowerCase(),
				message: err.message,
				stack: err.stack
			},
			bubbles: true,
			composed: true
		}));
		try {
			const root = this.renderRoot;
			if (root) {
				root.textContent = "";
				const shell = document.createElement("div");
				shell.setAttribute("part", "error");
				shell.setAttribute("role", "alert");
				shell.textContent = "This control failed to load.";
				root.appendChild(shell);
			}
		} catch {}
	}
};
//#endregion
//#region \0@oxc-project+runtime@0.127.0/helpers/decorate.js
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}
//#endregion
export { PkElement as n, hostDisplayInlineBlock as r, __decorate as t };

//# sourceMappingURL=decorate-W02hmVTt.js.map