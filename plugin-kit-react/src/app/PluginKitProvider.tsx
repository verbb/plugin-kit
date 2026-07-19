import {
    createContext,
    useContext,
    type ReactNode,
} from 'react';

import { configure, type PluginKitReactConfig } from './configure.js';

export type PluginKitProviderProps = PluginKitReactConfig & {
    children: ReactNode;
};

const PluginKitConfigContext = createContext<PluginKitReactConfig>({});

/**
 * Applies Plugin Kit environment config for a React tree.
 *
 * Importing React components already registers their underlying custom elements —
 * no `registerAll` / registration bootstrap. Pass `hostBridge` only when the tree
 * calls Craft action/selector helpers.
 *
 * @example
 * ```tsx
 * import { createRoot } from 'react-dom/client';
 * import { PluginKitProvider, Button } from '@verbb/plugin-kit-react';
 *
 * createRoot(el).render(
 *   <PluginKitProvider translationCategory="my-plugin">
 *     <Button>Save</Button>
 *   </PluginKitProvider>,
 * );
 * ```
 */
export function PluginKitProvider({ children, ...config }: PluginKitProviderProps) {
    // Sync apply before children render overlays — same timing as the old createReactApp path.
    configure(config);

    return (
        <PluginKitConfigContext.Provider value={config}>
            {children}
        </PluginKitConfigContext.Provider>
    );
}

/** Read the nearest {@link PluginKitProvider} config (empty object when absent). */
export const usePluginKitConfig = (): PluginKitReactConfig => {
    return useContext(PluginKitConfigContext);
};
