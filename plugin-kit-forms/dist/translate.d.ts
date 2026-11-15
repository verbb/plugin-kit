export declare const setTranslateFunction: (fn?: (category: string, message: string, params?: TranslateParams) => string) => void;

export declare const setTranslationCategory: (category: string) => void;

export declare const translate: (message: string, params?: TranslateParams) => string;

export declare type TranslateParams = Record<string, string>;

export { }
