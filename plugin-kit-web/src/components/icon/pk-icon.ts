import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { getIcon, iconToSvg } from '@verbb/plugin-kit-icons';

import { PkElement } from '../../base/pk-element.js';

/**
 * Standalone icon element backed by the Plugin Kit raw-SVG icon set.
 *
 * The name registry starts empty — consumers must {@link registerIcons}
 * (or import `@verbb/plugin-kit-icons/all.js`) before `<pk-icon icon="…">` resolves.
 *
 * Sizing follows `font-size` (defaults to `1em`), colour follows `currentColor`,
 * so consumers style it like text:
 *
 * ```html
 * <pk-icon icon="chevron-down"></pk-icon>
 * <pk-icon icon="pen" label="Edit" style="font-size: 20px; color: #6b7280"></pk-icon>
 * ```
 *
 * Prefer the `icon` attribute over `name`: some server-side form renderers
 * (e.g. Craft CMS `Html::namespaceInputs()`) rewrite every `name="…"` attribute
 * in a form to namespace it, which would corrupt the icon lookup. `icon` is left
 * untouched. `name` is still supported for non-form contexts / back-compat.
 */
@customElement('pk-icon')
export class PkIcon extends PkElement {
    static override styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: none;
            width: 1em;
            height: 1em;
            line-height: 1;
            vertical-align: -0.125em;
        }

        svg {
            display: block;
            width: 100%;
            height: 100%;
            fill: currentColor;
        }
    `;

    /**
     * Icon name (kebab-case), e.g. `chevron-down`, `gear`, `xmark`.
     * Namespacing-safe alternative to `name` — use this inside CMS form markup.
     */
    @property()
    icon = '';

    /**
     * Icon name (kebab-case). Back-compat / non-form alias for `icon`.
     * Avoid in server-namespaced forms, where `name` attributes get rewritten.
     */
    @property()
    name = '';

    /**
     * Accessible label. When set the icon is exposed as an image with a title;
     * otherwise it is hidden from assistive technology.
     */
    @property()
    label?: string;

    override render() {
        const icon = getIcon(this.icon || this.name);

        if (!icon) {
            return nothing;
        }

        return html`${unsafeSVG(iconToSvg(icon, { title: this.label }))}`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-icon': PkIcon;
    }
}
