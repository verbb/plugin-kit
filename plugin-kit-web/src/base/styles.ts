import { css, unsafeCSS, type CSSResultGroup } from 'lit';

const sharedStyleSheets = new Map<string, CSSStyleSheet>();

/**
 * Share constructable stylesheets across component instances ( pattern).
 * Falls back to an injected `<style>` tag when adoptedStyleSheets aren't supported.
 */
export function adoptStyles(
    shadowRoot: ShadowRoot,
    styleResults: CSSResultGroup[],
    cacheKey?: string,
): void {
    const cssText = styleResults
        .flatMap((result) => (Array.isArray(result) ? result : [result]))
        .map((result) => {
            if ('cssText' in result && typeof result.cssText === 'string') {
                return result.cssText;
            }

            return unsafeCSS(result).cssText;
        })
        .join('\n');

    if (!('adoptedStyleSheets' in Document.prototype) || typeof CSSStyleSheet === 'undefined') {
        const styleKey = cacheKey ?? String(styleResults.length);

        if (!shadowRoot.querySelector(`style[data-pk-adopted-styles="${styleKey}"]`)) {
            const style = document.createElement('style');
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

export const hostDisplayInlineBlock = css`
    @layer pk-component {
        :host {
            display: inline-block;
            vertical-align: middle;
        }
    }
`;

export const focusRing = css`
    .pk-focus-ring:focus {
        outline: none;
    }

    .pk-focus-ring:focus-visible {
        box-shadow: var(--pk-shadow-focus);
    }
`;
