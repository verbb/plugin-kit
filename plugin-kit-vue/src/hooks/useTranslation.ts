import { translate, type TranslateParams } from '@verbb/plugin-kit-forms';

/** Returns a translator bound to the category from {@link PluginKitProvider} / `configure()`. */
export const useTranslation = () => {
    return (message: string, params?: TranslateParams) => translate(message, params);
};
