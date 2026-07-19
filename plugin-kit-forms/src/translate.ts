export type TranslateParams = Record<string, string>;

let translationCategory = 'plugin-handle';
let translateFn: ((category: string, message: string, params?: TranslateParams) => string) | undefined;

export const setTranslationCategory = (category: string): void => {
    translationCategory = category.trim() || 'plugin-handle';
};

export const setTranslateFunction = (fn?: (category: string, message: string, params?: TranslateParams) => string): void => {
    translateFn = fn;
};

export const translate = (message: string, params?: TranslateParams): string => {
    if (translateFn) {
        return translateFn(translationCategory, message, params);
    }

    if (typeof window !== 'undefined') {
        const craft = (window as { Craft?: { t?: (category: string, message: string, params?: TranslateParams) => string } }).Craft;

        if (craft?.t) {
            return craft.t(translationCategory, message, params);
        }
    }

    return message;
};
