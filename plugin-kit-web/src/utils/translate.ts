/**
 * Craft translation category for Plugin Kit's own interface strings. Every plugin on a page shares it, so a site
 * translates a built-in string such as “Clear search” once rather than once per plugin.
 */
export const pluginKitTranslationCategory = 'plugin-kit';

type CraftTranslator = {
    t?: (category: string, message: string) => unknown;
};

/**
 * Translate one of Plugin Kit's built-in strings through Craft's `plugin-kit` category.
 *
 * Returns the English source outside Craft and whenever no translation is registered, because `Craft.t()` falls
 * back to the message it was given. Placeholders such as `{label}` are returned untouched for the caller to fill,
 * since components interpolate after translating. Resolve at render time rather than module load, so translations
 * registered after Plugin Kit loads still apply.
 */
export function translatePluginKit(message: string): string {
    const craft = (globalThis as typeof globalThis & { Craft?: CraftTranslator }).Craft;

    if (typeof craft?.t !== 'function') {
        return message;
    }

    const translated = craft.t(pluginKitTranslationCategory, message);

    return typeof translated === 'string' && translated !== '' ? translated : message;
}
