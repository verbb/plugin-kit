import { ReactNode } from 'react';
import { PluginKitReactConfig } from './configure.js';
export type PluginKitProviderProps = PluginKitReactConfig & {
    children: ReactNode;
};
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
export declare function PluginKitProvider({ children, ...config }: PluginKitProviderProps): import("react/jsx-runtime").JSX.Element;
/** Read the nearest {@link PluginKitProvider} config (empty object when absent). */
export declare const usePluginKitConfig: () => PluginKitReactConfig;
//# sourceMappingURL=PluginKitProvider.d.ts.map