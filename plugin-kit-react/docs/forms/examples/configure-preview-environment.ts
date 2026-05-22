import { configurePluginKitReact as configurePublishedPluginKitReact } from '@verbb/plugin-kit-react/utils';
import { configurePluginKitReact } from '../../../src/utils/config';
import { createDocsPreviewHostBridge } from '../../preview/docsPreviewHostBridge';

const previewPluginKitConfig = {
    translationCategory: 'plugin-kit-react-docs',
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

// Docs previews mix direct source imports with package-alias imports, so configure
// both module instances to keep singleton-backed helpers like the host bridge aligned.
configurePluginKitReact(previewPluginKitConfig);
configurePublishedPluginKitReact(previewPluginKitConfig);
