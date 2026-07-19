import { configurePluginKitReact } from '@verbb/plugin-kit-react/utils';
import { createDocsPreviewHostBridge } from '../../preview/docsPreviewHostBridge';

const previewPluginKitConfig = {
    translationCategory: 'plugin-kit-docs',
    translate: (_category: string, message: string, params?: Record<string, string>) => {
        if (!params) {
            return message;
        }

        return Object.entries(params).reduce((result, [key, value]) => {
            return result.replaceAll(`{${key}}`, value);
        }, message);
    },
    hostBridge: createDocsPreviewHostBridge(),
};

configurePluginKitReact(previewPluginKitConfig);
