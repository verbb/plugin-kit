/**
 * Re-export the framework-agnostic helper from `@verbb/plugin-kit-web`.
 * Prefer importing from `@verbb/plugin-kit-vue` / `/app` in app code.
 */
export {
    mountShadowApp,
    type MountShadowAppOptions,
    type ShadowAppMount,
} from '@verbb/plugin-kit-web/plugin-kit';
