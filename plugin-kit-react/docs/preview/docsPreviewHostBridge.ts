import type { PluginKitReactHostBridge } from '../../src/utils/hostBridge';

/**
 * Host bridge for documentation contexts where Craft CP globals (`window.Craft`) are
 * not present: VitePress live previews, Storybook-style fixtures, etc.
 *
 * Supplies the methods `DatePicker`, `TimePicker`, element selectors, and host-backed
 * demos require so `requireHostBridgeMethod` does not throw outside the CP.
 */
export function createDocsPreviewHostBridge(): Partial<PluginKitReactHostBridge> {
    return {
        request: async<T = unknown>() => ({ data: { valid: true, message: 'Looks good.' } }) as T,
        openElementSelector: () => {
            // No-op outside Craft; element selector modals need the real CP.
        },
        formatDate: (date: Date) => date.toLocaleDateString('en-US'),
        getTimepickerOptions: () => ({}),
        getLocale: () => (typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US'),
    };
}
