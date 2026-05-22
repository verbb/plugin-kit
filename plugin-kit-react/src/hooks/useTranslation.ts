import { useCallback } from 'react';
import { translate, type TranslateParams } from '@verbb/plugin-kit-react/utils/translation';

export const useTranslation = () => {
    return useCallback((message: string, params?: TranslateParams) => {
        return translate(message, params);
    }, []);
};
