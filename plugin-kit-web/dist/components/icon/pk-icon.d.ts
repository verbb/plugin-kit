import { nothing } from 'lit';
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
export declare class PkIcon extends PkElement {
    static styles: import('lit').CSSResult;
    /**
     * Icon name (kebab-case), e.g. `chevron-down`, `gear`, `xmark`.
     * Namespacing-safe alternative to `name` — use this inside CMS form markup.
     */
    icon: string;
    /**
     * Icon name (kebab-case). Back-compat / non-form alias for `icon`.
     * Avoid in server-namespaced forms, where `name` attributes get rewritten.
     */
    name: string;
    /**
     * Accessible label. When set the icon is exposed as an image with a title;
     * otherwise it is hidden from assistive technology.
     */
    label?: string;
    render(): import('lit-html').TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-icon': PkIcon;
    }
}
//# sourceMappingURL=pk-icon.d.ts.map