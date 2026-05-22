export type TranslateParams = Record<string, string>;
export declare const setTranslationCategory: (category: string) => void;
export declare const setTranslateFunction: (fn?: (category: string, message: string, params?: TranslateParams) => string) => void;
export declare const translate: (message: string, params?: TranslateParams) => string;
//# sourceMappingURL=translation.d.ts.map